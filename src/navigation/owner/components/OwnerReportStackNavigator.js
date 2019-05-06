import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import OwnerReportListScreen from "../../../screens/owner/report/OwnerReportListScreen";

const OwnerReport = {
  screen: OwnerReportListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Report Ticket",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const ReportNavigator = createStackNavigator(
  { OwnerReport },
  { defaultNavigationOptions: headerStyles }
);

export { ReportNavigator };
