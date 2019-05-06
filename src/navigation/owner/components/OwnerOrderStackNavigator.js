import { createStackNavigator } from "react-navigation";
import {
  leftDrawerButton,
  leftBackButton,
  rightOrderButton
} from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import OrderListScreen from "../../../screens/owner/order/OrderListScreen";

const OrderList = {
  screen: OrderListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Orders",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const OrderNavigator = createStackNavigator(
  { OrderList },
  { defaultNavigationOptions: headerStyles }
);
export { OrderNavigator };
