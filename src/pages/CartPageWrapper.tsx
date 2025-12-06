import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Coupon, Snack } from '@/types/snack';
import { initialSnacks } from '@/data/initialSnacks';
import { Header } from '@/components/Header';
import { CartPage } from '@/pages/CartPage';
import { AdminPanel } from '@/components/AdminPanel';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'canteen-snacks';
const CART_STORAGE_KEY = 'canteen-cart';
const COINS_STORAGE_KEY = 'canteen-coins';
const COUPON_STORAGE_KEY = 'canteen-coupon';

const CartPageWrapper = () => {
  const navigate = useNavigate();

  const [snacks, setSnacks] = useState<Snack[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialSnacks;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem(COINS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : 100;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem(COUPON_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [usedCoins, setUsedCoins] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Persist data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snacks));
    setLastUpdated(new Date());
  }, [snacks]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

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
    setAppliedCoupon(null);
    setUsedCoins(0);
    toast({
      title: '🗑️ Cart cleared',
      description: 'All items removed from cart',
    });
  };

  const handlePlaceOrder = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.snack.price * item.quantity, 0);
    const couponDiscount = appliedCoupon ? Math.min(appliedCoupon.discount, subtotal) : 0;
    const total = Math.max(0, subtotal - couponDiscount - usedCoins);
    const earnedCoins = Math.floor(total / 10);

    // Deduct used coins and add earned coins
    setCoins((prev) => prev - usedCoins + earnedCoins);
    setCart([]);
    setAppliedCoupon(null);
    setUsedCoins(0);

    toast({
      title: '🎉 Order Placed Successfully!',
      description: `You earned ${earnedCoins} coins! Total: ₹${total}`,
    });

    navigate('/');
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
  };

  const deleteSnack = (id: string) => {
    setSnacks((prev) => prev.filter((s) => s.id !== id));
    setCart((prev) => prev.filter((item) => item.snack.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        lastUpdated={lastUpdated}
        coins={coins}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <CartPage
        cart={cart}
        coins={coins}
        appliedCoupon={appliedCoupon}
        onAddItem={addToCart}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onApplyCoupon={setAppliedCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        onPlaceOrder={handlePlaceOrder}
        onUseCoins={setUsedCoins}
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

export default CartPageWrapper;
