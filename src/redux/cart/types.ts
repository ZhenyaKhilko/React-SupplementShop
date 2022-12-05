export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  flavour: string;
  weight: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
