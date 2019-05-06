import { createStackNavigator } from "react-navigation";
import OrderHistoryScreen from "../../screens/user/Order/OrderHistoryScreen";
import OrderDetailScreen from "../../screens/user/Order/OrderDetailScreen";

export default createStackNavigator(
  {
    OrderHistory: {
      screen: OrderHistoryScreen,
      navigationOptions: {
        title: "Order History"
      }
    },
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: {
        title: "Order Detail"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#11CDEF"
      }
    }
  }
);
