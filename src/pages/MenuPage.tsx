import { Snack, CartItem } from '@/types/snack';
import { SearchBar } from '@/components/SearchBar';
import { CategorySection } from '@/components/CategorySection';
import { CartButton } from '@/components/CartButton';

interface MenuPageProps {
  snacks: Snack[];
  cart: CartItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToCart: (snack: Snack) => void;
  onRemoveFromCart: (snackId: string) => void;
  onOpenCart: () => void;
}

export const MenuPage = ({
  snacks,
  cart,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}: MenuPageProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.snack.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        <CategorySection
          title="Vegetarian"
          category="veg"
          snacks={snacks}
          cart={cart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />

        <CategorySection
          title="Non-Vegetarian"
          category="nonveg"
          snacks={snacks}
          cart={cart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />

        <CategorySection
          title="Full Meals"
          category="meals"
          snacks={snacks}
          cart={cart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />

        {snacks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-muted-foreground font-medium">No snacks found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      <CartButton
        itemCount={totalItems}
        totalPrice={totalPrice}
        onClick={onOpenCart}
      />
    </div>
  );
};

export default MenuPage;
