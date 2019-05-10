import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { MessageAlert } from "../../../components/Alerts";
import { NavigationEvents } from "react-navigation";
import Search from "../../../components/Search";
import {
  getAdminApplyList,
  approveApply,
  rejectApply,
  errorHandler,
  contains
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
            data: res.data.data,
            fullData: res.data.data
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

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return contains(item.name, text) || contains(item.email, text);
    });
    this.setState({ search: text, data });
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
        this.props.navigation.navigate("AdminPartnerView", {
          restoId: item.id,
          pending: true
        })
      }
    />
  );

  render() {
    const { error, data, loading, refreshing, search } = this.state;
    const { makeRemoteRequest, handleSearch, renderItem, handleRefresh } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <Search
          value={search}
          data={data}
          handleSearch={handleSearch}
          {...this.props}
        />
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Pending Application"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default RestoApplyPendingScreen;
