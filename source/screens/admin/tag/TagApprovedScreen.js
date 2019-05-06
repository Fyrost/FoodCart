import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getAdminTagList, errorHandler } from "../../../actions";
import List from "../../../components/List";
import styles from "../../styles";

class TagApprovedScreen extends Component {
  state = {
    data: [],
    refreshing: false,
    loading: false
  };

  static navigationOptions = () => {
    return {
      title: "Approved Tag"
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminTagList("accepted")
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data
          });
        } else {
          this.setState({ error: res.data.message });
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
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={"Approved: " + item.created_at}
      chevron={true}
      bottomDivider
    />
  );

  render() {
    const { data, error, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem, handleRefresh } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyContainerStyle={{ alignItems: "center", marginTop: 30 }}
          emptyStyle={{ fontSize: 18, fontWeight: "500" }}
          emptyText={"No Approved Tag"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default TagApprovedScreen;
