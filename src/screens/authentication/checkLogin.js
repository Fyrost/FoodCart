import React, { Component } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import { setAuthorization } from "../../actions";

class checkLogin extends Component {
  onCheck() {
    AsyncStorage.multiGet(["token", "accessLevel"]).then(res => {
      const token = res[0][1];
      const accessLevel = res[1][1];
      if (token && accessLevel) {
        setAuthorization(token);
        this.props.navigation.navigate(
          accessLevel == "3"
            ? "Admin"
            : accessLevel == "2"
            ? "OwnerDrawer"
            : "User"
        );
      } else {
        this.props.navigation.navigate("Auth");
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        {this.onCheck()}
      </View>
    );
  }
}

export default checkLogin;
