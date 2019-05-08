import React, { Component } from "react";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getAdminOrderList, errorHandler } from "../../../actions";

class OrderCompletedListScreen extends Component {
  state = {
    order: [],
    loading: false,
    refreshing: false,
    screenLoading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminOrderList()
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
    const subtitle =
      item.order_status === "0"
        ? { text: "Pending", color: "#9DA0A3" }
        : item.order_status === "1"
        ? { text: "Processing", color: "#11CDEF" }
        : item.order_status === "2"
        ? { text: "Delivering", color: "#f1c40f" }
        : item.order_status === "3"
        ? { text: "Completed", color: "#00CC66" }
        : item.order_status === "4"
        ? { text: "Rejected", color: "#EF1B17" }
        : { text: "Cancelled", color: "orange" };
    return (
      <ListItem
        title={"Order # " + item.code}
        rightTitle={subtitle.text}
        rightTitleStyle={{ fontWeight: "500", color: subtitle.color }}
        subtitle={item.date}
        chevron={true}
        bottomDivider
        onPress={() =>
          this.props.navigation.navigate("AdminOrderView", { id: item.id })
        }
      />
    );
  };

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

export default OrderCompletedListScreen;
