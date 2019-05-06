import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/authentication/LoginScreen";
import FPEmailScreen from "../screens/authentication/forgotPassword/FPEmailScreen";
import FPCodeScreen from "../screens/authentication/forgotPassword/FPCodeScreen";
import FPNewPasswordScreen from "../screens/authentication/forgotPassword/FPNewPasswordScreen";
import SUTypeScreen from "../screens/authentication/signUp/SUTypeScreen";
import SUPersonalInfoScreen from "../screens/authentication/signUp/SUPersonalInfoScreen";
import SUCredentialsScreen from "../screens/authentication/signUp/SUCredentialsScreen";
import SURestaurantCredentialsScreen from "../screens/authentication/signUp/SURestaurantCredentialsScreen";
import SURestaurantInfoScreen from "../screens/authentication/signUp/SURestaurantInfoScreen";
import SURestaurantOwnerInfoScreen from "../screens/authentication/signUp/SURestaurantOwnerInfoScreen";

export default createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    FPEmail: {
      screen: FPEmailScreen,
      navigationOptions: {
        title: "Forgot Password"
      }
    },
    FPCode: {
      screen: FPCodeScreen,
      navigationOptions: {
        title: "Forgot Password"
      }
    },
    FPNewPass: {
      screen: FPNewPasswordScreen,
      navigationOptions: {
        title: "Forgot Password"
      }
    },
    SUType: {
      screen: SUTypeScreen,
      navigationOptions: {
        title: "Register"
      }
    },
    SUPersonalInfo: {
      screen: SUPersonalInfoScreen,
      navigationOptions: {
        title: "Create an Account"
      }
    },
    SUCredentials: {
      screen: SUCredentialsScreen,
      navigationOptions: {
        title: "Create an Account"
      }
    },
    SURestaurant: {
      screen: SURestaurantInfoScreen,
      navigationOptions: {
        title: "Become a Partner"
      }
    },
    SURestaurantOwnerInfo: {
      screen: SURestaurantOwnerInfoScreen,
      navigationOptions: {
        title: "Become a Partner"
      }
    },
    SuRestaurantCredentials: {
      screen: SURestaurantCredentialsScreen,
      navigationOptions: {
        title: "Become a Partner"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "white",
        elevation: 0
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#3D3D3E"
      }
    }
  }
);
