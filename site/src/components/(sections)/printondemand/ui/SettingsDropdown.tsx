// src/components/(sections)/printondemand/ImageTable/kit/SettingsDropdown.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ColorPicker from '@/components/(features)/PickColor';
import OutsideClickHandler from '@/components/(sections)/printondemand/hooks/OutsideClickHandler';

// Define types for content structure
interface DropdownMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

// Define content object
const dropdownMenuItems: DropdownMenuItem[] = [
  { label: 'Add Text Overlay', href: '#' },
  { label: 'Redo Product Details', href: '#' },
  { label: 'Download Image', href: '#' },
  { label: 'Remove Image Background', href: '#' },
  { label: 'Color Picker', onClick: () => {} }, // Update this onClick handler later
];

const SettingsDropdown = () => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState<boolean>(false);

  const toggleColorPicker = () => setIsColorPickerVisible(!isColorPickerVisible);

  const handleCloseColorPicker = () => setIsColorPickerVisible(false);

  // Update the onClick handler for the 'Color Picker' menu item
  const handleColorPickerClick = () => {
    toggleColorPicker();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownMenuItems.map((item, index) => (
          <DropdownMenuItem key={index} onSelect={item.onClick}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <button className="w-full text-left" onClick={item.onClick}>
                {item.label}
              </button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      {isColorPickerVisible && (
        <OutsideClickHandler onOutsideClick={handleCloseColorPicker}>
          <ColorPicker />
        </OutsideClickHandler>
      )}
    </DropdownMenu>
  );
};

export default SettingsDropdown;

// Update the SettingsIcon component to accept className
export interface IconProps {
  className?: string;
}

export const SettingsIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);