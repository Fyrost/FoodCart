import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getRequestList, errorHandler, contains } from "../../../actions";

class AdminRequestListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getRequestList()
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

  renderItem = ({ item: { id, old_email, new_email, status, created_at } }) => (
    <ListItem
      title={`Old Email: ${old_email}`}
      rightTitle={`New Email: ${new_email}`}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={`Request Date: ${created_at}\nStatus: ${status}`}
      chevron={true}
      // onPress={() =>
      //   this.props.navigation.push("AdminBanView", {
      //     banId: ban_id,
      //     banDate: created_at
      //   })
      // }
    />
  );

  render() {
    const { data, loading, refreshing, search } = this.state;
    const { makeRemoteRequest, handleRefresh, renderItem, handleSearch } = this;
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
          emptyText={search ? `'${search}' was not found` : "No Request Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminRequestListScreen;
