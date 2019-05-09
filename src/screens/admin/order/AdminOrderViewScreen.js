import React, { Component } from "react";
import {
  View,
  SectionList,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight
} from "react-native";
import _ from "lodash";
import { NavigationEvents } from "react-navigation";
import { Text, Icon, Divider, Image } from "react-native-elements";
import { getAdminOrderDetail, errorHandler } from "../../../actions";

const formatOrder = order => {
  return order.map(section => {
    return {
      id: section.restaurant.id,
      name: section.restaurant.name,
      contact_number: section.restaurant.contact_number,
      slug: section.restaurant.slug,
      flatRate: section.restaurant.flat_rate,
      deliveryTime: section.restaurant.eta,
      estimatedTime: section.cooking_time_total,
      total: `${Number.parseInt(section.total) +
        Number.parseInt(section.restaurant.flat_rate)}`,
      payment: section.payment,
      data: section.itemlist
    };
  });
};

class AdminOrderViewScreen extends Component {
  state = {
    order: [
      {
        name: "",
        slug: "",
        flatRate: "",
        deliveryTime: "",
        estimatedTime: "",
        total: "",
        data: []
      }
    ],
    data: [],
    loading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminOrderDetail(this.props.navigation.getParam("id"))
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

  renderSectionHeader = ({ section: { name, contact_number, id } }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1B73B4",
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <TouchableHighlight
        onPress={_.debounce(
          () =>
            this.props.navigation.push("AdminRestoView", {
              restoId: id
            }),
          1000,
          {
            leading: true,
            trailing: false
          }
        )}
      >
        <Text style={{ fontWeight: "400", fontSize: 18, color: "#11CDEF" }}>
          {name}
        </Text>
      </TouchableHighlight>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "400", fontSize: 18, color: "white" }}>
          {contact_number}
        </Text>
        <Icon name={"phone"} type={"font-awesome"} color={"white"} />
      </View>
    </View>
  );

  renderSectionFooter = ({
    section: { payment, flatRate, deliveryTime, estimatedTime, total }
  }) => {
    const change = Number(payment) - Number(total);
    return (
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
          <Text style={{ color: "white" }}>Delivery Time: </Text>
          <Text style={{ color: "white" }}> {deliveryTime} MINS </Text>
          <Icon name="ios-timer" type="ionicon" color={"white"} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Estimated Time: </Text>
          <Text style={{ color: "white" }}> {estimatedTime} MINS </Text>
          <Icon name="ios-timer" type="ionicon" color={"white"} />
        </View>

        <Divider style={{ backgroundColor: "white" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}>Total: </Text>
          <Text style={{ color: "white" }}>₱ {total} </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}>Payment: </Text>
          <Text style={{ color: "white" }}>₱ {payment} </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}>Change: </Text>
          <Text style={{ color: "white" }}>₱ {change} </Text>
        </View>
      </View>
    );
  };

  renderItem = ({ item: { name, price, cooking_time, quantity }, index }) => (
    <View style={styles.mainRow}>
      <View style={{ flex: 3, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10
          }}
        >
          <Text>Price: </Text>
          <Text>₱ {price}.00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10
          }}
        >
          <Text>Cooking Time: </Text>
          <Text>{cooking_time} mins</Text>
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
            width: "auto",
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
    const { order, error, data, loading } = this.state;
    const {
      makeRemoteRequest,
      renderSectionHeader,
      renderSectionFooter,
      renderItem,
      renderFooter,
      renderEmpty
    } = this;
    const subtitle =
      data.status === "0"
        ? { text: "Pending", color: "#9DA0A3" }
        : data.status === "1"
        ? { text: "Processing", color: "#11CDEF" }
        : data.status === "2"
        ? { text: "Delivering", color: "#f1c40f" }
        : data.status === "3"
        ? { text: "Completed", color: "#00CC66" }
        : data.status === "4"
        ? { text: "Rejected", color: "#EF1B17" }
        : { text: "Cancelled", color: "orange" };

    if (loading) return <ActivityIndicator size="large" color={"#11CDEF"} />;
    else if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        {console.log(order)}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Status: </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: subtitle.color
                }}
              >
                {subtitle.text}
              </Text>
            </View>
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
              <Text style={{ fontWeight: "500" }}>Date Ordered:</Text>
              <Text style={{ fontWeight: "normal" }}>{data.date}</Text>
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
              <Text style={{ fontWeight: "500" }}>Estimated Time: </Text>
              <Text style={{ fontWeight: "normal" }}>
                {data.cooking_time_total}
              </Text>
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
              <Text style={{ fontWeight: "500" }}>Grand Total: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {data.total}</Text>
            </View>

            <View style={{ height: 10 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AdminOrderViewScreen;
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
