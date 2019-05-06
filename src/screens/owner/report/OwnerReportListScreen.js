import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ListItem, Overlay, Icon, Image } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import {
  getOwnerReportList,
  errorHandler
} from "../../../actions";
import List from "../../../components/List";
const formatStatus = status =>
  status === "0" ? "Open" : status === "1" ? "Under Investigation" : "Closed";
  
class OwnerReportListScreen extends Component {
  state = {
    layoutVisible: false,
    ticket: {
      id: "",
      reason: "",
      code: "",
      status: "",
      proof1: "",
      proof2: "",
      proof3: "",
      comment: "",
      created_at: "",
      updated_at: ""
    },
    data: [],
    loading: false,
    refreshing: false,
    error: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getOwnerReportList()
      .then(res => {
        this.setState({
          data: res.data.data,
          loading: false,
          refreshing: false
        });
      })
      .catch(err => {
        this.setState({
          error: errorHandler(err),
          loading: false,
          refreshing: false
        });
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

  renderOverlay = () => {
    const {
      layoutVisible,
      ticket: {
        id,
        reason,
        code,
        status,
        proof1,
        proof2,
        proof3,
        comment,
        created_at,
        updated_at
      }
    } = this.state;
    const INITIAL_LAYOUT = {
      layoutVisible: false,
      ticket: {
        id: "",
        reason: "",
        code: "",
        status: "",
        proof1: "",
        proof2: "",
        proof3: "",
        comment: "",
        created_at: "",
        updated_at: ""
      }
    };
    return (
      <Overlay
        isVisible={layoutVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() => this.setState(INITIAL_LAYOUT)}
      >
        <View>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={22}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: -32,
              top: -32
            }}
            onPress={() => this.setState(INITIAL_LAYOUT)}
          />
          
          <Text style={{ textAlign: 'center', paddingVertical: 10, color: '#1B73B4', fontSize: 18, fontWeight: '500' }}>Reportd Details</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontWeight: '500' }}>Ticket #</Text>
            <Text>{code}</Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontWeight: '500' }}>Reason</Text>
            <Text>{reason}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontWeight: '500' }}>Status</Text> 
            <Text>{formatStatus(status)}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontWeight: '500' }}>Comment</Text> 
            <Text>{comment}</Text>
          </View>
          
         
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontWeight: '500' }}>Submitted</Text> 
            <Text>{created_at}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
            {proof1 ? <Image source={{ uri:`http://pinoyfoodcart.com/image/report/${proof1}`}} style={{ height: 80, width: 80, resizeMode: 'contain' }}/> : null}
            {proof2 ? <Image source={{ uri:`http://pinoyfoodcart.com/image/report/${proof2}`}} style={{ height: 80, width: 80, resizeMode: 'contain' }}/> : null}
            {proof3 ? <Image source={{ uri:`http://pinoyfoodcart.com/image/report/${proof3}`}} style={{ height: 80, width: 80, resizeMode: 'contain' }}/> : null}  
          </View>
          
        </View>
      </Overlay>
    );
  };

  renderItem = ({
    item: {
      id,
      reason,
      code,
      status,
      proof1,
      proof2,
      proof3,
      comment,
      created_at,
      updated_at
    }
  }) => {
    const statusType = status === "0"
      ? { text: 'OPEN', color: '#00CC66' }
      : status === "1"
        ? { text: 'UNDER INVESTIGATION', color: '#11CDEF' }
        : { text: 'CLOSED', color: '#EF1B17' }
    return (
      <ListItem
        title={`Ticket # ${code}`}
        titleStyle={{ fontWeight: '500', fontSize: 18, color: '#1B73B4' }}
        subtitle={
          <View>
            <Text style={{ fontSize: 12, fontWeight: '500', color: statusType.color }}>{statusType.text}</Text>
            <Text>Submitted:</Text>
            <Text>{created_at}</Text>
          </View>
        }
        chevron={true}
        bottomDivider
        onPress={() =>
          this.setState({
            layoutVisible: true,
            ticket: {
              id,
              reason,
              code,
              status,
              proof1,
              proof2,
              proof3,
              comment,
              created_at,
              updated_at
            }
          })
        }
      />
    )
  };

  render() {
    const { data, loading, refreshing, error } = this.state;
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={this.makeRemoteRequest} />
        {this.renderOverlay()}
        <List
          data={data}
          renderItem={this.renderItem}
          loading={loading}
          emptyText={"No Report Found"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

export default OwnerReportListScreen;
