import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ListItem, Overlay } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { MessageAlert } from "../../../components/Alerts";
import Search from "../../../components/Search";
import { getAdminUsersList, errorHandler, contains } from "../../../actions";
import List from "../../../components/List";

class AdminUsersListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminUsersList()
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data,
            fullData: res.data.data
          });
        } else {
          this.setState({ refreshing: false, loading: false });
          alert(res.data.message);
        }
      })
      .catch(err => {
        this.setState({ refreshing: false, loading: false });
        alert(errorHandler(err));
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

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return contains(item.email, text);
    });
    this.setState({ search: text, data });
  };

  renderItem = ({
    item: {
      email,
      access_level,
      email_verified_at,
      created_at,
      customer_id,
      restaurant_id
    }
  }) => {
    const navigate = {
      screen: customer_id ? "AdminCustomerView" : "AdminRestoView",
      param: customer_id
        ? { customerId: customer_id }
        : { restoId: restaurant_id }
    };
    return (
      <ListItem
        title={email}
        subtitle={created_at}
        rightTitle={
          access_level === "1"
            ? "Customer"
            : access_level === "2"
            ? "Owner"
            : "Administrator"
        }
        rightSubtitle={email_verified_at ? "verified" : "not verified"}
        chevron={access_level !== "3"}
        onPress={
          access_level === "3"
            ? null
            : () =>
                this.props.navigation.navigate(navigate.screen, navigate.param)
        }
      />
    );
  };

  render() {
    const { data, loading, refreshing, search } = this.state;
    const { makeRemoteRequest, handleSearch, renderItem, handleRefresh } = this;
    return (
      <View>
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
          emptyText={search ? `'${search}' was not found` : "No Users Found"}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminUsersListScreen;
