import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import CartItem from "./CartItem";
import Card from "../../components/UI/Card";

import Colors from "../../constants/colors";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>{props.order.total.toFixed(2)}</Text>
        <Text style={styles.date}>{props.order.readableDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={!showDetails ? "SHOW DETAILS" : "HIDE DETAILS"}
          color={Colors.primary}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
      </View>
      {showDetails ? (
        <View>
          <FlatList
            data={props.order.items}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <CartItem
                viewOnly={true}
                item={itemData.item}
                onRemove={() =>
                  dispatch(cartActions.removeFromCart(itemData.item.id))
                }
              />
            )}
          />
        </View>
      ) : null}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    padding: 10,
    margin: 20,
    overflow: "hidden",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
