import React, { Component } from "react";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getOrderHistory, errorHandler } from "../../../actions";

class OrderHistoryScreen extends Component {
  state = {
    order: [],
    loading: false,
    refreshing: false,
    screenLoading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOrderHistory()
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
    const subtitle
    = item.status==="0" ?  {text:"Pending", color: '#9DA0A3'}  
    : item.status==="1" ?  {text:"Processing", color: '#11CDEF'}
    : item.status==="2" ?  {text:"Delivering", color: '#f1c40f'}
    : item.status==="3" ?  {text:"Completed", color: '#00CC66'}
    : item.status==="4" ?  {text:"Rejected",  color: '#EF1B17'}
    : {text:"Cancelled", color: 'orange'}
    return(
      <ListItem
      title={"Order # " + item.code}
      rightTitle={subtitle.text}
      rightTitleStyle={{ fontWeight: '500', color:subtitle.color }}
      subtitle={item.date}
      chevron={true}
      bottomDivider
      onPress={() =>
        this.props.navigation.navigate("OrderView", { code: item.code })
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

export default OrderHistoryScreen;
