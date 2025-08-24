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
                value="5"
                icon={Users}
              />
              <MetricCard
                title="Registered Total"
                value="120"
                icon={Users}
              />
              <MetricCard
                title="Min Loan Today"
                value="¥10,000"
                icon={Banknote}
              />
              <MetricCard
                title="Max Loan Today"
                value="¥200,000"
                icon={Landmark}
              />
              <MetricCard
                title="Deposit Today"
                value="¥350,000"
                icon={CircleDollarSign}
              />
              <MetricCard
                title="Approved Loans"
                value="32"
                icon={CheckCircle}
              />
              <MetricCard
                title="Pending Loans"
                value="12"
                icon={Clock}
              />
              <MetricCard
                title="Rejected Loans"
                value="3"
                icon={XCircle}
              />
              <MetricCard
                title="Avg Loan Amount"
                value="¥70,000"
                icon={TrendingUp}
              />
              <MetricCard
                title="Total Loans"
                value="82"
                icon={Scale}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
