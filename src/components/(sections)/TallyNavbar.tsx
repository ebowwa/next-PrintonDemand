"use client";

// src/components/TallyNavbar.tsx

import React, { useState, useEffect } from 'react';
import { UserProvider } from '@/utils/storage/context/UserContext';
import { usePathname } from 'next/navigation';
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import AuthButtons from '@/components/(third-party)/supabase/AuthButton';
import Image from 'next/image';

// Define types for content structure
type MenuItemContent = {
  title: string;
  items: ProductItemContent[];
};

type ProductItemContent = {
  title: string;
  description: string;
  href: string;
  imagePath: string;
};

// Create content objects
const menuItemsContent: Record<string, MenuItemContent> = {
  "Getting Started": {
    title: "Getting Started",
    items: [
      {
        title: "Blog",
        description: "Ideal for individuals",
        href: "/blog",
        imagePath: "/placeholder.png",
      },
      {
        title: "Pricing",
        description: "For professionals",
        href: "/pricing",
        imagePath: "/placeholder.png",
      },
      {
        title: "Affiliates",
        description: "Solution for organizations",
        href: "/affiliates",
        imagePath: "/placeholder.png",
      },
    ],
  },
  Labs: {
    title: "Labs",
    items: [
      {
        title: "Chat",
        description: "Explore our Chat Lab",
        href: "/chat",
        imagePath: "/placeholder.png",
      },
      {
        title: "Print on Demand",
        description: "Discover our Print on Demand solutions",
        href: "/printondemand",
        imagePath: "/placeholder.png",
      },
      {
        title: "Resume Assistance",
        description: "coming soon - generative ai meets resume drafting, sign up for our waitlist",
        href: "/resume",
        imagePath: "/placeholder.png",
      },
    ],
  },
};

const TallyNavbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveItem(null);
  }, [pathname]);

  return (
    <UserProvider>
      <nav className="flex justify-between items-center py-4 px-8 border-b">
        <h1 className="text-2xl font-bold">alchemy</h1>
        <div className="flex items-center"> {/* Add this wrapper */}
          <Menu setActive={setActiveItem}>
            {/* Render menu items dynamically */}
            {Object.entries(menuItemsContent).map(([key, content]) => (
              <MenuItem key={key} setActive={setActiveItem} active={activeItem} item={content.title}>
                {/* Render product items dynamically */}
                {activeItem === content.title && (
                  <div className="flex flex-col">
                    {content.items.map((item, index) => (
                      <ProductItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                        imagePath={item.imagePath}
                        width={200}
                        height={200}
                      />
                    ))}
                  </div>
                )}
              </MenuItem>
            ))}
          </Menu>
          <AuthButtons /> {/* Move AuthButtons here */}
        </div>
      </nav>
    </UserProvider>
  );
};

export default TallyNavbar;