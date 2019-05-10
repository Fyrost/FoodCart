import { createStackNavigator } from "react-navigation";
import { leftDrawerButton,rightSearchButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminBanListScreen from "../../../screens/admin/ban/AdminBanListScreen";

const AdminBanList = {
  screen: AdminBanListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Ban List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightSearchButton({navigation})
  })
};

const BanNavigator = createStackNavigator(
  { AdminBanList },
  { defaultNavigationOptions: headerStyles }
);

export { BanNavigator };
