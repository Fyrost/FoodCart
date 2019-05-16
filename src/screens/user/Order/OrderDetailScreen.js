import React, { Component } from "react";
import { View, SectionList, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Icon, Divider, Image } from "react-native-elements";
import _ from "lodash"
import { getOrderDetail, errorHandler } from "../../../actions";
const formatOrder = order => {
  return order.map(section => {
    return {
      name: section.restaurant.name,
      contact_number: section.restaurant.contact_number,
      status: section.status,
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

class OrderDetailScreen extends Component {
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

  renderSectionHeader = ({ section: { name, contact_number, slug, deliveryTime, flatRate, status } }) => {
    const subtitle =
      status === "0"
        ? { text: "Pending", color: "#9DA0A3" }
        : status === "1"
        ? { text: "Processing", color: "#11CDEF" }
        : status === "2"
        ? { text: "Delivering", color: "#f1c40f" }
        : status === "3"
        ? { text: "Completed", color: "#00CC66" }
        : status === "4"
        ? { text: "Rejected", color: "#EF1B17" }
        : { text: "Cancelled", color: "orange" };

    return (
      <View style={[styles.sectionHeaderRowMain, { borderTopLeftRadius: 3, borderTopRightRadius: 3 }]}>
        <View style={styles.rowBetween}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={_.debounce(
              () =>
                this.props.navigation.push("UserRestoMenu", {
                  slug
                }),
              1000,
              {
                leading: true,
                trailing: false
              }
            )}
          >
            <Text style={{ fontWeight: "500", fontSize: 18, color: "#11CDEF" }}>
              {name}
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Status: </Text>
            <Text style={{ fontSize: 16, fontWeight: '500', color: subtitle.color }}>{subtitle.text}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Icon name={"phone"} type={'entypo'} size={16} />
          <Text style={{ fontSize: 16 }}> {contact_number}</Text>
        </View>
        <View style={[styles.rowBetween, { marginTop: 10, paddingTop: 10, borderTopWidth: 0.6, borderTopColor: 'rgba(0, 0, 0, 0.7)' }]}>
          <View style={styles.row}>
            <Text style={{ fontSize: 14 }}>Delivery Time: </Text>
            <Text style={{ fontSize: 14 }}>{deliveryTime} mins</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ fontSize: 14 }}>Flat Rate: </Text>
            <Text style={{ fontSize: 14 }}>₱ {flatRate}.00</Text>
          </View>
        </View>
      </View>
    )
  }

  renderSectionFooter = ({
    section: { payment, flatRate, deliveryTime, estimatedTime, total }
  }) => {
    const change = Number(payment) - Number(total);
    return (
      <View style={styles.sectionFooterRowMain}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Text style={{ color: "white" }}>Estimated Time: </Text>
            <Text style={{ color: "white" }}> {estimatedTime} mins </Text>
          </View>
          
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
      <View style={{ flex: 3, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>Price: </Text>
          <Text>₱ {price}.00</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
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
          paddingHorizontal: 20
        }}
      >
        <Text>Quantity: </Text>
        <Text>{quantity}</Text>
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
    if (loading) return <ActivityIndicator size="large" color={"#11CDEF"} />;
    else if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        
        {this.state.code && (
          <View style={styles.logoRow}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Order Code # {this.state.code}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "normal" }}>
              {data.date}
            </Text>
          </View>
        )}
        <View style={{ flex: 8, paddingHorizontal: 10 }}>
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
      </View>
    );
  }
}

export default OrderDetailScreen;
const styles = {
  row: {
    flexDirection: "row",
    alignItems: "center" 
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: "white",
    borderColor: 'grey',
    borderWidth: 0.6
  },
  billingRow: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderColor: "gray", 
    borderBottomWidth: 0.8 
  },
  logoRow: { 
    paddingHorizontal: 10, 
    justifyContent: 'space-evenly', 
    paddingVertical: 10, 
    shadowOffset: { 
      height: 1, 
      width: 0 
    },
    elevation: 2,
    borderBottomWidth: 0.1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  sectionHeaderRowMain: { 
    borderColor: 'grey',
    borderWidth: 0.6,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  sectionFooterRowMain: {
    justifyContent: "center",
    backgroundColor: "#5999C8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 3,
    borderColor: 'grey',
    borderWidth: 0.6,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    shadowOffset: { 
      height: 1, 
      width: 0 
    },
    elevation: 2,
  }
};
