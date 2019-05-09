import React from "react";
import { View } from "react-native";
import { Button, Avatar } from "react-native-elements";
import _ from "lodash";
import { ConfirmAlert } from "../../../components/Alerts";
import { HeaderBackButton } from "react-navigation";
import { deleteMenu } from "../../../actions";

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
////OWNER MENU////
export const rightMenuDeleteButton = ({ navigation }) => (
  <View style={{ flexDirection: "row", backgroundColor: "#11CDEF" }}>
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#transparent" }}
      overlayContainerStyle={{ backgroundColor: "#EF2D56" }}
      icon={{ name: "trash", type: "font-awesome" }}
      size={40}
      onPress={() =>
        ConfirmAlert("Delete Item", "Are you sure?", () =>
          deleteMenu(navigation.getParam("menuId"))
            .then(res => {
              if (res.data.success) {
                alert("item deleted");
                navigation.navigate("OwnerMenuList");
              }
            })
            .catch(err => {
              alert(errorHandler(err));
            })
        )
      }
      containerStyle={{ marginRight: 5 }}
    />
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "transparent" }}
      overlayContainerStyle={{ backgroundColor: "#ED7D3A" }}
      icon={{ name: "edit", type: "font-awesome" }}
      size={40}
      onPress={() =>
        navigation.navigate("OwnerMAInfo", {
          menuId: navigation.getParam("menuId")
        })
      }
      containerStyle={{ marginRight: 5 }}
    />
  </View>
);
export const rightMenuAddButton = ({ navigation }) => (
  <View style={{ flexDirection: "row" }}>
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#afafaf" }}
      icon={{ name: "search", type: "font-awesome" }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      size={45}
      containerStyle={{ marginRight: 5 }}
      onPress={navigation.getParam("toggleSearch")}
    />
    <Avatar
      rounded
      containerStyle={{ backgroundColor: "#afafaf" }}
      icon={{ name: "plus", type: "font-awesome" }}
      overlayContainerStyle={{ backgroundColor: "#00CC66" }}
      size={45}
      onPress={_.debounce(() => navigation.push("OwnerMAInfo"), 1000, {
        leading: true,
        trailing: false
      })}
      containerStyle={{ marginRight: 5 }}
    />
  </View>
);
////OWNER ORDER////
export const rightOrderButton = ({ navigation }) => {
  {
    return navigation.getParam("report", true) ? (
      <Button
        title={"Report"}
        buttonStyle={{ backgroundColor: "orange", marginRight: 10 }}
        onPress={navigation.getParam("handleReportOverlayVisible")}
      />
    ) : null;
  }
};
////OWNER CATEGORY////
export const rightCategoryAddButton = ({ navigation }) => (
  <Avatar
    rounded
    containerStyle={{ backgroundColor: "#afafaf" }}
    icon={{ name: "plus", type: "font-awesome" }}
    overlayContainerStyle={{ backgroundColor: "#00CC66" }}
    size={40}
    onPress={navigation.getParam("layoutVisible")}
    containerStyle={{ marginRight: 5 }}
  />
);
