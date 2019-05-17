import React, { Component } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import List from "../../../components/List";
import { MessageAlert } from "../../../components/Alerts";
import Search from "../../../components/Search";
import { getAdminResto, errorHandler, contains } from "../../../actions";
import _ from "lodash";
import styles from "../../styles";
class AdminRestoListScreen extends Component {
  state = {
    data: [],
    refreshing: false,
    loading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminResto()
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data,
            fullData: res.data.data
          });
        } else {
          this.setState({
            refreshing: false,
            loading: false
          });
          MessageAlert("Restaurant List", res.data.message);
        }
      })
      .catch(error => {
        this.setState({
          refreshing: false,
          loading: false
        });
        MessageAlert("Restaurant List", errorHandler(error));
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

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return (
        contains(
          `${item.owner_fname} ${item.owner_mname} ${item.owner_lname}`,
          text
        ) ||
        contains(
          `${item.owner_lname}, ${item.owner_fname} ${item.owner_mname}`,
          text
        ) ||
        contains(`${item.owner_fname} ${item.owner_lname}`, text) ||
        contains(`${item.owner_lname} ${item.owner_fname}`, text) ||
        contains(item.owner_fname, text) ||
        contains(item.owner_mname, text) ||
        contains(item.owner_lname, text) ||
        contains(item.name, text)
      );
    });
    this.setState({ search: text, data });
  };

  renderItem = ({
    item: {
      id,
      owner_fname,
      owner_mname,
      owner_lname,
      name,
      address,
      contact_number,
      image_name,
      slug,
      flat_rate,
      eta,
      open_time,
      close_time,
      rating,
      status,
      created_at,
      updated_at
    }
  }) => (
    <ListItem
      title={name}
      titleStyle={{ fontWeight: "500", fontSize: 19, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>
            Owner: {owner_fname} {owner_lname}
          </Text>
          <Text>Contact Number: {contact_number}</Text>
        </View>
      }
      chevron={true}
      onPress={_.debounce(
        () => this.props.navigation.push("AdminRestoView", { restoId: id }),
        1500,
        {
          leading: true,
          trailing: false
        }
      )}
    />
  );

  render() {
    const { data, loading, refreshing, search } = this.state;
    const { makeRemoteRequest, handleSearch, renderItem, handleRefresh } = this;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
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
          emptyText={"No Restaurant Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminRestoListScreen;
