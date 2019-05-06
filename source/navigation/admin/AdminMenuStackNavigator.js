import React from 'react'
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { Avatar } from "react-native-elements"
import AdminMenuListScreen from "../../screens/admin/menu/AdminMenuListScreen";
import AdminMenuViewScreen from "../../screens/admin/menu/AdminMenuViewScreen";

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
  AdminMenuList: {
    screen: AdminMenuListScreen,
    navigationOptions: {
      title: "Menu List"
    }
  },
  AdminMenuView: {
    screen: AdminMenuViewScreen,
    navigationOptions: ({navigation}) =>({
      title: "Menu Details",
      headerLeft: (
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => navigation.goBack()}
        />
      )
    }),
    
  }
},
{
  defaultNavigationOptions: defaultOptions
});
