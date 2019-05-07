import React, { Component } from "react";
import { View, SectionList, ActivityIndicator, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Icon, Divider, Image } from "react-native-elements";
import { getOrderDetail, errorHandler } from "../../../actions";

const formatOrder = order => {
  return order.map(section => {
    return {
      name: section.restaurant.name,
      slug: section.restaurant.slug,
      flatRate: section.restaurant.flat_rate,
      deliveryTime: section.restaurant.eta,
      estimatedTime: section.cooking_time_total,
      total: section.total,
      data: section.itemlist
    };
  });
};

class OrderDetailScreen extends Component {
  state = {
    order: [],
    loading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOrderDetail(this.props.navigation.getParam("code"))
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            order: formatOrder(data.suborder),
            data: data,
            code: data.code
          });
        } else {
          this.setState({
            loading: false,
            error: res.data.message
          });
        }
      })
      .catch(err =>
        this.setState({
          error: errorHandler(err),
          loading: false
        })
      );
  };

  renderSectionHeader = ({ section: { name } }) => (
    <View
      style={{
        justifyContent: "center",
        backgroundColor: "#1B73B4",
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <Text style={{ fontWeight: "400", fontSize: 18, color: "white" }}>
        {name}
      </Text>
    </View>
  );

  renderSectionFooter = ({
    section: { name, flatRate, eta, sub_eta, total }
  }) => (
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#5999C8",
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 3
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Flat Rate: </Text>
          <Text style={{ color: "white" }}>{flatRate} PHP</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>ETA: </Text>
          <Text style={{ color: "white" }}> {sub_eta} MINS </Text>
          <Icon name="ios-timer" type="ionicon" color={"white"} />
        </View>
        <Divider style={{ backgroundColor: "white" }} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Total: </Text>
          <Text style={{ color: "white" }}>₱ {total} </Text>
        </View>
      </View>
    );

  renderItem = ({ item: { name, price, cooking_time, quantity }, index }) => (
    <View style={styles.mainRow}>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: 20
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10
            }}
          >
            <Text>{price} PHP </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10
              }}
            >
              <Text>{cooking_time} MINS</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 10,
          marginLeft: 20,
          paddingRight: 10
        }}
      >
        <View
          style={{
            flex: 1,
            height: 35,
            width: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#11CDEF",
            borderBottomWidth: 1
          }}
        >
          <Text style={{ fontSize: 20 }}>{quantity}</Text>
        </View>
      </View>
    </View>
  );

  renderFooter = () =>
    this.state.loading ? (
      <ActivityIndicator size="large" color={"#11CDEF"} />
    ) : null;

  renderEmpty = () =>
    !this.state.loading ? <Text>Cart is Empty!</Text> : null;

  render() {
    const { order, error, data } = this.state;
    const {
      makeRemoteRequest,
      renderSectionHeader,
      renderSectionFooter,
      renderItem,
      renderFooter,
      renderEmpty
    } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        {this.state.code && (
          <View
            style={{
              flex: 1,
              borderColor: "gray",
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Order Code # {this.state.code}
            </Text>
            <Text>Status {data.status}</Text>
          </View>
        )}
        <View style={{ flex: 8 }}>
          <SectionList
            sections={order}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={renderSectionFooter}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </View>

        <View
          style={{
            flex: 4,
            borderColor: "gray",
            borderTopWidth: 1,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: "#5999C8"
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Billing Information
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Estimated Time: </Text>
              <Text style={{ fontWeight: "normal" }}>{order.estimatedTime} MINS</Text>
            </View>

            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Flat Rate Total: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {order.flatRate}</Text>
            </View>

            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Delivery Time: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {order.deliveryTime}</Text>
            </View>

            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Total: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {order.total}</Text>
            </View>

            <View style={{ height: 10 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default OrderDetailScreen;
const styles = {
  mainRow: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  }
};
