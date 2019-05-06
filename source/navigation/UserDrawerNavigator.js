import React from "react";
import { Icon } from "react-native-elements";
import {
  createDrawerNavigator,
  createStackNavigator,
  HeaderBackButton
} from "react-navigation";

import HomeScreen from "../screens/user/HomeScreen";
import RestoStackNavigator from "./user/RestoStackNavigator";
import CartStackNavigator from "./user/CartStackNavigator";
import OrderStackNavigator from "./user/OrderStackNavigator";
import DrawerLayout from "../components/DrawerLayout";
import ProfileStackNavigator from "./ProfileStackNavigator";
import FavoriteListScreen from "../screens/user/FavoriteListScreen";
import RestoMenuScreen from "../screens/user/Restaurant/RestoMenuScreen";
const UserDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name={"home"} type={"material"} color={tintColor} />
        )
      }
    },
    Resto: {
      screen: RestoStackNavigator,
      navigationOptions: {
        drawerLabel: "Restaurant",
        drawerIcon: ({ tintColor }) => (
          <Icon name={"store"} type={"material"} color={tintColor} />
        )
      }
    },
    Order: {
      screen: OrderStackNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name={"history"} type={"FontAwesome"} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: DrawerLayout,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export default createStackNavigator(
  {
    UserDrawer,
    Cart: {
      screen: CartStackNavigator
    },
    Profile: {
      screen: ProfileStackNavigator
    },
    Favorite: {
      screen: createStackNavigator(
        { FavoriteListScreen },
        {
          defaultNavigationOptions: ({ navigation }) => ({
            title: "Favorite",
            headerTintColor: "#fff",
            headerLeft: (
              <HeaderBackButton
                tintColor={"white"}
                onPress={() => navigation.dismiss()}
              />
            ),
            headerStyle: {
              backgroundColor: "#11CDEF"
            }
          })
        }
      )
    },
    RestoMenu: {
      screen: createStackNavigator(
        { RestoMenuScreen },
        {
          defaultNavigationOptions: ({ navigation }) => ({
            title: "Menu",
            headerTintColor: "#fff",
            headerLeft: (
              <HeaderBackButton
                tintColor={"white"}
                onPress={() => navigation.dismiss()}
              />
            ),
            headerStyle: {
              backgroundColor: "#11CDEF"
            }
          })
        }
      )
    }
  },

  {
    mode: "modal",
    headerMode: "none"
  }
);
