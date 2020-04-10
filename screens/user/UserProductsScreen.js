import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import Product from "../../components/shop/Product";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/colors";

const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={userProducts}
      renderItem={(itemData) => (
        <Product item={itemData.item} onSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="EDIT"
            // onPress={() => viewDetailHandler(itemData.item)}
          />
          <Button
            color={Colors.primary}
            title="DELETE"
            onPress={() =>
              dispatch(productActions.deleteProduct(itemData.item.id))
            }
          />
        </Product>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="cart"
    //       iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
    //       onPress={() => navData.navigation.navigate("Cart")}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
