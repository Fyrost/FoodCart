import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image, Icon, Avatar, Card, SearchBar, Divider } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getHome, errorHandler } from "../../actions";
import List from '../../components/List'
import _ from 'lodash'

const numColumns = 1;

class HomeScreen extends Component {
  state = {
    hot: [],
    rated: [],
    newly: [],
    recommendation: [],
    toggleSearch: false,
    error: "",
    refreshing: false,
    loading: false
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.state.toggleSearch ? 1 : 0
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleSearch: this.handleSearchVisible
    });
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.toggleSearch ? 1 : 0,
      duration: 100
    }).start();
  }

  handleSearchVisible = () => {
    this.setState({ toggleSearch: !this.state.toggleSearch });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getHome()
      .then(res => {
        const { whats_hot, top_rated, newly_added, recommendation } = res.data.data;
        this.setState({
          hot: whats_hot,
          rated: top_rated,
          newly: newly_added,
          recommendation: recommendation
        });
        this.setState({ loading: false, refreshing: false });
      })
      .catch(err => {
        this.setState({
          error: errorHandler(err)
        });
        this.setState({ loading: false, refreshing: false });
      });
  };
  renderHeader = () => {
    const viewStyle = {
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
      })
    };
    return (
      <Animated.View
        style={[
          viewStyle,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            elevation: 1,
            backgroundColor: "#FAFAFA"
          }
        ]}
      >
        <SearchBar
          containerStyle={{
            display: "flex",
            flex: 1,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
          inputStyle={{ color: "#484749", backgroundColor: "transparent" }}
          inputContainerStyle={{ backgroundColor: "transparent" }}
          leftIconContainerStyle={{ backgroundColor: "transparent" }}
          rightIconContainerStyle={{ backgroundColor: "transparent" }}
          placeholder="Search Restaurants, Tags..."
          onChangeText={this.handleSearch}
          value={this.state.search}
          round
          autoCorrect={false}
        />
      </Animated.View>
    );
  };
   
  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={styles.itemInvisible} />;
    }
    const { width } = Dimensions.get("screen");
    const timeColor = item.open ? styles.itemGreen : styles.itemRed;
    const timeText = item.open ? "OPEN" : "CLOSE";
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ flex: 1 }}
        onPress={_.debounce(
          () =>
            this.props.navigation.push("UserRestoMenu", { slug: item.slug }),
          1000,
          { leading: true, trailing: false }
        )}
      >
        <Card
          image={{
            uri: `http://pinoyfoodcart.com/image/restaurant/${item.image_name}`
          }}
          imageProps={{ resizeMethod: 'auto', resizeMode: 'cover' }}
          containerStyle={{
            flex: 1,
            width: width - (width/4),
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
    )
  }
  render() {
    const width = Dimensions.get("screen").width;
    const { loading, refreshing, hot, recommendation, rated, newly } = this.state;
    const { renderItem, makeRemoteRequest, handleRefresh } = this;

    if (this.state.loading) return <ActivityIndicator size="large" />;
    else if (this.state.error) return <Text>{this.state.error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        {this.state.toggleSearch ? this.renderHeader() : null}
          <ScrollView>
            <View>
              <Text style={styles.homeTitle}>
                What's Hot
              </Text>
              <View style={{ backgroundColor: '#171a29' }}>
                <List
                  data={hot}
                  renderItem={renderItem}
                  horizontal={true}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  loading={loading}
                  emptyText={"No Restaurant"}
                  showsHorizontalScrollIndicator={false}
                  numColumns={1}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  divider={"none"}
                />
              </View>
            </View>

            <View>
              <Text style={styles.homeTitle}>
                Newly Added
              </Text>
              <View style={{ backgroundColor: '#171a29' }}>
                <List
                  data={newly}
                  renderItem={renderItem}
                  horizontal={true}
                  loading={loading}
                  emptyText={"No Restaurant"}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  numColumns={1}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  divider={"none"}
                />
              </View>
            </View>

            <View>
              <Text style={styles.homeTitle}>
                Top Rated
              </Text>
              <View style={{ backgroundColor: '#171a29' }}>
                <List
                  data={rated}
                  renderItem={renderItem}
                  horizontal={true}
                  loading={loading}
                  emptyText={"No Restaurant"}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  numColumns={1}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  divider={"none"}
                />
              </View>
            </View>
            
            <View>
              <Text style={styles.homeTitle}>
                Recommendation
              </Text>
              <View style={{ backgroundColor: '#171a29' }}>
                <List
                  data={recommendation}
                  renderItem={renderItem}
                  horizontal={true}
                  loading={loading}
                  emptyText={"No Restaurant"}
                  showsHorizontalScrollIndicator={false}
                  numColumns={1}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  divider={"none"}
                />
              </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = {
  container: {
    flex: 1
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
  },
  homeTitle: {
    fontSize: 22,
    fontWeight: "500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: "#11CDEF"
  }
};
