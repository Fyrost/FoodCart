import React, { Component } from "react";
import { View } from "react-native";

import { Button, Text } from "react-native-elements";

import styles from "../../styles";

class SUCredentialsScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 2,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text h3>Sign Up Now</Text>
          <Text style={{ marginTop: 5, fontSize: 18 }}>
            And explore more foods with us!
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Button
            title={"Be a partner"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={[styles.authButtonSize, { width: "50%" }]}
            onPress={() => this.props.navigation.navigate("SURestaurant")}
            raised
          />
          <Button
            title={"I just want to order foods"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={[styles.authButtonSize, { width: "50%" }]}
            onPress={() => this.props.navigation.navigate("SUPersonalInfo")}
            raised
          />
        </View>
        <View style={{ flex: 4 }} />
      </View>
    );
  }
}

export default SUCredentialsScreen;
