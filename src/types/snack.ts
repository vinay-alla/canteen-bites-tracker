export type SnackStatus = 'available' | 'low' | 'out';
export type SnackCategory = 'veg' | 'nonveg' | 'meals';

export interface Snack {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  image: string;
  category: SnackCategory;
  status: SnackStatus;
  discount?: number;
}

export interface CartItem {
  snack: Snack;
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number;
  minOrder: number;
  description: string;
}

export interface UserData {
  coins: number;
  appliedCoupon: Coupon | null;
}
