import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Icon, Avatar } from 'react-native-elements'
import TagPendingScreen from "../../screens/admin/tag/TagPendingScreen";
import TagApprovedScreen from "../../screens/admin/tag/TagApprovedScreen";
import TagRejectedScreen from "../../screens/admin/tag/TagRejectedScreen";

const TagPendingStack = createStackNavigator({
  Pending: {
    screen: TagPendingScreen,
    navigationOptions: ({ navigation }) => ({
      title:"Pending Tag",
      ...defaultOptions(({navigation}))
    })
  }
})

TagPendingStack.navigationOptions = {
  tabBarLabel: "Pending",
  tabBarIcon: ({ tintColor }) => (
    <Icon name={"tag"} type={"material-community"} color={tintColor} size={20} />
  )
}

const TagApprovedStack = createStackNavigator({
  Approved: {
    screen: TagApprovedScreen,
    navigationOptions: ({ navigation }) => ({
      title:"Approved Tag",
      ...defaultOptions(({navigation}))
    })
  }
})

TagApprovedStack.navigationOptions = {
  tabBarLabel: "Approved",
  tabBarIcon: ({ tintColor }) => (
    <Icon name={"tag-plus"} type={"material-community"} color={tintColor} size={20} />
  )
}

const TagRejectedStack = createStackNavigator({
  Rejected: {
    screen: TagRejectedScreen,
    navigationOptions: ({ navigation }) => ({
      title:"Rejected Tag",
      ...defaultOptions(({navigation}))
    })
  }
})

TagRejectedStack.navigationOptions = {
  tabBarLabel: "Rejected",
  tabBarIcon: ({ tintColor }) => (
    <Icon name={"tag-remove"} type={"material-community"} color={tintColor} size={20} />
  )
}

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

export default createBottomTabNavigator(
  {
    TagPendingStack,
    TagApprovedStack,
    TagRejectedStack
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
