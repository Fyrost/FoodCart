import React from "react";
import { Icon, Avatar } from "react-native-elements";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import MenuStackNavigator from "./owner/MenuStackNavigator";
import CategoryStackNavigator from "./owner/CategoryStackNavigator";
import OrderStackNavigator from "./owner/OrderStackNavigator";
import DrawerLayout from "../components/DrawerLayout";
import ProfileStackNavigator from "./ProfileStackNavigator";
import SalesStackNavigator from "./owner/SalesStackNavigator";
import OwnerScreen from "../screens/owner/OwnerScreen";
import OwnerReportListScreen from "../screens/owner/report/OwnerReportListScreen"
import AdminMenuViewScreen from "../screens/admin/menu/AdminMenuViewScreen";

const OwnerDrawer = createDrawerNavigator(
  {
    Owner: {
      screen: createStackNavigator({
        Owner:{
          screen:OwnerScreen
        }
      },{
        defaultNavigationOptions:{
          title: 'Dashboard',
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
  }
}),
navigationOptions: {
  drawerLabel: "Dashboard",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name={"monitor"}
      type={"material-community"}
      color={tintColor}
    />
  )
}
},
    Order: {
      screen: OrderStackNavigator,
      navigationOptions: {
        drawerLabel: "Order",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name={"file-cabinet"}
            type={"material-community"}
            color={tintColor}
          />
        )
      }
    },
    Menu: {
      screen: MenuStackNavigator,
      navigationOptions: {
        drawerLabel: "Restaurant Menu",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name={"silverware-fork-knife"}
            type={"material-community"}
            color={tintColor}
          />
        )
      }
    },
    Category: {
      screen: CategoryStackNavigator,
      navigationOptions: {
        drawerLabel: "Menu Category",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name={"view-grid"}
            type={"material-community"}
            color={tintColor}
          />
        )
      }
    },
    MenuSales: {
      screen: SalesStackNavigator,
      navigationOptions: {
        drawerLabel: "Sales",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name={"receipt"}
            type={"material"}
            color={tintColor}
          />
        )
      }
    },
    OwnerReport: {
      screen: createStackNavigator({
        OwnerReport:{
          screen:OwnerReportListScreen
        }
      },
      {
        defaultNavigationOptions:({ navigation }) => ({
          title:"Report Ticket",
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
      }),
      navigationOptions: {
        drawerLabel: "Report",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name={"report"}
            type={"material"}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Owner",
    contentComponent: DrawerLayout,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export default createStackNavigator(
  {
    OwnerDrawer: {
      screen: OwnerDrawer
    },
    Profile: {
      screen: ProfileStackNavigator
    },
    AdminMenuView: {
      screen: AdminMenuViewScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Menu Details",
        headerStyle: {
          backgroundColor: "#11CDEF"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        },
        headerLeft: (
          <HeaderBackButton
            tintColor={"white"}
            onPress={() => navigation.goBack()}
          />
        )
      })
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      header: null
    }
  }
);
