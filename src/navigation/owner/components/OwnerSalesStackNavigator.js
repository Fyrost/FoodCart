import { createStackNavigator } from "react-navigation";
import { leftDrawerButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import RestoMenuSales from "../../../screens/owner/sales/RestoMenuSales";

const OwnerMenuSales = {
  screen: RestoMenuSales,
  navigationOptions: ({ navigation }) => ({
    title: "Menu Sales",
    headerLeft: leftDrawerButton({ navigation })
  })
};

const SalesNavigator = createStackNavigator(
  { OwnerMenuSales },
  { defaultNavigationOptions: headerStyles }
);

export { SalesNavigator };
