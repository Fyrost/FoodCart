import React, { Component } from "react";
import { View } from "react-native";
import { Button, ListItem, Text, Overlay, Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import { getAdminTagList, errorHandler } from "../../../actions";
import Loading from "../../../components/Loading";
import List from "../../../components/List";
import styles from "../../styles";

class TagApprovedScreen extends Component {
  state = {
    data: [],
    detail: {
      id: "",
      name: "",
      slug: "",
      usedBy: "",
      status: ""
    },
    refreshing: false,
    loading: false,
    screenLoading: false,
    isDetailVisible: false
  };

  static navigationOptions = () => {
    return {
      title: "Approved Tag"
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminTagList("accepted")
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

  renderTagDetail = () => (
    <Overlay
      isVisible={this.state.isDetailVisible}
      width="auto"
      height="auto"
      onBackdropPress={() => this.setState({ isDetailVisible: false })}
    >
      <View>
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
            right: -33  ,
            top: -32
          }}
          onPress={() => this.setState({ isDetailVisible: false })}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Name: </Text>
            <Text>{this.state.detail.name}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Slug: </Text>
            <Text>{this.state.detail.slug}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Used by: </Text>
            <Text>{this.state.detail.usedBy}</Text>
          </View>
          <Button
          title={`View Item/s`}
          type={'clear'}
          onPress={() => {
            this.setState({ isDetailVisible: false });
            this.props.navigation.navigate("AdminMenuFilter", {
              tag: this.state.detail.slug
            });
          }}
        />
        </View>
      </View>
    </Overlay>
  );

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      subtitle={"Approved: " + item.created_at}
      chevron={true}
      onPress={() =>
        this.setState({
          isDetailVisible: true,
          detail: {
            id: item.id,
            name: item.name,
            slug: item.slug,
            usedBy: `${item.used_by} item/s`,
            status: item.status
          }
        })
      }
      bottomDivider
    />
  );

  render() {
    const { data, error, loading, refreshing, screenLoading } = this.state;
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
        <Loading loading={screenLoading} size="large" />
        {renderTagDetail()}
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyContainerStyle={{ alignItems: "center", marginTop: 30 }}
          emptyStyle={{ fontSize: 18, fontWeight: "500" }}
          emptyText={"No Approved Tag"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default TagApprovedScreen;
