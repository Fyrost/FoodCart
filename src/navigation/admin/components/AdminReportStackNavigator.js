import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { TabStyles, headerStyles } from "../navOptions/navStyles";
import { partnerPendingIcon } from "../navOptions/navIcons";
import AdminReportActiveListScreen from "../../../screens/admin/report/AdminReportActiveListScreen";
import AdminReportClosedListScreen from "../../../screens/admin/report/AdminReportClosedListScreen";

const AdminReportActive = createStackNavigator({
  ReportActive: {
    screen: AdminReportActiveListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Open Reported User",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminReportActive.navigationOptions = {
  tabBarLabel: "Open Report",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const AdminReportClose = createStackNavigator({
  ReportClose: {
    screen: AdminReportClosedListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Closed Reported User",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminReportClose.navigationOptions = {
  tabBarLabel: "Closed Report",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const ReportNavigator = createBottomTabNavigator(
  { AdminReportActive, AdminReportClose },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { ReportNavigator };
