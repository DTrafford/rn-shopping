import * as actionTypes from "../actions/orders";
import Order from "../../models/order";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      const date = new Date();
      const newOrder = new Order(
        date.toString(),
        action.orderData.items,
        action.orderData.total,
        date
      );
      return { ...state.orders, orders: state.orders.concat(newOrder) };
  }
  return state;
};
