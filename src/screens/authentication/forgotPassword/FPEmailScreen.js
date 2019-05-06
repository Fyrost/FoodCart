import React, { Component } from "react";
import { Text, View } from "react-native";

import { Button } from "react-native-elements";

import {
  sendForgotPassword,
  errorHandler,
  inputHandler
} from "../../../actions";
import { MessageAlert } from "../../../components/Alerts";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import styles from "../../styles";

class FPEmailScreen extends Component {
  state = {
    email: { text: "", error: "" },
    loading: false
  };

  handleSend = () => {
    const { email } = this.state;
    this.setState({ loading: true });
    sendForgotPassword(email.text)
      .then(res => {
        const { success, message } = res.data;
        if (success) {
          MessageAlert("Forgot Password", message);
          this.props.navigation.navigate("FPCode", { email: email.text });
        } else {
          const { errors } = res.data;
          this.setState({
            email: {
              ...email,
              error: errors ? errors.forgot_email[0] : message
            }
          });
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        MessageAlert("Forgot Password", errorHandler(err));
      });
  };
  render() {
    const title = "Forgot Password?";
    const paragraph = "Please enter your email address to reset your password.";
    const { email, loading } = this.state;
    const { handleSend } = this;
    return (
      <View style={styles.authContainer}>
        <View style={styles.authTitleContainer}>
          <Text style={styles.authtitleText}>{title}</Text>
        </View>

        <View style={styles.authTextContainer}>
          <Text style={styles.authText}>{paragraph}</Text>
        </View>

        <View style={styles.authInputContainer}>
          <View style={styles.authInputRow}>
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
            />
          </View>
        </View>

        <View style={styles.authButtonContainer}>
          <Button
            title={"CONTINUE"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={styles.authButtonSize}
            raised
            loading={loading}
            onPress={handleSend.bind(this)}
          />
        </View>
        <View style={styles.authButtonContainer}>
          <Button
            title={"Already have the Token"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={styles.authButtonSize}
            raised
            disabled={loading}
            onPress={() => this.props.navigation.navigate("FPCode")}
          />
        </View>
      </View>
    );
  }
}

export default FPEmailScreen;
