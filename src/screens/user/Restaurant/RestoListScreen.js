import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Card, Button, Icon, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getRestaurantList, errorHandler } from "../../../actions";
import List from "../../../components/List";
import _ from "lodash";

const numColumns = 2;
const formatData = (data, numColumns) => {
  let arr = Array.isArray(data)
    ? data
    : Object.values(data).map(value => {
        return value;
      });
  let numberOfElementsLastRow = arr.length % numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    arr.push({ empty: true });
    numberOfElementsLastRow++;
  }
  return arr;
};

class RestoListScreen extends Component {
  state = {
    resto: {},
    loading: false,
    refreshing: false
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getRestaurantList()
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            refreshing: false,
            resto: data
          });
        } else {
          this.setState({
            loading: false,
            refreshing: false,
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

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    const timeColor = item.open ? styles.itemGreen : styles.itemRed;
    const timeText = item.open ? "OPEN" : "CLOSE";
    return (
      <TouchableOpacity
        onPress={_.debounce(
          () =>
            this.props.navigation.push("UserRestoMenu", { slug: item.slug }),
          1500,
          { leading: true, trailing: false }
        )}
      >
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
            <Text style={timeColor}>{item.times}</Text>
            <Text style={timeColor}>{timeText}</Text>
          </View>
          <View style={styles.space} />
          <Divider style={{ height: 1.5 }} />
          <View style={{ height: 10, flex: 1 }} />

          <View style={styles.itemRowSpaceBetween}>
            <View style={[styles.itemRow, { justifyContent: "flex-start" }]}>
              <Icon name={"star"} type={"font-awesome"} color={"#f1c40f"} />
              <Text style={styles.itemText}>
                {" "}
                {Number.parseFloat(item.rating).toFixed(2)}
              </Text>
            </View>

            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.eta} MINS</Text>
            </View>

            <View style={[styles.itemRow, { justifyContent: "flex-end" }]}>
              <Text style={styles.itemText}>{item.flat_rate} PHP</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    const { resto, loading, refreshing } = this.state;
    const { makeRemoteRequest, renderItem, handleRefresh } = this;
    return (
      <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <List
          data={formatData(resto, numColumns)}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Restaurant"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          numColumns={numColumns}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default RestoListScreen;

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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  itemRowSpaceAround: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
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
