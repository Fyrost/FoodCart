import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Image, Icon, Avatar, Card, SearchBar } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getHome, errorHandler } from "../../actions";

class HomeScreen extends Component {
  state = {
    hot: [],
    rated: [],
    new: [],
    toggleSearch: false,
    error: ""
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

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getHome()
      .then(res => {
        const { whats_hot, top_rated, newly_added } = res.data.data;
        this.setState({
          hot: whats_hot,
          rated: top_rated,
          new: newly_added
        });
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          error: errorHandler(err)
        });
        this.setState({ loading: false });
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

  render() {
    const width = Dimensions.get("screen").width;
    if (this.state.loading) return <ActivityIndicator size="large" />;
    else if (this.state.error) return <Text>{this.state.error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onDidFocus={this.makeRemoteRequest} />
        {console.log(this.state)}

        {this.state.toggleSearch ? this.renderHeader() : null}
        <View style={{ flex: 1 }}>
          <ScrollView>
            <ScrollView
              style={{ backgroundColor: "#171a29", height: "auto" }}
              contentContainerStyle={{ paddingBottom: 15 }}
              bounces={false}
              horizontal
            >
              <Card
                title="HORIZONTAL FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="HORIZONTAL FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="HORIZONTAL FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>
            </ScrollView>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                paddingVertical: 10,
                paddingHorizontal: 20,
                color: "#11CDEF"
              }}
            >
              What's Hot
            </Text>
            <ScrollView
              style={{ backgroundColor: "#171a29", height: "auto" }}
              contentContainerStyle={{ paddingBottom: 15 }}
              bounces={false}
              horizontal
            >
              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>
            </ScrollView>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                paddingVertical: 10,
                paddingHorizontal: 20,
                color: "#11CDEF"
              }}
            >
              Top Rated
            </Text>
            <ScrollView
              style={{ backgroundColor: "#171a29", height: "auto" }}
              contentContainerStyle={{ paddingBottom: 15 }}
              bounces={false}
              horizontal
            >
              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>
            </ScrollView>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                paddingVertical: 10,
                paddingHorizontal: 20,
                color: "#11CDEF"
              }}
            >
              Newly Added
            </Text>
            <ScrollView
              style={{ backgroundColor: "#171a29", height: "auto" }}
              contentContainerStyle={{ paddingBottom: 15 }}
              bounces={false}
              horizontal
            >
              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>
            </ScrollView>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                paddingVertical: 10,
                paddingHorizontal: 20,
                color: "#11CDEF"
              }}
            >
              Popular
            </Text>
            <ScrollView
              style={{ backgroundColor: "#171a29", height: "auto" }}
              contentContainerStyle={{ paddingBottom: 15 }}
              bounces={false}
              horizontal
            >
              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>

              <Card
                title="Whats Hot FEATURE"
                containerStyle={{ margin: width / 32 }}
                wrapperStyle={{ width: width / 2 }}
              >
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
                <Text>[-------------]</Text>
              </Card>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
