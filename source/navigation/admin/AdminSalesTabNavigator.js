import React from "react";
import { View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { ConfirmAlert } from "../../components/Alerts";
import _ from "lodash";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AdminMenuSales from "../../screens/admin/sales/AdminMenuSales";
import AdminRestoSalesScreen from "../../screens/admin/sales/AdminRestoSalesScreen";
import styles from "../../screens/styles";

const defaultOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: "#11CDEF"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  },
  headerLeft: (
    <Avatar
      containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
      size={50}
      onPress={() => navigation.openDrawer()}
    />
  )
});

const stackOptions = ({ navigation }) => ({
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
      icon={{ name: "search", type: "font-awesome" }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      size={45}
      containerStyle={{ marginRight: 5 }}
      onPress={navigation.getParam("toggleSearch")}
    />
  )
});

export default createBottomTabNavigator({
  RestoSales: {
    screen: createStackNavigator(
      {
        RestoSales: {
          screen: AdminRestoSalesScreen,
          navigationOptions: ({ navigation }) => ({
            title: "Restaurant Sales",
            ...stackOptions({navigation})
          })
        }
      },
      {
        defaultNavigationOptions: defaultOptions
      }
    ),
    navigationOptions: {
      title: "Restaurant Sales",
      tabBarLabel: "Restaurant",
      tabBarIcon: ({ tintColor }) => (
        <Icon 
          name={"store"} 
          type={"material"} 
          color={tintColor} size={20} 
        />
      )
    }
  },
  MenuSales: {
    screen: createStackNavigator(
      {
        MenuSales: {
          screen: AdminMenuSales,
          navigationOptions: ({ navigation }) => ({
            title: "Menu Sales",
            ...stackOptions({navigation})
          })
        }
      },
      {
        defaultNavigationOptions: defaultOptions
      }
    ),
    navigationOptions: {
      title: "Menu Sales",
      tabBarLabel: "Menu",
      tabBarIcon: ({ tintColor }) => (
        <Icon 
          name={"silverware-fork-knife"} 
          type={"material-community"} 
          color={tintColor} size={20} 
        />
      )
    }    
  }
},
{
  tabBarOptions:{
    activeTintColor: "#11CDEF",
    inactiveTintColor: "#484749",
    style: {
      backgroundColor: "#FFF"
    },
    labelStyle: {
      marginTop: 10
    },
    tabStyle: {
      marginTop: 13
  }
},
animationEnabled: true
});
