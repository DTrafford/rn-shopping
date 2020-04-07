import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {
  const cartTotal = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => {
    const itemsArray = [];
    for (const key in state.cart.items) {
      itemsArray.push({
        productId: key,
        productImage: state.cart.items[key].image,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    console.log(itemsArray);
    return itemsArray;
  });

  const onRemoveHandler = () => {};

  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem item={itemData.item} onRemove={onRemoveHandler} />
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotal.toFixed(2)}</Text>
        </Text>
        <Button
          color="#3B088C"
          title="Place Order"
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
