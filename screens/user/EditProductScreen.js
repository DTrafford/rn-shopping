import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

const EditProductScreen = (props) => {
  const id = props.navigation.getParam("id");
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === id)
  );

  const [title, setTitle] = useState(
    selectedProduct ? selectedProduct.title : ""
  );
  const [imageUrl, setImageUrl] = useState(
    selectedProduct ? selectedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    const newProduct = {
      title: title,
      imageUrl: imageUrl,
      price: +price,
      description: description,
    };
    if (selectedProduct) {
      dispatch(productActions.updateProduct(id, newProduct));
    } else {
      dispatch(productActions.createProduct(newProduct));
    }
  }, [dispatch, id, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
            />
          </View>
          {!selectedProduct ? (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
          ) : null}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunc = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("id")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
          onPress={() => {
            submitFunc();
            navData.navigation.navigate("UserProducts");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // elevation: 5,
    // borderRadius: 10,
    // backgroundColor: "white",
    // overflow: "hidden",
    // padding: 10,
  },
  formControl: {
    // flexDirection: "row",
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 10,
    marginRight: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flex: 1,
  },
});
