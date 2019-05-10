import React, { Component } from "react";
import { View, Image, Animated, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getMenuList, contains, errorHandler } from "../../../actions";
import Search from "../../../components/Search";
import List from "../../../components/List";
import styles from "../../styles";

class MenuListScreen extends Component {
  state = {
    search: "",
    loading: false,
    refreshing: false,
    data: [],
    error: "",
    toggleSearch: false,
    fullData: []
  };

  makeRemoteRequest = _.debounce(() => {
    this.setState({ loading: true });
    getMenuList(this.state.search)
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            refreshing: false,
            data: data,
            fullData: data
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
  }, 250);

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  handleSearch = text => {
    const data = _.filter(this.state.fullData, menu => {
      return contains(menu.name, text);
    });
    this.setState({ search: text, data }, () => this.makeRemoteRequest());
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: "500", fontSize: 16, color: "#1B73B4" }}
      subtitle={item.description}
      subtitleProps={{ numberOfLines: 2 }}
      chevron={true}
      onPress={() =>
        this.props.navigation.navigate("OwnerMenuView", { menuId: item.id })
      }
      leftElement={
        <View>
          <Image
            source={
              item.image_name
                ? {
                    uri: `http://pinoyfoodcart.com/image/menu/${
                      item.image_name
                    }`
                  }
                : require("../../../../assets/images/missing.png")
            }
            style={{ width: 100, height: 100 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      }
    />
  );

  render() {
    const { data, error, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem, handleSearch, handleRefresh } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <Search
          value={this.state.search}
          data={data}
          handleSearch={handleSearch}
          {...this.props}
        />
        {/* {toggleSearch ? renderSearch() : null} */}
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Menu Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default MenuListScreen;
