import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import {
  HomeNavigator,
  CartNavigator,
  OrderNavigator,
  RestoNavigator
} from "./components";
import { leftBackButton, rightRestoCartButton } from "./navOptions/navButtons";
import { headerStyles } from "./navOptions/navStyles";
import { HomeIcon, OrderIcon, RestoIcon } from "./navOptions/navIcons";
import ProfileStackNavigator from "../ProfileStackNavigator";
import FavoriteListScreen from "../../screens/user/FavoriteListScreen";
import RestoMenuScreen from "../../screens/user/Restaurant/RestoMenuScreen";
import OrderDetailScreen from "../../screens/user/Order/OrderDetailScreen";
import DrawerLayout from "../../components/UserDrawerLayout";

const Home = {
  screen: HomeNavigator,
  navigationOptions: {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => HomeIcon({ tintColor })
  }
};

const Resto = {
  screen: RestoNavigator,
  navigationOptions: {
    drawerLabel: "Restaurant",
    drawerIcon: ({ tintColor }) => RestoIcon({ tintColor })
  }
};

const Order = {
  screen: OrderNavigator,
  navigationOptions: {
    drawerLabel: "Order",
    drawerIcon: ({ tintColor }) => OrderIcon({ tintColor })
  }
};

const UserDrawer = createDrawerNavigator(
  { Home, Resto, Order },
  {
    initialRouteName: "Home",
    contentComponent: DrawerLayout,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

UserDrawer.navigationOptions = {
  header: null
};
const Profile = {
  screen: ProfileStackNavigator,
  navigationOptions: {
    header: null
  }
};
////Modals
const Cart = {
  screen: CartNavigator,
  navigationOptions: {
    header: null
  }
};
const Favorite = {
  screen: FavoriteListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Favorite",
    headerLeft: leftBackButton({ navigation })
  })
};
const UserRestoMenu = {
  screen: RestoMenuScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightRestoCartButton({ navigation })
  })
};
const UserOrderView = {
  screen: OrderDetailScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order Details",
    headerLeft: leftBackButton({ navigation })
  })
};


export default createStackNavigator(
  {
    UserDrawer,
    Profile,
    Cart,
    Favorite,
    UserRestoMenu,
    UserOrderView
  },

  {
    defaultNavigationOptions: headerStyles,
    mode: "modal"
  }
);
