import React, { Component } from "react";
import { View } from "react-native";
import { ListItem, Text, Avatar } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import {
  getDeletedCategoryList,
  restoreCategory,
  errorHandler
} from "../../../actions";
import { MessageAlert, ConfirmAlert } from "../../../components/Alerts";
import List from "../../../components/List";

class CategoryArchiveScreen extends Component {
  state = {
    id: "",
    data: [],
    error: null,
    loading: false,
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Deleted Category",
      headerStyle: {
        backgroundColor: "#11CDEF"
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      tabBarLabel: "Thick Ass",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={"archive"}
          type={"font-awesome"}
          color={tintColor}
          size={24}
        />
      ),
      headerLeft: (
        <Avatar
          containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
          overlayContainerStyle={{ backgroundColor: "transparent" }}
          icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
          size={50}
          onPress={() => navigation.openDrawer()}
        />
      )
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getDeletedCategoryList()
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

  makeRestoreRequest = id => {
    this.setState({ loading: true });
    restoreCategory(id)
      .then(res => {
        this.setState({ loading: false });
        MessageAlert("Manage Category", res.data.message);
        this.makeRemoteRequest();
      })
      .catch(err => {
        this.setState({ loading: false });
        MessageAlert("Manage Category", errorHandler(err.response));
        this.makeRemoteRequest();
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

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={"deleted on " + item.deleted_at}
      chevron={true}
      onPress={() =>
        ConfirmAlert(
          "Restore Category",
          "Do you want to restore " + item.name + "?",
          this.makeRestoreRequest.bind(this, item.id)
        )
      }
      
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
          emptyText={"No Deleted Category"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default CategoryArchiveScreen;
