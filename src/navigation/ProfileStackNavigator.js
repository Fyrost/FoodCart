import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import ProfileInfoScreen from "../screens/profile/ProfileInfoScreen";
import ProfileEditScreen from "../screens/profile/ProfileEditScreen";
const profileInfoOptions = {
  screen: ProfileInfoScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Profile Information",
    headerLeft: (
      <HeaderBackButton
        tintColor={"white"}
        onPress={() => navigation.dismiss()}
      />
    ),
  })
};

const profileEditOptions = {
  screen: ProfileEditScreen,
  navigationOptions: ({ navigation }) => ({
    title:
      navigation.getParam("accessLevel") == "2"
        ? "Update Resto Info"
        : "Update Profile",
  })
};

const defaultOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#11CDEF"
  }
};

export default createStackNavigator(
  {
    ProfileInfo: profileInfoOptions,
    ProfileEdit: profileEditOptions
  },
  {
    defaultNavigationOptions: defaultOptions
  }
);
