import React, { Component } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";
import { Divider, Card } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getAdminCustomerDetail, errorHandler } from "../../../actions";
import logo from "../../../../assets/images/logo.png";

class AdminCustomerViewScreen extends Component {
  state = {
    data: {},
    loading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminCustomerDetail(this.props.navigation.getParam("customerId"))
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            data: res.data.data
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
    const { loading, error } = this.state;
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{error}</Text>;
    const {
      id,
      fname,
      mname,
      lname,
      contact_number,
      address,
      created_at,
      updated_at,
      date
    } = this.state.data;
    return (
      <ScrollView>
        <Card
          image={logo}
          imageStyle={{ marginTop: 25, height: 100 }}
          imageProps={{ resizeMode: "contain" }}
        >
          <NavigationEvents onWillFocus={this.makeRemoteRequest} />

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>First Name</Text>
            <Text style={styles.cardRowText}>{fname}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Middle Name</Text>
            <Text style={styles.cardRowText}>{mname}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Last Name</Text>
            <Text style={styles.cardRowText}>{lname}</Text>
          </View>

          <View style={styles.cardRow2}>
            <Text style={styles.cardRowTitle}>Address</Text>
            <Text style={styles.cardRowText}>{address}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Contact Number</Text>
            <Text style={styles.cardRowText}># {contact_number}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Joined</Text>
            <Text style={styles.cardRowText}>{created_at}</Text>
          </View>
        </Card>
        <Card wrapperStyle={{ margin: 0, padding: 0 }}>
          <View>
            <Text h4 style={styles.cardTitle}>
              Customer Information
            </Text>
          </View>
          <Divider />

          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={styles.restoSubtitleText}>Address:</Text>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

export default AdminCustomerViewScreen;

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
