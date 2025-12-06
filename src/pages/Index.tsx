import { useState, useEffect, useMemo } from 'react';
import { Snack, CartItem } from '@/types/snack';
import { initialSnacks } from '@/data/initialSnacks';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategorySection } from '@/components/CategorySection';
import { CartButton } from '@/components/CartButton';
import { CartPanel } from '@/components/CartPanel';
import { AdminPanel } from '@/components/AdminPanel';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'canteen-snacks';
const CART_STORAGE_KEY = 'canteen-cart';

const Index = () => {
  const [snacks, setSnacks] = useState<Snack[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialSnacks;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Persist snacks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snacks));
    setLastUpdated(new Date());
  }, [snacks]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Filtered snacks
  const filteredSnacks = useMemo(() => {
    if (!searchQuery.trim()) return snacks;
    return snacks.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [snacks, searchQuery]);

  // Cart calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.snack.price * item.quantity, 0);

  // Cart handlers
  const addToCart = (snack: Snack) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.snack.id === snack.id);
      if (existing) {
        return prev.map((item) =>
          item.snack.id === snack.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { snack, quantity: 1 }];
    });
    toast({
      title: `${snack.emoji} Added to cart`,
      description: `${snack.name} - ₹${snack.price}`,
    });
  };

  const removeFromCart = (snackId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.snack.id === snackId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.snack.id === snackId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => item.snack.id !== snackId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
    toast({
      title: '🗑️ Cart cleared',
      description: 'All items removed from cart',
    });
  };

  // Admin handlers
  const updateSnack = (id: string, updates: Partial<Snack>) => {
    setSnacks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const addSnack = (snack: Omit<Snack, 'id'>) => {
    const newSnack: Snack = {
      ...snack,
      id: Date.now().toString(),
    };
    setSnacks((prev) => [...prev, newSnack]);
    toast({
      title: '✅ Snack added',
      description: `${snack.name} has been added to the menu`,
    });
  };

  const deleteSnack = (id: string) => {
    setSnacks((prev) => prev.filter((s) => s.id !== id));
    setCart((prev) => prev.filter((item) => item.snack.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header lastUpdated={lastUpdated} onOpenAdmin={() => setIsAdminOpen(true)} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <CategorySection
          title="Vegetarian"
          category="veg"
          snacks={filteredSnacks}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />

        <CategorySection
          title="Non-Vegetarian"
          category="nonveg"
          snacks={filteredSnacks}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />

        <CategorySection
          title="Full Meals"
          category="meals"
          snacks={filteredSnacks}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />

        {filteredSnacks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-muted-foreground font-medium">No snacks found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      <CartButton
        itemCount={totalItems}
        totalPrice={totalPrice}
        onClick={() => setIsCartOpen(true)}
      />

      <CartPanel
        items={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onAddItem={addToCart}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        snacks={snacks}
        onUpdateSnack={updateSnack}
        onAddSnack={addSnack}
        onDeleteSnack={deleteSnack}
      />
    </div>
  );
};

export default Index;
