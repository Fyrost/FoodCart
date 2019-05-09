import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import List from "../../../components/List";
import { getOwnerOrder, errorHandler } from "../../../actions";
class OrderCompletedListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOwnerOrder("completed")
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            refreshing: false,
            data: res.data.data
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

  renderItem = ({ item: { id, code, status, created_at } }) => {
    const subtitle =
      status === "0"
        ? { text: "Pending", style: styles.pendingStyle }
        : status === "1"
        ? { text: "Processing", style: styles.processingStyle }
        : status === "2"
        ? { text: "Delivering", style: styles.deliveringStyle }
        : status === "3"
        ? { text: "Completed", style: styles.completedStyle }
        : status === "4"
        ? { text: "Rejected", style: styles.rejectedStyle }
        : { text: "Cancelled", style: styles.cancelledStyle };

    return (
      <ListItem
        title={`Order # ${code}`}
        subtitle={subtitle.text}
        subtitleStyle={subtitle.style}
        chevron={true}
        onPress={() => this.props.navigation.navigate("OwnerOrderView", { id })}
        
      />
    );
  };

  render() {
    const { data, error, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Order"}
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

const normal = {
  fontSize: 16,
  fontWeight: "500"
};
const styles = {
  pendingStyle: {
    ...normal,
    color: "#9DA0A3"
  },
  processingStyle: {
    ...normal,
    color: "#11CDEF"
  },
  deliveringStyle: {
    ...normal,
    color: "#f1c40f"
  },
  completedStyle: {
    ...normal,
    color: "#00CC66"
  },
  rejectedStyle: {
    ...normal,
    color: "#EF1B17"
  },
  cancelledStyle: {
    ...normal,
    color: "orange"
  }
};
