import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import {
  partnerPendingIcon,
  partnerApprovedIcon,
  partnerRejectedIcon
} from "../navOptions/navIcons";
import PartnerPendingScreen from "../../../screens/admin/partner/PartnerPendingScreen";
import PartnerApprovedScreen from "../../../screens/admin/partner/PartnerApprovedScreen";
import PartnerRejectedScreen from "../../../screens/admin/partner/PartnerRejectedScreen";

const AdminPartnerPending = createStackNavigator({
  PartnerPending: {
    screen: PartnerPendingScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Pending Partnership",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminPartnerPending.navigationOptions = {
  tabBarLabel: "Pending",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const AdminPartnerApproved = createStackNavigator({
  PartnerApproved: {
    screen: PartnerApprovedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Approved Partnership",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminPartnerApproved.navigationOptions = {
  tabBarLabel: "Approved",
  tabBarIcon: ({ tintColor }) => partnerApprovedIcon({ tintColor })
};

const AdminPartnerRejected = createStackNavigator({
  PartnerRejected: {
    screen: PartnerRejectedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Rejected Partnership",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminPartnerRejected.navigationOptions = {
  tabBarLabel: "Rejected",
  tabBarIcon: ({ tintColor }) => partnerRejectedIcon({ tintColor })
};

const PartnerNavigator = createBottomTabNavigator(
  { AdminPartnerPending, AdminPartnerApproved, AdminPartnerRejected },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { PartnerNavigator };
