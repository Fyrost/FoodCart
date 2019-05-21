import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles, TabStyles } from "../navOptions/navStyles";
import { partnerPendingIcon } from "../navOptions/navIcons";
import AdminOrderProcessingListScreen from "../../../screens/admin/order/AdminOrderProcessingListScreen";
import AdminOrderCompletedListScreen from "../../../screens/admin/order/AdminOrderCompletedListScreen";

const AdminOrderProcessingList = createStackNavigator({
  OrderProcessing: {
    screen: AdminOrderProcessingListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Orders",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminOrderProcessingList.navigationOptions = {
  tabBarLabel: "On Progress",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const AdminOrderCompletedList = createStackNavigator({
  OrderCompleted: {
    screen: AdminOrderCompletedListScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerStyles,
      title: "Orders",
      headerLeft: leftDrawerButton({ navigation }),
      headerRight: rightSearchButton({ navigation })
    })
  }
});

AdminOrderCompletedList.navigationOptions = {
  tabBarLabel: "Completed",
  tabBarIcon: ({ tintColor }) => partnerPendingIcon({ tintColor })
};

const OrderNavigator = createBottomTabNavigator(
  { AdminOrderProcessingList, AdminOrderCompletedList },
  { tabBarOptions: TabStyles, animationEnabled: true }
);

export { OrderNavigator };
