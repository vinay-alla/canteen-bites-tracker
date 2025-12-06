export type SnackStatus = 'available' | 'low' | 'out';
export type SnackCategory = 'veg' | 'nonveg' | 'meals';

export interface Snack {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: SnackCategory;
  status: SnackStatus;
}

export interface CartItem {
  snack: Snack;
  quantity: number;
}
