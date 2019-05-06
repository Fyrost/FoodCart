import React from 'react'
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { Avatar } from 'react-native-elements'
import AdminRestoListScreen from "../../screens/admin/resto/AdminRestoListScreen";


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
  AdminRestoList: {
    screen: AdminRestoListScreen,
    navigationOptions: {
      title: "Restaurant List"
    }
  },
},
{
  defaultNavigationOptions: defaultOptions
});
