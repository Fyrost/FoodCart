import { createStackNavigator } from "react-navigation";
import HomeScreen from "../../../screens/user/HomeScreen";
import { HomeLogo } from "../navOptions/navIcons"
import { leftDrawerButtonBlue, rightSearchButtonBlue } from "../navOptions/navButtons"
import { headerStylesWhite } from "../navOptions/navStyles"
const Home = {
  screen: HomeScreen,
  navigationOptions: ({ navigation }) => ({
    headerTitle : (HomeLogo),
    headerLeft: leftDrawerButtonBlue({ navigation }),
    headerRight: rightSearchButtonBlue({ navigation })
  }) 
  
};

const HomeNavigator = createStackNavigator(
  { Home },
  { defaultNavigationOptions: headerStylesWhite }
  );

export { HomeNavigator };
