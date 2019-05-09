import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import { HeaderBackButton } from "react-navigation";

export const leftDrawerButton = ({ navigation }) => (
  <Avatar
    containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
    size={50}
    onPress={() => navigation.openDrawer()}
  />
);

export const leftBackButton = ({ navigation }) => (
  <HeaderBackButton tintColor={"white"} onPress={() => navigation.goBack()} />
);
export const rightSearchButton = ({ navigation }) => (
  <Avatar
    rounded
    containerStyle={{ backgroundColor: "#afafaf" }}
    icon={{ name: "search", type: "font-awesome" }}
    overlayContainerStyle={{ backgroundColor: "transparent" }}
    size={45}
    containerStyle={{ marginRight: 5 }}
    onPress={navigation.getParam("toggleSearch")}
  />
);
////ADMIN REPORT////
export const rightReportButton = ({ navigation }) => (
  <View style={{ flexDirection: "row" }}>
    {navigation.getParam("investigate") && (
      <Avatar
        rounded
        containerStyle={{ backgroundColor: "transparent" }}
        icon={{ name: "eye", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "orange" }}
        size={40}
        containerStyle={{ marginRight: 5 }}
        onPress={navigation.getParam("handleInvestigate")}
      />
    )}
    {navigation.getParam("close") && (
      <Avatar
        rounded
        containerStyle={{ backgroundColor: "transparent" }}
        icon={{ name: "close", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "#EF1B17" }}
        size={40}
        containerStyle={{ marginRight: 5 }}
        onPress={navigation.getParam("handleOverlayVisible")}
      />
    )}
  </View>
);
