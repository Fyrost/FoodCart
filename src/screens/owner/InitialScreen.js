import React, { Component } from "react";

import { View, Image } from "react-native";

import { Overlay, Icon, ListItem } from "react-native-elements";

import { Text, Button } from "react-native-elements";

import { ImagePicker } from "expo";
import DatePicker from "react-native-datepicker";
import { MessageAlert } from "../../components/Alerts";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import KeyboardShift from "../../components/KeyboardShift";
import { postRestoInfo, errorHandler, inputHandler } from "../../actions";
import logo from "../../../assets/images/logo3.png";
import styles from "../styles";

class InitialScreen extends Component {
  state = {
    toggleWelcomeOverlay: true,
    toggleHelpOverlay: false,
    flatRate: { text: "10", error: "" },
    eta: { text: "10", error: "" },
    openTime: { text: "12:00", error: "" },
    closeTime: { text: "1:45", error: "" },
    image: { uri: "", error: "" },
    progress: "",
    loading: false
  };

  checkError = () => {
    const { flatRate, eta, openTime, closeTime, image } = this.state;
    return (
      flatRate.error == "" &&
      eta.error == "" &&
      image.error == "" &&
      openTime.error == "" &&
      closeTime.error == "" &&
      flatRate.text != "" &&
      eta.text != "" &&
      image.uri != ""
    );
  };

  handlePost = () => {
    const { flatRate, eta, openTime, closeTime, image } = this.state;
    if (this.checkError()) {
      this.setState({ loading: true, progress: "" });
      postRestoInfo(
        {
          flatRate: flatRate.text,
          eta: eta.text,
          openTime: openTime.text,
          closeTime: closeTime.text,
          picture: image.uri
        },
        this.setState.bind(this)
      )
        .then(res => {
          if (res.data.success) {
            this.setState({ loading: false, progress: "" });
            alert(res.data.message);
            this.props.navigation.navigate("OwnerDrawer");
          } else {
            const {
              flat_rate,
              eta: ETA,
              open_time,
              close_time,
              image_name
            } = res.data.errors;
            this.setState({
              loading: false,
              progress: "",
              flatRate: { ...flatRate, error: flat_rate ? flat_rate[0] : "" },
              eta: { ...eta, error: ETA ? ETA[0] : "" },
              openTime: { ...openTime, error: open_time ? open_time[0] : "" },
              closeTime: {
                ...closeTime,
                error: close_time ? close_time[0] : ""
              },
              image: { ...image, error: image_name ? image_name[0] : "" }
            });
          }
        })
        .catch(error => {
          this.setState({ loading: false, progress: "" });
          MessageAlert("Restaurant Information", errorHandler(error));
        });
    } else {
      this.setState({
        flatRate: inputHandler({ flatRate }, "flatRate"),
        eta: inputHandler({ eta }, "eta"),
        image: inputHandler({ image }, "image")
      });
    }
  };

  handleHelpOverlay = () => {
    this.setState({ toggleHelpOverlay: !this.state.toggleHelpOverlay });
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });
    if (!result.cancelled)
      this.setState({ image: { uri: result.uri, error: "" } });
  };

  render() {
    const {
      flatRate,
      eta,
      openTime,
      closeTime,
      toggleWelcomeOverlay,
      loading
    } = this.state;
    return (
      <View style={styles.flexContainer}>
        <Overlay isVisible={toggleWelcomeOverlay} style={styles.flexContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.ownerOverlayHeader}>
              <Image source={logo} style={styles.ownerOverlayImage} />
              <Text style={styles.ownerOverlayTitle}>Welcome Partner!</Text>
              <View style={styles.ownerOverlaySubtitleContainer}>
                <Text style={styles.ownerOverlaySubtitle}>
                  We are very excited to have you in the team! But before we
                  continue to setting up your restaurant profile, let's start
                  with some necessary information first.
                </Text>
              </View>
              <Text style={styles.ownerOverlayText}>
                Click "OK" to continue
              </Text>
            </View>
            <Button
              title={"OK"}
              buttonStyle={styles.overlayButton}
              titleStyle={styles.overlayButtonTitle}
              onPress={() => this.setState({ toggleWelcomeOverlay: false })}
            />
          </View>
        </Overlay>

        <KeyboardShift
          style={[styles.horizontalPadding16, styles.ownerFormBody]}
        >
          <View style={styles.ownerFormHeader}>
            <View style={styles.ownerFormRow}>
              <Text>Please complete the form below.</Text>
            </View>
          </View>

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

          <View style={styles.ownerFormRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerFormText}>Opening Time</Text>
              <Text style={{ color: "#EF1B17", flexWrap: "wrap" }}>
                {this.state.openTime.error}
              </Text>
            </View>
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
          </View>

          <View style={styles.ownerFormRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerFormText}>Closing Time</Text>
              <Text style={{ color: "#EF1B17", flexWrap: "wrap" }}>
                {this.state.closeTime.error}
              </Text>
            </View>
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
                        : logo
                    }
                    style={{ resizeMode: "cover", height: 100, width: 100 }}
                  />
                </View>
              }
            />
          </View>

          <View style={styles.flexContainer} />
          <Button
            title={!loading ? "SUBMIT" : this.state.progress}
            containerStyle={styles.ownerFormButtonContainer}
            disabled={loading}
            onPress={this.handlePost.bind(this)}
          />
        </KeyboardShift>
      </View>
    );
  }
}

export default InitialScreen;
