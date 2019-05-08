import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";
import List from "../../../components/List";
import { getAdminApplyList, errorHandler } from "../../../actions";

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
            data: res.data.data
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
      bottomDivider
    />
  );

  render() {
    const { data, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem, handleRefresh } = this;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
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
