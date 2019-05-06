import React from "react";
import { View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { ConfirmAlert } from "../../components/Alerts";
import CartScreen from "../../screens/user/Cart/CartScreen";
import CheckoutScreen from "../../screens/user/Cart/CheckoutScreen";
export default createStackNavigator(
  {
    Cart: {
      screen: CartScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Cart",
        headerLeft: (
          <HeaderBackButton
            tintColor={"white"}
            onPress={() => navigation.dismiss()}
          />
        ),
        headerRight: (
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
        )
      })
    },
    Checkout: {
      screen: CheckoutScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Checkout",
        headerRight: (
          <Button
            title="Place order"
            onPress={navigation.getParam("orderOverlayVisible")}
            containerStyle={{ marginRight: 5 }}
          />
        )
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#11CDEF"
      }
    }
  }
);
