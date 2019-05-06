import React, { Component } from "react";
import { View, Text } from "react-native";

import { Button } from "react-native-elements";

import { inputHandler } from "../../../actions";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import styles from "../../styles";

class SURestaurantInfoScreen extends Component {
  state = {
    restoName: { text: "", error: "" },
    address: { text: "", error: "" }
  };

  checkError = () => {
    const { restoName, address } = this.state;
    return (
      restoName.error == "" &&
      address.error == "" &&
      restoName.text != "" &&
      address.text != ""
    );
  };

  handleContinue = () => {
    const { restoName, address } = this.state;
    this.checkError
      ? this.props.navigation.navigate("SURestaurantOwnerInfo", {
          restoName: restoName.text,
          address: address.text
        })
      : this.setState({
          restoName: inputHandler({ restoName }, "restoName"),
          address: inputHandler({ address }, "address")
        });
  };

  render() {
    const { restoName, address } = this.state;
    const { handleContinue } = this;
    return (
      <View style={[styles.flexContainer, styles.horizontalPadding16]}>
        <View style={{ flex: 5, justifyContent: "space-around" }}>
          <View style={[{ flex: 1, justifyContent: "center" }]}>
            <Text>
              To become our partner, please enter your restaurant name and
              restaurant address.
            </Text>
          </View>
          <FloatingLabelInput
            label={"Restaurant Name"}
            value={restoName.text}
            onChangeText={text => this.setState({ restoName: { text } })}
            onBlur={() =>
              this.setState({
                restoName: inputHandler({ restoName }, "restoName")
              })
            }
            autoCapitalize={"words"}
            errorMessage={restoName.error}
          />
          <FloatingLabelInput
            label={"Restaurant Address"}
            value={address.text}
            onChangeText={text => this.setState({ address: { text } })}
            onBlur={() =>
              this.setState({
                address: inputHandler({ address }, "address")
              })
            }
            autoCapitalize={"words"}
            errorMessage={address.error}
          />
          <View style={{ flex: 2 }} />
        </View>
        <View style={[styles.authButtonContainer, { flex: 2 }]}>
          <Button
            title={"NEXT"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={[styles.authButtonSize, { width: "50%" }]}
            raised
            onPress={handleContinue.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default SURestaurantInfoScreen;
