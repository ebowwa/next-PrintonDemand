The provided SQL script sets up a database schema for managing users, customers, products, prices, and subscriptions, integrating with Stripe for payment processing. Here's a detailed breakdown of each part:

### 1. **Users Table**
- **Purpose**: Stores user data.
- **Columns**:
  - `id`: UUID referencing `auth.users`, primary key.
  - `full_name`: User's full name.
  - `avatar_url`: URL to the user's avatar.
  - `billing_address`: User's billing address in JSON format.
  - `payment_method`: User's payment instruments in JSON format.
- **Row Level Security (RLS)**:
  - Users can view and update only their own data.
  - Policies are created to enforce this.

### 2. **Trigger for New User Creation**
- **Purpose**: Automatically inserts a new entry into the `users` table when a new user signs up via Supabase Auth.
- **Function**: `public.handle_new_user()`
  - Inserts `id`, `full_name`, and `avatar_url` from the new user's metadata.
- **Trigger**: `on_auth_user_created`
  - Executes the function after a new user is inserted into `auth.users`.

### 3. **Customers Table**
- **Purpose**: Maps user IDs to Stripe customer IDs.
- **Columns**:
  - `id`: UUID referencing `auth.users`, primary key.
  - `stripe_customer_id`: The user's customer ID in Stripe.
- **RLS**: Enabled but no policies, as this table is private and users should not have access.

### 4. **Products Table**
- **Purpose**: Stores product data synced from Stripe.
- **Columns**:
  - `id`: Product ID from Stripe.
  - `active`: Whether the product is available for purchase.
  - `name`: Displayable name of the product.
  - `description`: Long form description of the product.
  - `image`: URL of the product image.
  - `metadata`: Additional information in JSON format.
- **RLS**: Public read-only access.

### 5. **Prices Table**
- **Purpose**: Stores price data synced from Stripe.
- **Columns**:
  - `id`: Price ID from Stripe.
  - `product_id`: ID of the product this price belongs to.
  - `active`: Whether the price can be used for new purchases.
  - `description`: Brief description of the price.
  - `unit_amount`: Price amount in the smallest currency unit.
  - `currency`: Three-letter ISO currency code.
  - `type`: Pricing type (`one_time` or `recurring`).
  - `interval`: Billing frequency (`day`, `week`, `month`, `year`).
  - `interval_count`: Number of intervals between billings.
  - `trial_period_days`: Default trial days.
  - `metadata`: Additional information in JSON format.
- **RLS**: Public read-only access.

### 6. **Subscriptions Table**
- **Purpose**: Stores subscription data synced from Stripe.
- **Columns**:
  - `id`: Subscription ID from Stripe.
  - `user_id`: UUID referencing `auth.users`.
  - `status`: Subscription status.
  - `metadata`: Additional information in JSON format.
  - `price_id`: ID of the price that created this subscription.
  - `quantity`: Quantity of the subscription.
  - `cancel_at_period_end`: Whether the subscription will be canceled at the end of the billing period.
  - Various timestamps related to the subscription lifecycle.
- **RLS**: Users can only view their own subscription data.

### 7. **Realtime Subscriptions**
- **Purpose**: Allows real-time listening on public tables (`products` and `prices`).
- **Command**: Drops and recreates the `supabase_realtime` publication for these tables.

This setup ensures that user data is secure, with appropriate access controls, and integrates seamlessly with Stripe for managing products, prices, and subscriptions.
-----

In a Next.js app router site, you would typically use this database schema to manage user authentication, user profiles, and subscription-based services. Here's how you might integrate and use this schema within your Next.js application:

### 1. **User Authentication and Profile Management**
- **Sign Up/Sign In**: Use Supabase Auth to handle user sign-up and sign-in. When a new user signs up, the trigger `on_auth_user_created` will automatically create a new entry in the `users` table.
- **Profile Page**: Create a profile page where users can view and update their `full_name`, `avatar_url`, `billing_address`, and `payment_method`. Ensure that the update operations are protected by the row-level security policies.

### 2. **Subscription Management**
- **Products and Prices**: Display the products and their associated prices on your site. Use the `products` and `prices` tables to fetch this data. Since these tables have public read-only access, you can safely fetch and display this information.
- **Subscription Handling**: When a user decides to subscribe to a product, use Stripe's API to create a subscription. This will trigger the necessary webhooks to sync the subscription data into the `subscriptions` table.
- **Subscription Status**: Display the user's subscription status, manage cancellations, and handle renewals. Use the `subscriptions` table to fetch and update the subscription details. Ensure that users can only view and manage their own subscriptions, as enforced by the row-level security policy.

### 3. **Database Access in Next.js**
- **Supabase Client**: Use the Supabase JavaScript client to interact with your database. Initialize the client in your Next.js application:
  ```javascript
  import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  ```
- **Fetching Data**: Use server-side rendering (SSR) or client-side fetching to get data from your database. For example, to fetch a user's profile:
  ```javascript
  import { supabase } from '../utils/supabaseClient';

  const getUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };
  ```
- **Updating Data**: Similarly, use the Supabase client to update user data:
  ```javascript
  const updateUserProfile = async (userId, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };
  ```

### 4. **Real-time Updates**
- **Real-time Subscriptions**: Use Supabase's real-time capabilities to listen for changes in the `products` and `prices` tables. This can be useful for updating the UI dynamically when products or prices change:
  ```javascript
  supabase
    .from('products')
    .on('*', payload => {
      console.log('Change received!', payload);
      // Update your UI accordingly
    })
    .subscribe();
  ```

### 5. **Security and Authorization**
- **Server-side Checks**: Ensure that all sensitive operations (like updating user profiles or managing subscriptions) are protected by server-side checks to prevent unauthorized access.
- **Environment Variables**: Use environment variables to securely store your Supabase URL and anonymous key, ensuring they are not exposed in your client-side code.

By integrating this database schema into your Next.js app router site, you can create a robust, secure, and dynamic user and subscription management system.