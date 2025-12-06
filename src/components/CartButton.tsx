import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
}

export const CartButton = ({ itemCount, totalPrice, onClick }: CartButtonProps) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto',
        'bg-primary text-primary-foreground rounded-2xl shadow-lg',
        'flex items-center justify-between md:justify-center gap-4 p-4',
        'hover:bg-accent transition-all duration-200 hover:shadow-xl',
        'z-30 animate-slide-up'
      )}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-card text-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        </div>
        <span className="font-bold">{itemCount} item{itemCount > 1 ? 's' : ''}</span>
      </div>
      <div className="h-6 w-px bg-primary-foreground/30 hidden md:block" />
      <span className="font-extrabold text-lg">₹{totalPrice}</span>
      <span className="hidden md:inline font-semibold">View Cart →</span>
    </button>
  );
};
