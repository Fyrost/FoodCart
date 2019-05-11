import { createStackNavigator } from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminRequestListScreen from "../../../screens/admin/request/AdminRequestListScreen";

const AdminRequestList = {
  screen: AdminRequestListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Requests",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightSearchButton({ navigation })
  })
};

const RequestNavigator = createStackNavigator(
  { AdminRequestList },
  { defaultNavigationOptions: headerStyles }
);

export { RequestNavigator };
