import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { TonalSurface } from './TonalSurface';
import { AmbientShadow } from './AmbientShadow';

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
  trigger,
  children,
  title,
  description,
  className,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 backdrop-blur-xl bg-surface/60 transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-0 outline-none transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
        >
          <AmbientShadow>
            <TonalSurface tier="highest" className="rounded-2xl overflow-hidden">
              <div className="p-6">
                {title && (
                  <Dialog.Title className="text-xl font-semibold text-foreground mb-2">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-muted-foreground mb-6">
                    {description}
                  </Dialog.Description>
                )}
                <div className="relative">
                  {children}
                </div>
              </div>
              <div className="flex justify-end p-4 border-t border-black/[0.05]">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-surface-container-low transition-colors">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </TonalSurface>
          </AmbientShadow>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
