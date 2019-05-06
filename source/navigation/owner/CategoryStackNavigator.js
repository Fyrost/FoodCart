import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import CategoryActiveScreen from "../../screens/owner/category/CategoryActiveScreen";
import CategoryArchiveScreen from "../../screens/owner/category/CategoryArchiveScreen";

const ActiveStack = createStackNavigator({
  Active: CategoryActiveScreen
});

ActiveStack.navigationOptions = {
  tabBarLabel: "Active",
  tabBarIcon: ({ tintColor }) => (
    <Icon name={"list-ul"} type={"font-awesome"} color={tintColor} size={20} />
  )
};

const ArchiveStack = createStackNavigator({
  Archive: CategoryArchiveScreen
});

ArchiveStack.navigationOptions = {
  tabBarLabel: "Deleted",
  tabBarIcon: ({ tintColor }) => (
    <Icon name={"archive"} type={"font-awesome"} color={tintColor} size={20} />
  )
};

export default createBottomTabNavigator(
  {
    ActiveStack,
    ArchiveStack
  },
  {
    tabBarOptions: {
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
  }
);
