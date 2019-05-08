import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ImageViewer from "../../../components/ImageViewer";
import { ConfirmAlert, MessageAlert } from "../../../components/Alerts";
import { Text, Button, Card } from "react-native-elements";
import {
  getApplyDetail,
  approveApply,
  rejectApply,
  errorHandler
} from "../../../actions";
import Loading from "../../../components/Loading";

permitFormat = permit =>
  permit.map(item => {
    return { url: `http://pinoyfoodcart.com/image/permit/${item.image_name}` };
  });

class PartnerViewScreen extends Component {
  state = {
    data: {},
    user: {},
    permits: [],
    loading: false,
    screenLoading: false,
    error: null,
    modalVisible: true
  };

  componentDidMount() {
    this.makeRemoteRequest();
    this.props.navigation.setParams({
      accept: this.handleAccept,
      reject: this.handleReject
    });
  }

  makeRemoteRequest() {
    this.setState({ loading: true });
    const id = this.props.navigation.getParam("restoId", "0");
    getApplyDetail(id)
      .then(res => {
        if (res.data.success) {
          this.setState({
            data: res.data.data,
            user: res.data.data.user,
            permits: res.data.data.permit,
            loading: false
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
  }

  handleAccept = () => {
    this.setState({ screenLoading: true });
    const id = this.props.navigation.getParam("restoId", "0");
    approveApply(id)
      .then(res => {
        if (res.data.success) {
          this.setState(
            { screenLoading: false },
            MessageAlert("Application Accepted", res.data.message)
          );
          this.props.navigation.pop();
        } else {
          this.setState(
            { screenLoading: false },
            MessageAlert("Application Accept Failed", res.data.message)
          );
        }
      })
      .catch(err =>
        this.setState(
          { screenLoading: false },
          MessageAlert("Application Accept Failed", errorHandler(err))
        )
      );
  };

  handleReject = () => {
    this.setState({ screenLoading: true });
    const id = this.props.navigation.getParam("restoId", "0");
    rejectApply(id)
      .then(res => {
        if (res.data.success) {
          this.setState(
            { screenLoading: false },
            MessageAlert("Application Rejected", res.data.message)
          );
          this.props.navigation.pop();
        } else {
          this.setState(
            { screenLoading: false },
            MessageAlert("Application Reject Failed", res.data.message)
          );
        }
      })
      .catch(err =>
        this.setState(
          { screenLoading: false },
          MessageAlert("Application Reject Failed", errorHandler(err))
        )
      );
  };

  renderButton() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "stretch"
        }}
      >
        <Button
          title={"ACCEPT"}
          icon={{
            name: "check",
            type: "font-awesome",
            color: "white"
          }}
          buttonStyle={{ backgroundColor: "#00CC66", borderRadius: 0, flex: 1 }}
          containerStyle={{ flex: 1 }}
          onPress={() =>
            ConfirmAlert(
              "Partnership Application",
              "Do you want to Accept the Application",
              this.handleAccept
            )
          }
        />

        <Button
          title={"REJECT"}
          icon={{
            name: "close",
            type: "font-awesome",
            color: "white"
          }}
          buttonStyle={{ backgroundColor: "#EF1B17", borderRadius: 0, flex: 1 }}
          containerStyle={{ flex: 1 }}
          onPress={() =>
            ConfirmAlert(
              "Partnership Application",
              "Do you want to Reject the Application",
              this.handleReject
            )
          }
        />
      </View>
    );
  }

  render() {
    const {
      data: {
        id,
        image_name,
        name,
        owner_fname,
        owner_mname,
        owner_lname,
        updated_at,
        address,
        contact_number,
        created_at,
        slug,
        status,
        flat_rate,
        eta,
        open_time,
        close_time
      },
      user: { email },
      permits,
      loading,
      screenLoading,
      error
    } = this.state;

    const statusType =
      status === "1" ? "Accepted" : status === "2" ? "Rejected" : "";
    const contactType = String(contact_number).length < 11 ? "(Tel)" : "(Cell)";
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{this.state.error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <Loading loading={screenLoading} opacity={0.5} size={50} />
        <View style={{ flex: 9 }}>
          <ScrollView>
            <Card
              title={
                <View style={styles.cardTitleContent}>
                  <Text style={styles.cardTitleText}>Applicant Information</Text>
                </View>
              }
              wrapperStyle={styles.cardWrapper}
              titleStyle={styles.cardWrapper}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>Owner Name</Text>
                </View>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardRowText}>
                    {owner_lname}, {owner_fname} {owner_mname}
                  </Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>Restaurant Name</Text>
                </View>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardRowText}>{name}</Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>Address</Text>
                </View>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardRowText}>{address}</Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>Email</Text>
                </View>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardRowText}>{email}</Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>
                    Contact Number {contactType}
                  </Text>
                </View>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardRowText}>{contact_number}</Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>Submitted At</Text>
                </View>
                <View style={styles.cardRow2}>
                  <Text style={styles.cardRowText}>{created_at}</Text>
                </View>

                <View style={{ display: status === "0" ? "none" : "flex" }}>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardRowTitle}>{statusType} At</Text>
                  </View>
                  <View style={styles.cardRow2}>
                    <Text style={styles.cardRowText}>{updated_at}</Text>
                  </View>
                </View>

                <View style={styles.cardRow}>
                  <Text style={styles.cardRowTitle}>Permits</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: "#06070E"
                  }}
                >
                  <ImageViewer
                    imageUrls={permitFormat(permits)}
                    containerStyle={{
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  />
                </View>
              </View>
            </Card>
          </ScrollView>          
        </View>
        {this.props.navigation.getParam("pending") ? this.renderButton() : null}
      </View>
    );
  }
}

export default PartnerViewScreen;

const styles = {
  flex1: {
    flex: 1
  },
  cardTitleContent: {
    backgroundColor: "#5999C8",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50
  },
  cardTitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  cardWrapper: {
    margin: 0,
    padding: 0
  },
  cardContent: {
    flex: 4,
    justifyContent: "space-evenly"
  },
  cardRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "lightgrey",
    borderBottomWidth: 0.8
  },
  cardRow2: {
    flex: 2,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "lightgrey",
    borderBottomWidth: 0.8
  },
  cardRowTitle: {
    fontSize: 16,
    fontWeight: "500"
  },
  cardRowText: {
    fontWeight: "normal",
    textAlign: "left"
  },
  bottomSpacer: {
    flex: 1,
    height: 25
  }
};
