import { createStackNavigator } from "react-navigation";
import { leftDrawerButton,rightSearchButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminCustomerListScreen from "../../../screens/admin/customer/AdminCustomerListScreen";

const AdminCustomerList = {
  screen: AdminCustomerListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Customer List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightSearchButton({navigation})
  })
};

const CustomerNavigator = createStackNavigator(
  { AdminCustomerList },
  { defaultNavigationOptions: headerStyles }
);

export { CustomerNavigator };
