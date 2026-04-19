import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { TonalSurface } from './TonalSurface';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

export const Dropdown = ({
  trigger,
  children,
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 8,
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          side={side}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-xl transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
        >
          <TonalSurface tier="high" className="p-1">
            {children}
          </TonalSurface>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export const DropdownItem = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> & { className?: string }) => {
  return (
    <DropdownMenu.Item
      className={cn(
        "flex items-center px-3 py-2 text-sm text-foreground outline-none cursor-pointer rounded-md transition-colors hover:bg-surface-container-low focus:bg-surface-container-low data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
};

export const DropdownSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenu.Separator> & { className?: string }) => {
  return (
    <DropdownMenu.Separator
      className={cn("h-px bg-black/[0.05] mx-1 my-1", className)}
      {...props}
    />
  );
};

export const DropdownLabel = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenu.Label> & { className?: string }) => {
  return (
    <DropdownMenu.Label
      className={cn("px-3 py-2 text-xs font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  );
};
