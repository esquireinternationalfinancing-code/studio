import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

export function ReportGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Data Analysis Tool</CardTitle>
        <CardDescription>
          Generate insightful reports from your dashboard data using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-background/50">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="mb-4 text-sm text-muted-foreground max-w-sm">
            Unlock deeper insights. Use our AI-powered tool to analyze trends, find correlations, and generate comprehensive reports automatically.
          </p>
          <Button>
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
