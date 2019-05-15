import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getAllLogList, errorHandler, contains } from "../../../actions";

class AdminLogListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAllLogList()
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
        contains(`${item.id}`, text) ||
        contains(item.user_id, text) ||
        contains(item.type, text) ||
        contains(item.description, text) ||
        contains(item.created_at, text) ||
        contains(item.origin, text)
      );
    });
    this.setState({ search: text, data });
  };

  renderItem = ({
    item: { id, user_id, type, description, origin, created_at }
  }) => (
    <ListItem
      title={description}
      rightTitle={created_at}
      subtitle={
        <View>
          <Text>User id: {user_id}</Text>
          <Text>{type}</Text>
          <Text>Origin: {origin} </Text>
        </View>
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
          emptyText={search ? `'${search}' was not found` : "No Logs Found"}
          showsVerticalScrollIndicator={true}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminLogListScreen;
