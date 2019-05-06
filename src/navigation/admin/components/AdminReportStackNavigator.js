import { createStackNavigator } from "react-navigation";
import {
  leftDrawerButton,
  leftBackButton,
  rightReportButton
} from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminReportListScreen from "../../../screens/admin/report/AdminReportListScreen";
import AdminReportViewScreen from "../../../screens/admin/report/AdminReportViewScreen";

const AdminReportList = {
  screen: AdminReportListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Reported User",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const AdminReportView = {
  screen: AdminReportViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Report Details",
    headerLeft: leftBackButton({ navigation }),
    headerRight: rightReportButton({ navigation })
  })
};

const ReportNavigator = createStackNavigator(
  { AdminReportList, AdminReportView },
  { defaultNavigationOptions: headerStyles }
);

export { ReportNavigator };
