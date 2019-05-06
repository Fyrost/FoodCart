import React from "react";
import { Text, View } from "react-native";

import { Button } from "react-native-elements";
import {
  sendForgotPassword,
  verifyForgotPassword,
  errorHandler
} from "../../../actions";
import { MessageAlert } from "../../../components/Alerts";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import styles from "../../styles";

class FPCodeScreen extends React.Component {
  state = {
    token: "",
    email: "",
    submitLoading: false,
    resendLoading: false,
    error: ""
  };
  componentDidMount() {
    this.setState({ email: this.props.navigation.getParam("email", "") });
  }

  handleSubmit = () => {
    const { token } = this.state;
    this.setState({ submitLoading: true });
    verifyForgotPassword(token)
      .then(res => {
        const { success, message, data } = res.data;
        if (success)
          this.props.navigation.navigate("FPNewPass", {
            token,
            email: data.email
          });
        else MessageAlert("Forgot Password", message);
        this.setState({ submitLoading: false });
      })
      .catch(err => {
        MessageAlert("Forgot Password", errorHandler(err));
        this.setState({ submitLoading: false });
      });
  };

  handleResend = () => {
    const { email } = this.state;
    this.setState({ resendLoading: true });
    sendForgotPassword(email)
      .then(res => {
        const { message } = res.data;
        MessageAlert("Resend Token", message);
        this.setState({ resendLoading: false });
      })
      .catch(err => {
        this.setState({ resendLoading: false });
        MessageAlert("Forgot Password", errorHandler(err));
      });
  };

  render() {
    const Title = "Verify";
    const paragraphText =
      "For verification, please enter the token we sent you in your email.";
    const { email, resendLoading, submitLoading, token, error } = this.state;
    const { handleResend, handleSubmit } = this;
    return (
      <View style={styles.authContainer}>
        <View style={styles.authTitleContainer}>
          <Text style={styles.authtitleText}>{Title}</Text>
        </View>

        <View style={styles.authTextContainer}>
          <Text style={styles.authText}>{paragraphText}</Text>
        </View>

        <View style={styles.authInputContainer}>
          <View style={styles.authInputRow}>
            <FloatingLabelInput
              label={"Verification Token"}
              value={token}
              onChangeText={token => this.setState({ token })}
              errorMessage={error}
            />
          </View>
        </View>

        <View style={styles.authButtonContainer}>
          <Button
            title={"SUBMIT TOKEN"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={styles.authButtonSize}
            raised
            loading={submitLoading}
            onPress={handleSubmit.bind(this)}
          />

          {email ? (
            <Button
              title={"RE-SEND TOKEN"}
              titleStyle={{ color: "white" }}
              buttonStyle={[styles.authButton, { backgroundColor: "#0E79B2" }]}
              containerStyle={[
                styles.authButtonSize,
                { width: "50%", marginTop: 15 }
              ]}
              raised
              loading={resendLoading}
              onPress={handleResend.bind(this)}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default FPCodeScreen;
