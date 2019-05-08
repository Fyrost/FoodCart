import React, { Component } from "react";
import { View, Image, Animated, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getMenuList, contains, errorHandler } from "../../../actions";
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

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.state.toggleSearch ? 1 : 0
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleSearch: this.handleSearchVisible
    });
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.toggleSearch ? 1 : 0,
      duration: 100
    }).start();
  }

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

  handleSearchVisible = () => {
    this.setState({ toggleSearch: !this.state.toggleSearch });
  };

  handleSearch = text => {
    const data = _.filter(this.state.fullData, menu => {
      return contains(menu, text);
    });
    this.setState({ search: text, data }, () => this.makeRemoteRequest());
  };

  handleBackPress = () =>
    this.setState({
      isFocused: this.props.value ? true : false
    });

  renderHeader = () => {
    const viewStyle = {
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
      })
    };
    return (
      <Animated.View
        style={[
          viewStyle,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            elevation: 1,
            backgroundColor: "#FAFAFA"
          }
        ]}
      >
        <SearchBar
          containerStyle={{
            display: "flex",
            flex: 1,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
          inputStyle={{ color: "#484749", backgroundColor: "transparent" }}
          inputContainerStyle={{ backgroundColor: "transparent" }}
          leftIconContainerStyle={{ backgroundColor: "transparent" }}
          rightIconContainerStyle={{ backgroundColor: "transparent" }}
          placeholder="Search Here..."
          onChangeText={this.handleSearch}
          value={this.state.search}
          round
          autoCorrect={false}
        />
      </Animated.View>
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: '500', fontSize: 16, color: '#1B73B4' }}
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
      bottomDivider
    />
  );

  render() {
    const { data, error, toggleSearch, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem,renderHeader, handleRefresh } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        {toggleSearch ? renderHeader() : null}
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
