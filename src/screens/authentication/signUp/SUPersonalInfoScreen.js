import React from "react";
import { View } from "react-native";

import { Button, Text } from "react-native-elements";

import { inputHandler } from "../../../actions";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import KeyboardShift from "../../../components/KeyboardShift";
import styles from "../../styles";

class SUPersonalInfoScreen extends React.Component {
  state = {
    firstName: { text: "", error: "" },
    middleName: { text: "", error: "" },
    lastName: { text: "", error: "" },
    contact: { text: "", error: "" },
    address: { text: "", error: "" }
  };

  checkError = () => {
    const { firstName, middleName, lastName, contact, address } = this.state;
    return (
      firstName.error == "" &&
      middleName.error == "" &&
      lastName.error == "" &&
      contact.error == "" &&
      address.error == "" &&
      firstName.text != "" &&
      middleName.text != "" &&
      lastName.text != "" &&
      contact.text != "" &&
      address.text != ""
    );
  };

  handleContinue = () => {
    const { firstName, middleName, lastName, contact, address } = this.state;
    this.checkError()
      ? this.props.navigation.navigate("SUCredentials", {
          firstName: firstName.text,
          middleName: middleName.text,
          lastName: lastName.text,
          contact: contact.text,
          address: address.text
        })
      : this.setState({
          firstName: inputHandler({ firstName }, "firstName"),
          middleName: inputHandler({ middleName }, "middleName"),
          lastName: inputHandler({ lastName }, "lastName"),
          contact: inputHandler({ contact }, "contact"),
          address: inputHandler({ address }, "address")
        });
  };

  render() {
    const { firstName, middleName, lastName, contact, address } = this.state;
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
            <Text>Please provide your information.</Text>
          </View>
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
            keyboardType={"number-pad"}
            containerStyle={styles.horizontalPadding16}
          />
          <FloatingLabelInput
            label={"Address"}
            value={address.text}
            onChangeText={text => this.setState({ address: { text } })}
            onBlur={() =>
              this.setState({
                address: inputHandler({ address }, "address")
              })
            }
            errorMessage={address.error}
            containerStyle={styles.horizontalPadding16}
          />
        </View>

        <View style={[styles.authButtonContainer, { flex: 2 }]}>
          <Button
            title={"CONTINUE "}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={styles.authButtonSize}
            raised
            onPress={handleContinue.bind(this)}
          />
        </View>
      </KeyboardShift>
    );
  }
}

export default SUPersonalInfoScreen;
