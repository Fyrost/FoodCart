import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getAdminCustomer, errorHandler, contains } from "../../../actions";

class AdminCustomerListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminCustomer()
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
          if (res.data.message.includes("Unauthorized")) {
            this.props.navigation.navigate("Auth");
          }
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
      return (
        contains(`${item.fname} ${item.mname} ${item.lname}`, text) ||
        contains(`${item.lname}, ${item.fname} ${item.mname}`, text) ||
        contains(`${item.fname} ${item.lname}`, text) ||
        contains(`${item.lname} ${item.fname}`, text) ||
        contains(item.fname, text) ||
        contains(item.mname, text) ||
        contains(item.lname, text)
      );
    });
    this.setState({ search: text, data });
  };

  renderItem = ({
    item: {
      id,
      fname,
      mname,
      lname,
      contact_number,
      address,
      created_at,
      updated_at
    }
  }) => (
    <ListItem
      title={`${lname}, ${fname} ${mname}`}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>Contact Number: {contact_number}</Text>
          <Text>Joined: {created_at}</Text>
        </View>
      }
      chevron={true}
      onPress={() =>
        this.props.navigation.push("AdminCustomerView", { customerId: id })
      }
    />
  );

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
          emptyText={search ? `'${search}' was not found` : "No Customer Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminCustomerListScreen;
