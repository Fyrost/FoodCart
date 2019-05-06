import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { Image, Card, withTheme } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getProfile, errorHandler } from "../../actions";
import missing from "../../../assets/images/missing.png";
class ProfileInfoScreen extends Component {
  state = {
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
    accessLevel: "",
    loading: false,
    error: ""
  };

  preRequest = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("accessLevel").then(value => {
      this.setState(
        {
          loading: false,
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
      </Card>
    );
  };

  render() {
    const { loading, error, accessLevel } = this.state;
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
        <NavigationEvents onWillFocus={preRequest} />
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
    backgroundColor: "#5999C8",
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
