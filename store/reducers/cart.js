import * as actionTypes from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const product = action.product;
      const price = product.price;
      const title = product.title;
      let cartItem;

      if (state.items[product.id]) {
        // already have the item in the cart
        cartItem = new CartItem(
          state.items[product.id].quantity + 1,
          price,
          title,
          state.items[product.id].sum + price
        );
      } else {
        cartItem = new CartItem(1, price, title, price);
      }
      // console.log({ [product.id]: cartItem });
      return {
        ...state,
        items: { ...state.items, [product.id]: cartItem },
        total: state.total + price,
      };
  }
  return state;
};
