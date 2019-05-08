import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import {
  leftDrawerButton,
  rightCategoryAddButton
} from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import {
  categoryActiveIcon,
  categoryDeletedIcon
} from "../navOptions/navIcons";
import CategoryActiveScreen from "../../../screens/owner/category/CategoryActiveScreen";
import CategoryArchiveScreen from "../../../screens/owner/category/CategoryArchiveScreen";

const OwnerCategoryActive = createStackNavigator({
  OwnerCategoryActive: {
    screen: CategoryActiveScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Active Category",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightCategoryAddButton({ navigation })
    })
  }
});

OwnerCategoryActive.navigationOptions = {
  tabBarLabel: "Active",
  tabBarIcon: ({ tintColor }) => categoryActiveIcon({ tintColor })
};

const AdminCategoryArchive = createStackNavigator({
  AdminCategoryArchive: {
    screen: CategoryArchiveScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Active Category",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

AdminCategoryArchive.navigationOptions = {
  tabBarLabel: "Deleted",
  tabBarIcon: ({ tintColor }) => categoryDeletedIcon({ tintColor })
};

const CategoryNavigator = createBottomTabNavigator(
  { OwnerCategoryActive, AdminCategoryArchive },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { CategoryNavigator };
