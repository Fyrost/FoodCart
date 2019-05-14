import React, { Component } from "react";
import { TextInput, View, ActivityIndicator, ScrollView } from "react-native";
import {
  Button,
  Card,
  Divider,
  ListItem,
  Icon,
  Text,
  Overlay
} from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { MessageAlert, ConfirmAlert } from "../../../components/Alerts";
import { getAdminRestoDetail, postBlock, errorHandler } from "../../../actions";
import List from "../../../components/List";
import Loading from "../../../components/Loading";
class AdminRestoViewScreen extends Component {
  state = {
    data: {},
    menu: [],
    loading: false,
    error: "",
    banOverlayVisible: false,
    reason: { text: "", error: "" },
    screenLoading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminRestoDetail(this.props.navigation.getParam("restoId"))
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            data: res.data.data.restaurant,
            menu: res.data.menu,
            banned: res.data.data.banned,
            id: res.data.user_id
          });
        } else {
          this.setState({
            loading: false,
            error: res.data.message
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

  handleBan = () => {
    const { reason, id } = this.state;
    this.setState({ screenLoading: true, banOverlayVisible: false });
    postBlock({ reason: reason.text, id })
      .then(res => {
        const { success, message } = res.data;
        this.setState({ screenLoading: false });
        if (success) {
          MessageAlert("Ban Restaurant", message);
          this.props.navigation.pop();
        } else {
          const { ban_reason } = res.data.errors;
          this.setState({
            banOverlayVisible: true,
            reason: {
              ...this.state.reason,
              error: ban_reason ? ban_reason[0] : ""
            }
          });
        }
      })
      .catch(err => {
        this.setState({ screenLoading: false, banOverlayVisible: true });
        MessageAlert("Ban Restaurant", errorHandler(err));
      });
  };

  renderBanOverlay = () => {
    const INITIAL_STATE = {
      banOverlayVisible: false,
      reason: ""
    };
    return (
      <Overlay
        fullScreen
        isVisible={this.state.banOverlayVisible}
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
                Why do you want to ban this restaurant?
              </Text>
              <TextInput
                value={this.state.reason.text}
                multiline={true}
                placeholder={"Enter your reason here..."}
                numberOfLines={5}
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10
                }}
                onChangeText={text => this.setState({ reason: { text } })}
              />
              <Text style={{ color: "red" }}>{this.state.reason.error}</Text>
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
              title={"Ban"}
              onPress={() =>
                ConfirmAlert("Ban Restaurant", "Are you sure?", this.handleBan)
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

  renderItem = ({
    item: {
      id,
      name,
      description,
      price,
      image_name,
      slug,
      deleted_at,
      created_at,
      updated_at
    }
  }) => (
    <ListItem
      title={name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={
        <View>
          <Text>Price: ₱ {price}.00</Text>
          <Text>Created: {created_at}</Text>
        </View>
      }
      chevron={true}
      onPress={() =>
        this.props.navigation.push("AdminMenuView", { menuId: id })
      }
    />
  );

  render() {
    const contactType = String(contact_number).length < 11 ? "(Tel)" : "(Cell)";
    const {
      loading,
      error,
      screenLoading,
      banOverlayVisible,
      banned
    } = this.state;
    const { makeRemoteRequest, renderBanOverlay } = this;
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{error}</Text>;
    const {
      id,
      owner_fname,
      owner_mname,
      owner_lname,
      name,
      address,
      contact_number,
      image_name,
      slug,
      flat_rate,
      eta,
      open_time,
      close_time,
      rating,
      status,
      created_at,
      updated_at,
      time
    } = this.state.data;
    return (
      <ScrollView style={{ flex: 1 }}>
        {console.log(this.state.id)}
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <Loading loading={screenLoading} size={"large"} />
        {banOverlayVisible && renderBanOverlay()}
        {banned ? (
          <Text style={{ textAlign: "center", color: "red" }} h2>
            Banned
          </Text>
        ) : (
          <Button
            title={"Ban"}
            onPress={() => this.setState({ banOverlayVisible: true })}
          />
        )}
        <Card
          image={{
            uri: `http://pinoyfoodcart.com/image/restaurant/${image_name}`
          }}
        >
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.restoTitle}>{name}</Text>
            <Text style={{ textAlign: "center" }}>#{id}</Text>
          </View>

          <Divider />
          {/* BASIC INFORMATION */}
          <View style={styles.restoTitle}>
            <Text style={styles.restoSubtitle}>Basic Information</Text>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Owner:</Text>
              <Text style={styles.restoText}>
                {owner_fname} {String(owner_mname).charAt(0)}. {owner_lname}
              </Text>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
              <Text style={styles.restoSubtitleText}>Address:</Text>
              <Text style={styles.restoText}>{address}</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>
                {contactType} Number:
              </Text>
              <Text style={styles.restoText}>{contact_number}</Text>
            </View>
          </View>

          <Divider />
          {/* RESTAURANT SETTING */}
          <View style={styles.restoTitle}>
            <Text style={styles.restoSubtitle}>Restaurant Settings</Text>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Flat Rate:</Text>
              <Text style={styles.restoText}>₱ {flat_rate}.00</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Delivery Time:</Text>
              <Text style={styles.restoText}>{eta} mins</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Open Time:</Text>
              <Text style={styles.restoText}>{time}</Text>
            </View>
          </View>

          <Divider />
          {/* MENU LIST */}
          <View style={styles.restoTitle}>
            <Text style={styles.restoSubtitle}>Menu List</Text>

            <View>
              <List
                data={this.state.menu}
                renderItem={this.renderItem}
                loading={this.state.loading}
                emptyText={"No Menu"}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Card>
        <View style={{ height: 15 }} />
      </ScrollView>
    );
  }
}

export default AdminRestoViewScreen;

const styles = {
  restoTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#1B73B4"
  },
  cardRow: {
    paddingVertical: 10,
    justifyContent: "space-evenly"
  },
  restoSubtitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
    paddingBottom: 10,
    color: "white",
    backgroundColor: "#1B73B4"
  },
  restoSubtitleText: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5
  },
  restoText: {
    fontWeight: "normal"
  },
  cardRowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10
  }
};
