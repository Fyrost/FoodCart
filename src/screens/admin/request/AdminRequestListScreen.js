import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem, Overlay, Button, Icon } from "react-native-elements";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getRequestList, errorHandler, contains } from "../../../actions";

class AdminRequestListScreen extends Component {
  state = {
    data: [],
    loading: false,
    refreshing: false,
    overlayVisible: false
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

  handleLayout = () =>
    this.setState({
      overlayVisible: true
    });

  handleSearch = text => {
    const data = this.state.fullData.filter(item => {
      return contains(item.email, text);
    });
    this.setState({ search: text, data });
  };

  renderItem = ({ item: { id, old_email, new_email, status, created_at } }) => (
    <ListItem
      title={`Old Email: ${old_email}`}
      rightTitle={`New Email: ${new_email}`}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={`Request Date: ${created_at}\nStatus: ${status}`}
      chevron={true}
      onPress={() => this.handleLayout()}
    />
  );

  renderOverlay = () => {
    const INITIAL_STATE = {
      overlayVisible: false
    }
    const { overlayVisible } = this.state
    return (
      <Overlay
        isVisible={overlayVisible}
        width={"65%"}
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
          <View style={{ flex: 3, justifyContent: 'space-evenly', paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: "#1B73B4",
              }}
            >
              Request Information
            </Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Old Email: </Text>
              <Text style={{ fontSize: 16, fontWeight: 'normal' }}>old@gmail.com</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>New Email: </Text>
              <Text style={{ fontSize: 16, fontWeight: 'normal' }}>new@gmail.com</Text>
            </View>

            <View style={{ justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Reason:  </Text>
              <Text style={{ fontSize: 16, fontWeight: 'normal' }}>Eh kasi ano, alright!</Text>
            </View>
            <Button
              title={`View Profile`}
              titleStyle={{ fontSize: 18 }}
              type={"clear"}
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
            />

            <Button
              title={`Approve`}
              titleStyle={{ fontSize: 16 }}
              buttonStyle={{
                flexGrow: 1,
                borderRadius: 0,
                backgroundColor: "#00CC66"
              }}
            />
          </View>
        </View>
      </Overlay>
    );
  }

  render() {
    const { data, loading, refreshing, search } = this.state;
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
