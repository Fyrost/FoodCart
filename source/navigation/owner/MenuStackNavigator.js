import React from "react";
import { View, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import _ from "lodash";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import { deleteMenu } from "../../actions";
import MenuListScreen from "../../screens/owner/menu/MenuListScreen";
import MAInfoScreen from "../../screens/owner/menu/MAInfoScreen";
import MACategoryTagScreen from "../../screens/owner/menu/MACategoryTagScreen";
import MenuViewScreen from "../../screens/owner/menu/MenuViewScreen";
import styles from "../../screens/styles";

const listOptions = {
  screen: MenuListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu List",
    headerLeft: (
      <Avatar
        containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
        overlayContainerStyle={{ backgroundColor: "transparent" }}
        icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
        size={50}
        onPress={() => navigation.openDrawer()}
      />
    ),
    headerRight: (
      <View style={styles.flexContainerRow}>
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
          onPress={_.debounce(() => navigation.push("MAInfo"), 1000, {
            leading: true,
            trailing: false
          })}
          containerStyle={{ marginRight: 5 }}
        />
      </View>
    )
  })
};
const infoOptions = {
  screen: MAInfoScreen,
  navigationOptions: ({ navigation }) => ({
    title: navigation.getParam("menuId") ? "Edit Menu" : "Add Menu",
    headerLeft: (
      <HeaderBackButton
        tintColor={"white"}
        onPress={() => navigation.goBack()}
      />
    )
  })
};

const categoryTagOptions = {
  screen: MACategoryTagScreen,
  navigationOptions: ({ navigation }) => ({
    title: navigation.getParam("menuId") ? "Edit Menu" : "Add Menu",
    headerLeft: (
      <HeaderBackButton
        tintColor={"white"}
        onPress={() => navigation.goBack()}
      />
    )
  })
};

const viewOptions = {
  screen: MenuViewScreen,
  navigationOptions: ({ navigation }) => ({
    title: "Menu Details",
    headerLeft: (
      <HeaderBackButton
        tintColor={"white"}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <View style={{ flexDirection: "row", backgroundColor: "#11CDEF" }}>
        <Avatar
          rounded
          containerStyle={{ backgroundColor: "#transparent" }}
          overlayContainerStyle={{ backgroundColor: "#EF2D56" }}
          icon={{ name: "trash", type: "font-awesome" }}
          size={40}
          onPress={() =>
            Alert.alert("Delete Item", "Are you sure?", [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "OK",
                onPress: () => {
                  deleteMenu(navigation.getParam("menuId"))
                    .then(res => {
                      if (res.data.success) {
                        alert("item deleted");
                        navigation.navigate("MenuList");
                      }
                    })
                    .catch(err => {
                      alert(errorHandler(err));
                    });
                }
              }
            ])
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
            navigation.navigate("MAInfo", {
              menuId: navigation.getParam("menuId")
            })
          }
          containerStyle={{ marginRight: 5 }}
        />
      </View>
    )
  })
};

const defaultOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: "#11CDEF"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  },
  headerLeft: (
    <Avatar
      containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
      overlayContainerStyle={{ backgroundColor: "transparent" }}
      icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
      size={50}
      onPress={() => navigation.openDrawer()}
    />
  )
});

export default createStackNavigator(
  {
    MenuList: listOptions,
    MAInfo: infoOptions,
    MACategoryTag: categoryTagOptions,
    MenuView: viewOptions
  },
  {
    defaultNavigationOptions: defaultOptions
  }
);
