import React, { Component } from "react";
import { View, Text } from "react-native";

import { Button } from "react-native-elements";

import { inputHandler } from "../../../actions";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import KeyboardShift from "../../../components/KeyboardShift";
import styles from "../../styles";

class SURestaurantInfoScreen extends Component {
  state = {
    firstName: { text: "", error: "" },
    middleName: { text: "", error: "" },
    lastName: { text: "", error: "" },
    contact: { text: "", error: "" },
    email: { text: "" }
  };

  checkError = () => {
    const { firstName, middleName, lastName, contact, email } = this.state;
    return (
      firstName.error == "" &&
      middleName.error == "" &&
      lastName.error == "" &&
      contact.error == "" &&
      email.error == "" &&
      firstName.text != "" &&
      middleName.text != "" &&
      lastName.text != "" &&
      contact.text != "" &&
      email.text != ""
    );
  };

  handleContinue = () => {
    const { firstName, middleName, lastName, contact, email } = this.state;
    const { restoName, address } = this.props.navigation.state.params;
    this.checkError()
      ? this.props.navigation.navigate("SuRestaurantCredentials", {
          restoName,
          address,
          firstName: firstName.text,
          middleName: middleName.text,
          lastName: lastName.text,
          contact: contact.text,
          email: email.text
        })
      : this.setState({
          firstName: inputHandler({ firstName }, "firstName"),
          middleName: inputHandler({ middleName }, "middleName"),
          lastName: inputHandler({ lastName }, "lastName"),
          contact: inputHandler({ contact }, "contact"),
          email: inputHandler({ email }, "email")
        });
  };

  render() {
    const { firstName, middleName, lastName, contact, email } = this.state;
    const { handleContinue } = this;
    return (
      <KeyboardShift style={styles.flexContainer}>
        <View style={{ flex: 5, justifyContent: "space-around" }}>
          <View
            style={[
              styles.horizontalPadding16,
              { flex: 1, justifyContent: "center" }
            ]}
          >
            <Text>Please fill up your necessary information below.</Text>
          </View>

          <View style={styles.flexContainer}>
            <FloatingLabelInput
              label={"First Name"}
              value={firstName.text}
              onChangeText={text => this.setState({ firstName: { text } })}
              onBlur={() =>
                this.setState({
                  firstName: inputHandler({ firstName }, "firstName")
                })
              }
              autoCapitalize={"words"}
              errorMessage={firstName.error}
              containerStyle={styles.horizontalPadding16}
            />
          </View>

          <View style={styles.flexContainer}>
            <FloatingLabelInput
              label={"Middle Name"}
              value={middleName.text}
              onChangeText={text => this.setState({ middleName: { text } })}
              onBlur={() =>
                this.setState({
                  middleName: inputHandler({ middleName }, "middleName")
                })
              }
              autoCapitalize={"words"}
              errorMessage={middleName.error}
              containerStyle={styles.horizontalPadding16}
            />
          </View>

          <View style={styles.flexContainer}>
            <FloatingLabelInput
              label={"Last Name"}
              value={lastName.text}
              onChangeText={text => this.setState({ lastName: { text } })}
              onBlur={() =>
                this.setState({
                  lastName: inputHandler({ lastName }, "lastName")
                })
              }
              autoCapitalize={"words"}
              errorMessage={lastName.error}
              containerStyle={styles.horizontalPadding16}
            />
          </View>

          <View style={styles.flexContainer}>
            <FloatingLabelInput
              label={"Contact Number"}
              value={contact.text}
              onChangeText={text => this.setState({ contact: { text } })}
              onBlur={() =>
                this.setState({
                  contact: inputHandler({ contact }, "contact")
                })
              }
              errorMessage={contact.error}
              keyboardType={"numeric"}
              containerStyle={styles.horizontalPadding16}
            />
          </View>

          <View style={styles.flexContainer}>
            <FloatingLabelInput
              label={"Email"}
              value={email.text}
              onChangeText={text => this.setState({ email: { text } })}
              onBlur={() =>
                this.setState({
                  email: inputHandler({ email }, "email")
                })
              }
              errorMessage={email.error}
              keyboardType={"email-address"}
              containerStyle={styles.horizontalPadding16}
            />
          </View>
        </View>

        <View style={[styles.authButtonContainer, { flex: 2 }]}>
          <Button
            title={"NEXT"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={[styles.authButtonSize, { width: "50%" }]}
            raised
            onPress={handleContinue}
            loading={this.state.loading}
          />
        </View>
      </KeyboardShift>
    );
  }
}

export default SURestaurantInfoScreen;
