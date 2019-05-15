import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getAdminBlockList, errorHandler, contains } from "../../../actions";
import _ from "lodash"
class AdminBanListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminBlockList()
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
      return contains(item.email, text);
    });
    this.setState({ search: text, data });
  };

  renderItem = ({
    item: { ban_id, email, created_at, restaurant_id, reason }
  }) => {
    return (
      <ListItem
        title={email}
        titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
        subtitle={
          <View>
            <Text>{restaurant_id ? 'Owner' : 'User' }</Text>
            <Text>Date Banned: { created_at }</Text>
          </View>
        }
        chevron={true}
        onPress={_.debounce(() =>
          this.props.navigation.push("AdminBanView", {
            banId: ban_id,
            banDate: created_at,
            restoId: restaurant_id,
            reason: reason
          }), 1500, {
            leading: true,
            trailing: false
          })
        }
      />
    )
  }

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
          emptyText={search ? `'${search}' was not found` : "No User Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminBanListScreen;
