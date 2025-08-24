import {
  PieChart,
  Users,
  Banknote,
  Landmark,
  CircleDollarSign,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Scale,
} from "lucide-react";
import { LoanStatusChart } from "@/components/dashboard/loan-status-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <h1 className="text-2xl font-bold">Home Page Summary</h1>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-1">
              <LoanStatusChart />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:col-span-2 xl:grid-cols-5">
              <MetricCard
                title="Registered Today"
                value="0"
                icon={Users}
              />
              <MetricCard
                title="Registered Total"
                value="0"
                icon={Users}
              />
              <MetricCard
                title="Min Loan Today"
                value="¥0"
                icon={Banknote}
              />
              <MetricCard
                title="Max Loan Today"
                value="¥0"
                icon={Landmark}
              />
              <MetricCard
                title="Deposit Today"
                value="¥0"
                icon={CircleDollarSign}
              />
              <MetricCard
                title="Approved Loans"
                value="0"
                icon={CheckCircle}
              />
              <MetricCard
                title="Pending Loans"
                value="0"
                icon={Clock}
              />
              <MetricCard
                title="Rejected Loans"
                value="0"
                icon={XCircle}
              />
              <MetricCard
                title="Avg Loan Amount"
                value="¥0"
                icon={TrendingUp}
              />
              <MetricCard
                title="Total Loans"
                value="0"
                icon={Scale}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
