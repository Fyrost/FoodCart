import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import {
  tagPendingIcon,
  tagApprovedIcon,
  tagRejectedIcon
} from "../navOptions/navIcons";
import TagPendingScreen from "../../../screens/admin/tag/TagPendingScreen";
import TagApprovedScreen from "../../../screens/admin/tag/TagApprovedScreen";
import TagRejectedScreen from "../../../screens/admin/tag/TagRejectedScreen";

const TagPending = createStackNavigator({
  Pending: {
    screen: TagPendingScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Pending Tag",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

TagPending.navigationOptions = {
  tabBarLabel: "Pending",
  tabBarIcon: ({ tintColor }) => tagPendingIcon({ tintColor })
};

const TagApproved = createStackNavigator({
  Approved: {
    screen: TagApprovedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Approved Tag",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

TagApproved.navigationOptions = {
  tabBarLabel: "Approved",
  tabBarIcon: ({ tintColor }) => tagApprovedIcon({ tintColor })
};

const TagRejected = createStackNavigator({
  Rejected: {
    screen: TagRejectedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Rejected Tag",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

TagRejected.navigationOptions = {
  tabBarLabel: "Rejected",
  tabBarIcon: ({ tintColor }) => tagRejectedIcon({ tintColor })
};

const TagNavigator = createBottomTabNavigator(
  { TagPending, TagApproved, TagRejected },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { TagNavigator };
