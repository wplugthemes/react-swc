import { Package } from "lucide-react";
import { InventoryAlert as InventoryAlertType } from "@/lib/types";

interface InventoryAlertProps {
  alert: InventoryAlertType;
}

export function InventoryAlert({ alert }: InventoryAlertProps) {
  return (
    <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className={`p-2 rounded-full ${getStatusColor(alert.status)}`}>
        <Package className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{alert.product}</h3>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">SKU: {alert.sku}</span>
          <span className={`text-sm font-medium ${getTextColor(alert.status)}`}>
            {getStatusText(alert.status, alert.stock)}
          </span>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "low":
      return "bg-amber-500";
    case "critical":
      return "bg-orange-500";
    case "out":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

function getTextColor(status: string) {
  switch (status) {
    case "low":
      return "text-amber-600";
    case "critical":
      return "text-orange-600";
    case "out":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

function getStatusText(status: string, stock: number) {
  switch (status) {
    case "low":
      return `Low stock (${stock})`;
    case "critical":
      return `Critical (${stock})`;
    case "out":
      return "Out of stock";
    default:
      return `${stock} in stock`;
  }
}
