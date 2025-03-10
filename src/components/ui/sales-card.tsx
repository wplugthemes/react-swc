import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface SalesCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: ReactNode;
}

export function SalesCard({
  title,
  value,
  trend,
  trendUp,
  icon,
}: SalesCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}
        >
          {trend}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs. last period</span>
      </div>
    </Card>
  );
}
