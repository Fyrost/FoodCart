import React, { Component } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  TextInput
} from "react-native";
import {
  Overlay,
  Card,
  Button,
  Input,
  Text,
  Icon
} from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import {
  getProfile,
  errorHandler,
  postEmailChangeRequest,
  updateUserPassword,
  inputHandler
} from "../../actions";
import logo from "../../../assets/images/logo.png";
import KeyboardShift from "../../components/KeyboardShift";
import Loading from "../../components/Loading";
import { MessageAlert, ConfirmAlert } from "../../components/Alerts";
class ProfileInfoScreen extends Component {
  state = {
    password: { text: "" },
    passwordConfirm: { text: "" },
    passwordOld: { text: "" },
    email: { text: "" },
    firstName: { text: "" },
    middleName: { text: "" },
    lastName: { text: "" },
    address: { text: "" },
    contact: { text: "" },
    restoName: { text: "" },
    picture: { uri: "" },
    flatRate: { text: "" },
    eta: { text: "" },
    openTime: { text: "" },
    closeTime: { text: "" },
    newEmail: { text: "" },
    reason: { text: "" },
    accessLevel: "",
    layoutPasswordVisible: false,
    layoutEmailVisible: false,
    screenLoading: false,
    updatePasswordLoading: false,
    loading: false,
    error: ""
  };
  componentDidMount() {
    this.preRequest();
  }
  preRequest = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("accessLevel").then(value => {
      this.setState(
        {
          loading: false,
          accessLevel: value
        },
        () => this.makeRemoteRequest()
      );
    });
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getProfile(this.state.accessLevel)
      .then(res => {
        if (res.data.success) {
          if (this.state.accessLevel == "1") {
            const {
              email,
              customer: { fname, mname, lname, address, contact_number }
            } = res.data.data;
            this.setState({
              email: { text: email },
              firstName: { text: fname },
              middleName: { text: mname },
              lastName: { text: lname },
              address: { text: address },
              contact: { text: contact_number }
            });
          } else if (this.state.accessLevel == "2") {
            const {
              user: { email },
              restaurant: {
                owner_fname,
                owner_mname,
                owner_lname,
                name,
                address,
                contact_number,
                image_name,
                flat_rate,
                eta,
                open_time,
                close_time
              }
            } = res.data.data;
            this.setState({
              email: { text: email },
              firstName: { text: owner_fname },
              middleName: { text: owner_mname },
              lastName: { text: owner_lname },
              address: { text: address },
              contact: { text: contact_number },
              restoName: { text: name },
              picture: { uri: image_name },
              flatRate: { text: flat_rate },
              eta: { text: eta },
              openTime: { text: open_time },
              closeTime: { text: close_time }
            });
          } else if (this.state.accessLevel == "3") {
            const {
              user: { email },
              admin: { fname, mname, lname, address, contact_number }
            } = res.data.data;
            this.setState({
              email: { text: email },
              firstName: { text: fname },
              middleName: { text: mname },
              lastName: { text: lname },
              address: { text: address },
              contact: { text: contact_number }
            });
          }
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, error: res.data.message });
        }
      })
      .catch(err => {
        this.setState({ loading: false, error: errorHandler(err) });
      });
  };

  handleLayout = () =>
    this.setState({
      layoutPasswordVisible: true
    });

  handleEmailLayout = () =>
    this.setState({
      layoutEmailVisible: true
    });

  handleRequestEmail = () => {
    const { newEmail, reason } = this.state;
    this.setState({
      layoutEmailVisible: false,
      screenLoading: true,
      newEmail: { ...newEmail, error: "" },
      reason: { ...reason, error: "" }
    });
    postEmailChangeRequest({
      newEmail: newEmail.text,
      reason: reason.text
    })
      .then(res => {
        const { success, message } = res.data;

        if (success) {
          this.setState({
            screenLoading: false,
            newEmail: { text: "", error: "" },
            reason: { text: "", error: "" }
          });
        } else {
          const { request_new_email, request_reason } = res.data.errors;
          this.setState({
            newEmail: {
              ...newEmail,
              error: request_new_email ? request_new_email[0] : ""
            },
            reason: {
              ...reason,
              error: request_reason ? request_reason[0] : ""
            },
            screenLoading: false,
            layoutEmailVisible: true
          });
        }
        MessageAlert("Request Email Change", message);
      })
      .catch(err => {
        this.setState({ screenLoading: false, layoutEmailVisible: true });
        MessageAlert("Request Email Change", errorHandler(err));
      });
  };

  handleUpdatePassword = () => {
    const { password, passwordConfirm, passwordOld } = this.state;
    this.setState({
      layoutPasswordVisible: false,
      screenLoading: true,
      passwordOld: { ...passwordOld, error: "" },
      password: { ...password, error: "" },
      passwordConfirm: { ...passwordConfirm, error: "" }
    });
    updateUserPassword({
      passwordOld: passwordOld.text,
      password: password.text,
      passwordConfirm: passwordConfirm.text
    })
      .then(res => {
        const { success, message } = res.data;

        if (success) {
          this.setState({
            screenLoading: false,
            passwordOld: { text: "", error: "" },
            password: { text: "", error: "" },
            passwordConfirm: { text: "", error: "" }
          });
        } else {
          const {
            user_old_password,
            user_password,
            user_password1
          } = res.data.errors;
          this.setState({
            passwordOld: {
              ...passwordOld,
              error: user_old_password ? user_old_password[0] : ""
            },
            password: {
              ...password,
              error: user_password ? user_password[0] : ""
            },
            passwordConfirm: {
              ...passwordConfirm,
              error: user_password1 ? user_password1[0] : ""
            },
            screenLoading: false,
            layoutPasswordVisible: true
          });
        }
        MessageAlert("Change Password", message);
      })
      .catch(err => {
        this.setState({ screenLoading: false, layoutPasswordVisible: true });
        MessageAlert("Change Password", errorHandler(err));
      });
  };

  renderEmailOverlay = () => {
    const { newEmail, reason, layoutEmailVisible } = this.state;
    const INITIAL_STATE = {
      layoutEmailVisible: false,
      newEmail: { text: "", error: "" },
      reason: { text: "", error: "" }
    };
    return (
      <Overlay
        isVisible={layoutEmailVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        containerStyle={styles.flex1}
        onBackdropPress={() => this.setState(INITIAL_STATE)}
      >
        <View>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={20}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: -28,
              top: -33
            }}
            onPress={() => this.setState(INITIAL_STATE)}
          />
          <ScrollView>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#1B73B4",
                marginTop: 15
              }}
            >
              Request Change Email
            </Text>
            <Text style={{ fontSize: 16, marginTop: 15 }}>
              New Email Address
            </Text>
            <TextInput
              placeholder={"Enter your new email address here"}
              value={newEmail.text}
              onChangeText={text => this.setState({ newEmail: { text } })}
              onBlur={() =>
                this.setState({
                  newEmail: inputHandler({ email: newEmail }, "email")
                })
              }
              style={{
                borderColor: "gray",
                borderWidth: 1,
                paddingHorizontal: 10
              }}
            />
            <Text style={{ color: "red" }}>{newEmail.error}</Text>
            <Text style={{ fontSize: 16, marginTop: 15 }}>
              Reason for changing email address
            </Text>
            <TextInput
              multiline={true}
              placeholder={"Enter your reason here..."}
              numberOfLines={5}
              value={reason.text}
              onChangeText={text => this.setState({ reason: { text } })}
              style={{
                borderColor: "gray",
                borderWidth: 1,
                paddingHorizontal: 10
              }}
            />
            <Text style={{ color: "red" }}>{reason.error}</Text>
            <Button
              clear
              title={"Submit Request"}
              onPress={() =>
                ConfirmAlert(
                  "Request",
                  "Continue to send your request?",
                  this.handleRequestEmail
                )
              }
            />
          </ScrollView>
        </View>
      </Overlay>
    );
  };

  renderPasswordOverlay = () => {
    const {
      layoutPasswordVisible,
      passwordOld,
      password,
      passwordConfirm,
      updatePasswordLoading
    } = this.state;

    const INITIAL_STATE = {
      layoutPasswordVisible: false,
      passwordOld: { text: "", error: "" },
      password: { text: "", error: "" },
      passwordConfirm: { text: "", error: "" },
      updatePasswordLoading
    };
    return (
      <Overlay
        isVisible={layoutPasswordVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        containerStyle={styles.flexContainer}
        onBackdropPress={() => this.setState(INITIAL_STATE)}
      >
        <View>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={20}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: -28,
              top: -33
            }}
            onPress={() => this.setState(INITIAL_STATE)}
          />
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Change Password
            </Text>
            <Input
              placeholder={"Old Password"}
              value={passwordOld.text}
              onChangeText={text => this.setState({ passwordOld: { text } })}
              secureTextEntry
            />
            <Text style={{ color: "red" }}>{passwordOld.error}</Text>
            <Input
              placeholder={"New Password"}
              value={password.text}
              onChangeText={text => this.setState({ password: { text } })}
              onBlur={() =>
                this.setState({
                  password: inputHandler({ password }, "password")
                })
              }
              secureTextEntry
            />
            <Text style={{ color: "red" }}>{password.error}</Text>
            <Input
              placeholder={"Re-Type New Password"}
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
              secureTextEntry
            />
            <Text style={{ color: "red" }}>{passwordConfirm.error}</Text>
          </View>
          <Button
            title={"UPDATE"}
            type="clear"
            onPress={() =>
              ConfirmAlert(
                "Change Password",
                "Do you want to Change your Password?",
                this.handleUpdatePassword
              )
            }
            containerStyle={styles.categoryOverlayButton}
          />
        </View>
      </Overlay>
    );
  };

  renderUserProfile = () => {
    const {
      email,
      firstName,
      middleName,
      lastName,
      address,
      contact
    } = this.state;
    return (
      <Card
        image={logo}
        imageStyle={{ marginTop: 25, height: 100 }}
        imageProps={{ resizeMode: "contain" }}
      >
        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>First Name</Text>
          <Text style={styles.cardRowText}>{firstName.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Middle Name</Text>
          <Text style={styles.cardRowText}>{middleName.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Last Name</Text>
          <Text style={styles.cardRowText}>{lastName.text}</Text>
        </View>

        <View style={styles.cardRow2}>
          <Text style={styles.cardRowTitle}>Address</Text>
          <Text style={styles.cardRowText}>{address.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Email</Text>
          <Text style={styles.cardRowText}>{email.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Contact Number</Text>
          <Text style={styles.cardRowText}># {contact.text}</Text>
        </View>

        <Button
          title={" Update Profile Information"}
          icon={{
            name: "edit",
            type: "font-awesome",
            color: "white"
          }}
          buttonStyle={{ backgroundColor: "#5999C8", borderRadius: 0 }}
          onPress={() => this.props.navigation.navigate("ProfileEdit")}
        />

        <Button
          title={" Request Change Email"}
          icon={{
            name: "email",
            type: "entypo",
            color: "white"
          }}
          buttonStyle={{
            backgroundColor: "#5999C8",
            marginTop: 3,
            borderRadius: 0
          }}
          onPress={() => this.handleEmailLayout()}
        />

        <Button
          title={" Change Password"}
          icon={{
            name: "textbox-password",
            type: "material-community",
            color: "white"
          }}
          buttonStyle={{
            backgroundColor: "#5999C8",
            marginTop: 3,
            borderRadius: 0
          }}
          onPress={() => this.handleLayout()}
        />
      </Card>
    );
  };

  renderOwnerProfile = () => {
    const {
      email,
      firstName,
      middleName,
      lastName,
      address,
      contact,
      restoName,
      picture,
      flatRate,
      eta,
      openTime,
      closeTime
    } = this.state;
    return (
      <ScrollView style={styles.flex1}>
        <Card
          title={
            <View style={styles.cardTitleContent}>
              <Text style={styles.cardTitleText}>Restaurant Information</Text>
            </View>
          }
          image={{
            uri: `http://pinoyfoodcart.com/image/restaurant/${picture.uri}`
          }}
          imageProps={{ resizeMode: "cover" }}
          wrapperStyle={styles.cardWrapper}
          titleStyle={styles.cardWrapper}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Restaurant Name</Text>
              <Text style={styles.cardRowText}>{restoName.text}</Text>
            </View>

            <View style={styles.cardRow2}>
              <Text style={styles.cardRowTitle}>Address</Text>
              <Text style={styles.cardRowText}>{address.text}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Flat Rate</Text>
              <Text style={styles.cardRowText}>{flatRate.text} PHP</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Estimated Time (ETA)</Text>
              <Text style={styles.cardRowText}>{eta.text} MINS</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Opening Time</Text>
              <Text style={styles.cardRowText}>{openTime.text}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Closing Time</Text>
              <Text style={styles.cardRowText}>{closeTime.text}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Contact Number</Text>
              <Text style={styles.cardRowText}># {contact.text}</Text>
            </View>

            <Button
              title={" Update Restaurant Information"}
              icon={{
                name: "edit",
                type: "font-awesome",
                color: "white"
              }}
              buttonStyle={{ backgroundColor: "#5999C8", borderRadius: 0 }}
              onPress={() => this.props.navigation.navigate("ProfileEdit")}
            />
          </View>
        </Card>

        <Card
          title={
            <View style={styles.cardTitleContent}>
              <Text style={styles.cardTitleText}>Account Information</Text>
            </View>
          }
          image={{
            uri: `http://pinoyfoodcart.com/image/restaurant/${picture.uri}`
          }}
          imageStyle={{ height: 0 }}
          titleStyle={styles.cardWrapper}
          wrapperStyle={styles.cardWrapper}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>First Name</Text>
              <Text style={styles.cardRowText}>{firstName.text}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Middle Name</Text>
              <Text style={styles.cardRowText}>{middleName.text}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Last Name</Text>
              <Text style={styles.cardRowText}>{lastName.text}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Email</Text>
              <Text style={styles.cardRowText}>{email.text}</Text>
            </View>
          </View>

          <Button
            title={" Request Change Email"}
            icon={{
              name: "email",
              type: "entypo",
              color: "white"
            }}
            buttonStyle={{ backgroundColor: "#5999C8", borderRadius: 0 }}
            onPress={() => this.handleEmailLayout()}
          />

          <Button
            title={" Change Password"}
            icon={{
              name: "textbox-password",
              type: "material-community",
              color: "white"
            }}
            buttonStyle={{
              backgroundColor: "#5999C8",
              marginTop: 3,
              borderRadius: 0
            }}
            onPress={() => this.handleLayout()}
          />
        </Card>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  };

  renderAdminProfile = () => {
    const {
      email,
      firstName,
      middleName,
      lastName,
      address,
      contact
    } = this.state;
    return (
      <Card
        image={logo}
        imageStyle={{ marginTop: 25, height: 100 }}
        imageProps={{ resizeMode: "contain" }}
      >
        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>First Name</Text>
          <Text style={styles.cardRowText}>{firstName.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Middle Name</Text>
          <Text style={styles.cardRowText}>{middleName.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Last Name</Text>
          <Text style={styles.cardRowText}>{lastName.text}</Text>
        </View>

        <View style={styles.cardRow2}>
          <Text style={styles.cardRowTitle}>Address</Text>
          <Text style={styles.cardRowText}>{address.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Email</Text>
          <Text style={styles.cardRowText}>{email.text}</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardRowTitle}>Contact Number</Text>
          <Text style={styles.cardRowText}># {contact.text}</Text>
        </View>

        <Button
          title={" Update Profile Information"}
          icon={{
            name: "edit",
            type: "font-awesome",
            color: "white"
          }}
          buttonStyle={{ backgroundColor: "#5999C8", borderRadius: 0 }}
          onPress={() => this.props.navigation.navigate("ProfileEdit")}
        />

        <Button
          title={" Change Password"}
          icon={{
            name: "textbox-password",
            type: "material-community",
            color: "white"
          }}
          buttonStyle={{
            backgroundColor: "#5999C8",
            marginTop: 3,
            borderRadius: 0
          }}
          onPress={() => this.handleLayout()}
        />
      </Card>
    );
  };

  render() {
    const { loading, error, accessLevel, screenLoading } = this.state;
    const {
      preRequest,
      renderAdminProfile,
      renderOwnerProfile,
      renderUserProfile
    } = this;
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{error}</Text>;
    return (
      <ScrollView style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={preRequest} />
        <Loading loading={screenLoading} size={"large"} />
        {this.renderPasswordOverlay()}
        {this.renderEmailOverlay()}
        {accessLevel == "3"
          ? renderAdminProfile()
          : accessLevel == "2"
          ? renderOwnerProfile()
          : renderUserProfile()}
      </ScrollView>
    );
  }
}

export default ProfileInfoScreen;

const styles = {
  flex1: {
    flex: 1
  },
  cardTitleContent: {
    backgroundColor: "#1B73B4",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50
  },
  cardTitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  cardWrapper: {
    margin: 0,
    padding: 0
  },
  cardContent: {
    flex: 4,
    justifyContent: "space-evenly"
  },
  cardRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "lightgrey",
    borderBottomWidth: 0.8
  },
  cardRow2: {
    flex: 2,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "lightgrey",
    borderBottomWidth: 0.8
  },
  cardRowTitle: {
    fontSize: 16,
    fontWeight: "500"
  },
  cardRowText: {
    fontWeight: "normal",
    textAlign: "left"
  },
  bottomSpacer: {
    flex: 1,
    height: 25
  }
};
