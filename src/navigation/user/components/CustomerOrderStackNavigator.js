import { createStackNavigator } from "react-navigation";
import { leftBackButton, leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import OrderHistoryScreen from "../../../screens/user/Order/OrderHistoryScreen";
import OrderDetailScreen from "../../../screens/user/Order/OrderDetailScreen";

const OrderHistory = {
  screen: OrderHistoryScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order History",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const OrderView = {
  screen: OrderDetailScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Order Details",
    headerLeft: leftBackButton({ navigation })
  })
};

const OrderNavigator = createStackNavigator(
  { OrderHistory, OrderView },
  { defaultNavigationOptions: headerStyles }
);

export { OrderNavigator };
