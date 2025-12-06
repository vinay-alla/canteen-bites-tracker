import { Snack } from '@/types/snack';

export const initialSnacks: Snack[] = [
  // Veg items
  { id: '1', name: 'Samosa', price: 15, emoji: '🥟', category: 'veg', status: 'available' },
  { id: '2', name: 'Vada Pav', price: 20, emoji: '🍔', category: 'veg', status: 'available' },
  { id: '3', name: 'Pav Bhaji', price: 50, emoji: '🍛', category: 'veg', status: 'low' },
  { id: '4', name: 'Idli', price: 30, emoji: '🥮', category: 'veg', status: 'available' },
  { id: '5', name: 'Dosa', price: 45, emoji: '🫓', category: 'veg', status: 'available' },
  { id: '6', name: 'Poha', price: 25, emoji: '🍚', category: 'veg', status: 'out' },
  { id: '7', name: 'Sandwich', price: 35, emoji: '🥪', category: 'veg', status: 'available' },
  { id: '8', name: 'Maggi', price: 30, emoji: '🍜', category: 'veg', status: 'available' },
  
  // Non-veg items
  { id: '9', name: 'Chicken Roll', price: 60, emoji: '🌯', category: 'nonveg', status: 'available' },
  { id: '10', name: 'Egg Puff', price: 25, emoji: '🥚', category: 'nonveg', status: 'low' },
  { id: '11', name: 'Chicken Momos', price: 50, emoji: '🥟', category: 'nonveg', status: 'available' },
  { id: '12', name: 'Omelette', price: 20, emoji: '🍳', category: 'nonveg', status: 'available' },
  
  // Meals
  { id: '13', name: 'Veg Thali', price: 80, emoji: '🍱', category: 'meals', status: 'available' },
  { id: '14', name: 'Chicken Biryani', price: 120, emoji: '🍛', category: 'meals', status: 'available' },
  { id: '15', name: 'Veg Fried Rice', price: 60, emoji: '🍚', category: 'meals', status: 'low' },
  { id: '16', name: 'Chicken Curry Rice', price: 90, emoji: '🍲', category: 'meals', status: 'out' },
];
