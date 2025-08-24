import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { LoanStatusChart } from "@/components/dashboard/loan-status-chart";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ReportGenerator } from "@/components/dashboard/report-generator";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$45,231.89"
            icon={DollarSign}
            description="+20.1% from last month"
          />
          <MetricCard
            title="Subscriptions"
            value="+2350"
            icon={Users}
            description="+180.1% from last month"
          />
          <MetricCard
            title="Sales"
            value="+12,234"
            icon={CreditCard}
            description="+19% from last month"
          />
          <MetricCard
            title="Active Now"
            value="+573"
            icon={Activity}
            description="+201 since last hour"
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <LoanStatusChart />
          </div>
          <div>
            <RecentSales />
          </div>
        </div>
        <div>
          <ReportGenerator />
        </div>
      </main>
    </div>
  );
}
