import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import {
  getOwnerOrderDetail,
  acceptOwnerOrder,
  rejectOwnerOrder,
  deliverOwnerOrder,
  cancelOwnerOrder,
  completeOwnerOrder,
  errorHandler
} from "../../../actions";
import { ConfirmAlert, MessageAlert } from "../../../components/Alerts";
import ActivityLoading from "../../../components/ActivityLoading";
import List from "../../../components/List";
import { Button } from "react-native-elements";
import Loading from "../../../components/Loading";

class OrderViewScreen extends Component {
  state = {
    orderDetail: {},
    customerDetail: {},
    paymentDetail: {},
    itemList: [],
    loading: false,
    screenLoading: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOwnerOrderDetail(this.props.navigation.getParam("id"))
      .then(res => {
        const { success } = res.data;
        if (success) {
          const {
            status,
            total,
            cooking_time_total,
            order: { code, created_at, payment },
            customer: { fname, lname, address, contact_number },
            itemlist
          } = res.data.data;
          const stat =
            status === "0"
              ? "pending"
              : status === "1"
              ? "processing"
              : status === "2"
              ? "delivering"
              : status === "3"
              ? "completed"
              : status === "4"
              ? "rejected"
              : "cancelled";

          this.setState({
            loading: false,
            orderDetail: {
              status: stat,
              code,
              received: created_at
            },
            customerDetail: {
              name: `${fname} ${lname}`,
              address,
              contact: contact_number
            },
            paymentDetail: {
              total,
              cookTime: cooking_time_total,
              payment,
              change: (parseInt(payment) - parseInt(total)).toString()
            },
            itemList: itemlist
          });
        } else {
          this.setState({
            loading: false,
            errpr: res.data.message
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: errorHandler(err)
        });
      });
  };

  handleProceed = () => {
    const id = this.props.navigation.getParam("id");
    const { status } = this.state.orderDetail;
    const request =
      status === "pending"
        ? acceptOwnerOrder
        : status === "processing"
        ? deliverOwnerOrder
        : completeOwnerOrder;

    this.setState({ screenLoading: true });
    request(id)
      .then(res => {
        const { success, message } = res.data;
        this.setState({ screenLoading: false });
        MessageAlert("Order", message);
        if (success) this.props.navigation.pop();
      })
      .catch(err => {
        MessageAlert("Order", errorHandler(err));
      });
  };

  handleStop = () => {
    const id = this.props.navigation.getParam("id");
    const { status } = this.state.orderDetail;
    const request = status === "pending" ? rejectOwnerOrder : cancelOwnerOrder;

    this.setState({ screenLoading: true });
    request(id)
      .then(res => {
        const { success, message } = res.data;
        this.setState({ screenLoading: false });
        MessageAlert("Order", message);
        if (success) this.props.navigation.pop();
      })
      .catch(err => {
        MessageAlert("Order", errorHandler(err));
      });
  };

  renderButton = () => {
    const { status } = this.state.orderDetail;
    if (
      status === "completed" ||
      status === "rejected" ||
      status === "cancelled"
    )
      return null;

    const proceedButtonTitle =
      status === "pending"
        ? {
            text: "Accept Order",
            color: "#00CC66",
            iconName: "check",
            iconType: "font-awesome"
          }
        : status === "processing"
        ? {
            text: "Deliver Order",
            color: "#11CDEF",
            iconName: "local-shipping",
            iconType: "material"
          }
        : {
            text: "Complete",
            color: "#00CC66",
            iconName: "check-square-o",
            iconType: "font-awesome"
          };
    const stopButtonTitle =
      status === "pending"
        ? {
            text: "Reject Order",
            color: "#EF1B17",
            iconName: "times",
            iconType: "font-awesome"
          }
        : {
            text: "Cancel Order",
            color: "orange",
            iconName: "cancel",
            iconType: "material-community"
          };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <Button
          icon={{
            name: proceedButtonTitle.iconName,
            type: proceedButtonTitle.iconType,
            color: "white"
          }}
          buttonStyle={{
            flex: 1,
            borderRadius: 0,
            backgroundColor: proceedButtonTitle.color
          }}
          containerStyle={{ flex: 1 }}
          title={proceedButtonTitle.text}
          onPress={this.handleProceed.bind(this)}
        />
        <Button
          icon={{
            name: stopButtonTitle.iconName,
            type: stopButtonTitle.iconType,
            color: "white"
          }}
          buttonStyle={{
            flex: 1,
            borderRadius: 0,
            backgroundColor: stopButtonTitle.color
          }}
          containerStyle={{ flex: 1 }}
          title={stopButtonTitle.text}
          onPress={() =>
            ConfirmAlert(
              stopButtonTitle.text,
              `Do you want to ${stopButtonTitle.text}`,
              this.handleStop
            )
          }
        />
      </View>
    );
  };

  renderItem = ({ item: { id, name, cooking_time, quantity } }) => (
    <View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "#5999C8"
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Menu: {name}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderColor: "gray",
          borderBottomWidth: 0.5
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Cook Time: </Text>
          <Text style={{ fontWeight: "normal", fontSize: 16 }}>
            {cooking_time} mins
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Quantity: </Text>
          <Text style={{ fontWeight: "normal", fontSize: 16 }}>{quantity}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    const {
      loading,
      orderDetail: { status, code, received },
      customerDetail: { name, address, contact },
      paymentDetail: { total, cookTime, payment, change },
      itemList,
      error
    } = this.state;
    if (loading) return <ActivityLoading type={"list"} size={"large"} />;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={this.makeRemoteRequest} />
        <Loading loading={this.state.screenLoading} opacity={0.5} size={50} />
        <View
          style={{
            flex: 1,
            borderColor: "gray",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center"
          }}
        >
          <View>
            <Text style={{ fontSize: 14 }}>Code#: {code}</Text>
            <Text style={{ fontSize: 14 }}>Received: {received}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 14 }}>Status: </Text>
              <Text style={{ fontSize: 14 }}>{status}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 6 }}>
          <List
            listContainerStyle={{ flex: 1 }}
            data={itemList}
            renderItem={this.renderItem}
            loading={loading}
            emptyText={"No item Found"}
            listFooterComponent={null}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 75 }}
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
              <Text style={{ fontWeight: "500" }}>Deliver to: </Text>
              <Text style={{ fontWeight: "normal" }}>{name}</Text>
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
              <Text style={{ fontWeight: "500" }}>Address: </Text>
              <Text style={{ fontWeight: "normal" }}>{address}</Text>
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
              <Text style={{ fontWeight: "500" }}>Contact Number: </Text>
              <Text style={{ fontWeight: "normal" }}>{contact}</Text>
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
              <Text style={{ fontWeight: "normal" }}>{cookTime} MINS</Text>
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
              <Text style={{ fontWeight: "normal" }}>₱ {total}</Text>
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
              <Text style={{ fontWeight: "500" }}>Payment: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {payment}</Text>
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
              <Text style={{ fontWeight: "500" }}>Change: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {change}</Text>
            </View>

            <View style={{ height: 10 }} />
          </ScrollView>
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

export default OrderViewScreen;
