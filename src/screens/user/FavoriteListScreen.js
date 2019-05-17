import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { Card, Button, Icon, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import {
  getFavoriteResto,
  deleteFavoriteResto,
  errorHandler
} from "../../actions";
import { ConfirmAlert } from "../../components/Alerts";
import List from "../../components/List";
import Loading from "../../components/Loading";
import _ from "lodash";
const numColumns = 1;

const formatData = (data, numColumns) => {
  let numberOfElementsLastRow = data.length % numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

class FavoriteListScreen extends Component {
  state = {
    resto: [],
    loading: false,
    screenLoading: false
  };
  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getFavoriteResto()
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            resto: data
          });
        } else {
          this.setState({
            loading: false,
            error: res.data.message
          });
        }
      })
      .catch(err =>
        this.setState({
          error: errorHandler(err),
          loading: false
        })
      );
  };

  handleUnfavorite = slug => {
    this.setState({ screenLoading: true });
    deleteFavoriteResto(slug)
      .then(res => {
        this.setState({
          screenLoading: false
        });
        alert(res.data.message);
        if (res.data.success) this.makeRemoteRequest();
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        alert(errorHandler(err));
      });
  };

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View>
        <Card
          image={{
            uri: `http://pinoyfoodcart.com/image/restaurant/${item.image_name}`
          }}
          containerStyle={{
            flex: 1,
            elevation: 3,
            shadowOffset: {
              width: 0,
              height: 2
            }
          }}
        >
          <View style={styles.itemRowSpaceBetween}>
            <Text style={styles.itemTitle}>{item.name}</Text>
          </View>

          <View style={styles.itemRowSpaceBetween}>
            <Text>{item.address}</Text>
          </View>
          <View style={styles.space} />
          <Divider style={{ height: 1.5 }} />
          <View style={{ height: 10, flex: 1 }} />

          <View style={styles.itemRowSpaceBetween}>
            <View style={styles.itemRow}>
              <View style={styles.itemRowSpaceAround}>
                <View style={styles.itemRow}>
                  <Icon name={"star"} type={"font-awesome"} color={"#f1c40f"} />
                  <Text style={styles.itemText}>
                    {" "}
                    {Number.parseFloat(item.rating).toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              raised
              icon={
                <Icon
                  name={"heart"}
                  type={"font-awesome"}
                  color={"white"}
                  size={16}
                />
              }
              buttonStyle={{ backgroundColor: "#EA5B7A" }}
              title={" Unfavorite"}
              titleStyle={{ color: "white" }}
              onPress={() =>
                ConfirmAlert("Unfavorite", "Are you sure?", () =>
                  this.handleUnfavorite(item.slug)
                )
              }
            />
            <Button
              icon={<Icon name="eye" type={"font-awesome"} color="#ffffff" />}
              backgroundColor={"#03A9F4"}
              containerStyle={styles.flexContainer}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title={" View Menu"}
              onPress={_.debounce(
                () =>
                  this.props.navigation.navigate("UserRestoMenu", {
                    slug: item.slug
                  }),
                1500,
                { leading: true, trailing: false }
              )}
            />
          </View>
        </Card>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
        <NavigationEvents onWillFocus={this.makeRemoteRequest} />
        <Loading loading={this.state.screenLoading} size="large" />
        <List
          data={formatData(this.state.resto, numColumns)}
          renderItem={this.renderItem}
          loading={this.state.loading}
          emptyText={"No Restaurant"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

export default FavoriteListScreen;

const styles = {
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemRow: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center"
  },
  itemRowSpaceAround: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  itemRowSpaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "600"
  },
  itemText: {
    fontSize: 14
  },
  itemGreen: {
    fontSize: 14,
    fontWeight: "200",
    color: "#00CC66"
  },
  itemRed: {
    fontSize: 14,
    fontWeight: "200",
    color: "#EF1B17"
  },
  space: {
    flex: 1,
    height: 20
  }
};
