import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ListItem, Overlay } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { MessageAlert } from "../../../components/Alerts";
import { getAdminReportList, errorHandler } from "../../../actions";
import List from "../../../components/List";

class AdminReportListScreen extends Component {
  state = {
    layoutVisible: false,
    ticket: {
      id: "",
      reason: "",
      code: "",
      status: "",
      proof1: "",
      proof2: "",
      proof3: "",
      comment: "",
      created_at: "",
      updated_at: ""
    },
    data: [],
    loading: false,
    refreshing: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminReportList()
      .then(res => {
        this.setState({
          data: res.data.data,
          loading: false,
          refreshing: false
        });
      })
      .catch(err => {
        this.setState({
          error: errorHandler(err),
          loading: false,
          refreshing: false
        });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  renderItem = ({
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
        bottomDivider
        onPress={() =>
          this.props.navigation.push("AdminReportView", {
            code,
            investigate: status === "1" ? true : false
          })
        }
      />
    );
  };

  render() {
    const { data, loading, refreshing, error } = this.state;

    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={this.makeRemoteRequest} />
        <List
          data={data}
          renderItem={this.renderItem}
          loading={loading}
          emptyText={"No Customer Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

export default AdminReportListScreen;
