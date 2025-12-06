import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoinsDisplayProps {
  coins: number;
  className?: string;
}

export const CoinsDisplay = ({ coins, className }: CoinsDisplayProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 bg-coins-light px-3 py-1.5 rounded-full border border-coins/30',
        className
      )}
    >
      <Coins className="text-coins" size={18} />
      <span className="font-bold text-foreground">{coins}</span>
    </div>
  );
};
