import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

// outside because doesnt require props and then doesnt require useCalbback()
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formValidity: formIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  // Get Nav Param
  const id = props.navigation.getParam("id");

  // Pull product from reducer
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === id)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : "",
      image: selectedProduct ? selectedProduct.imageUrl : "",
      description: selectedProduct ? selectedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: selectedProduct ? true : false,
      image: selectedProduct ? true : false,
      description: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
    },
    isValid: selectedProduct ? true : false,
  });

  // Screen functions

  const inputChangeHandler = useCallback(
    (inputField, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: value,
        isValid: isValid,
        input: inputField,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(() => {
    if (!formState.formValidity) {
      Alert.alert("Invalid Input", "Please fix the inputs to submit", [
        { text: "Ok" },
      ]);
      return;
    }
    const newProduct = {
      title: formState.inputValues.title,
      imageUrl: formState.inputValues.image,
      price: +formState.inputValues.price,
      description: formState.inputValues.description,
    };
    if (selectedProduct) {
      dispatch(productActions.updateProduct(id, newProduct));
    } else {
      dispatch(productActions.createProduct(newProduct));
    }
    props.navigation.navigate("UserProducts");
  }, [dispatch, id, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.form}>
            <Input
              id="title"
              label="Title"
              errorText="Please enter a valid title"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={selectedProduct ? selectedProduct.title : ""}
              isValid={!!selectedProduct}
            />
            <Input
              id="image"
              label="Image"
              errorText="Please enter a valid Url"
              returnKeyType="next"
              image
              onInputChange={inputChangeHandler}
              initialValue={selectedProduct ? selectedProduct.imageUrl : ""}
              isValid={!!selectedProduct}
            />
            {!selectedProduct ? (
              <Input
                id="price"
                label="Price"
                errorText="Please enter a valid Price"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                initialValue={selectedProduct ? selectedProduct.price : ""}
                isValid={!!selectedProduct}
                required
                min={0.1}
              />
            ) : null}
            <Input
              id="description"
              label="Description"
              errorText="Please enter a valid description"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="done"
              multiline
              required
              minLength={5}
              numberOfLines={3}
              onInputChange={inputChangeHandler}
              initialValue={selectedProduct ? selectedProduct.description : ""}
              isValid={!!selectedProduct}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
            // navData.navigation.navigate("UserProducts");
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
});
