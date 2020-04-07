import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.item.productImage }}
            style={styles.thumbnail}
          />
        </View>
        <Text style={styles.title}>{props.item.productTitle}</Text>
        <Text style={styles.details}>
          {props.item.quantity}
          {" x "}
        </Text>
        <Text style={styles.details}>{props.item.productPrice}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>{props.item.sum}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            color="red"
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 10,
    height: 80,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: "90%",
    width: "20%",
    marginRight: 5,
  },
  thumbnail: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  details: {
    fontFamily: "open-sans",
    color: "#454545",
    fontSize: 16,
    marginRight: 5,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginRight: 5,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: { marginLeft: 20 },
});
