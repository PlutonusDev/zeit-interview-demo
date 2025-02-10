'use client';

import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useState } from 'react';
import { BiBarChart, BiLineChart, BiSolidSend } from 'react-icons/bi';
import { FaChevronRight, FaHistory } from 'react-icons/fa';
import { FaBrain, FaDatabase, FaFileCsv, FaLightbulb } from 'react-icons/fa6';
import { IoReload, IoSparkles } from 'react-icons/io5';
import { MdDelete, MdEdit, MdTrendingUp } from 'react-icons/md';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './chart';
import { Input } from './input';
import { ScrollArea } from './scroll-area';
import Sidebar from './Sidebar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export type Workspace = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const workspaces = [
    { id: '1', name: 'Marketing Analytics' },
    { id: '2', name: 'Sales Dashboard' },
    { id: '3', name: 'Customer Insights' },
  ];

  const { toast } = useToast();

  const [prompt, setPrompt] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('1');
  const [selectedAnalysis, setSelectedAnalysis] = useState('1');
  const [_tab, setTab] = useState('chart');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* const _data = {
    type: 'bar',
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [150000, 165000, 180000, 195000],
    title: 'Overall Revenue Trends',
    datasets: [
      {
        label: 'Electronics',
        values: [45000, 52000, 58000, 62000],
        color: 'bg-blue-500',
      },
      {
        label: 'Apparel',
        values: [35000, 38000, 42000, 48000],
        color: 'bg-green-500',
      },
      {
        label: 'Home Goods',
        values: [70000, 75000, 80000, 85000],
        color: 'bg-purple-500',
      },
    ],
  }; */

  const rawData = [
    {
      quarter: 'Q1',
      totalRevenue: 150000,
      electronics: 45000,
      apparel: 35000,
      homeGoods: 70000,
      growth: '10%',
    },
    {
      quarter: 'Q2',
      totalRevenue: 165000,
      electronics: 52000,
      apparel: 38000,
      homeGoods: 75000,
      growth: '12%',
    },
    {
      quarter: 'Q3',
      totalRevenue: 180000,
      electronics: 58000,
      apparel: 42000,
      homeGoods: 80000,
      growth: '15%',
    },
    {
      quarter: 'Q4',
      totalRevenue: 195000,
      electronics: 62000,
      apparel: 48000,
      homeGoods: 85000,
      growth: '18%',
    },
  ];

  const chartConfig = {
    totalRevenue: {
      label: 'Total Revenue',
      color: '#78dcca',
    },
    electronics: {
      label: 'Electronics',
      color: 'hsl(var(--color-green-500))',
    },
    apparel: {
      label: 'Apparel',
      color: 'hsl(var(--color-red-500))',
    },
    homeGoods: {
      label: 'Home Goods',
      color: 'hsl(var(--color-yellow-500))',
    },
  };

  const handleWorkspaceSelect = (workspaceId: string) => {
    toast({
      duration: 3000,
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'Workspace selection is disabled.',
      action: <ToastAction onClick={() => handleWorkspaceSelect('')} altText="Try again">Try again</ToastAction>,
    });
    return;

    setSelectedWorkspace(workspaceId);
  };

  const handleAnalysisSelect = (analysisId: string) => {
    toast({
      duration: 3000,
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'Analysis selection is disabled.',
      action: <ToastAction onClick={() => handleAnalysisSelect('')} altText="Try again">Try again</ToastAction>,
    });
    return;

    setSelectedAnalysis(analysisId);
  };

  const handleAISubmit = () => {
    toast({
      duration: 3000,
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'AI-Enhanced features are disabled.',
      action: <ToastAction onClick={() => handleAISubmit()} altText="Try again">Try again</ToastAction>,
    });
  };

  return (
    <div className="flex h-dvh">
      <Sidebar workspaces={workspaces} selectedWorkspace={selectedWorkspace} onWorkspaceSelect={handleWorkspaceSelect} selectedAnalysis={selectedAnalysis} onAnalysisSelect={handleAnalysisSelect} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex w-full flex-col overflow-hidden transition-all duration-700 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        <div className="h-36 w-full bg-zinc-100 xl:h-4">
          <div className="flex h-full items-center justify-center xl:hidden">
            <p className="text-lg font-bold">BI Suite Demo</p>
          </div>
        </div>
        <div className="flex w-full grow flex-col overflow-hidden">
          <div className="hidden justify-center border-b p-4 shadow xl:flex">
            <Card className="flex w-full max-w-4xl items-center space-x-2 self-center bg-white p-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Gain insights on your data..." className="w-full pr-10" />
                  </TooltipTrigger>
                  <TooltipContent align="start" className="border border-zinc-200 bg-zinc-100 text-brand-bg shadow">
                    <div className="p-2">
                      <p className="mb-2 flex items-center space-x-2 font-semibold">
                        <IoSparkles />
                        <span>Suggestions</span>
                      </p>
                      <ul className="space-y-1">
                        <li key="1">
                          <button type="button" onClick={() => setPrompt('Show me sales trends for the last quarter')} className="cursor-pointer rounded p-1 px-2 text-sm hover:bg-zinc-200">
                            Show me sales trends for the last quarter
                          </button>
                        </li>
                        <li key="2">
                          <button type="button" onClick={() => setPrompt('Compare revenue across regions')} className="cursor-pointer rounded p-1 px-2 text-sm hover:bg-zinc-200">
                            Compare revenue across regions
                          </button>
                        </li>
                        <li key="3">
                          <button type="button" onClick={() => setPrompt('Analyze our customer demographics')} className="cursor-pointer rounded p-1 px-2 text-sm hover:bg-zinc-200">
                            Analyze our customer demographics
                          </button>
                        </li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <button type="button" className="flex size-8 shrink-0 items-center justify-center rounded bg-zinc-100 shadow hover:bg-white">
                <FaHistory />
              </button>
              <button type="button" onClick={() => handleAISubmit()} className="flex h-8 shrink-0 items-center justify-center space-x-2 rounded bg-zinc-100 px-3 font-semibold shadow hover:bg-white">
                <span className="text-sm">Submit</span>
                <BiSolidSend />
              </button>
            </Card>
          </div>
          <ScrollArea className="relative h-full p-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-semibold">Marketing Analytics</span>
              <FaChevronRight />
              <span>Monthly Revenue Analysis</span>
            </div>
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="mt-2 size-full overflow-hidden rounded bg-zinc-100 pb-4 xl:w-1/2">
                <div className="h-1 w-full bg-blue-300" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 px-4 py-2">
                    <div className="flex items-center space-x-1 text-sm text-zinc-400">
                      <FaLightbulb />
                      <span>Insight</span>
                    </div>
                    <p className="font-semibold">Sales Trends Last Year</p>
                  </div>
                  <div className="flex items-center space-x-4 px-4 text-xs text-zinc-400">
                    <span>gpt-4o-2024-05-13</span>
                    <span>#12258</span>
                    <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded bg-zinc-100 text-sm shadow hover:bg-red-100">
                      <MdDelete className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="h-px w-full bg-zinc-200" />
                <div className="flex w-full justify-center p-4">
                  <div className="flex min-w-[50%] items-center justify-between space-x-8 rounded bg-zinc-200 p-2">
                    <span className="text-sm text-zinc-600">"Show me sales trends for last year"</span>
                    <div className="flex space-x-2">
                      <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded bg-zinc-100 text-sm shadow hover:bg-white">
                        <MdEdit />
                      </button>
                      <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded bg-zinc-100 text-sm shadow hover:bg-white">
                        <IoReload />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-col space-y-2 px-4">
                  <div className="w-full overflow-hidden rounded bg-zinc-200 text-xs text-zinc-600">
                    <div className="h-1 bg-purple-400" />
                    <div className="flex items-center space-x-3 p-3">
                      <IoSparkles className="shrink-0 text-lg text-purple-400" />
                      <span>Assuming data availability across all products/services and regions (if applicable), and using revenue as the sales metric, I've prepared visualizations showing overall revenue trends, revenue by product category, and key performance indicators.</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-600">
                    <span>Data sources used:</span>
                    <div className="flex items-center space-x-1 rounded bg-zinc-200 p-1">
                      <FaDatabase />
                      <span>mongodb: sales-records</span>
                    </div>
                    <div className="flex items-center space-x-1 rounded bg-zinc-200 p-1">
                      <FaFileCsv />
                      <span>revenue-jan-2025.csv</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-4">
                  <Card className="bg-white p-4">
                    <Card className="mb-4 text-sm">
                      <div className="p-4">
                        <div className="flex items-center gap-1 font-medium leading-none">
                          Trending up by 18% from Q3 to Q4
                          {' '}
                          <MdTrendingUp className="text-lg text-green-600" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                          Showing total revenue from Q1-Q4 2024
                        </div>
                      </div>
                    </Card>
                    <Tabs defaultValue="chart" className="size-full">
                      <div className="mb-2 flex items-center justify-between">
                        <TabsList>
                          <TabsTrigger value="chart" onClick={() => setTab('chart')}>
                            <div className="flex items-center gap-2">
                              <BiBarChart />
                              Chart View
                            </div>
                          </TabsTrigger>
                          <TabsTrigger value="data" onClick={() => setTab('data')}>
                            <div className="flex items-center gap-2">
                              <BiLineChart />
                              Data View
                            </div>
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="chart" className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Total Revenue</CardTitle>
                            <CardDescription>Q1-Q4 2024</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer config={chartConfig}>
                              <BarChart accessibilityLayer data={rawData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                  dataKey="Quarter"
                                  tickLine={false}
                                  tickMargin={10}
                                  axisLine={false}
                                  tickFormatter={val => val.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar
                                  dataKey="totalRevenue"
                                  fill="#78dcca"
                                  radius={[4, 4, 4, 4]}
                                />
                              </BarChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Revenue by Category</CardTitle>
                            <CardDescription>Q1-Q4 2024</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer config={chartConfig}>
                              <BarChart accessibilityLayer data={rawData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                  dataKey="Quarter"
                                  tickLine={false}
                                  tickMargin={10}
                                  axisLine={false}
                                  tickFormatter={val => val.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar
                                  dataKey="electronics"
                                  stackId="a"
                                  fill="#78dcca"
                                  radius={[0, 0, 4, 4]}
                                />
                                <Bar
                                  dataKey="apparel"
                                  stackId="a"
                                  fill="#50c769"
                                />
                                <Bar
                                  dataKey="homeGoods"
                                  stackId="a"
                                  fill="#9f50c7"
                                  radius={[4, 4, 0, 0]}
                                />
                              </BarChart>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="data" className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <Card className="col-span-full grid grid-cols-1 gap-4 xl:grid-cols-2">
                          <div className="p-4">
                            <Table>
                              <TableCaption>Total Revenue</TableCaption>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Quarter</TableHead>
                                  <TableHead>Revenue</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Q1</TableCell>
                                  <TableCell>$150,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Q2</TableCell>
                                  <TableCell>$165,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Q3</TableCell>
                                  <TableCell>$180,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Q4</TableCell>
                                  <TableCell>$195,000</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>

                          <div className="p-4">
                            <Table>
                              <TableCaption>Revenue by Category</TableCaption>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Quarter</TableHead>
                                  <TableHead>Category</TableHead>
                                  <TableHead>Revenue</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell rowSpan={3}>Q1</TableCell>
                                  <TableCell>Electronics</TableCell>
                                  <TableCell>$45,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Apparel</TableCell>
                                  <TableCell>$35,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Home Goods</TableCell>
                                  <TableCell>$70,000</TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell rowSpan={3}>Q2</TableCell>
                                  <TableCell>Electronics</TableCell>
                                  <TableCell>$52,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Apparel</TableCell>
                                  <TableCell>$38,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Home Goods</TableCell>
                                  <TableCell>$75,000</TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell rowSpan={3}>Q3</TableCell>
                                  <TableCell>Electronics</TableCell>
                                  <TableCell>$58,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Apparel</TableCell>
                                  <TableCell>$42,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Home Goods</TableCell>
                                  <TableCell>$80,000</TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell rowSpan={3}>Q4</TableCell>
                                  <TableCell>Electronics</TableCell>
                                  <TableCell>$62,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Apparel</TableCell>
                                  <TableCell>$48,000</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Home Goods</TableCell>
                                  <TableCell>$85,000</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </Card>
                      </TabsContent>
                    </Tabs>
                    <Card className="col-span-full mt-4">
                      <CardContent>
                        <Table>
                          <TableCaption>Key Performance Indicators</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/2">Metric</TableHead>
                              <TableHead>Value</TableHead>
                              <TableHead>Change</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              { metric: 'Total Revenue (Q4)', value: '$195k', change: '18% Growth' },
                              { metric: 'Best Performing Category', value: 'Home Goods', change: '$85k in Q4' },
                              { metric: 'Highest Growth', value: 'Apparel', change: '37% YoY' },
                            ].map(metric => (
                              <TableRow key={metric.metric}>
                                <TableCell className="font-medium">{metric.metric}</TableCell>
                                <TableCell>{metric.value}</TableCell>
                                <TableCell>{metric.change}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </Card>
                </div>
              </div>

              <div className="mt-2 size-full overflow-hidden rounded bg-zinc-100 pb-4 xl:w-1/2">
                <div className="h-1 w-full bg-blue-300" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 px-4 py-2">
                    <div className="flex items-center space-x-1 text-sm text-zinc-400">
                      <FaLightbulb />
                      <span>Insight</span>
                    </div>
                    <p className="font-semibold">Geographic Customer Breakdown</p>
                  </div>
                  <div className="flex items-center space-x-4 px-4 text-xs text-zinc-400">
                    <span>gpt-4o-2024-05-13</span>
                    <span>#12257</span>
                    <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded bg-zinc-100 text-sm shadow hover:bg-red-100">
                      <MdDelete className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="h-px w-full bg-zinc-200" />
                <div className="flex w-full justify-center p-4">
                  <div className="flex min-w-[50%] items-center justify-between space-x-8 rounded bg-zinc-200 p-2">
                    <span className="text-sm text-zinc-600">"Analyze our customer demographics, focusing on location"</span>
                    <div className="flex space-x-2">
                      <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded bg-zinc-100 text-sm shadow hover:bg-white">
                        <MdEdit />
                      </button>
                      <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded bg-zinc-100 text-sm shadow hover:bg-white">
                        <IoReload />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-col space-y-2 px-4">
                  <div className="w-full overflow-hidden rounded bg-zinc-200 text-xs text-zinc-600">
                    <div className="h-1 bg-purple-400" />
                    <div className="flex items-center space-x-3 p-3">
                      <IoSparkles className="shrink-0 text-lg text-purple-400" />
                      <span>Assuming data availability across all customer records, I've prepared visualizations showing customer distribution by region, state/province, and major city, highlighting key concentrations and potential areas for expansion.</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-600">
                    <span>Data sources used:</span>
                    <div className="flex items-center space-x-1 rounded bg-zinc-200 p-1">
                      <FaDatabase />
                      <span>mongodb: sales-records</span>
                    </div>
                    <div className="flex items-center space-x-1 rounded bg-zinc-200 p-1">
                      <FaDatabase />
                      <span>mongodb: customers</span>
                    </div>
                    <div className="flex items-center space-x-1 rounded bg-zinc-200 p-1">
                      <FaBrain />
                      <span>analysis: Customer Segmentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl font-semibold text-zinc-300">
              You haven't created any insights yet.
              <br />
              Use the input bar at the top to create some.
            </p> */}
          </ScrollArea>
          <div className="flex justify-center border-t p-4 shadow xl:hidden">
            <Card className="flex w-full max-w-4xl items-center space-x-2 self-center bg-white p-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Gain insights on your data..." className="w-full pr-10" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="border border-zinc-200 bg-zinc-100 text-brand-bg shadow">
                    <div className="p-2">
                      <p className="mb-2 flex items-center space-x-2 font-semibold">
                        <IoSparkles />
                        <span>Suggestions</span>
                      </p>
                      <ul className="space-y-1">
                        <li key="1">
                          <button type="button" onClick={() => setPrompt('Show me sales trends for the last quarter')} className="cursor-pointer rounded p-1 px-2 text-sm hover:bg-zinc-200">
                            Show me sales trends for the last quarter
                          </button>
                        </li>
                        <li key="2">
                          <button type="button" onClick={() => setPrompt('Compare revenue across regions')} className="cursor-pointer rounded p-1 px-2 text-sm hover:bg-zinc-200">
                            Compare revenue across regions
                          </button>
                        </li>
                        <li key="3">
                          <button type="button" onClick={() => setPrompt('Analyze our customer demographics')} className="cursor-pointer rounded p-1 px-2 text-sm hover:bg-zinc-200">
                            Analyze our customer demographics
                          </button>
                        </li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <button type="button" className="flex size-8 shrink-0 items-center justify-center rounded bg-zinc-100 shadow hover:bg-white">
                <FaHistory />
              </button>
              <button type="button" onClick={() => handleAISubmit()} className="flex h-8 shrink-0 items-center justify-center space-x-2 rounded bg-zinc-100 px-3 font-semibold shadow hover:bg-white">
                <span className="text-sm">Submit</span>
                <BiSolidSend />
              </button>
            </Card>
          </div>
        </div>
        <div className="flex h-8 w-full items-center justify-end bg-zinc-100 px-4 shadow-[rgba(0,0,0,0.2)_0px_-2px_6px_1px]">
          <p className="text-xs text-zinc-300">Copyright &copy; Joshua Hughes</p>
        </div>
      </div>
    </div>
  );
}
