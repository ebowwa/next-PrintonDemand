import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMediaQuery from "@/utils/hooks/user/use-media-query";

// Define types for content structure
interface DrawerDialogContent {
  title: string;
  description: string;
}

// Define content object
const drawerDialogContent: DrawerDialogContent = {
  title: "Edit profile",
  description: "Make changes to your profile here. Click save when you're done.",
};

const EllipsisButton: React.FC = () => {
  const { isDesktop } = useMediaQuery();
  return <DrawerDialogDemo isDesktop={isDesktop} />;
};

export default EllipsisButton;

export function DrawerDialogDemo({ isDesktop }: { isDesktop: boolean }) {
  const [open, setOpen] = React.useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">...</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{drawerDialogContent.title}</DialogTitle>
            <DialogDescription>
              {drawerDialogContent.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">...</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{drawerDialogContent.title}</DrawerTitle>
          <DrawerDescription>
            {drawerDialogContent.description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}