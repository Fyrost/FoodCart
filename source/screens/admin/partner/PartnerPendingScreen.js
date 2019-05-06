import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import {  MessageAlert } from "../../../components/Alerts";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import {
  getAdminApplyList,
  approveApply,
  rejectApply,
  errorHandler
} from "../../../actions";
import List from "../../../components/List";
import styles from "../../styles";

class RestoApplyPendingScreen extends Component {
  state = {
    data: [],
    error: null,
    loading: false,
    refreshing: false
  };

  static navigationOptions = () => {
    return {
      title: "Pending Partnership"
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminApplyList("pending")
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            refreshing: false,
            data: res.data.data
          });
        } else {
          this.setState({ error: res.data.message });
          this.setState({ loading: false, refreshing: false });
        }
      })
      .catch(err =>
        this.setState({
          loading: false,
          refreshing: false,
          error: errorHandler(err)
        })
      );
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  handleApprove = id => {
    this.setState({ loading: true });
    approveApply(id)
      .then(res => {
        this.setState({ loading: false });
        MessageAlert("Manage Application", res.data.message);
        if (res.data.success) this.makeRemoteRequest();
      })
      .catch(err => {
        this.setState({ loading: false });
        MessageAlert("Manage Application", errorHandler(err));
      });
  };

  handleReject = id => {
    this.setState({ loading: true });
    rejectApply(id)
      .then(res => {
        this.setState({ loading: false });
        MessageAlert("Manage Application", res.data.message);
        if (res.data.success) this.makeRemoteRequest();
      })
      .catch(err => {
        this.setState({ loading: false });
        MessageAlert("Manage Application", errorHandler(err));
      });
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>Email: {item.email}</Text>
          <Text>Contact Number: {item.contact_number}</Text>
          <Text>Sent at: {item.created_at}</Text>
        </View>
      }
      chevron={true}
      onPress={() =>
        this.props.navigation.navigate("partnerView", {
          restoId: item.id,
          pending: true
        })
      }
      bottomDivider
    />
  );

  render() {
    const { data, error, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Pending Application"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

export default RestoApplyPendingScreen;
