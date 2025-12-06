import { useState } from 'react';
import { Settings } from 'lucide-react';
import { CoinsDisplay } from './CoinsDisplay';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  lastUpdated: Date;
  coins: number;
  onOpenAdmin: () => void;
}

export const Header = ({ lastUpdated, coins, onOpenAdmin }: HeaderProps) => {
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');
  const location = useLocation();

  const handlePinSubmit = () => {
    if (pin === '1234') {
      onOpenAdmin();
      setShowPinInput(false);
      setPin('');
    } else {
      setPin('');
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold flex items-center gap-2">
              🍔 AU I Block Canteen
            </h1>
            <p className="text-primary-foreground/70 text-xs mt-0.5">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CoinsDisplay coins={coins} />
            {showPinInput ? (
              <div className="flex items-center gap-1">
                <input
                  type="password"
                  placeholder="PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                  className="w-16 px-2 py-1 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/30 focus:outline-none text-sm"
                  autoFocus
                />
                <button
                  onClick={handlePinSubmit}
                  className="px-2 py-1 bg-primary-foreground/20 rounded-lg hover:bg-primary-foreground/30 transition-colors text-sm font-semibold"
                >
                  Go
                </button>
                <button
                  onClick={() => {
                    setShowPinInput(false);
                    setPin('');
                  }}
                  className="px-1 text-primary-foreground/70 hover:text-primary-foreground text-sm"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPinInput(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
              >
                <Settings size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-1 mt-3">
          <Link
            to="/"
            className={cn(
              'px-4 py-2 rounded-t-lg font-semibold text-sm transition-colors',
              location.pathname === '/'
                ? 'bg-background text-foreground'
                : 'bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20'
            )}
          >
            🍽️ Menu
          </Link>
          <Link
            to="/cart"
            className={cn(
              'px-4 py-2 rounded-t-lg font-semibold text-sm transition-colors',
              location.pathname === '/cart'
                ? 'bg-background text-foreground'
                : 'bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20'
            )}
          >
            🛒 Cart & Coupons
          </Link>
        </div>
      </div>
    </header>
  );
};
