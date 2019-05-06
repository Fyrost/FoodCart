import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { salesRestoIcon, salesMenuIcon } from "../navOptions/navIcons";
import AdminMenuSales from "../../../screens/admin/sales/AdminMenuSales";
import AdminRestoSalesScreen from "../../../screens/admin/sales/AdminRestoSalesScreen";

const RestoSales = createStackNavigator({
  RestoSales: {
    screen: AdminRestoSalesScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Restaurant Sales",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

RestoSales.navigationOptions = {
  tabBarLabel: "Restaurant",
  tabBarIcon: ({ tintColor }) => salesRestoIcon({ tintColor })
};

const MenuSales = createStackNavigator({
  MenuSales: {
    screen: AdminMenuSales,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Menu Sales",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

MenuSales.navigationOptions = {
  tabBarLabel: "Menu",
  tabBarIcon: ({ tintColor }) => salesMenuIcon({ tintColor })
};

const SalesNavigator = createBottomTabNavigator(
  { RestoSales, MenuSales },
  {
    tabBarOptions: TabStyles,
    animationEnabled: true
  }
);

export { SalesNavigator };
