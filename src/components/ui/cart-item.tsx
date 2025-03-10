import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <li className="flex gap-3">
      <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-sm">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => onUpdateQuantity(id, quantity - 1)}
        >
          <Minus className="h-4 w-4 text-gray-500" />
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => onUpdateQuantity(id, quantity + 1)}
        >
          <Plus className="h-4 w-4 text-gray-500" />
        </button>
        <button
          className="p-1 rounded-full hover:bg-gray-100 ml-1"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </li>
  );
}
