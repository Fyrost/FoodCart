import React from "react";
import { View } from "react-native";
import { Button, Icon, Avatar } from "react-native-elements";
import {ConfirmAlert} from "../../components/Alerts";
import {
  createBottomTabNavigator,
  createStackNavigator,
  HeaderBackButton
} from "react-navigation";
import PartnerPendingScreen from "../../screens/admin/partner/PartnerPendingScreen";
import PartnerApprovedScreen from "../../screens/admin/partner/PartnerApprovedScreen";
import PartnerRejectedScreen from "../../screens/admin/partner/PartnerRejectedScreen";
import PartnerViewScreen from "../../screens/admin/partner/PartnerViewScreen";

const partnership = createBottomTabNavigator(
  {
    Pending: {
      screen: PartnerPendingScreen,
      navigationOptions: {
        headerTitle: "Pending Parnership",
        tabBarLabel: "Pending",
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"user"} type={"font-awesome"} color={tintColor} size={20} />
        )
      }
    },
    Approved: {
      screen: PartnerApprovedScreen,
      navigationOptions: {
        headerTitle: "Approved Parnership",
        tabBarLabel: "Approved",
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"user-plus"} type={"font-awesome"} color={tintColor} size={20} />
        )
      }
    },
    Rejected: {
      screen: PartnerRejectedScreen,
      navigationOptions: {
        headerTitle: "Rejected Parnership",
        tabBarLabel: "Rejected",
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"user-times"} type={"font-awesome"} color={tintColor} size={20} />
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
  }
);

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
  partnership: {
    screen: partnership,
    navigationOptions: {
      title: "Partnership Application"
    }
  },
  partnerView: {
    screen: PartnerViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Application Details",
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
