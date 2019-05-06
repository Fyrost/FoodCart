import React, { Component } from "react";
import { Text, View } from "react-native";

import { Button } from "react-native-elements";

import {
  resetForgotPassword,
  errorHandler,
  inputHandler
} from "../../../actions";
import { MessageAlert } from "../../../components/Alerts";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import styles from "../../styles";

class FPNewPasswordScreen extends Component {
  state = {
    token: "",
    email: "",
    password: { text: "", error: "" },
    passwordConfirm: { text: "", error: "" },
    loading: false
  };

  componentDidMount() {
    this.setState(({ email, token } = this.props.navigation.state.params));
  }

  handleReset = () => {
    const { token, email, password, passwordConfirm } = this.state;
    this.setState({ loading: true });
    resetForgotPassword({ token, email, password:password.text, passwordConfirm:passwordConfirm.text })
      .then(res => {
        const { success, message } = res.data;
        if (success) {
          this.props.navigation.popToTop();
          MessageAlert("Forgot Password", message);
        } else {
          const { forgot_password, forgot_password_confirm } = res.data.errors;
          this.setState({
            password: {
              ...password,
              error: forgot_password ? forgot_password[0] : ""
            },
            passwordConfirm: {
              ...passwordConfirm,
              error: forgot_password_confirm ? forgot_password_confirm[0] : ""
            }
          });
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        MessageAlert("Forgot Password", errorHandler(err));
        this.setState({ loading: false });
      });
  };

  render() {
    const title = "Change Password";
    const paragraph = "Please enter your new password.";
    const { password, passwordConfirm, loading } = this.state;
    const { handleReset } = this;
    return (
      <View style={styles.authContainer}>
        <View style={styles.authTitleContainer}>
          <Text style={styles.authtitleText}>{title}</Text>
        </View>
        <View style={styles.authTextContainer}>
          <Text style={styles.authText}>{paragraph}</Text>
        </View>

        <View style={styles.authInputContainer}>
          <View style={[styles.authInputRow, { marginTop: 10 }]}>
            <FloatingLabelInput
              label={"Password"}
              value={password.text}
              onChangeText={text => this.setState({ password: { text } })}
              onBlur={() =>
                this.setState({
                  password: inputHandler({ password }, "password")
                })
              }
              errorMessage={password.error}
              editable={!loading}
              secureTextEntry={true}
            />
          </View>

          <View style={[styles.authInputRow, { marginTop: 40 }]}>
            <FloatingLabelInput
              label={"Re-type Password"}
              value={passwordConfirm.text}
              onChangeText={text =>
                this.setState({ passwordConfirm: { text } })
              }
              onBlur={() =>
                this.setState({
                  passwordConfirm: inputHandler(
                    { password, confirmPassword: passwordConfirm },
                    "confirmPassword"
                  )
                })
              }
              errorMessage={passwordConfirm.error}
              editable={!loading}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.authButtonContainer}>
          <Button
            title={"DONE"}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={styles.authButtonSize}
            loading={loading}
            onPress={handleReset.bind(this)}
            raised
          />
        </View>
      </View>
    );
  }
}

export default FPNewPasswordScreen;
