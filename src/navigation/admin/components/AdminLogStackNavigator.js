import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminLogListScreen from "../../../screens/admin/log/AdminLogListScreen";

const AdminLogList = {
  screen: AdminLogListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Activity Logs",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const LogsNavigator = createStackNavigator(
  { AdminLogList },
  { defaultNavigationOptions: headerStyles }
);

export { LogsNavigator };
