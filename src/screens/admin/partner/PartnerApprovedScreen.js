import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getAdminApplyList, errorHandler } from "../../../actions";
import List from "../../../components/List";

class RestoApplyApprovedScreen extends Component {
  state = {
    data: [],
    error: null,
    refreshing: false,
    loading: false
  };

  static navigationOptions = () => {
    return {
      title: "Approved Partnership"
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminApplyList("accepted")
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data
          });
        } else {
          this.setState({ error: res.data.message }, console.log(res.data));
          this.setState({ refreshing: false, loading: false });
        }
      })
      .catch(err =>
        this.setState({
          refreshing: false,
          loading: false,
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
      titleStyle={{ fontWeight: '500', fontSize: 18, color: '#1B73B4' }}
      subtitle={
        <View>
          <Text>Email: {item.email}</Text>
          <Text>Contact Number: {item.contact_number}</Text>
          <Text>Approved at: {item.created_at}</Text>
        </View>
      }
      chevron={true}
      onPress={() =>
        this.props.navigation.navigate("AdminPartnerView", { restoId: item.id })
      }
      
    />
  );

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
          emptyText={"No Approve Partner"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

export default RestoApplyApprovedScreen;
