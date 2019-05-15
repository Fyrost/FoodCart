import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  CategoryNavigator,
  MenuNavigator,
  OrderNavigator,
  SalesNavigator,
  ReportNavigator
} from "./components";
import {
  leftBackButton,
  rightMenuDeleteButton,
  rightOrderButton
} from "./navOptions/navButtons";
import { headerStyles } from "./navOptions/navStyles";
import {
  OrderIcon,
  MenuIcon,
  CategoryIcon,
  SalesIcon,
  ReportIcon,
  LogIcon
} from "./navOptions/navIcons";
import { getNotifOrders } from "../../actions";
import BadgeCounter from "../../components/BadgeCounter";
// import OwnerScreen from "../screens/owner/OwnerScreen";
import ProfileStackNavigator from "../ProfileStackNavigator";
import MenuViewScreen from "../../screens/owner/menu/MenuViewScreen";
import OrderViewScreen from "../../screens/owner/order/OrderViewScreen";
import OwnerLogListScreen from "../../screens/owner/log/OwnerLogListScreen";
import DrawerLayout from "../../components/DrawerLayout";

const Order = {
  screen: OrderNavigator,
  navigationOptions: {
    drawerLabel: "Order",
    drawerIcon: ({ tintColor }) => OrderIcon({ tintColor }),
    drawerLabel: (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text h5 style={{ margin: 16, fontWeight: "bold" }}>
          Orders
        </Text>
        <BadgeCounter promise={getNotifOrders} />
      </View>
    )
  }
};

const Menu = {
  screen: MenuNavigator,
  navigationOptions: {
    drawerLabel: "Restaurant Menu",
    drawerIcon: ({ tintColor }) => MenuIcon({ tintColor })
  }
};

const Category = {
  screen: CategoryNavigator,
  navigationOptions: {
    drawerLabel: "Menu Category",
    drawerIcon: ({ tintColor }) => CategoryIcon({ tintColor })
  }
};

const Sales = {
  screen: SalesNavigator,
  navigationOptions: {
    drawerLabel: "Sales",
    drawerIcon: ({ tintColor }) => SalesIcon({ tintColor })
  }
};

const Report = {
  screen: ReportNavigator,
  navigationOptions: {
    drawerLabel: "Report Ticket",
    drawerIcon: ({ tintColor }) => ReportIcon({ tintColor })
  }
};

// const Logs = {
//   screen: LogsNavigator,
//   navigationOptions: {
//     drawerLabel: "Activity Logs",
//     drawerIcon: ({ tintColor }) => LogIcon({ tintColor })
//   }
// };

const OwnerDrawer = createDrawerNavigator(
  {
    Order,
    Menu,
    Category,
    Sales,
    Report
    // Logs
  },
  {
    initialRouteName: "Order",
    contentComponent: DrawerLayout,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

OwnerDrawer.navigationOptions = {
  header: null
};
const Profile = {
  screen: ProfileStackNavigator,
  navigationOptions: {
    header: null
  }
};
////Modals
const OwnerMenuView = {
  screen: MenuViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu Details",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightMenuDeleteButton({ navigation })
  })
};
const OwnerOrderView = {
  screen: OrderViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order Details",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightOrderButton({ navigation })
  })
};
const OwnerLogList = {
  screen: OwnerLogListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "My Activities",
    headerLeft: leftBackButton({ navigation })
  })
};

export default createStackNavigator(
  {
    OwnerDrawer,
    Profile,
    OwnerMenuView,
    OwnerOrderView,
    OwnerLogList
  },
  {
    defaultNavigationOptions: headerStyles,
    mode: "modal"
  }
);
