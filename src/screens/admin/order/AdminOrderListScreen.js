import React, { Component } from "react";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getAdminOrderList, errorHandler, contains } from "../../../actions";

class OrderCompletedListScreen extends Component {
  state = {
    data: [],
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
            data,
            fullData: data
          });
        } else {
          this.setState({
            loading: false,
            refreshing: false,
            error: res.data.message
          });
          if (res.data.message.includes("Unauthorized")) {
            this.props.navigation.navigate("Auth");
          }
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

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return (
        contains(item.code, text) ||
        contains(item.order_status === "0" ? "Pending" : "", text) ||
        contains(item.order_status === "1" ? "Processing" : "", text) ||
        contains(item.order_status === "2" ? "Delivering" : "", text) ||
        contains(item.order_status === "3" ? "Completed" : "", text) ||
        contains(item.order_status === "4" ? "Rejected" : "", text) ||
        contains(item.order_status === "5" ? "Cancelled" : "", text)
      );
    });
    this.setState({ search: text, data });
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
        subtitle={`${item.fname} ${item.lname}`}
        rightSubtitle={item.created_at}
        chevron={true}
        onPress={() =>
          this.props.navigation.navigate("AdminOrderView", { id: item.id })
        }
      />
    );
  };

  render() {
    const { data, loading, refreshing, search } = this.state;
    const { makeRemoteRequest, handleSearch, renderItem, handleRefresh } = this;
    return (
      <View>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
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
          emptyText={"No Order History"}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default OrderCompletedListScreen;
