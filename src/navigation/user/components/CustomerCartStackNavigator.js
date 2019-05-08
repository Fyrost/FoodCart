import { createStackNavigator } from "react-navigation";
import {
  leftDismissButton,
  rightCartButton,
  rightCheckoutButton
} from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import CartScreen from "../../../screens/user/Cart/CartScreen";
import CheckoutScreen from "../../../screens/user/Cart/CheckoutScreen";

const UserCart = {
  screen: CartScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Cart",
    headerLeft: leftDismissButton({ navigation }),
    headerRight: rightCartButton({ navigation })
  })
};

const UserCheckout = {
  screen: CheckoutScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Checkout",
    headerRight: rightCheckoutButton({ navigation })
  })
};

const CartNavigator = createStackNavigator(
  { UserCart, UserCheckout },
  { defaultNavigationOptions: headerStyles }
);

export { CartNavigator };
