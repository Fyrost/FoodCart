import React, { Component } from "react";
import { View } from "react-native";
import { Button, ListItem, Text, Overlay, Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Search from "../../../components/Search";
import { getAdminTagList, errorHandler, contains } from "../../../actions";
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
            data: res.data.data,
            fullData: res.data.data
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

  handleSearch = text => {
    const data = this.state.fullData.filter(menu => {
      return contains(menu.name, text) || contains(menu.slug, text);
    });
    this.setState({ search: text, data });
  };

  renderTagDetail = () => (
    <Overlay
      isVisible={this.state.isDetailVisible}
      width="auto"
      height="45%"
      containerStyle={{ padding: 5 }}
      onBackdropPress={() => this.setState({ isDetailVisible: false })}
    >
      <View style={{ flexGrow: 1 }}>
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
            right: -33,
            top: -32
          }}
          onPress={() => this.setState({ isDetailVisible: false })}
        />
        <View style={{ flex: 3, justifyContent: 'space-evenly', paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Name: </Text>
            <Text style={{ fontSize: 16, fontWeight: 'normal' }}>{this.state.detail.name}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Slug: </Text>
            <Text style={{ fontSize: 16, fontWeight: 'normal' }}>{this.state.detail.slug}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Used by: </Text>
            <Text style={{ fontSize: 16, fontWeight: 'normal' }}>{this.state.detail.usedBy}</Text>
          </View>
          
        </View>
          <Button
            title={`View Item/s`}
            titleStyle={{ fontSize: 18 }}
            type={"clear"}
            containerStyle={{ flex: 1, justifyContent: 'flex-end' }}
            onPress={() => {
              this.setState({ isDetailVisible: false });
              this.props.navigation.navigate("AdminMenuFilter", {
                tag: this.state.detail.slug
              });
            }}
          />
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
    />
  );

  render() {
    const {
      data,
      error,
      loading,
      refreshing,
      screenLoading,
      search
    } = this.state;
    const {
      makeRemoteRequest,
      renderItem,
      handleRefresh,
      renderTagDetail,
      handleSearch
    } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        <Loading loading={screenLoading} size="large" />
        <Search
          value={search}
          data={data}
          handleSearch={handleSearch}
          {...this.props}
        />
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
