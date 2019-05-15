import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem, Overlay, Button, Icon } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import _ from "lodash"
import {
  getRequestList,
  acceptRequest,
  rejectRequest,
  errorHandler,
  contains
} from "../../../actions";
import { MessageAlert, ConfirmAlert } from "../../../components/Alerts";
import Loading from "../../../components/Loading";

class AdminRequestListScreen extends Component {
  state = {
    data: [],
    details: {
      id: "",
      status: "",
      old_email: "",
      new_email: "",
      reason: "",
      user_id: ""
    },
    loading: false,
    refreshing: false,
    overlayVisible: false,
    screenLoading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getRequestList()
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data,
            fullData: res.data.data
          });
        } else {
          this.setState({ refreshing: false, loading: false });
          alert(res.data.message);
        }
      })
      .catch(err => {
        this.setState({ refreshing: false, loading: false });
        alert(errorHandler(err));
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  handleLayout = item =>
    this.setState({
      overlayVisible: true,
      details: item
    });

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return contains(item.old_email, text) || contains(item.new_email, text);
    });
    this.setState({ search: text, data });
  };

  handleRejectRequest = () => {
    this.setState({ screenLoading: true, overlayVisible: false });
    rejectRequest(this.state.details.id)
      .then(res => {
        const { success, message } = res.data;
        if (success) this.makeRemoteRequest;
        else this.setState({ overlayVisible: true });
        this.setState({ screenLoading: false });
        MessageAlert("Reject Request", message);
      })
      .catch(err => {
        MessageAlert("Reject Request", errorHandler(err));
      });
  };

  handleAcceptequest = () => {
    this.setState({ screenLoading: true, overlayVisible: false });
    acceptRequest(this.state.details.id)
      .then(res => {
        const { success, message } = res.data;
        if (success) this.makeRemoteRequest;
        else this.setState({ overlayVisible: true });
        this.setState({ screenLoading: false });
        MessageAlert("Accept Request", message);
      })
      .catch(err => {
        MessageAlert("Accept Request", errorHandler(err));
      });
  };

  renderItem = ({ item }) => {
    const statusType = item.status === "0" 
    ? {text:"Pending", color: '#9DA0A3'} 
    : item.status==="1" 
      ? {text:"Completed", color: '#00CC66'}
      : {text:"Rejected",  color: '#EF1B17'}
    return (
      <ListItem
        title={
          <View>
            <Text style={{ fontSize: 16 }}>Old Email: {item.old_email}</Text>
            <Text style={{ fontSize: 16 }}>New Email: {item.new_email}</Text>
          </View>
        }
        subtitle={`Request Date: ${item.created_at}`}
        rightTitle={
          <Text style={{ fontSize: 16, fontWeight: '500', color: statusType.color }}>{statusType.text}</Text>
        }
        chevron={true}
        onPress={() => this.handleLayout(item)}
      />
    )
  }

  renderOverlay = () => {
    const INITIAL_STATE = {
      overlayVisible: false
    };
    const {
      overlayVisible,
      details: {
        id,
        new_email,
        old_email,
        reason,
        status,
        customer_id,
        restaurant_id
      }
    } = this.state;
    const navigate = {
      screen: customer_id ? "AdminCustomerView" : "AdminRestoView",
      param: customer_id
        ? { customerId: customer_id }
        : { restoId: restaurant_id }
    };
    return (
      <Overlay
        isVisible={overlayVisible}
        width={"auto"}
        height={"45%"}
        overlayContainerStyle={{ paddingVertical: 5, paddingHorizontal: 10 }}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() => this.setState(INITIAL_STATE)}
      >
        <View style={{ flexGrow: 1 }}>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={24}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: -28,
              top: -33
            }}
            onPress={() => this.setState(INITIAL_STATE)}
          />
          <View
            style={{
              flex: 3,
              justifyContent: "space-evenly",
              paddingHorizontal: 20,
              paddingVertical: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: "#1B73B4"
              }}
            >
              Request Information
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 5 }}>
                Old Email:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "normal" }}>
                {old_email}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 5 }}>
                New Email:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "normal" }}>
                {new_email}
              </Text>
            </View>

            <View style={{ justifyContent: "space-between" }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Reason: </Text>
              <Text style={{ fontSize: 16, fontWeight: "normal" }}>
                {reason}
              </Text>
            </View>
            <Button
              title={`View Profile`}
              titleStyle={{ fontSize: 18 }}
              type={"clear"}
              onPress={
                _.debounce(() => {
                  this.props.navigation.navigate(navigate.screen, navigate.param)
                  this.setState(INITIAL_STATE)
                }, 1500, {
                    leading: true,
                    trailing: false
                  })
              }
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}
          >
            <Button
              title={`Reject`}
              titleStyle={{ fontSize: 16 }}
              buttonStyle={{
                flexGrow: 1,
                borderRadius: 0,
                backgroundColor: "#EF1B17"
              }}
              onPress={() =>
                ConfirmAlert(
                  "Reject Request",
                  `Are you sure?`,
                  this.handleRejectRequest
                )
              }
            />

            <Button
              title={`Approve`}
              titleStyle={{ fontSize: 16 }}
              buttonStyle={{
                flexGrow: 1,
                borderRadius: 0,
                backgroundColor: "#00CC66"
              }}
              onPress={() =>
                ConfirmAlert(
                  "Accept Request",
                  `Are you sure?`,
                  this.handleAcceptequest
                )
              }
            />
          </View>
        </View>
      </Overlay>
    );
  };

  render() {
    const { data, loading, refreshing, screenLoading, search } = this.state;
    const { makeRemoteRequest, handleRefresh, renderItem, handleSearch } = this;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        {this.renderOverlay()}
        <Search
          value={search}
          data={data}
          handleSearch={handleSearch}
          {...this.props}
        />
        <Loading loading={screenLoading} size={"large"} />
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={search ? `'${search}' was not found` : "No Request Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default AdminRequestListScreen;
