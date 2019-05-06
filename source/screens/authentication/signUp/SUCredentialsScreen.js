import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

import { registerCustomer, inputHandler } from "../../../actions";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import KeyboardShift from "../../../components/KeyboardShift";
import styles from "../../styles";

class SUCredentialsScreen extends Component {
  state = {
    email: { text: "", error: "" },
    password: { text: "", error: "" },
    passwordConfirm: { text: "", error: "" },
    loading: false
  };

  checkError = () => {
    const { email, password, passwordConfirm } = this.state;
    return (
      email.error == "" &&
      password.error == "" &&
      passwordConfirm.error == "" &&
      email.text != "" &&
      password.text != "" &&
      passwordConfirm.text != ""
    );
  };

  handleRegister = () => {
    const { email, password, passwordConfirm } = this.state;
    if (this.checkError()) {
      const {
        firstName,
        middleName,
        lastName,
        contact,
        address
      } = this.props.navigation.state.params;
      this.setState({ loading: true });
      registerCustomer({
        firstName,
        middleName,
        lastName,
        contact,
        address,
        email: email.text,
        password: password.text,
        passwordConfirm: passwordConfirm.text
      })
        .then(res => {
          if (res.data.success) {
            alert(res.data.message);
            this.props.navigation.popToTop();
          } else {
            const {
              reg_email,
              reg_password,
              reg_password_confirm
            } = res.data.errors;
            this.setState({
              email: { ...email, error: reg_email[0] },
              password: { ...password, error: reg_password[0] },
              passwordConfirm: {
                ...passwordConfirm,
                error: reg_password_confirm[0]
              }
            });
          }
          this.setState({ loading: false });
        })
        .catch(err => alert(errorHandler(err)));
    } else
      this.setState({
        email: inputHandler({ email }, "email"),
        password: inputHandler({ password }, "password"),
        passwordConfirm: inputHandler(
          { password, confirmPassword: passwordConfirm },
          "confirmPassword"
        )
      });
  };
  render() {
    const { email, password, passwordConfirm, loading } = this.state;
    const { handleRegister } = this;
    const { authButtonContainer, authButtonSize } = styles;

    return (
      <KeyboardShift style={styles.flexContainer}>
        <View style={{ flex: 5, justifyContent: "space-around" }}>
          <View
            style={[
              styles.horizontalPadding16,
              { flex: 1, justifyContent: "center" }
            ]}
          >
            <Text>
              Please provide your email address and create your password.
            </Text>
          </View>
          <FloatingLabelInput
            label={"Email"}
            value={email.text}
            onChangeText={text => this.setState({ email: { text } })}
            onBlur={() =>
              this.setState({
                email: inputHandler({ email }, "email")
              })
            }
            keyboardType={"email-address"}
            editable={!loading}
            errorMessage={email.error}
            containerStyle={styles.horizontalPadding16}
          />
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
            containerStyle={styles.horizontalPadding16}
          />
          <FloatingLabelInput
            label={"Re-type Password"}
            value={passwordConfirm.text}
            onChangeText={text => this.setState({ passwordConfirm: { text } })}
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
            containerStyle={styles.horizontalPadding16}
          />
        </View>

        <View style={[authButtonContainer, { flex: 2 }]}>
          <Button
            title={"CREATE ACCOUNT "}
            titleStyle={{ color: "white" }}
            buttonStyle={styles.authButton}
            containerStyle={[authButtonSize, { width: "50%" }]}
            raised
            onPress={handleRegister.bind(this)}
            loading={loading}
          />
        </View>
      </KeyboardShift>
    );
  }
}

export default SUCredentialsScreen;
