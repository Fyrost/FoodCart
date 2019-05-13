import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { TabStyles,headerStyles } from "../navOptions/navStyles";
import { partnerPendingIcon } from "../navOptions/navIcons";
import AdminMenuListScreen from "../../../screens/admin/menu/AdminMenuListScreen";
import AdminMenuDeletedScreen from "../../../screens/admin/menu/AdminMenuDeletedScreen";

const AdminMenuActive = createStackNavigator({
  MenuActive: {
    screen: AdminMenuListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Menu List",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminMenuActive.navigationOptions = {
  tabBarLabel: "Active",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const AdminMenuDeleted = createStackNavigator({
  MenuDeleted: {
    screen: AdminMenuDeletedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Deleted Menu",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminMenuDeleted.navigationOptions = {
  tabBarLabel: "Deleted",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const MenuNavigator = createBottomTabNavigator(
  { AdminMenuActive, AdminMenuDeleted },
  {
    tabBarOptions: TabStyles,
    animationEnabled: true
  }
);

export { MenuNavigator };
