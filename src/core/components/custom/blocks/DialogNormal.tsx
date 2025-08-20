import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/core/components/shadcn/ui/dialog';

type DialogNormalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

export default function DialogNormal({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  ...props
}: DialogNormalProps & React.ComponentProps<typeof DialogContent>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent dir="rtl" {...props}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
