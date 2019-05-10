import { createStackNavigator } from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminOrderListScreen from "../../../screens/admin/order/AdminOrderListScreen";

const AdminOrderList = {
  screen: AdminOrderListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Orders",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightSearchButton({ navigation })
  })
};

const OrderNavigator = createStackNavigator(
  { AdminOrderList },
  { defaultNavigationOptions: headerStyles }
);

export { OrderNavigator };
