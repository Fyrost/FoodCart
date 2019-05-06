import React, { Component } from "React";
import { ActivityIndicator, View } from "react-native";

class ActivityLoading extends Component {
  render() {
    const { ...props } = this.props;
    const type =
      this.props.type === "list"
        ? { marginTop: 20 }
        : { flex: 1, alignItems: "center", justifyContent: "center" };
    const color = this.props.color || "#11CDEF";
    const size = this.props.size || "large";
    return (
      <View style={type}>
        <ActivityIndicator size={size} color={color} {...props} />
      </View>
    );
  }
}

export default ActivityLoading;
