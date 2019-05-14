import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";
import _ from "lodash";
import { ListItem, Card, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { MessageAlert, ConfirmAlert } from "../../../components/Alerts";
import {
  getAdminBlockDetail,
  getAdminRestoDetail,
  liftBlock,
  errorHandler
} from "../../../actions";
import List from "../../../components/List";
import Loading from "../../../components/Loading";

class AdminBanViewScreen extends Component {
  state = {
    ban: {
      id: "",
      reason: "",
      created_at: "",
      updated_at: ""
    },
    user: {
      id: "",
      email: "",
      email_verified_at: "",
      access_level: "",
      created_at: "",
      updated_at: ""
    },
    customer: {
      id: "",
      fname: "",
      mname: "",
      lname: "",
      contact_number: "",
      address: "",
      created_at: "",
      updated_at: ""
    },
    restaurant: {
      id: "",
      owner_fname: "",
      owner_mname: "",
      owner_lname: ""
    },
    reports: [],
    loading: false,
    screenLoading: false
  };
  componentWillMount() {
    this.setState(
      {
        restaurant: { id: this.props.navigation.getParam("restoId", null) }
      },
      this.makeRemoteRequest
    );
  }
  makeRemoteRequest = () => {
    this.setState({ loading: true });
    if (this.state.restaurant.id) {
      getAdminRestoDetail(this.state.restaurant.id)
        .then(res => {
          if (res.data.success) {
            this.setState({
              loading: false,
              restaurant: res.data.data.restaurant,
              menu: res.data.menu,
              user: {
                id: res.data.user_id
              }
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
    } else {
      getAdminBlockDetail(this.props.navigation.getParam("banId"))
        .then(res => {
          if (res.data.success) {
            const { ban, user, customer, reports } = res.data.data;
            this.setState({
              loading: false,
              ban,
              user,
              customer,
              reports
            });
          } else {
            this.setState({ loading: false });
            MessageAlert("Ban Detail", res.data.message);
          }
        })
        .catch(err => {
          this.setState({ loading: false });
          MessageAlert("Ban Detail", errorHandler(err));
        });
    }
  };

  handleLift = () => {
    this.setState({ screenLoading: true });
    liftBlock(this.state.user.id)
      .then(res => {
        const { message } = res.data;
        this.setState({ screenLoading: false });
        MessageAlert("Lift Ban", message);
        this.props.navigation.pop();
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        MessageAlert("Lift Ban", errorHandler(err));
      });
  };

  renderItem = ({ item }) => (
    <ListItem
      title={`#${item.code}`}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      chevron={true}
      onPress={() =>
        this.props.navigation.push("AdminReportView", { code: item.code })
      }
      ItemSeparatorComponent={null}
    />
  );

  render() {
    const { loading, error, screenLoading } = this.state;
    if (loading) return <ActivityIndicator size="large" />;
    else if (error) return <Text>{error}</Text>;
    const { restaurant, user, customer, reports } = this.state;
    const nav = restaurant.id
      ? {
          screen: "AdminRestoView",
          param: { restoId: restaurant.id }
        }
      : {
          screen: "AdminCustomerView",
          param: { customerId: customer.id }
        };
    const name = restaurant.id
      ? restaurant.name
      : `${customer.fname} ${customer.lname}`;
    const address = restaurant.id ? restaurant.address : customer.address;
    const contact_number = restaurant.id
      ? restaurant.contact_number
      : customer.contact_number;
    return (
      <ScrollView style={{ marginBottom: 10 }}>
        <Loading loading={screenLoading} size={"large"} />
        <Button
          title={"Lift Ban"}
          onPress={() =>
            ConfirmAlert("Lift Ban", "Are you sure?", this.handleLift)
          }
        />
        <Card title={"User Information"}>
          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Name</Text>
            <TouchableNativeFeedback
              onPress={_.debounce(
                () => this.props.navigation.push(nav.screen, nav.param),
                1000,
                {
                  leading: true,
                  trailing: false
                }
              )}
            >
              <Text style={[styles.cardRowText, { color: "#1B73B4" }]}>
                {name}
              </Text>
            </TouchableNativeFeedback>
          </View>

          {restaurant.id && (
            <View style={styles.cardRow}>
              <Text style={styles.cardRowTitle}>Owner Name</Text>
              <Text style={styles.cardRowText}>
                {`${restaurant.owner_fname} ${restaurant.owner_lname}`}
              </Text>
            </View>
          )}

          <View style={styles.cardRow2}>
            <Text style={styles.cardRowTitle}>Address</Text>
            <Text style={styles.cardRowText}>{address}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Contact Number</Text>
            <Text style={styles.cardRowText}># {contact_number}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardRowTitle}>Ban Date</Text>
            <Text style={styles.cardRowText}>
              # {this.props.navigation.getParam("banDate")}
            </Text>
          </View>

          <View style={styles.cardRow2}>
            <Text style={styles.cardRowTitle}>Ban Reason</Text>
            <Text style={styles.cardRowText}>
              {this.props.navigation.getParam("reason")}
            </Text>
          </View>
        </Card>
        {!restaurant.id && (
          <Card title={"Related Reports"}>
            <List
              data={reports}
              renderItem={this.renderItem}
              loading={loading}
              emptyText={"No Customer Found"}
              showsVerticalScrollIndicator={false}
            />
          </Card>
        )}
      </ScrollView>
    );
  }
}

export default AdminBanViewScreen;

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
