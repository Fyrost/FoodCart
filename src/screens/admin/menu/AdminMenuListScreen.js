import React, { Component } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { getAdminMenu, errorHandler } from "../../../actions";
import styles from "../../styles";
class AdminMenuListScreen extends Component {
  state = {
    data: [],
    refreshing: false,
    loading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminMenu(this.props.navigation.getParam("tag", ""))
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

  renderItem = ({
    item: {
      id,
      name,
      description,
      price,
      image_name,
      slug,
      deleted_at,
      created_at,
      updated_at
    }
  }) => (
    <ListItem
      title={name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>Price: ₱ {price}.00</Text>
          <Text>Created: {created_at}</Text>
        </View>
      }
      chevron={true}
      onPress={() => {
        this.props.navigation.push("AdminMenuView", { menuId: id });
      }}
    />
  );

  render() {
    const { data, loading, refreshing } = this.state;
    return (
      <View>
        <NavigationEvents onDidFocus={this.makeRemoteRequest} />
        <List
          data={this.state.data}
          renderItem={this.renderItem}
          loading={loading}
          emptyText={"No Menu Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

export default AdminMenuListScreen;
