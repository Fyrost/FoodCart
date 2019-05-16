import React from "react";
import { View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  CustomerNavigator,
  MenuNavigator,
  PartnerNavigator,
  ReportNavigator,
  RestoNavigator,
  OrderNavigator,
  SalesNavigator,
  TagNavigator,
  LogsNavigator,
  BanNavigator,
  RequestNavigator,
  UsersNavigator
} from "./components";
import {
  leftBackButton,
  rightReportButton,
  rightSearchButton
} from "./navOptions/navButtons";
import { headerStyles } from "./navOptions/navStyles";
import {
  partnerIcon,
  tagIcon,
  restoIcon,
  menuIcon,
  customerIcon,
  userIcon,
  salesIcon,
  reportIcon,
  logIcon,
  orderIcon,
  requestIcon,
  banIcon
} from "./navOptions/navIcons";
import {
  getNotifPartner,
  getNotifTags,
  getNotifReports,
  getNotifRequests
} from "../../actions";
import BadgeCounter from "../../components/BadgeCounter";
import ProfileStackNavigator from "../ProfileStackNavigator";
import PartnerViewScreen from "../../screens/admin/partner/PartnerViewScreen";
import AdminRestoViewScreen from "../../screens/admin/resto/AdminRestoViewScreen";
import AdminCustomerViewScreen from "../../screens/admin/customer/AdminCustomerViewScreen";
import AdminOrderViewScreen from "../../screens/admin/order/AdminOrderViewScreen";
import AdminMenuListScreen from "../../screens/admin/menu/AdminMenuListScreen";
import AdminMenuViewScreen from "../../screens/admin/menu/AdminMenuViewScreen";
import AdminReportViewScreen from "../../screens/admin/report/AdminReportViewScreen";
import AdminBanViewScreen from "../../screens/admin/ban/AdminBanViewScreen";
import AdminLogListScreen from "../../screens/admin/log/AdminLogListScreen";
import DrawerLayout from "../../components/DrawerLayout";

const Partnership = {
  screen: PartnerNavigator,
  navigationOptions: {
    title: "Partnership",
    drawerIcon: ({ tintColor }) => partnerIcon({ tintColor }),
    drawerLabel: ({ tintColor }) => (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text h5 style={{ margin: 16, fontWeight: "bold", color: tintColor }}>
          Partnership
        </Text>
        <BadgeCounter promise={getNotifPartner} />
      </View>
    )
  }
};

const Tag = {
  screen: TagNavigator,
  navigationOptions: {
    title: "Tags",
    drawerIcon: ({ tintColor }) => tagIcon({ tintColor }),
    drawerLabel: ({ tintColor }) => (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text h5 style={{ margin: 16, fontWeight: "bold", color: tintColor }}>
          Tags
        </Text>
        <BadgeCounter promise={getNotifTags} />
      </View>
    )
  }
};

const Resto = {
  screen: RestoNavigator,
  navigationOptions: {
    title: "Restaurant",
    drawerIcon: ({ tintColor }) => restoIcon({ tintColor })
  }
};

const Menu = {
  screen: MenuNavigator,
  navigationOptions: {
    title: "Menu",
    drawerIcon: ({ tintColor }) => menuIcon({ tintColor })
  }
};

const Customer = {
  screen: CustomerNavigator,
  navigationOptions: {
    title: "Customer",
    drawerIcon: ({ tintColor }) => customerIcon({ tintColor })
  }
};

const Users = {
  screen: UsersNavigator,
  navigationOptions: {
    title: "Users",
    drawerIcon: ({ tintColor }) => userIcon({ tintColor })
  }
};

const Order = {
  screen: OrderNavigator,
  navigationOptions: {
    title: "Orders",
    drawerIcon: ({ tintColor }) => orderIcon({ tintColor })
  }
};
const Sales = {
  screen: SalesNavigator,
  navigationOptions: {
    title: "Sales",
    drawerIcon: ({ tintColor }) => salesIcon({ tintColor })
  }
};

const Report = {
  screen: ReportNavigator,
  navigationOptions: {
    title: "Reported Users",
    drawerIcon: ({ tintColor }) => reportIcon({ tintColor }),
    drawerLabel: ({ tintColor }) => (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text h5 style={{ margin: 16, fontWeight: "bold", color: tintColor }}>
          Reported Users
        </Text>
        <BadgeCounter promise={getNotifReports} />
      </View>
    )
  }
};

const Ban = {
  screen: BanNavigator,
  navigationOptions: {
    title: "Ban",
    drawerIcon: ({ tintColor }) => banIcon({ tintColor })
  }
};

const Logs = {
  screen: LogsNavigator,
  navigationOptions: {
    title: "Logs",
    drawerIcon: ({ tintColor }) => logIcon({ tintColor })
  }
};

const Request = {
  screen: RequestNavigator,
  navigationOptions: {
    title: "Request",
    drawerIcon: ({ tintColor }) => requestIcon({ tintColor }),
    drawerLabel: ({ tintColor }) => (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text h5 style={{ margin: 16, fontWeight: "bold", color: tintColor }}>
        Request
        </Text>
        <BadgeCounter promise={getNotifRequests} />
      </View>
    )
  }
};

const AdminDrawer = createDrawerNavigator(
  {
    Partnership,
    Resto,
    Customer,
    Users,
    Tag,
    Menu,
    Order,
    Sales,
    Report,
    Ban,
    Logs,
    Request
  },
  {
    initialRouteName: "Partnership",
    contentComponent: DrawerLayout,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

AdminDrawer.navigationOptions = {
  header: null
};
const Profile = {
  screen: ProfileStackNavigator,
  navigationOptions: {
    header: null
  }
};
////Modals
const AdminRestoView = {
  screen: AdminRestoViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Restaurant Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminPartnerView = {
  screen: PartnerViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Application Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminCustomerView = {
  screen: AdminCustomerViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Customer Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminOrderView = {
  screen: AdminOrderViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminMenuFilter = {
  screen: AdminMenuListScreen,
  navigationOptions: ({ navigation }) => ({
    title: `Tag ${navigation.getParam("tag")} List`,
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminMenuView = {
  screen: AdminMenuViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminBanView = {
  screen: AdminBanViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Ban Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const AdminReportView = {
  screen: AdminReportViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Report Details",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightReportButton({ navigation })
  })
};
const AdminActivityList = {
  screen: AdminLogListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "My Activity",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightSearchButton({ navigation })
  })
};

export default createStackNavigator(
  {
    AdminDrawer,
    Profile,
    AdminRestoView,
    AdminPartnerView,
    AdminCustomerView,
    AdminOrderView,
    AdminMenuFilter,
    AdminMenuView,
    AdminReportView,
    AdminBanView,
    AdminActivityList
  },
  {
    defaultNavigationOptions: headerStyles,
    mode: "modal"
  }
);
