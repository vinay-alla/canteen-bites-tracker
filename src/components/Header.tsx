import { useState } from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  lastUpdated: Date;
  onOpenAdmin: () => void;
}

export const Header = ({ lastUpdated, onOpenAdmin }: HeaderProps) => {
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');

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
    <header className="sticky top-0 z-20 bg-primary text-primary-foreground py-4 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
              🍔 AU I Block Canteen
            </h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="relative">
            {showPinInput ? (
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  placeholder="PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                  className="w-20 px-2 py-1 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/30 focus:outline-none focus:border-primary-foreground"
                  autoFocus
                />
                <button
                  onClick={handlePinSubmit}
                  className="px-3 py-1 bg-primary-foreground/20 rounded-lg hover:bg-primary-foreground/30 transition-colors font-semibold"
                >
                  Go
                </button>
                <button
                  onClick={() => {
                    setShowPinInput(false);
                    setPin('');
                  }}
                  className="px-2 py-1 text-primary-foreground/70 hover:text-primary-foreground"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPinInput(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
              >
                <Settings size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
