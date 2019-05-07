import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  CategoryNavigator,
  MenuNavigator,
  OrderNavigator,
  SalesNavigator,
  ReportNavigator,
  LogsNavigator
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
  ReportIcon
} from "./navOptions/navIcons";
// import OwnerScreen from "../screens/owner/OwnerScreen";
import ProfileStackNavigator from "../ProfileStackNavigator";
import MenuViewScreen from "../../screens/owner/menu/MenuViewScreen";
import OrderViewScreen from "../../screens/owner/order/OrderViewScreen";
import DrawerLayout from "../../components/DrawerLayout";

const Order = {
  screen: OrderNavigator,
  navigationOptions: {
    drawerLabel: "Order",
    drawerIcon: ({ tintColor }) => OrderIcon({ tintColor })
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

const Logs = {
  screen: LogsNavigator,
  navigationOptions: {
    drawerLabel: "Activity Logs",
    drawerIcon: ({ tintColor }) => ReportIcon({ tintColor })
  }
};

const OwnerDrawer = createDrawerNavigator(
  {
    Order,
    Menu,
    Category,
    Sales,
    Report,
    Logs
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
const MenuView = {
  screen: MenuViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu Details",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightMenuDeleteButton({ navigation })
  })
};
const OrderView = {
  screen: OrderViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order Details",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightOrderButton({ navigation })
  })
};

export default createStackNavigator(
  {
    OwnerDrawer,
    Profile,
    MenuView,
    OrderView
  },
  {
    defaultNavigationOptions: headerStyles,
    mode: "modal"
  }
);
