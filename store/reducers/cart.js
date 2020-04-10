import * as actionTypes from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const product = action.product;
      const image = product.imageUrl;
      const price = product.price;
      const title = product.title;
      let cartItem;

      if (state.items[product.id]) {
        // already have the item in the cart
        cartItem = new CartItem(
          state.items[product.id].quantity + 1,
          price,
          title,
          state.items[product.id].sum + price,
          image
        );
      } else {
        cartItem = new CartItem(1, price, title, price, image);
      }
      return {
        ...state,
        items: { ...state.items, [product.id]: cartItem },
        total: state.total + price,
      };

    case actionTypes.REMOVE_FROM_CART:
      const selectedItem = state.items[action.pid];
      const currentQty = selectedItem.quantity;
      let updatedCartItems = { ...state.items };
      const updatedSum = (selectedItem.sum = selectedItem.price);

      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.price,
          selectedItem.title,
          updatedSum,
          selectedItem.image
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        total:
          state.total - selectedItem.price > 0
            ? state.total - selectedItem.price
            : 0,
      };
    case actionTypes.CLEAR_CART:
      return initialState;
    // case ADD_ORDER: {
    //   return initialState;
    // }
    case DELETE_PRODUCT:
      if (!state.items[action.id]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.id].sum;
      delete updatedItems[action.id];
      return {
        ...state,
        items: updatedItems,
        total: state.total - itemTotal > 0 ? state.total - itemTotal : 0,
      };

    default:
      return state;
  }
};
