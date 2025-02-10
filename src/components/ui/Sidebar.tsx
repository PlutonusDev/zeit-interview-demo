'use client';

import type { Workspace } from './Dashboard';
import { BiChevronRight } from 'react-icons/bi';
import { FaFileCsv } from 'react-icons/fa';
import { FaBrain, FaDatabase, FaPlus } from 'react-icons/fa6';
import { GrConfigure } from 'react-icons/gr';
import { Button } from './button';
import { Card } from './card';
import { ScrollArea } from './scroll-area';
import WorkspaceSelector from './WorkspaceSelector';

type ISidebarProps = {
  workspaces: Workspace[];
  selectedWorkspace: string;
  selectedAnalysis?: string;
  onWorkspaceSelect: (workspaceId: string) => void;
  onWorkspaceCreate?: (workspaceId: string) => void;
  onAnalysisSelect: (analysisId: string) => void;
  onDataSourceCreate?: (sourceId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: any;
};

export default function Sidebar({
  workspaces,
  selectedWorkspace,
  onWorkspaceSelect,
  onAnalysisSelect,
  sidebarOpen,
  setSidebarOpen,
}: ISidebarProps): any {
  return (
    <div className="relative z-20">
      <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className={`fixed top-3 z-50 flex items-center space-x-1 bg-blue-400 p-2 text-white shadow transition-all duration-700 hover:bg-blue-500 ${sidebarOpen ? 'left-[280px] -translate-x-full rounded-l' : 'left-0 rounded-r xl:top-10'}`}>
        <span className="text-xs uppercase">Menu</span>
        <BiChevronRight className={`text-lg transition-transform duration-700 ${sidebarOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <div className={`fixed top-0 h-full transition-transform duration-700 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full w-[280px] shrink-0 flex-col bg-zinc-100">
          <div className="p-4">
            <h1 className="text-xl font-bold">Demo App</h1>
          </div>
          <WorkspaceSelector workspaces={workspaces} selectedWorkspace={selectedWorkspace} onWorkspaceSelect={onWorkspaceSelect} />
          <div className="my-6 h-px w-full bg-zinc-200" />
          <div className="flex h-full flex-col justify-between">
            <ScrollArea className="flex-1">
              <div className="px-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase">Analyses</h2>
                  <FaPlus className="cursor-pointer text-sm hover:text-zinc-700" />
                </div>
                <div className="space-y-2">
                  <button type="button" onClick={() => onAnalysisSelect('1')} className="flex w-full cursor-pointer items-center space-x-2 rounded bg-zinc-200 px-2 py-1 text-sm">
                    <FaBrain />
                    <span>Monthly Revenue Analysis</span>
                  </button>
                  <button type="button" onClick={() => onAnalysisSelect('2')} className="flex w-full cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm transition-colors hover:bg-zinc-200">
                    <FaBrain />
                    <span>Customer Segmentation</span>
                  </button>
                  <button type="button" onClick={() => onAnalysisSelect('3')} className="flex w-full cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm transition-colors hover:bg-zinc-200">
                    <FaBrain />
                    <span>Sales Performance Summary</span>
                  </button>
                </div>
              </div>
              <div className="mt-8 px-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase">Data Sources</h2>
                  <FaPlus className="cursor-pointer text-sm hover:text-zinc-700" />
                </div>
                <div className="space-y-2">
                  <div className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm transition-colors hover:bg-zinc-200">
                    <FaDatabase />
                    <span>mongodb: sales-records</span>
                  </div>
                  <div className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm transition-colors hover:bg-zinc-200">
                    <FaDatabase />
                    <span>mongodb: customers</span>
                  </div>
                  <div className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm transition-colors hover:bg-zinc-200">
                    <FaFileCsv />
                    <span>revenue-jan-2025.csv</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 px-4">
                <Button variant="outline" className="w-full">Create Presentation</Button>
              </div>
            </ScrollArea>
          </div>
          <div className="mb-8 flex flex-col space-y-2 px-4">
            <Card>
              <div className="flex items-center space-x-2 p-2">
                <div className="size-10 shrink-0 rounded-full bg-blue-500" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col -space-y-1">
                    <span>Joshua Hughes</span>
                    <span className="text-xs text-muted-foreground">Administrator</span>
                  </div>
                  <button type="button" className="flex size-8 shrink-0 items-center justify-center rounded bg-zinc-100 shadow hover:bg-white">
                    <GrConfigure />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <Button variant="destructive" className="w-full">Logout</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
