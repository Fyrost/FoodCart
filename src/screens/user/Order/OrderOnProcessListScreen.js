import React, { Component } from "react";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getOrderHistory, errorHandler } from "../../../actions";

class OrderOnProcessListScreen extends Component {
  state = {
    order: [],
    loading: false,
    refreshing: false,
    screenLoading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOrderHistory("processing")
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            refreshing: false,
            order: data
          });
        } else {
          this.setState({
            loading: false,
            refreshing: false,
            error: res.data.message
          });
        }
      })
      .catch(err =>
        this.setState({
          error: errorHandler(err),
          loading: false,
          refreshing: false
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
  renderItem = ({ item }) => {
    return(
      <ListItem
      title={"Order # " + item.code}
      titleStyle={{ fontWeight: "500", fontSize: 16, color: "#1B73B4" }}
      subtitle={item.date}
      chevron={true}
      
      onPress={() =>
        this.props.navigation.navigate("UserOrderView", { code: item.code })
      }
    />
    )
  }

  render() {
    const { order, loading, refreshing } = this.state;
    return (
      <View>
        <NavigationEvents onWillFocus={this.makeRemoteRequest} />
        <List
          data={order}
          renderItem={this.renderItem}
          loading={loading}
          emptyText={"No Order History"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

export default OrderOnProcessListScreen;
