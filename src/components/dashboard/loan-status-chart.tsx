"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

const chartData = [
  { status: "Approved", count: 0, fill: "var(--color-approved)" },
  { status: "Pending", count: 0, fill: "var(--color-pending)" },
  { status: "Rejected", count: 0, fill: "var(--color-rejected)" },
];

const chartConfig = {
  count: {
    label: "Loans",
  },
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-4))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function LoanStatusChart() {
  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Loan Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Pie
              data={totalCount > 0 ? chartData : [{status: 'No Data', count: 1, fill: 'hsl(var(--muted))'}]}
              dataKey="count"
              nameKey="status"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
            >
              {(totalCount > 0 ? chartData : [{status: 'No Data', count: 1, fill: 'hsl(var(--muted))'}]).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm">
           {chartData.map((entry) => (
             <div key={entry.status} className="flex items-center gap-2 w-full max-w-[200px]">
               <div className="w-1/3 flex items-center">
                 <span className="w-3 h-3 mr-2" style={{ backgroundColor: entry.fill }} />
                 <span>{entry.status}</span>
               </div>
               <div className="w-2/3 text-left font-semibold">{entry.status}: {entry.count}%</div>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}
