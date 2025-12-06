import { Snack } from '@/types/snack';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SnackCardProps {
  snack: Snack;
  cartQuantity: number;
  onAddToCart: (snack: Snack) => void;
  onRemoveFromCart: (snackId: string) => void;
}

const statusConfig = {
  available: { label: 'Available', className: 'bg-available/20 text-available border-available/30' },
  low: { label: 'Running Low', className: 'bg-low/20 text-low border-low/30' },
  out: { label: 'Out of Stock', className: 'bg-out/20 text-out border-out/30' },
};

const categoryConfig = {
  veg: { className: 'bg-veg-light border-veg/20', iconColor: 'text-veg' },
  nonveg: { className: 'bg-nonveg-light border-nonveg/20', iconColor: 'text-nonveg' },
  meals: { className: 'bg-meals-light border-meals/20', iconColor: 'text-meals' },
};

export const SnackCard = ({ snack, cartQuantity, onAddToCart, onRemoveFromCart }: SnackCardProps) => {
  const status = statusConfig[snack.status];
  const category = categoryConfig[snack.category];
  const isOutOfStock = snack.status === 'out';

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg',
        category.className,
        isOutOfStock && 'opacity-60'
      )}
    >
      {/* Category indicator */}
      <div className={cn('absolute top-2 right-2 w-4 h-4 rounded border-2', {
        'border-veg bg-veg': snack.category === 'veg',
        'border-nonveg bg-nonveg': snack.category === 'nonveg',
        'border-meals bg-meals': snack.category === 'meals',
      })} />

      {/* Emoji */}
      <div className="text-4xl mb-2 animate-bounce-subtle">{snack.emoji}</div>

      {/* Name & Price */}
      <h3 className="font-bold text-foreground text-lg">{snack.name}</h3>
      <p className="text-primary font-extrabold text-xl">₹{snack.price}</p>

      {/* Status badge */}
      <span className={cn('inline-block mt-2 px-2 py-0.5 text-xs font-semibold rounded-full border', status.className)}>
        {status.label}
      </span>

      {/* Cart controls */}
      <div className="mt-3">
        {isOutOfStock ? (
          <button
            disabled
            className="w-full py-2 px-3 rounded-lg bg-muted text-muted-foreground font-semibold cursor-not-allowed"
          >
            Unavailable
          </button>
        ) : cartQuantity > 0 ? (
          <div className="flex items-center justify-center gap-3 bg-primary/10 rounded-lg py-1">
            <button
              onClick={() => onRemoveFromCart(snack.id)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-bold text-lg text-foreground w-6 text-center">{cartQuantity}</span>
            <button
              onClick={() => onAddToCart(snack)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAddToCart(snack)}
            className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
