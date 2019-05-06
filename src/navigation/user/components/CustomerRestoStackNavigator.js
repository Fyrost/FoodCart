import { createStackNavigator } from "react-navigation";
import {
  leftDrawerButton,
  rightRestoCartButton
} from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import RestoListScreen from "../../../screens/user/Restaurant/RestoListScreen";

const RestoList = {
  screen: RestoListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Restaurant List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightRestoCartButton({ navigation })
  })
};

const RestoNavigator = createStackNavigator(
  { RestoList },
  { defaultNavigationOptions: headerStyles }
);

export { RestoNavigator };
