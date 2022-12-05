import { CartItem } from '../redux/cart/types';

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = items.reduce((sum: number, obj: CartItem) => obj.price * obj.count + sum, 0);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
