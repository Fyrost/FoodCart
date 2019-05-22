import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { MenuIcon, OnProgressIcon, HistoryIcon } from "../navOptions/navIcons";
import OrderOnProcessListScreen from "../../../screens/owner/order/OrderOnProcessListScreen";
import OrderCompletedListScreen from "../../../screens/owner/order/OrderCompletedListScreen";

const OwnerOrderOnProgress = createStackNavigator({
  OwnerOrderOnProgress: {
    screen: OrderOnProcessListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Orders",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

OwnerOrderOnProgress.navigationOptions = {
  tabBarLabel: "On Progress",
  tabBarIcon: ({ tintColor }) => OnProgressIcon({ tintColor })
};

const OwnerOrderCompleted = createStackNavigator({
  OwnerOrderCompleted: {
    screen: OrderCompletedListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Order History",
      headerLeft: leftDrawerButton({ navigation })
    })
  }
});

OwnerOrderCompleted.navigationOptions = {
  tabBarLabel: "History",
  tabBarIcon: ({ tintColor }) => HistoryIcon({ tintColor })
};

const OrderNavigator = createBottomTabNavigator(
  { OwnerOrderOnProgress, OwnerOrderCompleted },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { OrderNavigator };
