import React from "react";
import { DrawerItems } from "react-navigation";
import { View, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { Image, Text, Divider, Icon, Button } from "react-native-elements";
import Axios from "axios";
import { ConfirmAlert } from "../components/Alerts";
import { logoutUser } from "../actions";
import logo from "../../assets/images/logo2.png";
import Loading from '../components/Loading'
let accessLevel = "";
export default class DrawerLayout extends React.Component {

  state = {
    loading: false
  }

  componentWillMount() {
    AsyncStorage.getItem("accessLevel").then(value => {
      accessLevel = value;
    });
  }

  makeRequestLeave = () => {
    this.setState({ loading: true })
    logoutUser().then(() => {
      AsyncStorage.clear();
      delete Axios.defaults.headers.common["Authorization"];
      this.setState({ loading: false })
      this.props.navigation.navigate("Auth");
    })
  }

  render() {
    return (
      <View style={styles.flexContainer}>
      <Loading loading={this.state.loading} opacity={0.5} size={50} />
        <View style={styles.drawerHeader}>
          <Image
            source={logo}
            style={{ height: 150, width: 150, resizeMode: "cover" }}
          />
        </View>

        <View style={styles.drawerContent}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                display: accessLevel === "1" ? "flex" : "none"
              }}
            >
              <Button
                title={"Favorites"}
                icon={
                  <Icon
                    name={"heart"}
                    type={"material-community"}
                    color={"white"}
                  />
                }
                titleStyle={{ paddingLeft: 10 }}
                buttonStyle={[
                  styles.drawerButton,
                  { backgroundColor: "#EA5B7A" }
                ]}
                containerStyle={{ flex: 1 }}
                onPress={()=>this.props.navigation.push('Favorite')}
              />
              <Button
                title={"Cart"}
                icon={
                  <Icon
                    name={"shopping-cart"}
                    type={"font-awesome"}
                    color={"white"}
                  />
                }
                titleStyle={{ paddingLeft: 10 }}
                buttonStyle={styles.drawerButton}
                containerStyle={{ flex: 1 }}
                onPress={()=>this.props.navigation.push('Cart')}
              />
            </View>
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
        <Divider />
        <View style={styles.drawerFooter}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <View style={[styles.flexContainerRow, styles.drawerFooterContent]}>
            <Icon name={"user-circle-o"} type={"font-awesome"} color={'#48494B'} />
              <Text style={styles.drawerFooterProfile}>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ConfirmAlert("Log out", "Do you want to logout?", () =>
              this.makeRequestLeave()
              );
            }}
          >
            <View style={[styles.flexContainerRow, styles.drawerFooterContent]}>
            <Icon name={"power-off"} type={"font-awesome"} color={'#48494B'}/>
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
    flex: 2,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  drawerAvatar: {
    height: 80,
    width: 80
  },
  
  drawerButton: {
    height: 35, 
    borderRadius: 0,
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
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: 20,
  },

  drawerFooterContent: {
    alignItems: "center"
  },

  drawerFooterProfile: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 30
  },

  drawerFooterLogout: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 33
  },
};
