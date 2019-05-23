import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Card, Icon, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import List from "../../../components/List";
import Search from "../../../components/Search";
import { getRestaurantList, errorHandler, contains } from "../../../actions";

import _ from "lodash";

const numColumns = 1;
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

const formatTag = data => {
  let arr = data.map(item => {
    return item.name;
  });
  return arr;
};

class RestoListScreen extends Component {
  state = {
    resto: [],
    loading: false,
    refreshing: false,
    search: "",
    tag: [],
    selectItem: []
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    const { search, tag } = this.state;
    getRestaurantList({ search, tag })
      .then(res => {
        if (res.data.success) {
          const { data, tags } = res.data;
          this.setState({
            loading: false,
            refreshing: false,
            resto: data,
            fullData: Object.values(data)
          });
          this.state.selectItem !== formatTag(tags) &&
            this.setState({ selectItem: formatTag(tags) });
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

  handleSearch = text => {
    const resto = this.state.fullData.filter(item => contains(item.name, text));
    this.setState({ search: text, resto }, () => this.makeRemoteRequest());
  };

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    const timeColor = item.open ? styles.itemGreen : styles.itemRed;
    const timeText = item.open ? "OPEN" : "CLOSE";
    return (
      <TouchableOpacity
        activeOpacity={0.7}
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
          <View style={{ height: 5, flex: 1 }} />
          <Divider style={{ height: 1.5 }} />
          <View style={{ height: 10, flex: 1 }} />

          <View style={styles.itemRowSpaceBetween}>
            <View style={[styles.itemRow, { justifyContent: "flex-start" }]}>
              <Icon name={"star"} type={"font-awesome"} color={"#f1c40f"} />
              <Text style={styles.itemText}>
                {" "}
                {Number.parseFloat(item.rating).toFixed(1)}
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
    const { resto, loading, refreshing, search } = this.state;
    const { makeRemoteRequest, renderItem, handleRefresh, handleSearch } = this;
    return (
      <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <Search
          value={search}
          data={resto}
          handleSearch={handleSearch}
          {...this.props}
        />
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
          divider={"none"}
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
    fontSize: 16,
    fontWeight: "500"
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
