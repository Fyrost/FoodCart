import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { salesRestoIcon, salesMenuIcon } from "../navOptions/navIcons";
import AdminMenuSalesScreen from "../../../screens/admin/sales/AdminMenuSalesScreen";
import AdminRestoSalesScreen from "../../../screens/admin/sales/AdminRestoSalesScreen";

const AdminRestoSales = createStackNavigator({
  AdminRestoSales: {
    screen: AdminRestoSalesScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Restaurant Sales",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminRestoSales.navigationOptions = {
  tabBarLabel: "Restaurant",
  tabBarIcon: ({ tintColor }) => salesRestoIcon({ tintColor })
};

const AdminMenuSales = createStackNavigator({
  AdminMenuSales: {
    screen: AdminMenuSalesScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Menu Sales",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminMenuSales.navigationOptions = {
  tabBarLabel: "Menu",
  tabBarIcon: ({ tintColor }) => salesMenuIcon({ tintColor })
};

const SalesNavigator = createBottomTabNavigator(
  { AdminRestoSales, AdminMenuSales },
  {
    tabBarOptions: TabStyles,
    animationEnabled: true
  }
);

export { SalesNavigator };
