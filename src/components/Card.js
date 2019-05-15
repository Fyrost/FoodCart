import React from "react";
import { View } from "react-native";

const Card = props => {
  let shadowStyle = {
    shadowColor: COLORS.grey3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 1
  };
  if (props.noShadow) {
    shadowStyle = {};
  }
  return (
    <View style={[styles.containerStyle, props.style, shadowStyle]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 3
  }
};

export { Card };
