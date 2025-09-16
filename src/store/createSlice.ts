// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // 🔹 Increase quantity by 1
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity += 1;
      }
    },

    // 🔹 Decrease quantity by 1 (remove if goes to 0)
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
