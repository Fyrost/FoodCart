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

const CategoryActive = createStackNavigator({
  Active: {
    screen: CategoryActiveScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Active Category",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightCategoryAddButton({ navigation })
    })
  }
});

CategoryActive.navigationOptions = {
  tabBarLabel: "Active",
  tabBarIcon: ({ tintColor }) => categoryActiveIcon({ tintColor })
};

const CategoryArchive = createStackNavigator({
  Archive: {
    screen: CategoryArchiveScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Active Category",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

CategoryArchive.navigationOptions = {
  tabBarLabel: "Deleted",
  tabBarIcon: ({ tintColor }) => categoryDeletedIcon({ tintColor })
};

const CategoryNavigator = createBottomTabNavigator(
  { CategoryActive, CategoryArchive },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { CategoryNavigator };
