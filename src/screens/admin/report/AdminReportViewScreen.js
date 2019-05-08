import React, { Component } from "react";
import { View, ActivityIndicator, ScrollView, TextInput } from "react-native";
import {
  Text,
  Button,
  Card,
  Icon,
  Divider,
  ListItem,
  CheckBox,
  Overlay
} from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { ConfirmAlert, MessageAlert } from "../../../components/Alerts";
import ImageViewer from "../../../components/ImageViewer";
import List from "../../../components/List";
import {
  getAdminReportDetail,
  investigateAdminReport,
  closeAdminReport,
  errorHandler
} from "../../../actions";

const formatStatus = status =>
  status === "0" ? "Open" : status === "1" ? "Under Investigation" : "Closed";

const proofFormat = permit =>
  permit.map(item => {
    return { url: `http://pinoyfoodcart.com/image/report/${item.image_name}` };
  });

class AdminReportViewScreen extends Component {
  state = {
    comment: "",
    ban: false,
    ticket: {
      id: "",
      code: "",
      reason: "",
      status: "",
      proof: [],
      create_at: ""
    },
    restaurant: {
      name: ""
    },
    order: {
      code: "",
      create_at: "",
      itemlist: []
    },
    customer: {
      fname: "",
      lname: "",
      contact_number: "",
      address: ""
    },
    loading: false,
    screenLoading: false,
    overlayVisible: false
  };

  componentWillMount() {
    this.props.navigation.setParams({
      handleInvestigate: this.handleInvestigate,
      handleOverlayVisible: this.handleOverlayVisible
    });
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminReportDetail(this.props.navigation.getParam("code"))
      .then(res => {
        const {
          id,
          reason,
          code,
          status,
          proof1,
          proof2,
          proof3,
          created_at,
          suborder: { order, itemlist },
          restaurant,
          customer
        } = res.data.data;
        let arr = [];
        proof1 && arr.push({ image_name: proof1 });
        proof2 && arr.push({ image_name: proof2 });
        proof3 && arr.push({ image_name: proof3 });
        this.setState({
          loading: false,
          ticket: {
            id,
            code,
            reason,
            status,
            created_at,
            proof: arr
          },
          order: {
            ...order,
            itemlist
          },
          restaurant,
          customer
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        MessageAlert("Report Details", errorHandler(err));
      });
  };

  handleOverlayVisible = () => {
    this.setState({ overlayVisible: true });
  };

  handleInvestigate() {
    this.setState({ screenLoading: true });
    investigateAdminReport(this.props.navigation.getParam("code"))
      .then(res => {
        this.setState({ screenLoading: false });
        MessageAlert("Investigate Report", res.data.message);
        this.props.navigation.pop();
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        MessageAlert("Investigate Report", errorHandler(err));
      });
  }

  handleClose() {
    this.setState({ screenLoading: true });
    closeAdminReport({
      code: this.props.navigation.getParam("code"),
      comment: this.state.comment,
      ban: this.state.ban
    })
      .then(res => {
        this.setState({ screenLoading: false });
        MessageAlert("Close Report", res.data.message);
        if (res.data.success) this.props.navigation.pop();
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        MessageAlert("Close Report", errorHandler(err));
      });
  }

  renderOverlay = () => {
    const INITIAL_STATE = {
      comment: "",
      ban: false,
      overlayVisible: false
    };
    return (
      <Overlay
        fullScreen
        isVisible={this.state.overlayVisible}
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
                Close Report
              </Text>
              <Text style={{ fontSize: 16, marginTop: 15 }}>
                Why do you want to close this report?
              </Text>
              <TextInput
                value={this.state.comment}
                multiline={true}
                placeholder={"Enter your reason here..."}
                numberOfLines={5}
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10
                }}
                onChangeText={comment => this.setState({ comment })}
              />
            </ScrollView>
          </View>
          <CheckBox
            right
            title="Do you want to ban this customer?"
            checked={this.state.ban}
            onPress={() => this.setState({ ban: !this.state.ban })}
          />
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
              title={"Close"}
              onPress={() =>
                this.state.ban
                  ? ConfirmAlert(
                      "Close Report",
                      "Are you sure you want to ban this customer and close the report?",
                      this.handleClose
                    )
                  : this.handleClose
              }
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
  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      rightTitle={`Price: ₱ ${item.price}.00`}
      subtitle={`Quantity: ${item.quantity}`}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      bottomDivider
      onPress={() =>
        this.props.navigation.push("AdminMenuView", { menuId: `${item.id}` })
      }
    />
  );

  render() {
    const { loading, ticket, order, restaurant, customer } = this.state;
    const { makeRemoteRequest, renderOverlay } = this;
    if (loading) return <ActivityIndicator size="large" />;
    return (
      <ScrollView style={{ paddingVertical: 10 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        {renderOverlay()}
        <Card wrapperStyle={{ margin: 0, padding: 0 }}>
          <Text h4 style={styles.cardTitle}>
            Ticket Information
          </Text>
          <Divider />
          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Ticket #</Text>
            <Text style={styles.restoText}>{ticket.code}</Text>
          </View>

          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Reported By:</Text>
            <Text style={styles.restoText}>{restaurant.name}</Text>
          </View>

          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Date Submitted:</Text>
            <Text style={styles.restoText}>{ticket.created_at}</Text>
          </View>

          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Status:</Text>
            <Text style={styles.restoText}>{formatStatus(ticket.status)}</Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={styles.restoSubtitleText}>Reason:</Text>
            <Text style={styles.restoText}>{ticket.reason}</Text>
          </View>

          <View
            style={{
              display: ticket.proof.length ? "flex" : "none"
            }}
          >
            <Text style={styles.restoSubtitleText}>Image Proof:</Text>
            <ImageViewer
              imageUrls={proofFormat(ticket.proof)}
              containerStyle={{
                flexDirection: "row",
                justifyContent: "center"
              }}
            />
          </View>
        </Card>

        <Card wrapperStyle={{ margin: 0, padding: 0 }}>
          <View>
            <Text h4 style={styles.cardTitle}>
              Order Information
            </Text>
          </View>
          <Divider />
          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Order #</Text>
            <Text style={styles.restoText}>{order.code}</Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={styles.restoSubtitleText}>Date Submitted:</Text>
            <Text style={styles.restoText}>{order.date}</Text>
          </View>

          <View
            style={[
              styles.cardRowContent,
              { display: order.itemlist.length ? "flex" : "none" }
            ]}
          >
            <Text style={styles.restoSubtitleText}>Item List:</Text>
          </View>
          <View>
            <List
              data={order.itemlist}
              renderItem={this.renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 75 }}
            />
          </View>
        </Card>

        <Card wrapperStyle={{ margin: 0, padding: 0 }}>
          <View>
            <Text h4 style={styles.cardTitle}>
              Customer Information
            </Text>
          </View>
          <Divider />
          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Name:</Text>
            <Text style={styles.restoText}>
              {customer.fname} {customer.lname}
            </Text>
          </View>

          <View style={styles.cardRowContent}>
            <Text style={styles.restoSubtitleText}>Contact Number:</Text>
            <Text style={styles.restoText}>{customer.contact_number}</Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={styles.restoSubtitleText}>Address:</Text>
            <Text style={styles.restoText}>{customer.address}</Text>
          </View>
        </Card>
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }
}

export default AdminReportViewScreen;

const styles = {
  cardRowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  cardTitle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "white",
    backgroundColor: "#1B73B4",
    textAlign: "center"
  },
  restoSubtitleText: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5
  },
  restoText: {
    fontWeight: "normal"
  }
};
