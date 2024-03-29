import React from "react";
import { View } from "react-native";
import { Button, Avatar, Icon } from "react-native-elements";
import _ from "lodash";
import { ConfirmAlert } from "../../../components/Alerts";
import { getNotifCart } from "../../../actions";
import BadgeCounter from "../../../components/BadgeCounter";
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

export const leftDrawerButtonBlue = ({ navigation }) => (
  <Avatar
    containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    icon={{ name: "bars", type: "font-awesome", color: "#11CDEF" }}
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

export const rightFilterButton = ({ navigation }) => (
  <Avatar
    rounded
    containerStyle={{ backgroundColor: "#afafaf" }}
    icon={{ name: "tune", type: "material" }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    size={45}
    containerStyle={{ marginRight: 5 }}
    onPress={navigation.getParam("toggleFilter")}
  />
) 

export const rightSearchButtonBlue = ({ navigation }) => (
  <Avatar
    rounded
    containerStyle={{ backgroundColor: "transparent" }}
    icon={{ name: "search", type: "font-awesome", color: "#11CDEF" }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    size={45}
    containerStyle={{ marginRight: 5 }}
    onPress={navigation.getParam("toggleSearch")}
  />
);
////CUSTOMER CART////
export const rightCartButton = ({ navigation }) =>
  navigation.getParam("isCartNotEmpty") && (
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
        onPress={() => navigation.navigate("UserCheckout")}
        containerStyle={{ marginRight: 5 }}
      />
    </View>
  );
export const rightCheckoutButton = ({ navigation }) => (
  <Button
    title="Place order"
    onPress={() =>
      ConfirmAlert(
        "Place Order",
        "Are you sure",
        navigation.getParam("checkoutButton")
      )
    }
    containerStyle={{ marginRight: 5 }}
  />
);
////CUSTOMER RESTO////
export const rightRestoCartButton = ({ navigation }) => (
  <View>
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#afafaf" }}
      icon={{ name: "shopping-cart", type: "font-awesome" }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      size={40}
      onPress={() => navigation.navigate("UserCart")}
      containerStyle={{ marginRight: 5 }}
    />
    <BadgeCounter
      promise={getNotifCart}
      badgeStyle={null}
      containerStyle={{ position: "absolute" }}
    />
  </View>
);
export const rightRestoCartButtonBlue = ({ navigation }) => (
  <View>
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#afafaf" }}
      icon={{ name: "shopping-cart", type: "font-awesome" , color: "#11CDEF"}}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      size={40}
      onPress={() => navigation.navigate("UserCart")}
      containerStyle={{ marginRight: 5 }}
    />
    <BadgeCounter
      promise={getNotifCart}
      badgeStyle={null}
      containerStyle={{ position: "absolute" }}
    />
  </View>
);

export const rightMenuButton = ({ navigation }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    {rightRestoCartButton({ navigation })}
    {rightSearchButton({ navigation })}
    {rightFilterButton({ navigation })}
  </View>
);
