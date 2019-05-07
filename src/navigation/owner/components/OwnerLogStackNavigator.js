import { createStackNavigator } from "react-navigation";
import { leftDrawerButton, leftBackButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import OwnerLogListScreen from "../../../screens/owner/log/OwnerLogListScreen";

const OwnerLogList = {
  screen: OwnerLogListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Activity Logs",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const LogsNavigator = createStackNavigator(
  { OwnerLogList },
  { defaultNavigationOptions: headerStyles }
);

export { LogsNavigator };
