import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SettingsIcon } from '@/components/ui/icons/system';
import ColorPicker from '@/components/(features)/colorpick';
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