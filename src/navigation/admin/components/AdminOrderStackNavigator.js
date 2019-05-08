import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminOrderListScreen from "../../../screens/admin/order/AdminOrderListScreen";

const OrderList = {
  screen: AdminOrderListScreen,
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
