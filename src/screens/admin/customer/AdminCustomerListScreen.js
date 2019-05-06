import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getAdminCustomer, errorHandler } from "../../../actions";

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
            data: res.data.data
          });
        } else {
          this.setState({ refreshing: false, loading: false });
          alert(res.data.message);
        }
      })
      .catch(err => {
        this.setState({  refreshing: false,loading: false });
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
      titleStyle={{ fontWeight: '500', fontSize: 18, color: '#1B73B4' }}
      subtitle={
        <View>
          <Text>Contact Number: {contact_number}</Text>
          <Text>Joined: {created_at}</Text>
        </View>
      }
      chevron={true}
      bottomDivider
      onPress={() =>
        this.props.navigation.push("CustomerView", { customerId: id })
      }
    />
  );

  render() {
    const { data, loading, refreshing } = this.state;
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

export default AdminCustomerListScreen;
