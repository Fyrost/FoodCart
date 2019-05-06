import React, { Component } from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";

import {
  loginUser,
  resendVerify,
  setAuthorization,
  errorHandler
} from "../../actions";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import styles from "../styles";

class LoginScreen extends Component {
  state = {
    email: "ryantesoro@yahoo.com",
    password: "123456",
    error: "",
    loading: false,
    loadingResend: false,
    showResend: false,
    token: ""
  };

  onLogin() {
    const { email, password } = this.state;
    this.setState({ loading: true, error: "", showResend: false });
    loginUser({ email, password })
      .then(res => {
        if (res.data.success) {
          const { token, access_level } = res.data.data;
          this.setState({ loading: false });
          const authorization = "Bearer " + token;
          AsyncStorage.setItem("token", authorization);
          AsyncStorage.setItem("accessLevel", access_level);
          setAuthorization(authorization);
          this.props.navigation.navigate(
            access_level == "3"
              ? "Admin"
              : access_level == "2"
              ? res.data.data.info
                ? "OwnerInitial"
                : "OwnerDrawer"
              : "User"
          );
        } else {
          this.setState({ error: res.data.message });
          this.setState({ loading: false });
          if (res.data.data) {
            const { token } = res.data.data;
            this.setState({ showResend: true, token });
          }
          console.log(this.state.showResend);
        }
      })
      .catch(err =>
        this.setState({
          loading: false,
          error: errorHandler(err)
        })
      );
  }

  onResend = () => {
    const { token } = this.state;
    this.setState({ loadingResend: true, error: "" });
    resendVerify(token)
      .then(res => {
        const { success, message } = res.data;
        if (success) this.setState({ showResend: false });
        this.setState({
          loadingResend: false,
          password: "",
          error: message
        });
      })
      .catch(err => {
        this.setState({
          loadingResend: false,
          password: "",
          error: errorHandler(err)
        });
      });
  };

  render() {
    const {
      email,
      password,
      loading,
      error,
      showResend,
      loadingResend
    } = this.state;
    const { onLogin, onResend } = this;
    const { navigate } = this.props.navigation;
    const {
      flexContainer,
      loginLogoContainer,
      loginLogo,
      loginInputContainer,
      loginButtonContainer,
      loginButton,
      loginButtonSize,
      loginLink
    } = styles;

    return (
      <View style={flexContainer}>
        <View style={loginLogoContainer}>
          <Image
            style={loginLogo}
            source={require("../../../assets/images/logo3.png")}
          />
        </View>

        <View style={loginInputContainer}>
          <FloatingLabelInput
            label={"Email"}
            value={email}
            onChangeText={email => this.setState({ email })}
            keyboardType={"email-address"}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
            editable={!loading}
          />
          <FloatingLabelInput
            label={"Password"}
            value={password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
            inputRef={input => {
              this.passwordInput = input;
            }}
            returnKeyLabel="login"
            onSubmitEditing={onLogin.bind(this)}
            editable={!loading}
          />
          <View style={{ flexDirection: "row", height: 40 }}>
            <Text style={{ color: "red", flex: 1 }}>{error}</Text>
          </View>
        </View>

        <View style={loginButtonContainer}>
          <Button
            title={"RESEND VERIFICATION"}
            buttonStyle={[loginButton, { backgroundColor: 'orange' }]}
            containerStyle={[
              loginButtonSize,
              {
                display: showResend ? "flex" : "none",
                top: 0,
                backgroundColor:'orange'
              }
            ]}
            onPress={onResend.bind(this)}
            loading={loadingResend}
            raised
          />
            
          <Button
            title={"LOGIN "}
            buttonStyle={[loginButton]}
            containerStyle={loginButtonSize}
            onPress={onLogin.bind(this)}
            loading={loading}
            raised
          />
          <Text
            style={loginLink}
            onPress={() => {
              navigate("FPEmail");
            }}
            disabled={loading}
          >
            Forgot Password?
          </Text>
          <Text
            style={loginLink}
            onPress={() => {
              navigate("SUType");
            }}
            disabled={loading}
          >
            New User? Sign up an account.
          </Text>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
