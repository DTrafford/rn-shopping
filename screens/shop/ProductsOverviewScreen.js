import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import Product from "../../components/shop/Product";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/colors";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const viewDetailHandler = (item) => {
    props.navigation.navigate("ProductDetail", {
      productId: item.id,
      productTitle: item.title,
    });
  };
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={(itemData) => (
        <Product
          item={itemData.item}
          onSelect={() => viewDetailHandler(itemData.item)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => viewDetailHandler(itemData.item)}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </Product>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
