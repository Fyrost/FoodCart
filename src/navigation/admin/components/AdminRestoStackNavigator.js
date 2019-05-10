import { createStackNavigator } from "react-navigation";
import { leftDrawerButton, rightSearchButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminRestoListScreen from "../../../screens/admin/resto/AdminRestoListScreen";

const AdminRestoList = {
  screen: AdminRestoListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Restaurant List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightSearchButton({ navigation })
  })
};

const RestoNavigator = createStackNavigator(
  { AdminRestoList },
  { defaultNavigationOptions: headerStyles }
);

export { RestoNavigator };
