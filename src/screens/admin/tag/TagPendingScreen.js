import React, { Component } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { Button, ListItem, Text, Overlay } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import {
  getAdminTagList,
  approveTag,
  rejectTag,
  errorHandler
} from "../../../actions";
import List from "../../../components/List";

class TagPendingScreen extends Component {
  state = {
    data: [],
    detail: {
      name: "",
      slug: "",
      usedBy: "",
      status: ""
    },
    isDetailVisible: false,
    refreshing: false,
    loading: false
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminTagList("pending")
      .then(res => {
        if (res.data.success) {
          this.setState({
            refreshing: false,
            loading: false,
            data: res.data.data
          });
        } else {
          this.setState({ error: res.data.message });
          this.setState({ refreshing: false, loading: false });
        }
      })
      .catch(err =>
        this.setState({
          refreshing: false,
          loading: false,
          error: errorHandler(err)
        })
      );
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  handleApprove = id => {
    this.setState({ loading: true });
    approveTag(id)
      .then(res => {
        this.setState({ loading: false });
        if (res.data.success) {
          alert(res.data.message);
          this.makeRemoteRequest();
        } else {
          if (res.data.errors.tag_id) alert(res.data.errors.tag_id[0]);
          else alert(res.data.message);
        }
      })
      .catch(err =>
        this.setState(
          {
            refreshing: false,
            loading: false
          },
          alert(errorHandler(err))
        )
      );
  };

  handleReject = id => {
    this.setState({ loading: true });
    rejectTag(id)
      .then(res => {
        this.setState({ loading: false });
        if (res.data.success) {
          alert(res.data.message);
          this.makeRemoteRequest();
        } else {
          if (res.data.errors.tag_id) alert(res.data.errors.tag_id[0]);
          else alert(res.data.message);
        }
      })
      .catch(err =>
        this.setState(
          {
            refreshing: false,
            loading: false
          },
          alert(errorHandler(err))
        )
      );
  };

  renderTagDetail = () => {
    return (
      <Overlay
        isVisible={this.state.isDetailVisible}
        width="auto"
        height="auto"
        onBackdropPress={() => this.setState({ isDetailVisible: false })}
      >
        <View>
          <Text>{this.state.detail.name}</Text>
          <Text>{this.state.detail.slug}</Text>
          <Text>{this.state.detail.usedBy}</Text>
          <Text>{this.state.detail.status}</Text>
          <Button
            title={`Approve`}
            onPress={() => {
              this.setState({ isDetailVisible: false });
              this.props.navigation.navigate("MenuList", {
                tag: this.state.detail.slug
              });
            }}
          />
          <Button
            title={`Reject`}
            onPress={() => {
              this.setState({ isDetailVisible: false });
              this.props.navigation.navigate("MenuList", {
                tag: this.state.detail.slug
              });
            }}
          />
          <Button
            title={`View Item/s`}
            onPress={() => {
              this.setState({ isDetailVisible: false });
              this.props.navigation.navigate("MenuList", {
                tag: this.state.detail.slug
              });
            }}
          />
        </View>
      </Overlay>
    );
  };
  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={"Sent: " + item.created_at}
      chevron={true}
      onPress={
        () =>
          this.setState({
            isDetailVisible: true,
            detail: {
              name: item.name,
              slug: item.slug,
              usedBy: `${item.used_by} item/s`,
              status: item.status
            }
          })
        // Alert.alert("Manage Tag", "Approve or Reject " + item.name + "?", [
        //   {
        //     text: "Cancel",
        //     style: "cancel"
        //   },
        //   {
        //     text: "Reject",
        //     onPress: () => {
        //       this.handleReject(item.id);
        //     }
        //   },
        //   {
        //     text: "Approve",
        //     onPress: () => {
        //       this.handleApprove(item.id);
        //     }
        //   }
        // ])
      }
      bottomDivider
    />
  );

  render() {
    const { data, error, loading, refreshing } = this.state;
    const {
      makeRemoteRequest,
      renderItem,
      handleRefresh,
      renderTagDetail
    } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        {renderTagDetail()}
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyContainerStyle={{ alignItems: "center", marginTop: 30 }}
          emptyStyle={{ fontSize: 18, fontWeight: "500" }}
          emptyText={"No Pending Tag"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default TagPendingScreen;
