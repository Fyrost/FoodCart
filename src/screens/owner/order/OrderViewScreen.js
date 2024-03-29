import React, { Component } from "react";
import { View, ScrollView, TextInput, Image } from "react-native";
import { Button, Text, Overlay, ListItem, Icon } from "react-native-elements";
import { ImagePicker } from "expo";
import { NavigationEvents } from "react-navigation";
import {
  getOwnerOrderDetail,
  postOwnerReport,
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
import Loading from "../../../components/Loading";

class OrderViewScreen extends Component {
  state = {
    reason: "",
    orderId: "",
    customerId: "",
    reportImg1: "",
    reportImg2: "",
    reportImg3: "",
    orderDetail: {},
    customerDetail: {},
    paymentDetail: {},
    itemList: [],
    loading: false,
    screenLoading: false,
    error: "",
    reportOverlayVisible: false
  };

  componentDidMount() {
    this.setState({ orderId: this.props.navigation.getParam("id") });
    this.props.navigation.setParams({
      handleReportOverlayVisible: this.handleReportOverlayVisible
    });
  }

  pickImage = async proof => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    }).then(result => {
      if (!result.cancelled) {
        this.setState({ [proof]: result.uri });
      }
    });
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
            payment,
            order: { code, created_at },
            customer: { id, fname, lname, address, contact_number },
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
            customerId: id,
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

  handleReportOverlayVisible = () => {
    this.setState({ reportOverlayVisible: true });
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

  handleReport = () => {
    const {
      orderId,
      customerId,
      reason,
      reportImg1,
      reportImg2,
      reportImg3
    } = this.state;
    this.setState({ screenLoading: true, reportOverlayVisible: false });
    postOwnerReport({
      orderId,
      customerId,
      reason,
      reportImg1,
      reportImg2,
      reportImg3
    })
      .then(res => {
        this.setState({ screenLoading: false });
        if (res.data.success) {
          this.setState({ reportOverlayVisible: false });
          MessageAlert("Report", res.data.message);
        } else {
          let errors = ``;
          Object.values(res.data.errors).map(value => {
            errors += `${value[0]}\n`;
          });
          this.setState({ reportOverlayVisible: true });
          MessageAlert(res.data.message, errors);
        }
      })
      .catch(err => {
        this.setState({ screenLoading: false, reportOverlayVisible: true });
        MessageAlert("Report", errorHandler(err));
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
        {status !== "delivering" && (
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
        )}
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

  renderReportOverlay = () => {
    const INITIAL_STATE = {
      reportOverlayVisible: false,
      reason: "",
      reportImg1: "",
      reportImg2: "",
      reportImg3: ""
    };
    return (
      <Overlay
        fullScreen
        isVisible={this.state.reportOverlayVisible}
        borderRadius={0}
        containerStyle={{ flex: 1 }}
        overlayStyle={{ margin: 0, padding: 0 }}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() => this.setState(INITIAL_STATE)}
      >
        <View style={{ flex: 1 }}>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={20}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: 10,
              top: 7
            }}
            onPress={() => this.setState(INITIAL_STATE)}
          />
          <View style={{ flex: 12 }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
              <Text h3 h3Style={{ color: "#1B73B4", marginTop: 15 }}>
                Report
              </Text>
              <Text style={{ fontSize: 16, marginTop: 15 }}>
                Why do you want to report this customer?
              </Text>
              <TextInput
                value={this.state.reason}
                multiline={true}
                placeholder={"Enter your reason here..."}
                numberOfLines={5}
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10
                }}
                onChangeText={reason => this.setState({ reason })}
              />
              <View style={{ justifyContent: "space-evenly" }}>
                <Text style={{ fontSize: 16, marginTop: 10 }}>
                  Additional Proof
                </Text>
                <ListItem
                  title={"Proof 1"}
                  subtitle={
                    <Button
                      title={"Add Proof"}
                      onPress={() => this.pickImage("reportImg1")}
                      disabled={this.state.loading}
                    />
                  }
                  chevron={false}
                  leftElement={
                    <Image
                      source={
                        this.state.reportImg1
                          ? { uri: this.state.reportImg1 }
                          : require("../../../../assets/images/missing.png")
                      }
                      style={{ resizeMode: "cover", height: 100, width: 100 }}
                    />
                  }
                />
                <ListItem
                  title={"Proof 2"}
                  subtitle={
                    <Button
                      title={"Add Proof"}
                      onPress={() => this.pickImage("reportImg2")}
                      disabled={this.state.loading}
                    />
                  }
                  chevron={false}
                  leftElement={
                    <Image
                      source={
                        this.state.reportImg2
                          ? { uri: this.state.reportImg2 }
                          : require("../../../../assets/images/missing.png")
                      }
                      style={{ resizeMode: "cover", height: 100, width: 100 }}
                    />
                  }
                />
                <ListItem
                  title={"Proof 3"}
                  subtitle={
                    <Button
                      title={"Add Proof"}
                      onPress={() => this.pickImage("reportImg3")}
                      disabled={this.state.loading}
                    />
                  }
                  chevron={false}
                  leftElement={
                    <Image
                      source={
                        this.state.reportImg3
                          ? { uri: this.state.reportImg3 }
                          : require("../../../../assets/images/missing.png")
                      }
                      style={{ resizeMode: "cover", height: 100, width: 100 }}
                    />
                  }
                />
              </View>
            </ScrollView>
          </View>

          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Button
              title={"Cancel"}
              onPress={() => this.setState(INITIAL_STATE)}
              buttonStyle={{
                borderRadius: 0,
                backgroundColor: "#EF1B17",
                flex: 1
              }}
              containerStyle={{ flex: 1 }}
              disabled={this.state.loading}
            />
            <Button
              title={"Report"}
              onPress={this.handleReport}
              disabled={this.state.loading}
              containerStyle={{ flex: 1 }}
              buttonStyle={{
                borderRadius: 0,
                backgroundColor: "orange",
                flex: 1
              }}
            />
          </View>
        </View>
      </Overlay>
    );
  };

  renderItem = ({ item: { id, name, cooking_time, quantity } }) => (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 10
      }}
    >
      <View
        style={{ borderRadius: 3, borderColor: "lightgrey", borderWidth: 1 }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
            backgroundColor: "#11CDEF"
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            {name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderColor: "gray",
            borderBottomWidth: 0.5
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Quantity: </Text>
            <Text style={{ fontWeight: "normal", fontSize: 16 }}>
              {quantity}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Cook Time: </Text>
            <Text style={{ fontWeight: "normal", fontSize: 16 }}>
              {cooking_time} mins
            </Text>
          </View>
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
    const subtitle =
      status === "pending"
        ? { text: "Pending", style: styles.pendingStyle }
        : status === "processing"
        ? { text: "Processing", style: styles.processingStyle }
        : status === "delivering"
        ? { text: "Delivering", style: styles.deliveringStyle }
        : status === "completed"
        ? { text: "Completed", style: styles.completedStyle }
        : status === "rejected"
        ? { text: "Rejected", style: styles.rejectedStyle }
        : { text: "Cancelled", style: styles.cancelledStyle };

    if (loading) return <ActivityLoading type={"list"} size={"large"} />;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={this.makeRemoteRequest} />
        <Loading loading={this.state.screenLoading} opacity={0.5} size={50} />
        {this.renderReportOverlay()}
        <View
          style={{
            flex: 5,
            borderColor: "gray",
            borderWidth: 1,
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
            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Order #:</Text>
              <Text style={styles.billingText}>{code}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Received:</Text>
              <Text style={styles.billingText}>{received}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Status: </Text>
              <Text style={subtitle.style}>{subtitle.text}</Text>
            </View>

            <View style={styles.billingCol}>
              <Text style={styles.billingTitle}>Deliver to: </Text>
              <Text style={styles.billingText}>{name}</Text>
            </View>
            <View style={styles.billingCol}>
              <Text style={styles.billingTitle}>Address: </Text>
              <Text style={styles.billingText}>{address}</Text>
            </View>

            <View style={styles.billingCol}>
              <Text style={styles.billingTitle}>Contact Number: </Text>
              <Text style={styles.billingText}>{contact}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Estimated Time: </Text>
              <Text style={styles.billingText}>{cookTime} mins</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Total: </Text>
              <Text style={styles.billingText}>₱ {total}.00</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Payment: </Text>
              <Text style={styles.billingText}>₱ {payment}.00</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingTitle}>Change: </Text>
              <Text style={styles.billingText}>₱ {change}.00</Text>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 5, justifyContent: "center" }}>
          <List
            listContainerStyle={{ flex: 1 }}
            divider={"none"}
            data={itemList}
            renderItem={this.renderItem}
            loading={loading}
            emptyText={"No item Found"}
            listFooterComponent={null}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

export default OrderViewScreen;

const normal = {
  fontSize: 16,
  fontWeight: "500"
};
const styles = {
  billingCol: {
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "gray",
    borderBottomWidth: 0.8
  },
  billingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "gray",
    borderBottomWidth: 0.8
  },
  billingTitle: {
    fontSize: 16,
    fontWeight: "500"
  },
  billingText: {
    fontSize: 16,
    fontWeight: "normal"
  },
  headerRow: {
    flex: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center"
  },
  pendingStyle: {
    ...normal,
    color: "#9DA0A3"
  },
  processingStyle: {
    ...normal,
    color: "#11CDEF"
  },
  deliveringStyle: {
    ...normal,
    color: "#f1c40f"
  },
  completedStyle: {
    ...normal,
    color: "#00CC66"
  },
  rejectedStyle: {
    ...normal,
    color: "#EF1B17"
  },
  cancelledStyle: {
    ...normal,
    color: "orange"
  }
};
