import { useState } from 'react';
import { CartItem, Coupon, Snack } from '@/types/snack';
import { availableCoupons } from '@/data/initialSnacks';
import { ShoppingCart, Plus, Minus, Trash2, Ticket, CheckCircle, Coins, Gift, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface CartPageProps {
  cart: CartItem[];
  coins: number;
  appliedCoupon: Coupon | null;
  onAddItem: (snack: Snack) => void;
  onRemoveItem: (snackId: string) => void;
  onClearCart: () => void;
  onApplyCoupon: (coupon: Coupon) => void;
  onRemoveCoupon: () => void;
  onPlaceOrder: () => void;
  onUseCoins: (amount: number) => void;
}

export const CartPage = ({
  cart,
  coins,
  appliedCoupon,
  onAddItem,
  onRemoveItem,
  onClearCart,
  onApplyCoupon,
  onRemoveCoupon,
  onPlaceOrder,
  onUseCoins,
}: CartPageProps) => {
  const [couponInput, setCouponInput] = useState('');
  const [useCoinsAmount, setUseCoinsAmount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.snack.price * item.quantity, 0);
  const couponDiscount = appliedCoupon ? Math.min(appliedCoupon.discount, subtotal) : 0;
  const coinsDiscount = Math.min(useCoinsAmount, coins, subtotal - couponDiscount);
  const total = Math.max(0, subtotal - couponDiscount - coinsDiscount);
  const earnedCoins = Math.floor(total / 10);

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) => c.code.toUpperCase() === couponInput.toUpperCase()
    );
    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        onApplyCoupon(coupon);
        setCouponInput('');
        toast({ title: '🎉 Coupon Applied!', description: coupon.description });
      } else {
        toast({
          title: '❌ Minimum order not met',
          description: `Add ₹${coupon.minOrder - subtotal} more to use this coupon`,
          variant: 'destructive',
        });
      }
    } else {
      toast({ title: '❌ Invalid Coupon', description: 'Please check the code', variant: 'destructive' });
    }
  };

  const handleUseCoins = () => {
    if (useCoinsAmount > 0 && useCoinsAmount <= coins) {
      onUseCoins(useCoinsAmount);
      toast({ title: '🪙 Coins Applied!', description: `₹${useCoinsAmount} discount added` });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-semibold mb-4 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <ShoppingCart className="text-primary" />
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <ShoppingCart className="mx-auto text-muted-foreground mb-4" size={64} />
            <p className="text-muted-foreground font-medium text-lg">Your cart is empty</p>
            <p className="text-muted-foreground text-sm mb-4">Add some delicious snacks!</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div
                  key={item.snack.id}
                  className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border"
                >
                  <img
                    src={item.snack.image}
                    alt={item.snack.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {item.snack.emoji} {item.snack.name}
                    </h3>
                    <p className="text-primary font-bold">₹{item.snack.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveItem(item.snack.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-6 text-center text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => onAddItem(item.snack)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-bold text-foreground min-w-[55px] text-right">
                    ₹{item.snack.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Clear cart */}
            <button
              onClick={onClearCart}
              className="flex items-center gap-1 text-destructive hover:text-destructive/80 font-medium text-sm mb-6"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>

            {/* Coupons Section */}
            <div className="bg-discount-light rounded-2xl p-4 mb-4 border border-discount/20">
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Ticket className="text-discount" size={20} />
                Coupons & Offers
              </h2>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-card rounded-xl p-3 border border-available/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-available" size={20} />
                    <div>
                      <p className="font-semibold text-available">{appliedCoupon.code}</p>
                      <p className="text-xs text-muted-foreground">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-destructive text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-discount text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="space-y-2">
                    {availableCoupons.map((coupon) => (
                      <button
                        key={coupon.code}
                        onClick={() => setCouponInput(coupon.code)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg border border-dashed transition-colors',
                          subtotal >= coupon.minOrder
                            ? 'border-discount/50 bg-card hover:border-discount'
                            : 'border-muted-foreground/30 bg-muted/50 opacity-60'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-discount">{coupon.code}</span>
                          <span className="text-xs bg-discount/20 text-discount px-2 py-0.5 rounded-full">
                            -₹{coupon.discount}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{coupon.description}</p>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Coins Section */}
            <div className="bg-coins-light rounded-2xl p-4 mb-6 border border-coins/20">
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Coins className="text-coins" size={20} />
                Use Coins
                <span className="text-sm font-normal text-muted-foreground">
                  (Available: {coins} coins = ₹{coins})
                </span>
              </h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Enter coins"
                  value={useCoinsAmount || ''}
                  onChange={(e) => setUseCoinsAmount(Math.min(Number(e.target.value), coins, subtotal - couponDiscount))}
                  max={Math.min(coins, subtotal - couponDiscount)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-coins"
                />
                <button
                  onClick={handleUseCoins}
                  disabled={useCoinsAmount <= 0}
                  className="px-4 py-2 bg-coins text-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Use
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">1 coin = ₹1 discount</p>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-2xl p-4 border border-border">
              <h2 className="font-bold text-foreground mb-3">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-available">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                {coinsDiscount > 0 && (
                  <div className="flex justify-between text-coins">
                    <span>Coins Used</span>
                    <span>-₹{coinsDiscount}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
                <div className="flex items-center gap-1 text-coins text-xs">
                  <Gift size={14} />
                  You'll earn {earnedCoins} coins on this order!
                </div>
              </div>

              <button
                onClick={onPlaceOrder}
                className="w-full mt-4 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-accent transition-colors text-lg"
              >
                Place Order - ₹{total}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
