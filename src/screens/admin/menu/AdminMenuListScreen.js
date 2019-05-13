import React, { Component } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getAdminMenu, errorHandler, contains } from "../../../actions";
import styles from "../../styles";
class AdminMenuListScreen extends Component {
  state = {
    data: [],
    refreshing: false,
    loading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminMenu({
      tag: this.props.navigation.getParam("tag", ""),
      filter: "active"
    })
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
      return contains(item.name, text) || contains(item.resto_name, text);
    });
    this.setState({ search: text, data });
  };

  renderItem = ({ item: { id, name, resto_name, price, created_at } }) => (
    <ListItem
      title={name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>Restaurant: {resto_name}</Text>
          <Text>Price: ₱ {price}.00</Text>
        </View>
      }
      chevron={true}
      onPress={() => {
        this.props.navigation.push("AdminMenuView", { menuId: id });
      }}
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
          emptyText={"No Menu Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminMenuListScreen;
