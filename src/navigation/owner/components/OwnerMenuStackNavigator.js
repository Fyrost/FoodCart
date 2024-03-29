import { createStackNavigator } from "react-navigation";
import {
  leftBackButton,
  leftDrawerButton,
  rightMenuAddButton
} from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import MenuListScreen from "../../../screens/owner/menu/MenuListScreen";
import MAInfoScreen from "../../../screens/owner/menu/MAInfoScreen";
import MACategoryTagScreen from "../../../screens/owner/menu/MACategoryTagScreen";

const OwnerMenuList = {
  screen: MenuListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightMenuAddButton({ navigation })
  })
};

const OwnerMAInfo = {
  screen: MAInfoScreen,
  navigationOptions: ({ navigation }) => ({
    title: navigation.getParam("menuId") ? "Edit Menu" : "Add Menu",
    headerLeft: leftBackButton({ navigation })
  })
};

const OwnerMACategoryTag = {
  screen: MACategoryTagScreen,
  navigationOptions: ({ navigation }) => ({
    headerLeft: leftBackButton({ navigation })
  })
};

const MenuNavigator = createStackNavigator(
  { OwnerMenuList, OwnerMAInfo, OwnerMACategoryTag },
  { defaultNavigationOptions: headerStyles }
);

export { MenuNavigator };
