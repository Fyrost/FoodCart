import React from "react";
import { View } from "react-native";
import { Button, Avatar } from "react-native-elements";
import _ from "lodash";
import { ConfirmAlert } from "../../../components/Alerts";
import { HeaderBackButton } from "react-navigation";

export const leftDrawerButton = ({ navigation }) => (
  <Avatar
    containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
    size={50}
    onPress={() => navigation.openDrawer()}
  />
);

export const leftBackButton = ({ navigation }) => (
  <HeaderBackButton tintColor={"white"} onPress={() => navigation.goBack()} />
);
export const leftDismissButton = ({ navigation }) => (
  <HeaderBackButton tintColor={"white"} onPress={() => navigation.dismiss()} />
);
export const rightSearchButton = ({ navigation }) => (
  <Avatar
    rounded
    containerStyle={{ backgroundColor: "#afafaf" }}
    icon={{ name: "search", type: "font-awesome" }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    size={45}
    containerStyle={{ marginRight: 5 }}
    onPress={navigation.getParam("toggleSearch")}
  />
);
////CUSTOMER CART////
export const rightCartButton = ({ navigation }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#afafaf" }}
      icon={{ name: "remove-shopping-cart", type: "material" }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      size={48}
      onPress={() =>
        ConfirmAlert(
          "Empty Cart",
          "Are you sure",
          navigation.getParam("handleEmpty")
        )
      }
      containerStyle={{ marginRight: 5 }}
    />
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#afafaf" }}
      icon={{ name: "cart-arrow-down", type: "font-awesome" }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      size={48}
      onPress={() => navigation.navigate("Checkout")}
      containerStyle={{ marginRight: 5 }}
    />
  </View>
);
export const rightCheckoutButton = ({ navigation }) => (
  <Button
    title="Place order"
    onPress={()=>ConfirmAlert(
      "Empty Cart",
      "Are you sure",
      navigation.getParam("checkoutButton")
    )}
    containerStyle={{ marginRight: 5 }}
  />
);
////CUSTOMER RESTO////
export const rightRestoCartButton = ({ navigation }) => (
  <Avatar
    rounded
    containerStyle={{ backgroundColor: "#afafaf" }}
    icon={{ name: "shopping-cart", type: "font-awesome" }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    size={40}
    onPress={() => navigation.navigate("Cart")}
    containerStyle={{ marginRight: 5 }}
  />
);
