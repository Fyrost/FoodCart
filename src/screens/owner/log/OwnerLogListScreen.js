import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getOwnerLogList, errorHandler } from "../../../actions";

class OwnerLogListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false
  };

  componentWillMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOwnerLogList()
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data
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

  renderItem = ({ item: { id, type, description, origin, created_at } }) => (
    <ListItem title={description} rightTitle={created_at} subtitle={type} />
  );

  render() {
    const { data, loading, refreshing } = this.state;
    return (
      <View>
        <NavigationEvents onDidFocus={this.makeRemoteRequest} />
        <List
          data={data}
          renderItem={this.renderItem}
          loading={loading}
          emptyText={"No Logs Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          divider={"none"}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

export default OwnerLogListScreen;
