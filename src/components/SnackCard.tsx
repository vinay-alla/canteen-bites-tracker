import { Snack } from '@/types/snack';
import { Plus, Minus, Percent } from 'lucide-react';
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
  veg: { className: 'border-veg/30', iconColor: 'bg-veg' },
  nonveg: { className: 'border-nonveg/30', iconColor: 'bg-nonveg' },
  meals: { className: 'border-meals/30', iconColor: 'bg-meals' },
};

export const SnackCard = ({ snack, cartQuantity, onAddToCart, onRemoveFromCart }: SnackCardProps) => {
  const status = statusConfig[snack.status];
  const category = categoryConfig[snack.category];
  const isOutOfStock = snack.status === 'out';

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 bg-card overflow-hidden transition-all duration-200 hover:shadow-lg group',
        category.className,
        isOutOfStock && 'opacity-60'
      )}
    >
      {/* Discount badge */}
      {snack.discount && (
        <div className="absolute top-2 left-2 z-10 bg-discount text-primary-foreground px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
          <Percent size={12} />
          {snack.discount}% OFF
        </div>
      )}

      {/* Category indicator */}
      <div className={cn('absolute top-2 right-2 z-10 w-5 h-5 rounded border-2 border-card', category.iconColor)} />

      {/* Image */}
      <div className="relative h-28 overflow-hidden">
        <img
          src={snack.image}
          alt={snack.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x300/f97316/white?text=${snack.emoji}`;
          }}
        />
        {/* Status badge overlay */}
        <span className={cn('absolute bottom-2 left-2 px-2 py-0.5 text-xs font-semibold rounded-full border backdrop-blur-sm', status.className)}>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-foreground text-sm leading-tight mb-1 flex items-center gap-1">
          <span>{snack.emoji}</span>
          {snack.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <p className="text-primary font-extrabold text-lg">₹{snack.price}</p>
          {snack.originalPrice && (
            <p className="text-muted-foreground text-sm line-through">₹{snack.originalPrice}</p>
          )}
        </div>

        {/* Cart controls */}
        {isOutOfStock ? (
          <button
            disabled
            className="w-full py-2 px-3 rounded-lg bg-muted text-muted-foreground font-semibold cursor-not-allowed text-sm"
          >
            Unavailable
          </button>
        ) : cartQuantity > 0 ? (
          <div className="flex items-center justify-center gap-3 bg-primary/10 rounded-lg py-1.5">
            <button
              onClick={() => onRemoveFromCart(snack.id)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-foreground w-5 text-center">{cartQuantity}</span>
            <button
              onClick={() => onAddToCart(snack)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAddToCart(snack)}
            className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-1 text-sm"
          >
            <Plus size={14} />
            Add
          </button>
        )}
      </div>
    </div>
  );
};
