export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const createProduct = (product) => {
  return { type: CREATE_PRODUCT, product: product };
};
export const updateProduct = (id, product) => {
  return { type: UPDATE_PRODUCT, id: id, product: product };
};
export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, id: id };
};
