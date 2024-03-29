import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Search from "../../../components/Search";
import List from "../../../components/List";
import { getAdminApplyList, errorHandler, contains } from "../../../actions";

class RestoApplyRejectedScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  static navigationOptions = () => {
    return {
      title: "Rejected Partnership"
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminApplyList("rejected")
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            refreshing: false,
            data: res.data.data,
            fullData: res.data.data
          });
        } else {
          this.setState({
            error: res.data.message,
            refreshing: false,
            loading: false
          });
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

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>Email: {item.email}</Text>
          <Text>Contact Number: {item.contact_number}</Text>
          <Text>Rejected at: {item.created_at}</Text>
        </View>
      }
      chevron={true}
      onPress={() =>
        this.props.navigation.navigate("AdminPartnerView", { restoId: item.id })
      }
    />
  );

  render() {
    const { error, data, loading, refreshing, search } = this.state;
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
          emptyText={"No Rejected Application"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default RestoApplyRejectedScreen;
