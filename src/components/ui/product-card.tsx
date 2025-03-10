import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onClick?: () => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  onClick,
  className,
}: ProductCardProps) {
  return (
    <Card
      key={id}
      className={cn(
        "overflow-hidden cursor-pointer hover:shadow-md transition-shadow",
        className,
      )}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        <p className="text-indigo-600 font-bold mt-1">${price.toFixed(2)}</p>
      </div>
    </Card>
  );
}
