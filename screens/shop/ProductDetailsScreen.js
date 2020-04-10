import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/colors";
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import cart from "../../store/reducers/cart";

const ProductDetailsScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.imageUrl }}
          />
        </View>
        <View style={styles.actions}>
          <Button
            title="Add To Cart"
            color={Colors.primary}
            onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
          />
        </View>
        <View>
          <View style={styles.details}>
            <Text style={styles.price}>
              {selectedProduct.price.toFixed(2)}{" "}
            </Text>
            <Text style={styles.title}>{selectedProduct.title}</Text>
            <Text style={styles.description}>
              {selectedProduct.description}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};
export default ProductDetailsScreen;

const styles = StyleSheet.create({
  product: {
    flex: 1,
    height: 800,
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "35%",
    paddingVertical: 2,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    paddingHorizontal: 20,
  },
});
