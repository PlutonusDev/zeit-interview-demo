'use client';

import type { Workspace } from './Dashboard';
import { useState } from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa6';
import { GrConfigure } from 'react-icons/gr';
import { HiSelector } from 'react-icons/hi';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type IWorkspaceSelectorProps = {
  workspaces: Workspace[];
  selectedWorkspace?: string;
  onWorkspaceSelect: (workspaceId: string) => void;
  onWorkspaceCreate?: (workspaceId: string) => void;
};

export default function WorkspaceSelector({
  workspaces,
  selectedWorkspace,
  onWorkspaceSelect,
}: IWorkspaceSelectorProps): any {
  const [open, setOpen] = useState(false);
  // const [createDialogOpen, setCreateDialogOpen] = useState(false);
  // const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const selectedWorkspaceName = workspaces?.find(w => w.id === selectedWorkspace)?.name || 'Select Workspace';

  return (
    <div className="flex w-full justify-center">
      <div className="flex grow items-center gap-2 px-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-full" asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between px-3">
              {selectedWorkspaceName}
              <HiSelector className="text-lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[255px] p-0">
            <Command>
              <CommandInput placeholder="Search workspaces..." />
              <CommandList>
                <CommandEmpty>No workspaces found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {workspaces.map(workspace => (
                    <CommandItem
                      key={workspace.id}
                      onSelect={() => {
                        onWorkspaceSelect(workspace.id);
                        setOpen(false);
                      }}
                    >
                      <FaCheck className={`mr-1 text-zinc-600 ${selectedWorkspace === workspace.id ? 'opacity-100' : 'opacity-0'}`} />
                      {workspace.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <button type="button" className="rounded p-1 hover:bg-zinc-200">
          <FaPlus />
        </button>

        <button type="button" className="rounded p-1 hover:bg-zinc-200">
          <GrConfigure />
        </button>
      </div>
    </div>
  );
}
