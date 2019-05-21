import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { TabStyles, headerStyles } from "../navOptions/navStyles";
import { partnerPendingIcon } from "../navOptions/navIcons";
import AdminRequestOpenListScreen from "../../../screens/admin/request/AdminRequestOpenListScreen";
import AdminRequestCloseListScreen from "../../../screens/admin/request/AdminRequestCloseListScreen";

const AdminRequestOpenList = createStackNavigator({
  RequestOpenList: {
    screen: AdminRequestOpenListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Open Requests",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminRequestOpenList.navigationOptions = {
  tabBarLabel: "Open Requests",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const AdminRequestCloseList = createStackNavigator({
  RequestCloseList: {
    screen: AdminRequestCloseListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Close Requests",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminRequestCloseList.navigationOptions = {
  tabBarLabel: "Close Requests",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const RequestNavigator = createBottomTabNavigator(
  { AdminRequestOpenList, AdminRequestCloseList },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { RequestNavigator };
