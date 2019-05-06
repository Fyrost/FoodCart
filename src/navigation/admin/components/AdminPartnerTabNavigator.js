import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import {
  partnerPendingIcon,
  partnerApprovedIcon,
  partnerRejectedIcon
} from "../navOptions/navIcons";
import PartnerPendingScreen from "../../../screens/admin/partner/PartnerPendingScreen";
import PartnerApprovedScreen from "../../../screens/admin/partner/PartnerApprovedScreen";
import PartnerRejectedScreen from "../../../screens/admin/partner/PartnerRejectedScreen";

const PartnerPending = createStackNavigator({
  PartnerPending: {
    screen: PartnerPendingScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Pending Parnership",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

PartnerPending.navigationOptions = {
  tabBarLabel: "Pending",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const PartnerApproved = createStackNavigator({
  PartnerApproved: {
    screen: PartnerApprovedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Approved Parnership",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

PartnerApproved.navigationOptions = {
  tabBarLabel: "Approved",
  tabBarIcon: ({ tintColor }) => partnerApprovedIcon({ tintColor })
};

const PartnerRejected = createStackNavigator({
  PartnerRejected: {
    screen: PartnerRejectedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Rejected Parnership",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

PartnerRejected.navigationOptions = {
  tabBarLabel: "Rejected",
  tabBarIcon: ({ tintColor }) => partnerRejectedIcon({ tintColor })
};

const PartnerNavigator = createBottomTabNavigator(
  { PartnerPending, PartnerApproved, PartnerRejected },
  {
    tabBarOptions: TabStyles,
    animationEnabled: true
  }
);

export { PartnerNavigator };
