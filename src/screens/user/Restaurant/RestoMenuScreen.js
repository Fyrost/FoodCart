import React, { Component } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated
} from "react-native";
import { NavigationEvents } from "react-navigation";
import {
  Icon,
  Button,
  Rating,
  Overlay,
  Tile,
  Divider,
  Image
} from "react-native-elements";
import NumericInput from "react-native-numeric-input";
import _ from "lodash";

import Loading from "../../../components/Loading";
import ActivityLoading from "../../../components/ActivityLoading";
import {
  getRestaurantMenu,
  getFavoriteResto,
  postFavoriteResto,
  deleteFavoriteResto,
  getRatingResto,
  postRatingResto,
  postCart,
  errorHandler
} from "../../../actions";


const formatMenu = menu => {
  return menu.map(section => {
    return { title: section.name, data: section.menu };
  });
};

class RestoViewScreen extends Component {
  state = {
    restoName: "",
    restoAddress: "",
    restoContact: "",
    restoPicture: "",
    restoRating: "0",
    restoOpen: true,
    restoSlug: "",
    yourRating: "",
    ratingColor: "#f1c40f",
    rateVisible: false,
    menu: [],
    fav: false,
    loading: false,
    screenLoading: false,
    error: "",
    menuDetailShow: false,
    menuDetail: {
      tag: []
    },
    cartOverlayValue: 1,
  };
  
  makeRemoteRequest = () => {
    this.setState({ loading: true, menu: [] });
    const promises = [
      getRestaurantMenu(this.props.navigation.getParam("slug")),
      getFavoriteResto(),
      getRatingResto()
    ];
    Promise.all(promises)
      .then(res => {
        if (res[0].data.success && res[1].data.success && res[2].data.success) {
          const { data } = res[0].data;
          this.setState({
            loading: false,
            restoName: data.name,
            restoAddress: data.address,
            restoContact: data.contact_number,
            restoPicture: `http://pinoyfoodcart.com/image/restaurant/${
              data.image_name
            }`,
            restoOpen: data.open,
            restoRating: data.rating,
            votes: data.votes,
            restoSlug: data.slug,
            menu: formatMenu(data.category),
            fav: res[1].data.data.some(
              arr => arr.slug === res[0].data.data.slug
            ),
            yourRating: res[2].data.data.some(
              arr => arr.slug === res[0].data.data.slug
            )
              ? res[2].data.data.filter(
                  arr => arr.slug === res[0].data.data.slug
                )[0].rate
              : "",
            rateVisible: !res[2].data.data.some(
              arr => arr.slug === res[0].data.data.slug
            )
          });
        } else {
          this.setState({
            error: res[0].data.message
              ? res[0].data.message
              : res[1].data.message
              ? res[1].data.message
              : res[2].data.message
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: errorHandler(err[0] ? err[0] : err[1] ? err[1] : err[2])
        });
      });
  };

  handleAddToCart = (slug, quantity) => {
    this.setState({ screenLoading: true, menuDetailShow: false });
    postCart({ quantity, menuSlug: slug })
      .then(res => {
        this.setState({ screenLoading: false });
        alert(res.data.message);
        if (res.data.success) {
          this.setState({ cartOverlayValue: 1 });
        } else {
          if (this.state.restoOpen) this.setState({ menuDetailShow: true });
        }
      })
      .catch(err => {
        this.setState({ screenLoading: false }, alert(errorHandler(err)));
        this.setState({ menuDetailShow: true });
      });
  };

  handleFavorite = () => {
    this.setState({ screenLoading: true });
    postFavoriteResto(this.state.restoSlug)
      .then(res => {
        this.setState({
          screenLoading: false
        });
        alert(res.data.message);
        if (res.data.success) this.setState({ fav: true });
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        alert(errorHandler(err));
      });
  };

  handleUnfavorite = () => {
    this.setState({ screenLoading: true });
    deleteFavoriteResto(this.state.restoSlug)
      .then(res => {
        this.setState({
          screenLoading: false
        });
        alert(res.data.message);
        if (res.data.success) this.setState({ fav: false });
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        alert(errorHandler(err));
      });
  };

  handleFinishRating = rating => {
    this.setState({ screenLoading: true });
    postRatingResto(this.state.restoSlug, rating)
      .then(res => {
        if (res.data.success) {
          this.setState({ yourRating: rating.toString() });
          getRestaurantMenu(this.props.navigation.getParam("slug"))
            .then(res => {
              if (res.data.success) {
                this.setState({
                  restoRating: res.data.data.rating,
                  rateVisible: false
                });
              } else {
                alert(res.data.message);
              }
              this.setState({ screenLoading: false });
            })
            .catch(err => {
              alert(errorHandler(err));
              this.setState({ screenLoading: false });
            });
        } else {
          alert(res.data.message);
          this.setState({ screenLoading: false });
        }
      })
      .catch(err => {
        this.setState({ screenLoading: false });
        alert(errorHandler(err));
      });
  };

  renderFavorite = () => {
    if (this.state.fav)
      return (
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
          onPress={() => this.handleUnfavorite()}
        />
      );
    return (
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
        title={" Favorite"}
        titleStyle={{ color: "white" }}
        onPress={() => this.handleFavorite()}
      />
    );
  };

  renderRating = () => {
    const rating = this.state.yourRating
      ? this.state.yourRating
      : "Rate this Restaurant";
    return (
      <Button
        raised
        icon={
          <Icon
            name={"star"}
            type={"font-awesome"}
            color={this.state.ratingColor}
            size={16}
          />
        }
        title={` ${rating}`}
        onPress={() => this.setState({ rateVisible: !this.state.rateVisible })}
      />
    );
  };

  renderRestoClose = () => (
    <View style={stylesResto.headerRowClose}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: "white" }}>
        CLOSED
      </Text>
    </View>
  );

  renderRestoDetail = () => (
    <View style={{ display: this.state.loading ? "none" : "flex", flex: 1 }}>
      <ImageBackground
        source={
          this.state.restoPicture ? { uri: this.state.restoPicture } : null
        }
        style={stylesResto.header}
      >
        <View style={stylesResto.headerOpacityBG}>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={stylesResto.headerRestoName}>
                {this.state.restoName}
              </Text>
              <Text style={stylesResto.headerText}>
                {this.state.restoAddress}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[stylesResto.headerRating, { marginRight: 5 }]}>
                  {this.state.restoRating}
                </Text>
                <Icon
                  name={"star"}
                  type={"font-awesome"}
                  color={this.state.ratingColor}
                  size={28}
                />
              </View>
              <Text style={stylesResto.headerRating}>{this.state.votes}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      {!this.state.restoOpen && this.renderRestoClose()}
      <View style={stylesResto.headerBottomContainer}>
        <View style={stylesResto.headerRow}>
          {this.renderFavorite()}
          {this.renderRating()}
        </View>
        {this.state.rateVisible && (
          <View style={stylesResto.ratingContainer}>
            <Rating
              showRating
              fractions={1}
              ratingTextColor={"black"}
              type={"custom"}
              startingValue={parseFloat(
                this.state.yourRating
                  ? this.state.yourRating
                  : this.state.restoRating
              )}
              onFinishRating={rating => this.handleFinishRating(rating)}
            />
          </View>
        )}
      </View>
    </View>
  );

  renderMenuDetail = ({viewStyle}) => {
    return(
      <Animated.View style={viewStyle}>
        <Overlay
          fullScreen
          isVisible={this.state.menuDetailShow}
          onBackdropPress={() =>
              this.setState({ menuDetailShow: false, cartOverlayValue: 1 })
          }
          containerStyle={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexShrink: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-end"  }}>
              <Icon
                name={"times"}
                type={"font-awesome"}
                color={"grey"}
                size={28}
                underlayColor={"rgba(0,0,0,0.3)"}
                containerStyle={{ paddingBottom: 10 }}
                onPress={() =>
                  this.setState({ menuDetailShow: false, cartOverlayValue: 1 })
                }
              />
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Tile
                imageSrc={
                  this.state.menuDetail.image_name
                    ? { uri: this.state.menuDetail.image_name }
                    : null
                }
                height={150}
                overlayContainerStyle={{ backgroundColor: "transparent" }}
                activeOpacity={1}
                containerStyle={{ flex: 1, width: "auto", margin: 0, padding: 0 }}
                imageContainerStyle={{ height: "100%", width: "auto" }}
                featured
              />
            </View>
            <Divider />
            <View style={{ flex: 2, paddingHorizontal: 15, paddingVertical: 10, }}>
              <Text style={{ marginTop: 10, fontSize: 24, fontWeight: "500" }}>
                {this.state.menuDetail.name}
              </Text>
              <View style={{ flex: 1, marginTop: 10 }}>
                <ScrollView>
                  <Text
                    style={{
                      fontWeight: "normal",
                      color: "#3D3D3E",
                      textAlign: "left"
                    }}
                  >
                    {this.state.menuDetail.description}
                  </Text>
                </ScrollView>
              </View>
            </View>

            <View style={stylesResto.menuOverlayRow}>
              <View style={stylesResto.menuOverlayRowBetween}>
                <Text style={{ fontWeight: "500" }}>Price</Text>
                <Text style={{ fontWeight: "normal" }}>
                  {(this.state.menuDetail.price)}{" "}
                  PHP
                </Text>
              </View>

              <View style={stylesResto.menuOverlayRowBetween}>
                <Text style={{ fontWeight: "500" }}>Cooking Time</Text>
                <Text style={{ fontWeight: "normal" }}>
                  {this.state.menuDetail.cooking_time} Minutes
                </Text>
              </View>
            </View>
            <Divider style={{ marginBottom: 20 }} />
            <View style={stylesResto.menuOverlayRowCart}>
              <NumericInput
                initValue={this.state.cartOverlayValue}
                value={this.state.cartOverlayValue}
                onChange={cartOverlayValue => this.setState({ cartOverlayValue })}
                totalWidth={150}
                totalHeight={40}
                iconSize={25}
                minValue={1}
                maxValue={9999}
                rounded
                borderColor={"lightgrey"}
                textColor={"#06070E"}
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#11CDEF"
                leftButtonBackgroundColor="#11CDEF"
              />
              <Button
                icon={
                  <Icon
                    name={"cart-plus"}
                    type={"font-awesome"}
                    color={"white"}
                    size={20}
                  />
                }
                buttonStyle={{ backgroundColor: "#1B73B4" }}
                title={" ADD TO CART"}
                titleStyle={{ color: "white" }}
                onPress={() =>
                  this.handleAddToCart(
                    this.state.menuDetail.slug,
                    this.state.cartOverlayValue
                  )
                }
              />
            </View>
          </View>
        </Overlay>
      </Animated.View>
    )
  }

  renderCategoryTitle = ({ section: { title, data } }) => {
    if (!(data && data.length)) return null;
    return (
      <View
        style={{
          backgroundColor: "#1B73B4",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomColor: "lightgrey",
          borderBottomWidth: 1
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 16, color: "white" }}>
          {title}
        </Text>
      </View>
    );
  };

  renderMenu = ({
    item: { id, name, description, price, cooking_time, image_name, slug, tag }
  }) => ( 
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={this.state.screenLoading}
      style={stylesResto.menuListRow}
      onPress={() =>
        this.setState({
          menuDetailShow: true,
          menuDetail: {
            name,
            description,
            price,
            cooking_time,
            slug,
            image_name: `http://pinoyfoodcart.com/image/menu/${image_name}`,
            tag
          }
        })
      }
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {image_name ? (
            <Image
              source={{
                uri: `http://pinoyfoodcart.com/image/menu/${image_name}`
              }}
              style={stylesResto.menuListPicture}
            />
          ) : null}  
        </View>
        
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ flex: 2, marginTop: 10 }}>
            <Text style={stylesResto.menuListTitle}>{name}</Text>
            <View style={{ flexWrap: 'wrap' }}>
              <Text numberOfLines={4}>{description}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={stylesResto.menuListPrice}>{price} PHP</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderFooter = () =>
    this.state.loading ? <ActivityLoading type={"list"} /> : null;

  renderEmpty = () => (!this.state.loading ? <Text>No Menu</Text> : null);

  render() {
    const {
      makeRemoteRequest,
      renderCategoryTitle,
      renderMenu,
      renderFooter,
      renderEmpty,
      renderRestoDetail,
      renderMenuDetail
    } = this;
    const { error, menu, screenLoading, loading } = this.state;

    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <Loading loading={screenLoading} opacity={0.5} size={50} />
        {renderMenuDetail(viewStyle)}
        <SectionList
          sections={menu}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderCategoryTitle}
          renderItem={renderMenu}
          ListHeaderComponent={renderRestoDetail}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    );
  }
}

export default RestoViewScreen;

const stylesResto = {
  header: {
    flex: 1,
    height: 150,
    elevation: 3
  },
  headerOpacityBG: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  headerDarkBG: {
    backgroundColor: "#171a29"
  },
  headerRestoName: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  headerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#171a29"
  },
  headerRowClose: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "orange"
  },
  headerText: {
    fontSize: 14,
    color: "white"
  },
  headerRating: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  },
  ratingContainer: {
    paddingVertical: 10
  },
  menuListPicture: {
    height: 125,
    width: 125,
    resizeMode: "cover",
  },
  menuListRow: {
    flexDirection: "row",
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    alignItems: "center"
  },
  menuListButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#00f500"
  },
  menuOverlayRowBetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menuOverlayRow: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  menuOverlayRowCart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  menuListTitle:{
    fontSize: 16,
    fontWeight: '500'
  },
  menuListPrice:{
    fontWeight: '100',
    fontSize: 14
  }
};
