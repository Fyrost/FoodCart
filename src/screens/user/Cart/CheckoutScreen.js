import React, { Component } from "react";
import { View, SectionList, ActivityIndicator, ScrollView } from "react-native";
import {
  Button,
  Text,
  Input,
  Overlay,
  Icon,
  Divider,
  Image
} from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { MessageAlert, ConfirmAlert } from "../../../components/Alerts";
import { getCheckout, postCheckout, errorHandler } from "../../../actions";
import ActivityLoading from "../../../components/ActivityLoading";
import Loading from "../../../components/Loading";

formatCart = cart => {
  return cart.map(section => {
    return {
      name: section.name,
      slug: section.slug,
      flatRate: section.flat_rate,
      sub_eta: section.sub_eta,
      total: section.total,
      data: section.menu
    };
  });
};

class CheckoutScreen extends Component {
  state = {
    checkout: [],
    grandTotal: "",
    totalCookTime: "",
    totalFlatRate: "",
    loading: false,
    screenLoading: false,
    error: "",
    overLayError: "",
    changeFor: "",
    orderOverlayVisible: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      checkoutButton: this.handleConfirm
    });
  }
  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getCheckout()
      .then(res => {
        if (res.data.success) {
          const {
            data,
            grand_total,
            total_cooking_time,
            total_flat_rate
          } = res.data;
          this.setState({
            loading: false,
            checkout: formatCart(data),
            grandTotal: grand_total,
            totalCookTime: total_cooking_time,
            totalFlatRate: total_flat_rate
          });
          data.map(value => {
            this.setState({
              [value.slug]: ""
            });
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

  handleConfirm = () => {
    this.setState({ screenLoading: true });
    let changefor = {};
    this.state.checkout.map(value => {
      changefor = { ...changefor, [value.slug]: this.state[value.slug] };
    });
    postCheckout(changefor)
      .then(res => {
        if (res.data.success) {
          alert(res.data.message);
          this.props.navigation.pop(2);
        } else {
          this.setState({
            screenLoading: false
          });
          let errors = ``;
          Object.values(res.data.errors).map(value => {
            error += `${value[0]}\n`;
          });
          MessageAlert(res.data.message, errors);
        }
      })
      .catch(err =>
        this.setState({
          screenLoading: false,
          overLayError: errorHandler(err)
        })
      );
  };

  renderSectionHeader = ({ section: { name } }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1B73B4",
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <Text style={{ fontWeight: "400", fontSize: 18, color: "white" }}>
        {name}
      </Text>
    </View>
  );

  renderSectionFooter = ({
    section: { name, flatRate, eta, sub_eta, total, slug }
  }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#5999C8",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 3
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Flat Rate: </Text>
          <Text style={{ color: "white" }}>{flatRate} PHP</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>ETA: </Text>
          <Text style={{ color: "white" }}> {sub_eta} MINS </Text>
          <Icon name="ios-timer" type="ionicon" color={"white"} />
        </View>
        <Divider style={{ backgroundColor: "white", width: "90%" }} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Total: </Text>
          <Text style={{ color: "white" }}>₱ {total} </Text>
        </View>
      </View>
      <View style={{ flex: 1, alignSelf: "flex-start" }}>
        <Input
          value={this.state[slug]}
          onChangeText={text => {
            this.setState({ [slug]: text });
          }}
          placeholder={"Change for"}
          containerStyle={{
            alignSelf: "flex-end",
            backgroundColor: "white",
            borderRadius: 5
          }}
          keyboardType={"number-pad"}
          inputStyle={{ backgroundColor: "white", borderBottomColor: "white" }}
        />
      </View>
    </View>
  );

  renderItem = ({
    item: { name, price, cooking_time, slug, image_name, quantity, id },
    index
  }) => (
    <View style={styles.mainRow}>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: 20
        }}
      >
        {image_name && (
          <Image
            source={{
              uri: `http://pinoyfoodcart.com/image/menu/${image_name}`
            }}
            style={{ height: 100, width: 100, resizeMode: "cover" }}
          />
        )}
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text>{price} PHP </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text>{cooking_time} MINS</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 10,
          marginLeft: 20,
          paddingRight: 10
        }}
      >
        <View
          style={{
            flex: 1,
            height: 35,
            width: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#11CDEF",
            borderBottomWidth: 1
          }}
        >
          <Text style={{ fontSize: 20 }}>{quantity}</Text>
        </View>
      </View>
    </View>
  );

  renderFooter = () =>
    this.state.loading ? <ActivityIndicator size="large" /> : null;

  renderEmpty = () =>
    !this.state.loading ? (
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>Cart is Empty!</Text>
      </View>
    ) : null;

  render() {
    const {
      checkout,
      grandTotal,
      totalCookTime,
      totalFlatRate,
      error,
      loading
    } = this.state;
    const {
      makeRemoteRequest,
      renderSectionHeader,
      renderSectionFooter,
      renderItem,
      renderFooter,
      renderEmpty
    } = this;
    if (loading) return <ActivityLoading type={"list"} size={"large"} />;
    else if (error)
      return (
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 18, color: "red" }}>
            {String(error)}
          </Text>
        </View>
      );
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <View
          style={{
            flex: 1,
            borderColor: "gray",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Your Cart</Text>
        </View>
        <View style={{ flex: 8 }}>
          <SectionList
            sections={checkout}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={renderSectionFooter}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </View>
        <View
          style={{
            flex: 4,
            borderColor: "gray",
            borderTopWidth: 1,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: "#5999C8"
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Billing Information
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Estimated Time: </Text>
              <Text style={{ fontWeight: "normal" }}>{totalCookTime} MINS</Text>
            </View>

            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Total Flat Rate: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {totalFlatRate}</Text>
            </View>

            <View
              style={{
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: "gray",
                borderBottomWidth: 0.8
              }}
            >
              <Text style={{ fontWeight: "500" }}>Grand Total: </Text>
              <Text style={{ fontWeight: "normal" }}>₱ {grandTotal}</Text>
            </View>

            <View style={{ height: 10 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CheckoutScreen;

const styles = {
  mainRow: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  }
};
