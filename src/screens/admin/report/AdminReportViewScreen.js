import React, { Component } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { Text, Card, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { MessageAlert } from "../../../components/Alerts";
import { getAdminReportDetail, errorHandler } from "../../../actions";

const formatStatus = status =>
  status === "0" ? "Open" : status === "1" ? "Under Investigation" : "Closed";
  
class AdminReportViewScreen extends Component {
  state = {
    ticket: {
      id: "",
      code: "",
      reason: "",
      status: "",
      proof1: "",
      proof2: "",
      proof3: "",
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
    loading: false
  };

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
        this.setState({
          loading: false,
          ticket: {
            id,
            code,
            reason,
            status,
            proof1,
            proof2,
            proof3,
            created_at
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

  render() {
    const { loading, ticket, order, restaurant, customer } = this.state;
    const { makeRemoteRequest } = this;
    if (loading) return <ActivityIndicator size="large" />;
    return (
      <ScrollView style={{ paddingVertical: 10 }}> 
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <Card
          wrapperStyle={{ margin: 0, padding: 0 }}
        >
          <Text h4 style={styles.cardTitle}>Ticket Information</Text>
          <Divider/>
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

            {/* <View>
              <Text>Image Proof</Text>
              <Text>{ticket.proof1}</Text>
              <Text>{ticket.proof2}</Text>
              <Text>{ticket.proof3}</Text>
            </View> */}
        </Card>

        <Card
          wrapperStyle={{ margin: 0, padding: 0 }}
        >
          <View>
            <Text h4 style={styles.cardTitle}>Order Information</Text>
          </View>
          <Divider/>
            <View style={styles.cardRowContent}>  
              <Text style={styles.restoSubtitleText}>Order #</Text>
              <Text style={styles.restoText}>{order.code}</Text>
            </View>

            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>  
              <Text style={styles.restoSubtitleText}>Date Submitted:</Text>
              <Text style={styles.restoText}>{order.date}</Text>
            </View>

            <View style={styles.cardRowContent}>  
              <Text style={styles.restoSubtitleText}>Item List:</Text>
              <Text style={styles.restoText}></Text>
            </View>
            <View>
              {/* suborder.itemlist ///listan nung pagkain*/}
            </View>
        </Card>
        
        <Card
          wrapperStyle={{ margin: 0, padding: 0 }}
        >
          <View>
            <Text h4 style={styles.cardTitle}>Customer Information</Text>
          </View>
          <Divider/>
            <View style={styles.cardRowContent}>  
              <Text style={styles.restoSubtitleText}>Name:</Text>
              <Text style={styles.restoText}>{customer.fname} {customer.lname}</Text>
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
        <View style={{ height: 20 }}/>
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
    color: 'white', 
    backgroundColor: '#1B73B4', 
    textAlign: 'center' 
  },
  restoSubtitleText: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5
  },
  restoText: {
    fontWeight: "normal"
  },
}