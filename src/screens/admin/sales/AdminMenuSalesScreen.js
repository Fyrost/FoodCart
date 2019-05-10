import React, { Component } from "react";
import { Text, View, Animated } from "react-native";
import { ListItem, SearchBar, Overlay, Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";
import Search from "../../../components/Search";
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

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return contains(item.item_name, text) || contains(item.name, text);
    });
    this.setState({ search: text, data });
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
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "#48494B" }}>Restaurant: </Text>
            <Icon
              name={"store"}
              type={"material"}
              color={"#48494B"}
              size={14}
            />
            <Text style={{ fontSize: 14, color: "#48494B" }}> {name}</Text>
          </View>

          <Text style={{ fontSize: 14, color: "#48494B" }}>
            Total Sales: ₱ {sales}.00
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "#48494B" }}>
              Total Orders:{" "}
            </Text>
            <Icon
              name={"receipt"}
              type={"material"}
              color={"#48494B"}
              size={14}
            />
            <Text style={{ fontSize: 14, color: "#48494B" }}> {orders}</Text>
          </View>
        </View>
      }
    />
  );

  render() {
    const { data, loading, refreshing, search } = this.state;
    const {
      makeRemoteRequest,
      renderOverlay,
      renderItem,
      handleRefresh,
      handleSearch
    } = this;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <Search
          value={search}
          data={data}
          handleSearch={handleSearch}
          {...this.props}
        />
        {renderOverlay()}
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Menu Found"}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminMenuSales;
