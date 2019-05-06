import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text, Divider, Tile } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import { getMenuDetail, errorHandler } from "../../../actions";
import ToolTipHelper from "../../../components/ToolTipHelper";
import styles from "../../styles";
import ActivityLoading from "../../../components/ActivityLoading";

class MenuViewScreen extends Component {
  state = {
    id: "",
    name: "",
    description: "",
    price: "",
    cookTime: "",
    category: "",
    tagText: "",
    tags: [],
    picture: null,
    loading: false,
    progress: ""
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    const id = this.props.navigation.getParam("menuId", "0");
    getMenuDetail(id)
      .then(res => {
        if (res.data.success) {
          const {
            name,
            description,
            price,
            cooking_time,
            image_name,
            tag,
            category
          } = res.data.data;
          this.setState({
            id: id,
            loading: false,
            name: name,
            description: description,
            price: price,
            cookTime: cooking_time,
            tags: tag,
            category: category[0].name,
            picture: image_name
          });
        } else {
          this.setState({
            error: res.data.message,
            loading: false
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

  render() {
    const {
      loading,
      error,
      picture,
      name,
      description,
      price,
      cookTime,
      category,
      tags
    } = this.state;
    const { makeRemoteRequest } = this;
    const {
      flexContainer,
      menuViewBody,
      menuViewTitle,
      menuViewText,
      menuViewSubTitle
    } = styles;

    if (loading) return <ActivityLoading size={64} />;
    else if (error) return <Text>{error}</Text>;
    return (
      <View style={flexContainer}>
        <NavigationEvents onWillFocus={makeRemoteRequest} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Tile
            imageSrc={
              picture
                ? { uri: `http://pinoyfoodcart.com/image/menu/${picture}` }
                : require("../../../../assets/images/missing.png")
            }
            PlaceholderContent={<ActivityLoading size={"large"} />}
            height={150}
            caption={name}
            captionStyle={menuViewTitle}
            overlayContainerStyle={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            activeOpacity={1}
            containerStyle={{ flex: 1 }}
            imageContainerStyle={{ height: "100%" }}
            featured
          />
        </View>
        <Divider />

        <View style={[menuViewBody]}>
          <View style={[styles.menuViewRow, { flex: 2 }]}>
            <View style={styles.menuViewSubtitleContainer}>
              <Text style={menuViewSubTitle}>Description</Text>
            </View>
            <View style={styles.menuViewTextContainer}>
              <ScrollView
                style={styles.flexContainer}
                contentContainerStyle={{ justifyContent: "center" }}
              >
                <Text style={menuViewText}>{description}</Text>
              </ScrollView>
            </View>
          </View>

          <View style={styles.menuViewRow}>
            <View style={styles.menuViewSubtitleContainer}>
              <Text style={menuViewSubTitle}>Price</Text>
            </View>
            <View style={styles.menuViewTextContainer}>
              <Text style={menuViewText}>{price} PHP</Text>
            </View>
          </View>

          <View style={styles.menuViewRow}>
            <View style={styles.menuViewSubtitleContainer}>
              <Text style={menuViewSubTitle}>Cook Time</Text>
            </View>
            <View style={styles.menuViewTextContainer}>
              <Text style={menuViewText}>{cookTime} Minutes</Text>
            </View>
          </View>

          <View style={styles.menuViewRow}>
            <View style={styles.menuViewSubtitleContainer}>
              <Text style={menuViewSubTitle}>Category</Text>
            </View>
            <View style={styles.menuViewTextContainer}>
              <Text style={menuViewText}>{category}</Text>
            </View>
          </View>

          <View style={styles.menuViewRowSimple}>
            <View style={styles.menuViewSubtitleContainer}>
              <Text style={styles.menuViewSubTitle}>Tags</Text>
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
            <View style={styles.menuViewTextContainer}>
              {tags.map((tag, index) => {
                const tagContainer =
                  tag.status === "0"
                    ? styles.tagContainerPending
                    : tag.status === "1"
                    ? styles.tagContainerAccepted
                    : styles.tagContainerRejected;
                return (
                  <Text style={tagContainer} key={index}>
                    {tag.name}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default MenuViewScreen;
