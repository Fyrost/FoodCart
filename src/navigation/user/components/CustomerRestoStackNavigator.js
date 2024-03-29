import { createStackNavigator } from "react-navigation";
import {
  leftDrawerButton,
  rightRestoCartButton,
  rightMenuButton
} from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import RestoListScreen from "../../../screens/user/Restaurant/RestoListScreen";

const UserRestoList = {
  screen: RestoListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Restaurant List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightMenuButton({ navigation })
  })
};

const RestoNavigator = createStackNavigator(
  { UserRestoList },
  { defaultNavigationOptions: headerStyles }
);

export { RestoNavigator };
