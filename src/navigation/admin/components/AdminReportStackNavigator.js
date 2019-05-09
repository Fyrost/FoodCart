import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminReportListScreen from "../../../screens/admin/report/AdminReportListScreen";

const AdminReportList = {
  screen: AdminReportListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Reported User",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const ReportNavigator = createStackNavigator(
  { AdminReportList },
  { defaultNavigationOptions: headerStyles }
);

export { ReportNavigator };
