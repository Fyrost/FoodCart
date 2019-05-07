import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { MenuIcon } from "../navOptions/navIcons";
import OrderOnProcessListScreen from "../../../screens/owner/order/OrderOnProcessListScreen";
import OrderCompletedListScreen from "../../../screens/owner/order/OrderCompletedListScreen";

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
  tabBarIcon: ({ tintColor }) => MenuIcon({ tintColor })
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
  tabBarIcon: ({ tintColor }) => MenuIcon({ tintColor })
};

const OrderNavigator = createBottomTabNavigator(
  { OrderOnProgress, OrderCompleted },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { OrderNavigator };
