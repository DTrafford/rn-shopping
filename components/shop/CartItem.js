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
import Card from "../../components/UI/Card";

const CartItem = (props) => {
  return (
    <Card style={styles.cartItem}>
      <View style={styles.itemData}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.item.imageUrl }}
            style={styles.thumbnail}
          />
        </View>
        <Text style={styles.title}>
          {props.item.title.length < 9
            ? props.item.title
            : props.item.title.substring(0, 8).concat("...")}
        </Text>
        <Text style={styles.details}>
          {props.item.quantity}
          {" x "}
        </Text>
        <Text style={styles.details}>{props.item.price}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>{props.item.sum}</Text>
        {!props.viewOnly ? (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              color="red"
              size={23}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </Card>
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
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    height: 80,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: "100%",
    width: "30%",
    marginRight: 5,
  },
  thumbnail: {
    height: "100%",
    width: "90%",
    resizeMode: "contain",
  },
  details: {
    fontFamily: "open-sans",
    color: "#454545",
    fontSize: 16,
    marginRight: 3,
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
