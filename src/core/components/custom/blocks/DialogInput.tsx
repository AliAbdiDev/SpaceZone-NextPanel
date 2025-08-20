'use client';

import * as React from 'react';
import { ArrowUpRightIcon, CircleFadingPlusIcon, FileInputIcon, FolderPlusIcon, SearchIcon } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/core/components/shadcn/ui/command';
import { cn } from '@/core/utils';

export default function DialogInput({
  openHandler,
  isOpen,
  classNameTrigger,
}: {
  openHandler?: (value: boolean) => void;
  isOpen?: boolean;
  classNameTrigger?: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => openHandler?.(open), [open]);
  React.useEffect(() => setOpen(isOpen), [isOpen]);
  return (
    <>
      <button
        className={cn(
          'cursor-pointer max-w-sm lg:max-w-xl w-full border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-10 rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
          classNameTrigger
        )}
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center ">
          <SearchIcon className="text-muted-foreground/80 -ms-1 me-3" size={16} aria-hidden="true" />
          <span className="text-muted-foreground/70 font-normal max-lg:text-xs block max-sm:max-w-16 truncate">
            جستوجو دوره...
          </span>
        </span>
        <kbd className="bg-background max-md:hidden text-muted-foreground/70 ms-12 -me-1 inline-flex max-h-full h-7 items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          <div className="py-1 w-6">⌘ K</div>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} className="lg:max-w-2xl">
        <CommandInput placeholder="دوره مورد نظرتان را تایپ کنید..." className="pr-6" />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick start">
            <CommandItem>
              <FolderPlusIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>New folder</span>
              <CommandShortcut className="justify-center">⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileInputIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Import document</span>
              <CommandShortcut className="justify-center">⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CircleFadingPlusIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Add block</span>
              <CommandShortcut className="justify-center">⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem>
              <ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Go to dashboard</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Go to apps</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRightIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Go to connections</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
