import React from "react";
import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import Product from "../../components/shop/Product";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/colors";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { id: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Delete Item", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={userProducts}
      renderItem={(itemData) => (
        <Product
          item={itemData.item}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="EDIT"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="DELETE"
            onPress={() => deleteHandler(itemData.item.id)}
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
