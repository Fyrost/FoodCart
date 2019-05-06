import React from 'react'
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { View } from 'react-native'
import { Avatar, Button, Icon } from "react-native-elements";
import AdminReportListScreen from "../../screens/admin/report/AdminReportListScreen";
import AdminReportViewScreen from "../../screens/admin/report/AdminReportViewScreen";

export default createStackNavigator(
  {
    AdminReportList: {
      screen: AdminReportListScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Reported User",
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
    AdminReportView: {
      screen: AdminReportViewScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Report Details",
        headerLeft: (
          <HeaderBackButton
            tintColor={"white"}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              rounded
              containerStyle={{ backgroundColor: "transparent" }}
              icon={{ name: "eye", type: "font-awesome" }}
              overlayContainerStyle={{ backgroundColor: "orange" }}
              size={40}
              containerStyle={{ marginRight: 5 }}
            />
            <Avatar
              rounded
              containerStyle={{ backgroundColor: "transparent" }}
              icon={{ name: "close", type: "font-awesome" }}
              overlayContainerStyle={{ backgroundColor: "#EF1B17" }}
              size={40}
              containerStyle={{ marginRight: 5 }}
            />
          </View>
        )
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#11CDEF"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
