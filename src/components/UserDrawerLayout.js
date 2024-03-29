import React, { Component } from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import DrawerLayout from "./DrawerLayout";
import _ from 'lodash'
export default class UserDrawerLayout extends Component {
  userButton = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Button
        title={"Favorites"}
        icon={
          <Icon name={"heart"} type={"material-community"} color={"white"} />
        }
        titleStyle={{ paddingLeft: 10 }}
        buttonStyle={[styles.drawerButton, { backgroundColor: "#EA5B7A" }]}
        containerStyle={{ flex: 1 }}
        onPress={_.debounce(() => this.props.navigation.push("Favorite"), 1500, {
          leading: true,
          trailing: false
        })}
      />
      <Button
        title={"Cart"}
        icon={
          <Icon name={"shopping-cart"} type={"font-awesome"} color={"white"} />
        }
        titleStyle={{ paddingLeft: 10 }}
        buttonStyle={styles.drawerButton}
        containerStyle={{ flex: 1 }}
        onPress={_.debounce(() => this.props.navigation.push("Cart"), 1500, {
          leading: true,
          trailing: false
        })}
      />
    </View>
  );
  render() {
    return <DrawerLayout userButton={this.userButton} {...this.props} />;
  }
}

const styles = {
  
  drawerButton: {
    height: 35,
    borderRadius: 0
  },

};