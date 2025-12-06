import { useState } from 'react';
import { Snack, SnackStatus, SnackCategory } from '@/types/snack';
import { X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  snacks: Snack[];
  onUpdateSnack: (id: string, updates: Partial<Snack>) => void;
  onAddSnack: (snack: Omit<Snack, 'id'>) => void;
  onDeleteSnack: (id: string) => void;
}

const statusOptions: { value: SnackStatus; label: string }[] = [
  { value: 'available', label: '✅ Available' },
  { value: 'low', label: '⚠️ Running Low' },
  { value: 'out', label: '❌ Out of Stock' },
];

const categoryOptions: { value: SnackCategory; label: string }[] = [
  { value: 'veg', label: '🥬 Veg' },
  { value: 'nonveg', label: '🍗 Non-Veg' },
  { value: 'meals', label: '🍱 Meals' },
];

export const AdminPanel = ({
  isOpen,
  onClose,
  snacks,
  onUpdateSnack,
  onAddSnack,
  onDeleteSnack,
}: AdminPanelProps) => {
  const [newSnack, setNewSnack] = useState({
    name: '',
    price: '',
    emoji: '🍴',
    category: 'veg' as SnackCategory,
  });

  const handleAddSnack = () => {
    if (!newSnack.name || !newSnack.price) return;
    onAddSnack({
      name: newSnack.name,
      price: Number(newSnack.price),
      emoji: newSnack.emoji,
      image: `https://placehold.co/400x300/f97316/white?text=${encodeURIComponent(newSnack.emoji)}`,
      category: newSnack.category,
      status: 'available',
    });
    setNewSnack({ name: '', price: '', emoji: '🍴', category: 'veg' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">🔧 Admin Panel</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Add new snack */}
        <div className="p-4 border-b border-border bg-muted/50">
          <h3 className="font-semibold mb-3 text-foreground">Add New Snack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newSnack.name}
              onChange={(e) => setNewSnack({ ...newSnack, name: e.target.value })}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <input
              type="number"
              placeholder="Price"
              value={newSnack.price}
              onChange={(e) => setNewSnack({ ...newSnack, price: e.target.value })}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Emoji"
              value={newSnack.emoji}
              onChange={(e) => setNewSnack({ ...newSnack, emoji: e.target.value })}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <select
              value={newSnack.category}
              onChange={(e) => setNewSnack({ ...newSnack, category: e.target.value as SnackCategory })}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddSnack}
            className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Snack
          </button>
        </div>

        {/* Snack list */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-semibold mb-3 text-foreground">Manage Snacks</h3>
          <div className="space-y-2">
            {snacks.map((snack) => (
              <div
                key={snack.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border',
                  snack.category === 'veg' && 'bg-veg-light border-veg/20',
                  snack.category === 'nonveg' && 'bg-nonveg-light border-nonveg/20',
                  snack.category === 'meals' && 'bg-meals-light border-meals/20'
                )}
              >
                <span className="text-2xl">{snack.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{snack.name}</p>
                  <p className="text-sm text-muted-foreground">₹{snack.price}</p>
                </div>
                <select
                  value={snack.status}
                  onChange={(e) => onUpdateSnack(snack.id, { status: e.target.value as SnackStatus })}
                  className="px-2 py-1 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onDeleteSnack(snack.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
