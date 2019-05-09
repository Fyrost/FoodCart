import React, { Component } from "react";
import { Text, View, Animated } from "react-native";
import { ListItem, SearchBar, Overlay } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getOwnerSalesMenu, contains, errorHandler } from "../../../actions";
import List from "../../../components/List";
import styles from "../../styles";

class RestoMenuSales extends Component {
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
    getOwnerSalesMenu(this.state.search)
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            data: data,
            fullData: data
          });
        } else {
          this.setState({ error: res.data.message });
          this.setState({ loading: false });
        }
      })
      .catch(err =>
        this.setState({
          loading: false,
          error: errorHandler(err)
        })
      );
  }, 250);

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
      title={name}
      rightTitle={`Total Sales\nP${sales}.00`}
      rightTitleStyle={{ textAlign: "right" }}
      subtitle={`Total Orders: ${orders}`}title={item_name}
      titleStyle={{ fontWeight: '500', fontSize: 18, color: '#1B73B4' }}
      rightTitle={`Total Sales\n₱${sales}.00`}
      rightTitleStyle={{textAlign:'right'}}
      subtitle={`No of Orders: ${orders}`}
      chevron={true}
      // onPress={() =>
      //   this.setState({
      //     layoutVisible: true,
      //     details: {
      //       item_name,
      //       name,
      //       sales,
      //       orders
      //     }
      //   })
      // }
      
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={this.makeRemoteRequest} />
        {this.state.toggleSearch ? this.renderHeader() : null}
        {this.renderOverlay()}
        <List
          data={this.state.data}
          renderItem={this.renderItem}
          loading={this.state.loading}
          emptyText={"No Menu Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
        />
      </View>
    );
  }
}

export default RestoMenuSales;
