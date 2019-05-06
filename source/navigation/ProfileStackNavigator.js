import React from "react";
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
    headerRight: (
      <Icon
        name="edit"
        type="font-awesome"
        color="#FFF"
        size={25}
        containerStyle={{ marginRight: 15, justifyContent: "center" }}
        onPress={() => navigation.navigate("ProfileEdit")}
      />
    )
  })
};

const profileEditOptions = {
  screen: ProfileEditScreen,
  navigationOptions: ({ navigation }) => ({
    title:
      navigation.getParam("accessLevel") == "2"
        ? "Update Resto Info"
        : "Update Profile",
    headerRight: (
      <Icon
        name="textbox-password"
        type="material-community"
        color="#FFF"
        size={25}
        containerStyle={{ marginRight: 15 }}
        onPress={navigation.getParam("layoutVisible")}
      />
    )
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
