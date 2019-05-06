import React from "react";
import { Avatar } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import RestoMenuSales from '../../screens/owner/sales/RestoMenuSales'

export default createStackNavigator({
  RestoMenuSales: {
    screen: RestoMenuSales,
    navigationOptions: ({navigation}) =>({
      title: "Menu Sales",
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
    })
  },
},
{
  mode:'modal'
})