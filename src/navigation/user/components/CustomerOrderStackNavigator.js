import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { HomeIcon } from "../navOptions/navIcons";
import OrderOnProcessListScreen from "../../../screens/user/Order/OrderOnProcessListScreen";
import OrderCompletedListScreen from "../../../screens/user/Order/OrderCompletedListScreen";

const UserOrderOnProgress = createStackNavigator({
  UserOrderProgress: {
    screen: OrderOnProcessListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Orders",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

UserOrderOnProgress.navigationOptions = {
  tabBarLabel: "On Progress",
  tabBarIcon: ({ tintColor }) => HomeIcon({ tintColor })
};

const UserOrderCompleted = createStackNavigator({
  UserOrderCompleted: {
    screen: OrderCompletedListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Order History",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

UserOrderCompleted.navigationOptions = {
  tabBarLabel: "History",
  tabBarIcon: ({ tintColor }) => HomeIcon({ tintColor })
};

const OrderNavigator = createBottomTabNavigator(
  { UserOrderOnProgress, UserOrderCompleted },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { OrderNavigator };
