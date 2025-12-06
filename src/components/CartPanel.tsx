import { CartItem } from '@/types/snack';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartPanelProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (snack: CartItem['snack']) => void;
  onRemoveItem: (snackId: string) => void;
  onClearCart: () => void;
}

export const CartPanel = ({
  items,
  isOpen,
  onClose,
  onAddItem,
  onRemoveItem,
  onClearCart,
}: CartPanelProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.snack.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-card border-t-2 border-cart-border rounded-t-3xl z-50 transition-transform duration-300 max-h-[80vh] overflow-hidden flex flex-col',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-primary" size={24} />
            <h2 className="font-bold text-xl text-foreground">Your Cart</h2>
            <span className="bg-primary text-primary-foreground text-sm font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto text-muted-foreground mb-3" size={48} />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-muted-foreground text-sm">Add some delicious snacks!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.snack.id}
                  className="flex items-center gap-3 bg-cart-bg rounded-xl p-3 animate-slide-up"
                >
                  <span className="text-3xl">{item.snack.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.snack.name}</h3>
                    <p className="text-primary font-bold">₹{item.snack.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveItem(item.snack.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-6 text-center text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => onAddItem(item.snack)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-bold text-foreground min-w-[60px] text-right">
                    ₹{item.snack.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={onClearCart}
                className="flex items-center gap-1 text-destructive hover:text-destructive/80 font-medium text-sm"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
              <div className="text-right">
                <p className="text-muted-foreground text-sm">Total Amount</p>
                <p className="text-2xl font-extrabold text-primary">₹{totalPrice}</p>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-accent transition-colors text-lg">
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};
