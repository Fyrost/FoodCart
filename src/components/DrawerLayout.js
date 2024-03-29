import React, { Component } from "react";
import { DrawerItems } from "react-navigation";
import { View, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { Image, Text, Divider, Icon, Button } from "react-native-elements";
import Axios from "axios";
import { ConfirmAlert } from "../components/Alerts";
import { logoutUser, getNotification, errorHandler } from "../actions";
import logo from "../../assets/images/logo2.png";
import Loading from "../components/Loading";
export default class DrawerLayout extends Component {
  state = {
    loading: false,
    accessLevel: ""
  };

  componentWillMount() {
    AsyncStorage.getItem("accessLevel").then(res => {
      this.setState({ accessLevel: res });
    });
  }

  makeRequestLeave = () => {
    this.setState({ loading: true });
    this.props.navigation.closeDrawer();
    logoutUser()
      .then(() => {
        AsyncStorage.clear();
        delete Axios.defaults.headers.common["Authorization"];
        this.setState({ loading: false });
        this.props.navigation.navigate("Auth");
      })
      .catch(err => {
        AsyncStorage.clear();
        delete Axios.defaults.headers.common["Authorization"];
        this.setState({ loading: false });
        this.props.navigation.navigate("Auth");
      });
  };

  yourActivity = () => {
    this.props.navigation.closeDrawer();
    if (this.state.accessLevel === "2") {
      this.props.navigation.navigate("OwnerLogList");
    } else {
      this.props.navigation.navigate("AdminActivityList");
    }
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Loading loading={this.state.loading} opacity={0.5} size={50} />
        <View style={styles.drawerHeader}>
          <Image
            source={logo}
            style={{
              height: 150,
              width: 150,
              resizeMode: "cover",
              tintColor: "white"
            }}
          />
        </View>
        <View style={styles.drawerContent}>
          {this.props.userButton && this.props.userButton()}
          <ScrollView
            alwaysBounceVertical={false}
          >
            <DrawerItems
              activeTintColor={"white"}
              inactiveTintColor={"black"}
              activeBackgroundColor={"#5999C8"}
              inactiveBackgroundColor={"white"}
              itemsContainerStyle={{ top: -4 }}
              {...this.props}
            />
          </ScrollView>
        </View>
        <View style={styles.drawerFooter}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate("Profile");
            }}
          >
            <View style={[styles.flexContainerRow, styles.drawerFooterContent]}>
              <Icon
                name={"user-circle-o"}
                type={"font-awesome"}
                color={"#48494B"}
              />
              <Text style={styles.drawerFooterProfile}>Profile</Text>
            </View>
          </TouchableOpacity>
          {!this.props.userButton && (
            <TouchableOpacity onPress={this.yourActivity}>
              <View
                style={[styles.flexContainerRow, styles.drawerFooterContent]}
              >
                <Icon
                  name={"calendar"}
                  type={"antdesign"}
                  color={"#48494B"}
                />
                <Text style={styles.drawerFooterProfile}>My Activity</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              ConfirmAlert("Log out", "Do you want to logout?", () =>
                this.makeRequestLeave()
              );
            }}
          >
            <View style={[styles.flexContainerRow, styles.drawerFooterContent]}>
              <Icon
                name={"power-off"}
                type={"font-awesome"}
                color={"#48494B"}
              />
              <Text style={styles.drawerFooterLogout}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  flexContainer: {
    flex: 1
  },
  flexContainerRow: {
    flexDirection: "row"
  },
  drawerHeader: {
    flex: 3,
    backgroundColor: "#11CDEF",
    justifyContent: "center",
    alignItems: "center"
  },

  drawerAvatar: {
    height: 80,
    width: 80
  },

  drawerButton: {
    height: 35,
    borderRadius: 0
  },

  drawerTitle: {
    marginTop: 10,
    color: "white",
    fontSize: 20
  },

  drawerContent: {
    flex: 4,
    top: -4
  },

  drawerFooter: {
    // flex: 1,
    // justifyContent: "space-evenly",
    paddingVertical: 5,
    paddingLeft: 20,
    borderColor: "lightgrey",
    borderTopWidth: 0.8
  },

  drawerFooterContent: {
    paddingVertical: 10,
    alignItems: "center"
  },

  drawerFooterProfile: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 30
  },

  drawerFooterLogout: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 33
  }
};
