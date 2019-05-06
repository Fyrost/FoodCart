import React from 'react'
import { Avatar, Button } from 'react-native-elements'
import { createStackNavigator,HeaderBackButton } from "react-navigation";

import OrderListScreen from "../../screens/owner/order/OrderListScreen";
import OrderViewScreen from "../../screens/owner/order/OrderViewScreen";

const listOptions = {
  screen: OrderListScreen,
  navigationOptions: {
    title: "Orders"
  }
}

const viewOptions = {
  screen: OrderViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order Details",
    headerLeft: (
      <HeaderBackButton
        tintColor={"white"}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <Button
        title={'Report'}
        buttonStyle={{ backgroundColor: 'orange', marginRight: 10 }}       
      />
    ),
  })
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

export default createStackNavigator(
  {
    OrderList: listOptions,
    OrderDetail: viewOptions
  },
  {
    defaultNavigationOptions: defaultOptions
  }
);