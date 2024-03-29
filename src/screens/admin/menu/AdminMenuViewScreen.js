import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableHighlight
} from "react-native";
import _ from "lodash";
import { Card, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getAdminMenuDetail, errorHandler } from "../../../actions";
import ToolTipHelper from "../../../components/ToolTipHelper";
class AdminMenuViewScreen extends Component {
  state = {
    data: {
      tag: []
    },
    loading: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getAdminMenuDetail(this.props.navigation.getParam("menuId"))
      .then(res => {
        if (res.data.success) {
          this.setState({
            loading: false,
            data: res.data.data
          });
        } else {
          this.setState({
            loading: false,
            error: res.data.message
          });
          if (res.data.message.includes("Unauthorized")) {
            this.props.navigation.navigate("Auth");
          }
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: errorHandler(err)
        });
      });
  };

  render() {
    const { loading, error } = this.state;
    const {
      id,
      name,
      description,
      price,
      cooking_time,
      image_name,
      slug,
      deleted_at,
      created_at,
      updated_at,
      category,
      restaurant_id,
      restaurant_name,
      tag
    } = this.state.data;
    if (loading) return <ActivityIndicator size="large" />;
    else if (error)
      return <Text>{`${error}\nItem may have been deleted`}</Text>;
    else if (!this.props.navigation.getParam("menuId"))
      return <Text>Item may have been deleted</Text>;
    return (
      <ScrollView style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={this.makeRemoteRequest} />
        <Card
          image={{
            uri: `http://pinoyfoodcart.com/image/menu/${image_name}`
          }}
        >
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.restoTitle}>{name}</Text>
            <Text style={{ textAlign: "center" }}>#{id}</Text>
          </View>

          <Divider />

          <View style={styles.restoTitle}>
            <Text style={styles.restoSubtitle}>Menu Information</Text>

            <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
              <Text style={styles.restoSubtitleText}>Description:</Text>
              <Text style={styles.restoText}>{description}</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Category:</Text>
              <Text style={styles.restoText}>{category}</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Restaurant:</Text>
              <TouchableHighlight
                onPress={_.debounce(
                  () =>
                    this.props.navigation.push("AdminRestoView", {
                      restoId: restaurant_id
                    }),
                  1000,
                  {
                    leading: true,
                    trailing: false
                  }
                )}
              >
                <Text style={[styles.restoText, { color: "#1B73B4" }]}>
                  {restaurant_name}
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Price:</Text>
              <Text style={styles.restoText}>₱ {price}.00</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Cooking Time:</Text>
              <Text style={styles.restoText}>{cooking_time} mins</Text>
            </View>

            <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>Create at:</Text>
              <Text style={styles.restoText}>{created_at}</Text>
            </View>

            {/* <View style={styles.cardRowContent}>
              <Text style={styles.restoSubtitleText}>{at.text}:</Text>
              <Text style={styles.restoText}>{at.data}</Text>
            </View> */}

            <View style={styles.cardColContent}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.restoSubtitleText}>Tags:</Text>
                <ToolTipHelper>
                  <View
                    style={{ flexDirection: "row", alignContent: "space-around" }}
                  >
                    <Text style={styles.tagContainerPending}>Pending</Text>
                    <Text style={styles.tagContainerRejected}>Rejected</Text>
                    <Text style={styles.tagContainerAccepted}>Accepted</Text>
                  </View>
                </ToolTipHelper>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                {tag.map((tag, index) => {
                  const tagContainer =
                    tag.status === "0"
                      ? styles.tagContainerPending
                      : tag.status === "1"
                      ? styles.tagContainerAccepted
                      : styles.tagContainerRejected;
                  return (
                    <TouchableHighlight
                      onPress={_.debounce(
                        () =>
                          this.props.navigation.push("AdminMenuFilter", {
                            tag: tag.slug
                          }),
                        1000,
                        {
                          leading: true,
                          trailing: false
                        }
                      )}
                      key={index}
                    >
                      <Text style={tagContainer}>{tag.name}</Text>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>
          </View>
        </Card>
        <View style={{ height: 15 }} />
      </ScrollView>
    );
  }
}

export default AdminMenuViewScreen;

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
  cardColContent: {
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  cardRowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  tagContainerPending: {
    backgroundColor: "#99B0D7",
    borderRadius: 3,
    color: "#091428",
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 5,
    marginBottom: 8
  },
  tagContainerRejected: {
    backgroundColor: "#F68CA2",
    borderRadius: 3,
    color: "#f80031",
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 5,
    marginBottom: 8
  },

  tagContainerAccepted: {
    backgroundColor: "#c3f2fb",
    borderRadius: 3,
    color: "#03acca",
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 5,
    marginBottom: 8
  }
};
