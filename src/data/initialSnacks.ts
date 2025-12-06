import { Snack, Coupon } from '@/types/snack';

export const initialSnacks: Snack[] = [
  // Veg items
  { id: '1', name: 'Samosa', price: 15, emoji: '🥟', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', category: 'veg', status: 'available' },
  { id: '2', name: 'Vada Pav', price: 20, emoji: '🍔', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', category: 'veg', status: 'available', discount: 10, originalPrice: 22 },
  { id: '3', name: 'Pav Bhaji', price: 50, emoji: '🍛', image: 'https://images.unsplash.com/photo-1626132647523-66c397a0d1ee?w=400&h=300&fit=crop', category: 'veg', status: 'low' },
  { id: '4', name: 'Idli', price: 30, emoji: '🥮', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop', category: 'veg', status: 'available' },
  { id: '5', name: 'Dosa', price: 45, originalPrice: 55, discount: 18, emoji: '🫓', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop', category: 'veg', status: 'available' },
  { id: '6', name: 'Poha', price: 25, emoji: '🍚', image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop', category: 'veg', status: 'out' },
  { id: '7', name: 'Sandwich', price: 35, emoji: '🥪', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', category: 'veg', status: 'available' },
  { id: '8', name: 'Maggi', price: 30, emoji: '🍜', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop', category: 'veg', status: 'available', discount: 15, originalPrice: 35 },
  
  // Non-veg items
  { id: '9', name: 'Chicken Roll', price: 60, emoji: '🌯', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', category: 'nonveg', status: 'available' },
  { id: '10', name: 'Egg Puff', price: 25, emoji: '🥚', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop', category: 'nonveg', status: 'low', discount: 20, originalPrice: 31 },
  { id: '11', name: 'Chicken Momos', price: 50, emoji: '🥟', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop', category: 'nonveg', status: 'available' },
  { id: '12', name: 'Omelette', price: 20, emoji: '🍳', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop', category: 'nonveg', status: 'available' },
  
  // Meals
  { id: '13', name: 'Veg Thali', price: 80, emoji: '🍱', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', category: 'meals', status: 'available', discount: 12, originalPrice: 91 },
  { id: '14', name: 'Chicken Biryani', price: 120, emoji: '🍛', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', category: 'meals', status: 'available' },
  { id: '15', name: 'Veg Fried Rice', price: 60, emoji: '🍚', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', category: 'meals', status: 'low' },
  { id: '16', name: 'Chicken Curry Rice', price: 90, emoji: '🍲', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', category: 'meals', status: 'out' },
];

export const availableCoupons: Coupon[] = [
  { code: 'FIRST50', discount: 50, minOrder: 100, description: '₹50 off on orders above ₹100' },
  { code: 'SNACK20', discount: 20, minOrder: 50, description: '₹20 off on orders above ₹50' },
  { code: 'MEAL10', discount: 10, minOrder: 0, description: 'Flat ₹10 off on any order' },
];
