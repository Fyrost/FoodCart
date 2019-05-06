import React, { Component } from "react";
import { View, Text } from "react-native";
import { Image, Icon, Avatar } from "react-native-elements";

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "blue" }}>
          <Image
            source={{
              uri:
                "https://image.shutterstock.com/image-photo/spices-herbs-over-black-stone-260nw-1058131856.jpg"
            }}
            style={{ height: "100%" }}
            resizeMode={"cover"}
          />
        </View>
        <View style={{ flex: 2, justifyContent: "space-around" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Avatar
              size={120}
              icon={{ name: "store", type: "FontAwesome" }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              overlayContainerStyle={{ borderRadius: 20 }}
              containerStyle={{ flex: 1, paddingHorizontal: 20 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Avatar
              size={120}
              icon={{ name: "shopping-cart", type: "FontAwesome" }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              overlayContainerStyle={{ borderRadius: 20 }}
              containerStyle={{ flex: 1, paddingHorizontal: 20 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Avatar
              size={120}
              icon={{ name: "history", type: "FontAwesome" }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              overlayContainerStyle={{ borderRadius: 20 }}
              containerStyle={{ flex: 1, paddingHorizontal: 20 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
