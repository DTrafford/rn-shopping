import PRODUCTS from "../../data/dummy-data";
import * as actionTypes from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "d2",
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case actionTypes.UPDATE_PRODUCT:
      const userProdIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.id
      );
      const availProdIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.id
      );
      const updatedProduct = new Product(
        action.id,
        state.userProducts[userProdIndex].ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        state.userProducts[userProdIndex].price
      );
      console.log("UPDATED PRODUCT = ", updatedProduct);
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProdIndex] = updatedProduct;
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availProdIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id
        ),
      };
    default:
      return state;
  }
  return state;
};
