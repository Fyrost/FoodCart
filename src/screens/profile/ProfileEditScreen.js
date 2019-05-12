import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import {
  Input,
  Button,
  ListItem,
  Overlay,
  Icon,
  Image
} from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { ImagePicker } from "expo";
import DatePicker from "react-native-datepicker";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import {
  getProfile,
  postProfile,
  updateUserPassword,
  errorHandler,
  inputHandler
} from "../../actions";
import KeyboardShift from "../../components/KeyboardShift";
import Loading from "../../components/Loading";
import styles from "../styles";
import { MessageAlert, ConfirmAlert } from "../../components/Alerts";

class ProfileEditScreen extends Component {
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
    tempImage: "",
    image: { uri: "" },
    flatRate: { text: "" },
    eta: { text: "" },
    openTime: { text: "" },
    closeTime: { text: "" },
    accessLevel: "",
    loading: false,
    screenLoading: false,
    updatePasswordLoading: false,
    error: "",
    layoutVisible: false,
    layoutEmailVisible: false,
    progress: ""
  };

  componentDidMount() {
    this.props.navigation.setParams({
      layoutVisible: this.handleLayout,
      layoutEmailVisible: this.handleEmailLayout
    });
    this.preRequest()
  }
  preRequest = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("accessLevel").then(value => {
      this.props.navigation.setParams({ accessLevel: value });
      this.setState(
        {
          accessLevel: value
        },
        this.makeRemoteRequest
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
              tempImage: {
                uri: `http://pinoyfoodcart.com/image/restaurant/${image_name}`
              },
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

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });
    if (!result.cancelled)
      this.setState({ image: { uri: result.uri, error: "" } });
  };

  handleLayout = () => {
    this.setState({
      layoutVisible: true
    });
  };

  handleEmailLayout = () => {
    this.setState({
      handleEmailLayout: true
    })
  }

  handleUpdatePassword = () => {
    const { password, passwordConfirm, passwordOld } = this.state;
    this.setState({
      updatePasswordLoading: true,
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
          MessageAlert("Change Password", message);
          this.setState({ layoutVisible: false });
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
            }
          });
        }
        this.setState({ updatePasswordLoading: false });
      })
      .catch(err => {
        this.setState({ updatePasswordLoading: false });
        MessageAlert("Change Password", errorHandler(err));
      });
  };

  handlePostProfile = () => {
    this.setState({ screenLoading: true });
    postProfile(
      this.state.accessLevel,
      {
        firstName: this.state.firstName.text,
        middleName: this.state.middleName.text,
        lastName: this.state.lastName.text,
        contact: this.state.contact.text,
        address: this.state.address.text,
        flatRate: this.state.flatRate.text,
        eta: this.state.eta.text,
        openTime: this.state.openTime.text,
        closeTime: this.state.closeTime.text,
        picture: this.state.image.uri
      },
      this.setState.bind(this)
    )
      .then(res => {
        const { success, message } = res.data;
        if (success) {
          const { message } = res.data;
          MessageAlert("Manage Profile", message);
          this.props.navigation.pop();
        } else {
          const {
            firstName,
            middleName,
            lastName,
            address,
            contact,
            flatRate,
            eta,
            openTime,
            closeTime,
            image
          } = this.state;
          const {
            reg_fname,
            reg_mname,
            reg_lname,
            address: apiAddress,
            reg_address,
            contact_number,
            reg_contact_number,
            flat_rate,
            eta: apiETA,
            open_time,
            close_time,
            image_name
          } = res.data.errors;
          this.setState({
            firstName: { ...firstName, error: reg_fname ? reg_fname[0] : "" },
            middleName: { ...middleName, error: reg_mname ? reg_mname[0] : "" },
            lastName: { ...lastName, error: reg_lname ? reg_lname[0] : "" },
            address: {
              ...address,
              error: apiAddress
                ? apiAddress[0]
                : reg_address
                ? reg_address[0]
                : ""
            },
            contact: {
              ...contact,
              error: contact_number
                ? contact_number[0]
                : reg_contact_number
                ? reg_contact_number[0]
                : ""
            },
            flatRate: { ...flatRate, error: flat_rate ? flat_rate[0] : "" },
            eta: { ...eta, error: apiETA ? apiETA[0] : "" },
            openTime: { ...openTime, error: open_time ? open_time[0] : "" },
            closeTime: { ...closeTime, error: close_time ? close_time[0] : "" },
            image: { ...image, error: image_name ? image_name[0] : "" }
          });
        }
        MessageAlert("Manage Profile", message);
        this.setState({ screenLoading: false });
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        MessageAlert("Manage Profile", errorHandler(err));
      });
  };

  renderUserProfile = () => {
    const {
      email,
      firstName,
      middleName,
      lastName,
      address,
      contact,
      loading
    } = this.state;
    return (
      <KeyboardShift style={[styles.horizontalPadding16, styles.flexContainer]}>
        <View style={{ height: 15 }} />
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
        />
      </KeyboardShift>
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
      tempImage,
      flatRate,
      eta,
      openTime,
      closeTime,
      loading
    } = this.state;
    return (
      <KeyboardShift style={styles.flexContainer}>
        <View style={styles.ownerFormHeader} />

        <View style={styles.ownerFormRow}>
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
          />
        </View>

        <View style={styles.ownerFormRow}>
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
          />
        </View>

        <View style={styles.ownerFormRow}>
          <FloatingLabelInput
            label={"Delivery Charge"}
            value={flatRate.text}
            onChangeText={text => this.setState({ flatRate: { text } })}
            onBlur={() =>
              this.setState({
                flatRate: inputHandler(
                  {
                    flatRate: this.state.flatRate
                  },
                  "flatRate"
                )
              })
            }
            editable={!loading}
            errorMessage={flatRate.error}
            keyboardType={"number-pad"}
          />
        </View>

        <View style={styles.ownerFormRow}>
          <FloatingLabelInput
            label={"Delivery Time in Minutes"}
            value={eta.text}
            onChangeText={text => this.setState({ eta: { text } })}
            onBlur={() =>
              this.setState({
                eta: inputHandler(
                  {
                    eta: this.state.eta
                  },
                  "eta"
                )
              })
            }
            editable={!loading}
            errorMessage={eta.error}
            keyboardType={"number-pad"}
          />
        </View>

        <View style={styles.ownerFormRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.ownerFormText}>Opening Time</Text>
            <Text style={{ color: "#EF1B17", flexWrap: "wrap" }}>
              {this.state.openTime.error}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <DatePicker
              date={openTime.text}
              mode={"time"}
              format={"HH:mm"}
              is24Hour
              minData={"00:00"}
              maxDate={"23:45"}
              confirmBtnText={"Confirm"}
              // androidMode={'spinner'}
              cancelBtnText={"Cancel"}
              minuteInterval={15}
              onDateChange={text =>
                this.setState({ openTime: { text, error: "" } })
              }
              iconComponent={
                <Icon name={"access-time"} size={32} color={"#11CDEF"} />
              }
              customStyles={{
                dateInput: styles.ownerFormPicker,
                dateText: styles.ownerFormText
              }}
              disabled={loading}
            />
            <Text style={{ color: "transparent", fontSize: 5 }}>a</Text>
          </View>
        </View>

        <View style={styles.ownerFormRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.ownerFormText}>Closing Time</Text>
            <Text style={{ color: "#EF1B17", flexWrap: "wrap" }}>
              {this.state.closeTime.error}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <DatePicker
              date={closeTime.text}
              mode={"time"}
              format={"HH:mm"}
              is24Hour
              minData={"00:00"}
              maxDate={"23:45"}
              confirmBtnText={"Confirm"}
              cancelBtnText={"Cancel"}
              // androidMode={'spinner'}
              minuteInterval={15}
              onDateChange={text =>
                this.setState({ closeTime: { text, error: "" } })
              }
              iconComponent={
                <Icon name={"access-time"} size={32} color={"#11CDEF"} />
              }
              customStyles={{
                dateInput: styles.ownerFormPicker,
                dateText: styles.ownerFormText
              }}
              disabled={loading}
            />
            <Text style={{ color: "transparent", fontSize: 5 }}>a</Text>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <ListItem
            title={"Restaurant Image"}
            subtitle={
              <View>
                <Button
                  title={"Choose Photo"}
                  buttonStyle={{ backgroundColor: "#11CDEF" }}
                  disabled={loading}
                  onPress={() => this.pickImage()}
                />
                <Text style={{ color: "#EF1B17" }}>
                  {this.state.image.error}
                </Text>
              </View>
            }
            chevron={false}
            leftElement={
              <View>
                <Image
                  source={
                    this.state.image.uri
                      ? { uri: this.state.image.uri }
                      : tempImage
                  }
                  style={{ resizeMode: "cover", height: 100, width: 100 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            }
          />
        </View>
      </KeyboardShift>
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
      <KeyboardShift style={[styles.horizontalPadding16, styles.flexContainer]}>
        <View style={{ height: 15 }} />
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
        />
      </KeyboardShift>
    );
  };
  
  renderPasswordOverlay = () => {
    const {
      layoutVisible,
      passwordOld,
      password,
      passwordConfirm,
      updatePasswordLoading
    } = this.state;
    return (
      <Overlay
        isVisible={layoutVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        containerStyle={styles.flexContainer}
        onBackdropPress={() => this.setState({ layoutVisible: false })}
      >
        <View>
          <View style={[styles.categoryOverlayContainer, {}]}>
            <Text style={styles.categoryOverlayTitle} h4>
              Change Password
            </Text>
          </View>
          <View style={styles.horizontalPadding16}>
            <Input
              placeholder={"Old Password"}
              value={passwordOld.text}
              onChangeText={text => this.setState({ passwordOld: { text } })}
              secureTextEntry
            />
            <Text style={{ color: "red" }}>{passwordOld.error}</Text>
            <Input
              placeholder={"Password"}
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
              placeholder={"Re-type Password"}
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
          <View
            style={[styles.flexContainerRow, styles.categoryOverlayContainer]}
          >
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
              loading={updatePasswordLoading}
              disabled={updatePasswordLoading}
              containerStyle={styles.categoryOverlayButton}
            />
          </View>
        </View>
      </Overlay>
    );
  };

  renderEmailOverlay = () => {
    const {
      layoutEmailVisible,
      passwordOld,
      password,
      passwordConfirm,
      updatePasswordLoading
    } = this.state;
    return (
      <Overlay
        isVisible={layoutVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        containerStyle={styles.flexContainer}
        onBackdropPress={() => this.setState({ layoutVisible: false })}
      >
        <View>
          <View style={[styles.categoryOverlayContainer, {}]}>
            <Text style={styles.categoryOverlayTitle} h4>
              Change Password
            </Text>
          </View>
          <View style={styles.horizontalPadding16}>
            <Input
              placeholder={"Old Password"}
              value={passwordOld.text}
              onChangeText={text => this.setState({ passwordOld: { text } })}
              secureTextEntry
            />
            <Text style={{ color: "red" }}>{passwordOld.error}</Text>
            <Input
              placeholder={"Password"}
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
              placeholder={"Re-type Password"}
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
          <View
            style={[styles.flexContainerRow, styles.categoryOverlayContainer]}
          >
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
              loading={updatePasswordLoading}
              disabled={updatePasswordLoading}
              containerStyle={styles.categoryOverlayButton}
            />
          </View>
        </View>
      </Overlay>
    );
  };

  render() {
    if (this.state.loading) return <ActivityIndicator size="large" />;
    else if (this.state.error) return <Text>{this.state.error}</Text>;
    return (
      <View style={styles.flexContainer}>
        <NavigationEvents onWillFocus={this.preRequest} />
        <Loading loading={this.state.screenLoading} opacity={0.5} size={50} />
        {this.renderPasswordOverlay()}
        <View style={styles.ownerFormBody}>
          <ScrollView style={styles.flexContainer} contentContainerStyle={styles.horizontalPadding16}>
            {this.state.accessLevel == "3"
              ? this.renderAdminProfile()
              : this.state.accessLevel == "2"
              ? this.renderOwnerProfile()
              : this.renderUserProfile()}
          </ScrollView>
        </View>
        <Button
          title="UPDATE"
          containerStyle={{ flex: 1, justifyContent: "center" }}
          buttonStyle={{ flex: 1, backgroundColor: '#1B73B4' }}
          onPress={() =>
            ConfirmAlert(
              "Update Profile",
              "Do you want to update your Profile?",
              this.handlePostProfile
            )
          }
        />
      </View>
    );
  }
}

export default ProfileEditScreen;
