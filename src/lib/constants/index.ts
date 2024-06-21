export const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB
export const MAX_IMAGES=4
export const EXAMPLE_PATH = "gemini-pro-vision-playground";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL = "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";
export const NEXT_SITE_TITLE = "Next.js Blog Starter";
export const NEXT_SITE_DESCRIPTION = "A blog starter built with Next.js and Markdown";
export const cardImage = HOME_OG_IMAGE_URL;
export const robots = "follow, index";
export const favicon = "/favicon.ico";

export const referrer = 'origin-when-cross-origin';
export const keywords = ['Vercel', 'Supabase', 'Next.js', 'Stripe', 'Subscription', CMS_NAME];
export const authors = [{ name: 'Vercel', url: 'https://vercel.com/' }];
export const creator = 'Vercel';
export const publisher = 'Vercel';

export const twitterCard = 'summary_large_image';
export const twitterSite = '@Vercel';
export const twitterCreator = '@Vercel';
export const ogType = 'website';

export const route = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  postRoute: 'blog' // Update this with your desired route for blog posts i.e. app/blog therefore `blog`
};