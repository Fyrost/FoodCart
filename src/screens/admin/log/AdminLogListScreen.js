import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getLogList, errorHandler } from "../../../actions";

class AdminLogListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getLogList()
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

  renderItem = ({ item: { id, type, description, origin, created_at } }) => (
    <ListItem
      title={description}
      rightTitle={created_at}
      subtitle={type}
      chevron={true}
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

export default AdminLogListScreen;
