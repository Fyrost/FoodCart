import React, { Component } from "react";
import { Text, View, Animated } from "react-native";
import { ListItem, SearchBar, Overlay, Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getAdminMenuSales, contains, errorHandler } from "../../../actions";
import List from "../../../components/List";
import styles from "../../styles";

class AdminMenuSales extends Component {
  state = {
    details: {
      id: "",
      name: "",
      total_sales: "",
      total_transaction: "",
      web_order: "",
      app_order: ""
    },
    layoutVisible: false,
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
    getAdminMenuSales(this.state.search)
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

  renderOverlay = () => {
    const {
      layoutVisible,
      details: {
        id,
        name,
        total_sales,
        total_transaction,
        web_order,
        app_order
      }
    } = this.state;
    const INITIAL_LAYOUT = {
      layoutVisible: false,
      details: {
        id: "",
        name: "",
        total_sales: "",
        total_transaction: "",
        web_order: "",
        app_order: ""
      }
    };
    return (
      <Overlay
        isVisible={layoutVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() => this.setState(INITIAL_LAYOUT)}
      >
        <View>
          <Text>{id}</Text>
          <Text>{name}</Text>
          <Text>{total_sales}</Text>
          <Text>{total_transaction}</Text>
          <Text>{web_order}</Text>
          <Text>{app_order}</Text>
        </View>
      </Overlay>
    );
  };

  renderItem = ({ item: { item_name, name, sales, orders } }) => (
    <ListItem
      title={item_name}
      titleStyle={{ fontWeight: '500', fontSize: 18, color: '#1B73B4' }}
        subtitle={
          <View style={{ justifyContent: 'space-evenly' }}>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#48494B' }}>Restaurant: </Text>
              <Icon name={'store'} type={'material'} color={'#48494B'} size={14} />
              <Text style={{ fontSize: 14, color: '#48494B' }}> {name}</Text>
            </View>

            <Text style={{ fontSize: 14, color: '#48494B' }}>Total Sales: ₱ {sales}.00</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#48494B' }}>Total Orders: </Text>
              <Icon name={'receipt'} type={'material'} color={'#48494B'} size={14} />
              <Text style={{ fontSize: 14, color: '#48494B' }}> {orders}</Text>
            </View>
          </View>
        }
      chevron={true}
      bottomDivider
    />
  );

  render() {
    const { toggleSearch, data, loading, refreshing } = this.state;
    const {
      makeRemoteRequest,
      renderHeader,
      renderOverlay,
      renderItem,
      handleRefresh
    } = this;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        {toggleSearch ? renderHeader() : null}
        {renderOverlay()}
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

export default AdminMenuSales;
