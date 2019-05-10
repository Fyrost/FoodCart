import React, { Component } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";
import { Divider, Card, ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getAdminCustomerDetail, errorHandler } from "../../../actions";
import List from "../../../components/List";
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
            data: res.data.data,
            orders: res.data.orders,
            reports: res.data.reports,
            logs: res.data.logs
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

  renderOrderItem = ({ item }) => {
    const subtitle =
      item.status === "0"
        ? { text: "Pending", color: "#9DA0A3" }
        : item.status === "1"
        ? { text: "Processing", color: "#11CDEF" }
        : item.status === "2"
        ? { text: "Delivering", color: "#f1c40f" }
        : item.status === "3"
        ? { text: "Completed", color: "#00CC66" }
        : item.status === "4"
        ? { text: "Rejected", color: "#EF1B17" }
        : { text: "Cancelled", color: "orange" };
    return (
      <ListItem
        title={"Order # " + item.code}
        rightTitle={subtitle.text}
        rightTitleStyle={{ fontWeight: "500", color: subtitle.color }}
        subtitle={item.date}
        chevron={true}
        onPress={() =>
          this.props.navigation.navigate("AdminOrderView", { id: item.id })
        }
      />
    );
  };

  renderReportItem = ({
    item: {
      id,
      reason,
      code,
      status,
      proof1,
      proof2,
      proof3,
      comment,
      created_at,
      updated_at
    }
  }) => {
    const statusType =
      status === "0"
        ? { text: "OPEN", color: "#00CC66" }
        : status === "1"
        ? { text: "UNDER INVESTIGATION", color: "#11CDEF" }
        : { text: "CLOSED", color: "#EF1B17" };
    return (
      <ListItem
        title={`Ticket # ${code}`}
        titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
        subtitle={
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: statusType.color
              }}
            >
              {statusType.text}
            </Text>
            <Text>Submitted:</Text>
            <Text>{created_at}</Text>
          </View>
        }
        chevron={true}
        onPress={() =>
          this.props.navigation.push("AdminReportView", {
            code,
            investigate: status === "0" ? true : false,
            close: status === "2" ? false : true
          })
        }
      />
    );
  };

  renderLogsItem = ({ item: { type, description, created_at } }) => (
    <ListItem title={description} rightTitle={created_at} subtitle={type} />
  );

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
      <ScrollView style={{ marginBottom: 10 }}>
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
              Orders
            </Text>
          </View>
          <Divider />

          <View>
            <List
              data={this.state.orders}
              renderItem={this.renderOrderItem}
              loading={loading}
              emptyText={"No Order History"}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Card>
        <Card wrapperStyle={{ margin: 0, padding: 0 }}>
          <View>
            <Text h4 style={styles.cardTitle}>
              Ticket Reports
            </Text>
          </View>
          <Divider />

          <View>
            <List
              data={this.state.reports}
              renderItem={this.renderReportItem}
              loading={loading}
              emptyText={"No Ticket"}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Card>

        <Card wrapperStyle={{ margin: 0, padding: 0 }}>
          <View>
            <Text h4 style={styles.cardTitle}>
              Activity Logs
            </Text>
          </View>
          <Divider />

          <View>
            <List
              data={this.state.logs}
              renderItem={this.renderLogsItem}
              loading={loading}
              emptyText={"No Ticket"}
              divider={"none"}
              showsVerticalScrollIndicator={false}
            />
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
