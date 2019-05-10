import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import {
  tagPendingIcon,
  tagApprovedIcon,
  tagRejectedIcon
} from "../navOptions/navIcons";
import TagPendingScreen from "../../../screens/admin/tag/TagPendingScreen";
import TagApprovedScreen from "../../../screens/admin/tag/TagApprovedScreen";
import TagRejectedScreen from "../../../screens/admin/tag/TagRejectedScreen";

const AdminTagPending = createStackNavigator({
  AdminTagPending: {
    screen: TagPendingScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Pending Tag",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminTagPending.navigationOptions = {
  tabBarLabel: "Pending",
  tabBarIcon: ({ tintColor }) => tagPendingIcon({ tintColor })
};

const AdminTagApproved = createStackNavigator({
  AdminTagApproved: {
    screen: TagApprovedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Approved Tag",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminTagApproved.navigationOptions = {
  tabBarLabel: "Approved",
  tabBarIcon: ({ tintColor }) => tagApprovedIcon({ tintColor })
};

const AdminTagRejected = createStackNavigator({
  AdminTagRejected: {
    screen: TagRejectedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Rejected Tag",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminTagRejected.navigationOptions = {
  tabBarLabel: "Rejected",
  tabBarIcon: ({ tintColor }) => tagRejectedIcon({ tintColor })
};

const TagNavigator = createBottomTabNavigator(
  { AdminTagPending, AdminTagApproved, AdminTagRejected },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { TagNavigator };
