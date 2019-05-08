import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminMenuListScreen from "../../../screens/admin/menu/AdminMenuListScreen";

const AdminMenuList = {
  screen: AdminMenuListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu List",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const MenuNavigator = createStackNavigator(
  { AdminMenuList },
  { defaultNavigationOptions: headerStyles }
);

export { MenuNavigator };
