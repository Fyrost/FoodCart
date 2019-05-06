import React from 'react'
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { Avatar } from "react-native-elements"
import AdminCustomerListScreen from "../../screens/admin/customer/AdminCustomerListScreen";
import AdminCustomerViewScreen from "../../screens/admin/customer/AdminCustomerViewScreen";

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
export default createStackNavigator({
  AdminCustomerList: {
    screen: AdminCustomerListScreen,
    navigationOptions: {
      title: "Customer List"
    }
  },
  AdminCustomerView: {
    screen: AdminCustomerViewScreen,
    navigationOptions: ({navigation}) => ({
      title: "Customer Details",
      headerLeft: (
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => navigation.goBack()}
        />
      ),
    })
  }
},
{
  defaultNavigationOptions: defaultOptions
});
