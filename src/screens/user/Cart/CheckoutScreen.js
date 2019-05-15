import React, { Component } from "react";
import {
  View,
  SectionList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Text, Input, Icon, Divider, Image } from "react-native-elements";
import _ from "lodash";
import { NavigationEvents } from "react-navigation";
import { MessageAlert } from "../../../components/Alerts";
import { getCheckout, postCheckout, errorHandler } from "../../../actions";
import ActivityLoading from "../../../components/ActivityLoading";
import Loading from "../../../components/Loading";
import { Card } from "../../../components/Card"
import KeyboardShift from "../../../components/KeyboardShift"
formatCart = cart => {
  return cart.map(section => {
    return {
      name: section.name,
      slug: section.slug,
      flatRate: section.flat_rate,
      sub_eta: section.sub_eta,
      eta: section.eta,
      contact_number: section.contact_number,
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
        this.setState({
          screenLoading: false
        });
        if (res.data.success) {
          alert(res.data.message);
          this.props.navigation.pop(2);
        } else {
          let errors = ``;
          Object.values(res.data.errors).map(value => {
            errors += `${value[0]}\n`;
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

  renderSectionHeader = ({ section: { name, slug, contact_number, eta, flatRate } }) => {
    return (
    <View
      style={{
        borderColor: 'grey',
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
      }}
    >
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text 
        style={{ fontWeight: "500", fontSize: 18, color: "#11CDEF" }} 
        onPress={_.debounce(
          () =>
            this.props.navigation.push("UserRestoMenu", {
              slug
            }),
          1500,
          {
            leading: true,
            trailing: false
          }
        )}>
        {name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={"phone"} type={'entypo'} size={16} />
        <Text style={{ fontSize: 16 }}> {contact_number}</Text>
      </View>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 16 }}>Delivery Time: {eta}</Text>
      <Text style={{ fontSize: 16 }}>Flat Rate: ₱ {flatRate}.00</Text>
    </View>

  </View>
  )
}

  renderSectionFooter = ({
    section: { total, slug, sub_eta }
  }) => (
    <View style={{ flex: 1, justifyContent: "space-evenly", backgroundColor: "#5999C8", paddingVertical: 10, paddingHorizontal:  20, marginBottom: 5 }}>
      
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Estimated Time: </Text>
          <Text style={{ color: 'white', fontSize: 16 }}>{sub_eta} mins</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Total: </Text>
          <Text style={{ color: 'white', fontSize: 16 }}>₱ {total}.00</Text>
        </View>
      </View>
      
      <View style={{ flex: 1, alignItems: "flex-end", paddingVertical: 5 }}>
        <Input
          value={this.state[slug]}
          onChangeText={text => {
            this.setState({ [slug]: text });
          }}
          placeholder={"Change for..."}
          containerStyle={{
            width: '35%',
            backgroundColor: "white",
            borderRadius: 5
          }}
          keyboardType={"number-pad"}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ backgroundColor: "white", textAlign: this.state[slug] ? 'right' : 'left' }}
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
      loading,
      screenLoading
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
      <KeyboardShift style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <Loading loading={screenLoading} size={"large"} />
        <View style={{ flex: 8, justifyContent: 'center' }}>
          <View style={{ borderBottomWidth: 0.7, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
            <Image 
              source={{ uri: 'http://pinoyfoodcart.com/material/img/navBrand.png' }} 
              style={{ height: 35, width: 150, resizeMode: "contain" }} 
            />
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Your Bag</Text>
          </View>
          <SectionList
            sections={checkout}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={renderSectionFooter}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </View>
        <View style={{ flex: 4, borderColor: "gray", borderTopWidth: 1, justifyContent: "center" }}>
          
          <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', paddingVertical: 10, backgroundColor: "#1B73B4" }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Billing Information
            </Text>
          </View>

          <View style={styles.billingRow}>
            <Text style={{ fontWeight: "500" }}>Estimated Time: </Text>
            <Text style={{ fontWeight: "normal" }}>{totalCookTime} mins</Text>
          </View>

          <View style={styles.billingRow}>
            <Text style={{ fontWeight: "500" }}>Total Flat Rate: </Text>
            <Text style={{ fontWeight: "normal" }}>₱ {totalFlatRate}.00</Text>
          </View>

          <View style={styles.billingRow}>
            <Text style={{ fontWeight: "500" }}>Grand Total: </Text>
            <Text style={{ fontWeight: "normal" }}>₱ {grandTotal}.00</Text>
          </View>
        </View>
      </KeyboardShift>
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
  },
  billingRow: { 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: "space-between", 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderColor: "gray", 
    borderBottomWidth: 0.8 
  },
};
