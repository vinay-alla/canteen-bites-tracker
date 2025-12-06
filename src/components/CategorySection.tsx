import { Snack, SnackCategory, CartItem } from '@/types/snack';
import { SnackCard } from './SnackCard';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  category: SnackCategory;
  snacks: Snack[];
  cart: CartItem[];
  onAddToCart: (snack: Snack) => void;
  onRemoveFromCart: (snackId: string) => void;
}

const categoryStyles = {
  veg: {
    titleColor: 'text-veg',
    bgGradient: 'from-veg/10 to-transparent',
    icon: '🥬',
  },
  nonveg: {
    titleColor: 'text-nonveg',
    bgGradient: 'from-nonveg/10 to-transparent',
    icon: '🍗',
  },
  meals: {
    titleColor: 'text-meals',
    bgGradient: 'from-meals/10 to-transparent',
    icon: '🍱',
  },
};

export const CategorySection = ({
  title,
  category,
  snacks,
  cart,
  onAddToCart,
  onRemoveFromCart,
}: CategorySectionProps) => {
  const style = categoryStyles[category];
  const filteredSnacks = snacks.filter((s) => s.category === category);

  if (filteredSnacks.length === 0) return null;

  const getCartQuantity = (snackId: string) => {
    const item = cart.find((c) => c.snack.id === snackId);
    return item?.quantity || 0;
  };

  return (
    <section className={cn('mb-8 rounded-2xl p-4 bg-gradient-to-b', style.bgGradient)}>
      <h2 className={cn('text-xl font-bold mb-4 flex items-center gap-2', style.titleColor)}>
        <span>{style.icon}</span>
        {title}
        <span className="text-sm font-normal text-muted-foreground">({filteredSnacks.length})</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSnacks.map((snack) => (
          <SnackCard
            key={snack.id}
            snack={snack}
            cartQuantity={getCartQuantity(snack.id)}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))}
      </div>
    </section>
  );
};
