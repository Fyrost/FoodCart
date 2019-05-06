import React, { Component } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getAdminRestoDetail, errorHandler } from "../../../actions";
class AdminRestoViewScreen extends Component {
  state = {
    data: {},
    loading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminRestoDetail(this.props.navigation.getParam("restoId"))
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            data: res.data.data.restaurant
          });
        } else {
          this.setState({
            loading: false,
            errpr: res.data.message
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: errorHandler(err)
        });
      });
  };

  render() {
    const contactType = String(contact_number).length < 11 ? "(Tel)" : "(Cell)";
    const { loading, error } = this.state;
    const { makeRemoteRequest } = this
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{error}</Text>;
    const {
      id,
      owner_fname,
      owner_mname,
      owner_lname,
      name,
      address,
      contact_number,
      image_name,
      slug,
      flat_rate,
      eta,
      open_time,
      close_time,
      rating,
      status,
      created_at,
      updated_at,
      time
    } = this.state.data;
    return (
      <ScrollView style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <Card
          image={{
            uri: `http://pinoyfoodcart.com/image/restaurant/${image_name}`
          }}
        >
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.restoTitle}>{name}</Text>
            <Text style={{ textAlign: "center" }}>#{id}</Text>
          </View>

          <Divider />

          <View style={styles.restoTitle}>
            <Text style={styles.restoSubtitle}>Basic Information</Text>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Owner:</Text>
              <Text style={styles.restoText}>
                {owner_fname} {String(owner_mname).charAt(0)}. {owner_lname}
              </Text>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
              <Text style={styles.restoSubtitleText}>Address:</Text>
              <Text style={styles.restoText}>{address}</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>
                {contactType} Number:
              </Text>
              <Text style={styles.restoText}>{contact_number}</Text>
            </View>
          </View>

          <Divider />

          <View style={styles.restoTitle}>
            <Text style={styles.restoSubtitle}>Restaurant Settings</Text>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Flat Rate:</Text>
              <Text style={styles.restoText}>₱ {flat_rate}.00</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Delivery Time:</Text>
              <Text style={styles.restoText}>{eta} mins</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Open Time:</Text>
              <Text style={styles.restoText}>{time}</Text>
            </View>
          </View>
        </Card>
        <View style={{ height: 15 }} />
      </ScrollView>
    );
  }
}

export default AdminRestoViewScreen;

const styles = {
  restoTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#1B73B4"
  },
  cardRow: {
    paddingVertical: 10,
    justifyContent: "space-evenly"
  },
  restoSubtitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
    paddingBottom: 10,
    color: "white",
    backgroundColor: "#1B73B4"
  },
  restoSubtitleText: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5
  },
  restoText: {
    fontWeight: "normal"
  },
  cardRowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10
  }
};
