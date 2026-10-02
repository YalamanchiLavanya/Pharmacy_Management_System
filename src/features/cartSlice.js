import { createSlice } from "@reduxjs/toolkit";

const savedCart =
  JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",

  initialState: savedCart,

  reducers: {

    addToCart: (state, action) => {

      const existingItem = state.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.push({
          ...action.payload,
          quantity: 1
        });

      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state)
      );
    },

    removeFromCart: (state, action) => {

      const newCart = state.filter(
        item => item.id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(newCart)
      );

      return newCart;
    },

    increaseQuantity: (state, action) => {

      const item = state.find(
        item => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state)
      );
    },

    decreaseQuantity: (state, action) => {

      const item = state.find(
        item => item.id === action.payload
      );

      if (!item) {
        return state;
      }

      if (item.quantity > 1) {

        item.quantity -= 1;

      } else {

        const newCart = state.filter(
          item => item.id !== action.payload
        );

        localStorage.setItem(
          "cart",
          JSON.stringify(newCart)
        );

        return newCart;
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state)
      );
    },

    clearCart: () => {

      localStorage.removeItem("cart");

      return [];
    }

  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;