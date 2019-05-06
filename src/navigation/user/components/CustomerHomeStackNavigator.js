import { createStackNavigator } from "react-navigation";
import HomeScreen from "../../../screens/user/HomeScreen";

const Home = {
  screen: HomeScreen,
  navigationOptions: {
    header: null
  }
};

const HomeNavigator = createStackNavigator({ Home });

export { HomeNavigator };
