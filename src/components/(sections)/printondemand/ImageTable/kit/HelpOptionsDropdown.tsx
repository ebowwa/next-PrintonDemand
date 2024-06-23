import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HelpCircleIcon } from '@/components/ui/icons/system';

// Define types for content structure
interface HelpMenuItem {
  label: string;
  href: string;
}

// Define content object
const helpMenuItems: HelpMenuItem[] = [
  { label: 'Feedback', href: '#' },
  { label: 'Help', href: '#' },
  { label: 'Bug Report', href: '#' },
  { label: 'Changelog', href: '#' },
];

const HelpOptionsDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        <HelpCircleIcon className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {helpMenuItems.map((item, index) => (
        <DropdownMenuItem key={index}>
          <Link href={item.href}>{item.label}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default HelpOptionsDropdown;