import React, { Component } from "react";
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Icon, Input, Button, Overlay, Image } from "react-native-elements";
import {
  getCart,
  updateCart,
  deleteCart,
  destroyCart,
  errorHandler
} from "../../../actions";
import { ConfirmAlert, MessageAlert } from "../../../components/Alerts";
import Loading from "../../../components/Loading";
import ActivityLoading from "../../../components/ActivityLoading";

const formatCart = cart => {
  return cart.map(section => {
    return {
      name: section.name,
      flatRate: section.flat_rate,
      eta: section.eta,
      data: section.menu
    };
  });
};

class CartScreen extends Component {
  state = {
    cartId: "",
    cart: [],
    loading: false,
    overlayLoading: false,
    screenLoading: false,
    error: "",
    overLayError: "",
    editOverlayVisible: false,
    overlayQuantity: ""
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleEmpty: this.handleEmpty });
  }
  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getCart()
      .then(res => {
        if (res.data.success) {
          const { data } = res.data;
          this.setState({
            loading: false,
            cart: formatCart(data)
          });
          this.props.navigation.setParams({ isCartNotEmpty: true });
        } else {
          this.setState({
            loading: false,
            error: res.data.message
          });
          this.props.navigation.setParams({ isCartNotEmpty: false });
        }
      })
      .catch(err =>
        this.setState({
          error: errorHandler(err),
          loading: false
        })
      );
  };

  handleEdit = (quantity, id) => {
    this.setState({
      editOverlayVisible: true,
      overlayQuantity: quantity,
      cartId: id,
      overLayError: ""
    });
  };

  handleDelete = cartId => {
    this.setState({ screenLoading: true });
    deleteCart({ cartId })
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              screenLoading: false
            },
            this.makeRemoteRequest
          );
          alert(res.data.message);
        }
      })
      .catch(err => {
        this.setState({
          overLayError: errorHandler(err),
          screenLoading: false
        });
      });
  };

  handleEmpty = () => {
    this.setState({ screenLoading: true });
    destroyCart()
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              screenLoading: false
            },
            this.makeRemoteRequest
          );
          MessageAlert("Cart", res.data.message);
        }
      })
      .catch(err => {
        MessageAlert("Cart", errorHandler(err));
      });
  };

  handleQuantity = () => {
    const { overlayQuantity, cartId } = this.state;
    const { makeRemoteRequest } = this;
    this.setState({ overlayLoading: true });
    updateCart({ quantity: overlayQuantity, cartId })
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              overlayLoading: false,
              editOverlayVisible: false
            },
            makeRemoteRequest
          );
          alert(res.data.message);
        } else {
          this.setState({
            overlayLoading: false,
            overLayError: res.data.errors.quantity[0]
          });
        }
      })
      .catch(err => {
        this.setState({
          overLayError: errorHandler(err),
          overlayLoading: false
        });
      });
  };

  renderOverLay = () => {
    const INITIAL_STATE = {
      editOverlayVisible: false,
      overLayError: ""
    };
    return (
      <Overlay
        isVisible={this.state.editOverlayVisible}
        height={"auto"}
        width={"60%"}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() => this.setState(INITIAL_STATE)}
      >
        <View style={{ alignItems: "center" }}>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={18}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: -32,
              top: -30
            }}
            onPress={() => this.setState(INITIAL_STATE)}
          />
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Quantity</Text>
          <Input
            value={this.state.overlayQuantity}
            containerStyle={{ width: "45%", alignItems: "center" }}
            inputContainerStyle={{ borderColor: "#11CDEF" }}
            inputStyle={{ textAlign: "center" }}
            onChangeText={overlayQuantity => this.setState({ overlayQuantity })}
            keyboardType={"numeric"}
          />
          <Text style={{ color: "red" }}>{this.state.overLayError}</Text>
          <Button
            title="SAVE CHANGES"
            loading={this.state.overlayLoading}
            onPress={this.handleQuantity}
          />
        </View>
      </Overlay>
    );
  };

  renderSectionHeader = ({ section: { name, flatRate, eta } }) => (
    <View style={styles.sectionHeaderMainRow}>
      <View>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 18,
            color: "#11CDEF",
            paddingVertical: 5
          }}
        >
          {name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text>Delivery Time: </Text>
          <Text> {eta} mins</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text>Flat Rate: </Text>
          <Text>₱ {flatRate}.00</Text>
        </View>
      </View>
    </View>
  );

  renderSectionFooter = () => <View style={styles.sectionFooterMainRow} />;

  computeTotal = () => {
    let total = 0;
    menu = this.state.cart.map(resto => {
      resto.data.map(item => {
        total += Number.parseInt(item.price) * Number.parseInt(item.quantity);
      });
    });
    return total;
  };

  computeFlatRate = () => {
    let flatRate = 0;
    menu = this.state.cart.map(resto => {
      flatRate += Number.parseInt(resto.flatRate);
    });
    return flatRate;
  };

  computeMins = () => {
    let mins = 0;
    menu = this.state.cart.map(resto => {
      mins += Number.parseInt(resto.eta);
    });
    return mins;
  };

  renderItem = ({
    item: { name, price, cooking_time, slug, image_name, quantity, id },
    index
  }) => {
    return (
      <View style={styles.mainRow} key={index} onPress={() => alert(item.slug)}>
        <View
          style={{
            flex: 1,
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
        </View>

        <View
          style={{
            flex: 2,
            paddingHorizontal: 10,
            justifyContent: "space-evenly"
          }}
        >
          <View
            style={{ flex: 1, paddingHorizontal: 10, justifyContent: "center" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{name}</Text>
            <Text>₱ {price}.00</Text>
            <Text>{cooking_time} mins</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 10,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.4}
              style={{
                height: 35,
                width: "auto",
                paddingHorizontal: 10,
                marginHorizontal: 5,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#11CDEF",
                borderBottomWidth: 1
              }}
              onPress={() => this.handleEdit(quantity, id)}
            >
              <Text style={{ fontSize: 20 }}>{quantity}</Text>
            </TouchableOpacity>

            <Icon
              name={"trash"}
              type={"font-awesome"}
              color={"#1B73B4"}
              size={26}
              onPress={() =>
                ConfirmAlert(
                  "Delete Item",
                  "Are you sure",
                  this.handleDelete.bind(this, id)
                )
              }
              containerStyle={{ marginLeft: 6, paddingVertical: 5 }}
            />
          </View>
        </View>
      </View>
    );
  };

  renderFooter = () =>
    this.state.loading && <ActivityLoading type={"list"} size={"large"} />;

  renderEmpty = () =>
    !this.state.loading && (
      <Text style={{ fontWeight: "800" }}>Cart is Empty!</Text>
    );

  render() {
    const {
      cart,
      error,
      editOverlayVisible,
      loading,
      screenLoading
    } = this.state;
    const {
      makeRemoteRequest,
      renderOverLay,
      renderSectionHeader,
      renderSectionFooter,
      renderItem,
      renderFooter,
      renderEmpty
    } = this;

    if (loading) <ActivityLoading type={"list"} size={"large"} />;
    else if (error)
      return (
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            {String(error)}
          </Text>
        </View>
      );

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          <NavigationEvents onWillFocus={makeRemoteRequest} />
          <Loading loading={screenLoading} opacity={0.5} size={50} />
          {editOverlayVisible && renderOverLay()}
          <SectionList
            sections={cart}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={renderSectionFooter}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </ScrollView>
      </View>
    );
  }
}

export default CartScreen;

const styles = {
  mainRow: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderColor: "lightgrey",
    borderWidth: 1
  },
  sectionHeaderMainRow: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    marginTop: 10
  },
  sectionFooterMainRow: {
    height: 30,
    backgroundColor: "#5999C8",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginBottom: 10,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 1
  }
};
