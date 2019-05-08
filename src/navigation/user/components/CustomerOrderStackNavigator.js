import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { HomeIcon } from "../navOptions/navIcons";
import OrderOnProcessListScreen from "../../../screens/user/Order/OrderOnProcessListScreen";
import OrderCompletedListScreen from "../../../screens/user/Order/OrderCompletedListScreen";

const OrderOnProgress = createStackNavigator({
  OrderProgress: {
    screen: OrderOnProcessListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Orders",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

OrderOnProgress.navigationOptions = {
  tabBarLabel: "On Progress",
  tabBarIcon: ({ tintColor }) => HomeIcon({ tintColor })
};

const OrderCompleted = createStackNavigator({
  OrderCompleted: {
    screen: OrderCompletedListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Order History",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

OrderCompleted.navigationOptions = {
  tabBarLabel: "History",
  tabBarIcon: ({ tintColor }) => HomeIcon({ tintColor })
};

const OrderNavigator = createBottomTabNavigator(
  { OrderOnProgress, OrderCompleted },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { OrderNavigator };
