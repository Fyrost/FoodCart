import React from "react";
import { Avatar, Button } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import RestoListScreen from "../../screens/user/Restaurant/RestoListScreen";

export default createStackNavigator(
  {
    RestoList: {
      screen: RestoListScreen,
      navigationOptions: {
        title: "Restaurant List"
      }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#11CDEF"
      },
      headerLeft: (
        <Avatar
          containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
          overlayContainerStyle={{ backgroundColor: "transparent" }}
          icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
          size={50}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerRight: (
        <Avatar
          rounded
          containerStyle={{ backgroundColor: "#afafaf" }}
          icon={{ name: "shopping-cart", type: "font-awesome" }}
          overlayContainerStyle={{ backgroundColor: "transparent" }}
          size={40}
          onPress={() => navigation.navigate("Cart")}
          containerStyle={{ marginRight: 5 }}
        />
      )
    })
  }
);
