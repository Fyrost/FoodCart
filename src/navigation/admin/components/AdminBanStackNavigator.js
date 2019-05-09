import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminBanListScreen from "../../../screens/admin/ban/AdminBanListScreen";

const AdminBanList = {
  screen: AdminBanListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Ban List",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const BanNavigator = createStackNavigator(
  { AdminBanList },
  { defaultNavigationOptions: headerStyles }
);

export { BanNavigator };
