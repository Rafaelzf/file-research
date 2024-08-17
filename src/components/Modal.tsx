import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogModal({
  children,
  title = "",
  isOpen = false,
  onOpenChange,
}: {
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
