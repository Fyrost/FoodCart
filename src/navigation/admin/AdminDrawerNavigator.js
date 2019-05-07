import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  CustomerNavigator,
  MenuNavigator,
  PartnerNavigator,
  ReportNavigator,
  RestoNavigator,
  SalesNavigator,
  TagNavigator,
  LogsNavigator
} from "./components";
import { leftBackButton } from "./navOptions/navButtons";
import { headerStyles } from "./navOptions/navStyles";
import {
  partnerIcon,
  tagIcon,
  restoIcon,
  menuIcon,
  customerIcon,
  salesIcon,
  reportIcon
} from "./navOptions/navIcons";
import ProfileStackNavigator from "../ProfileStackNavigator";
import PartnerViewScreen from "../../screens/admin/partner/PartnerViewScreen";
import AdminRestoViewScreen from "../../screens/admin/resto/AdminRestoViewScreen";
import AdminCustomerViewScreen from "../../screens/admin/customer/AdminCustomerViewScreen";
import AdminMenuListScreen from "../../screens/admin/menu/AdminMenuListScreen";
import AdminMenuViewScreen from "../../screens/admin/menu/AdminMenuViewScreen";
import DrawerLayout from "../../components/DrawerLayout";

const Partnership = {
  screen: PartnerNavigator,
  navigationOptions: {
    title: "Partnership",
    drawerIcon: ({ tintColor }) => partnerIcon({ tintColor })
  }
};

const Tag = {
  screen: TagNavigator,
  navigationOptions: {
    title: "Tags",
    drawerIcon: ({ tintColor }) => tagIcon({ tintColor })
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
    drawerIcon: ({ tintColor }) => reportIcon({ tintColor })
  }
};

const Logs = {
  screen: LogsNavigator,
  navigationOptions: {
    title: "Logs",
    drawerIcon: ({ tintColor }) => reportIcon({ tintColor })
  }
};

const AdminDrawer = createDrawerNavigator(
  {
    Partnership,
    Tag,
    Resto,
    Menu,
    Customer,
    Sales,
    Report,
    Logs
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
const RestoView = {
  screen: AdminRestoViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Restaurant Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const PartnerView = {
  screen: PartnerViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Application Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const CustomerView = {
  screen: AdminCustomerViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Customer Details",
    headerLeft: leftBackButton({ navigation })
  })
};
const MenuList = {
  screen: AdminMenuListScreen,
  navigationOptions: ({ navigation }) => ({
    title: `Tag ${navigation.getParam("tag")} List`,
    headerLeft: leftBackButton({ navigation })
  })
}
const MenuView = {
  screen: AdminMenuViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu Details",
    headerLeft: leftBackButton({ navigation })
  })
};


export default createStackNavigator(
  {
    AdminDrawer,
    Profile,
    RestoView,
    PartnerView,
    CustomerView,
    MenuList,
    MenuView
  },
  {
    defaultNavigationOptions: headerStyles,
    mode: "modal"
  }
);
