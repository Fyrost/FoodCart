import React from "react";
import { View } from "react-native";

const Card = props => {
  let shadowStyle = {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 1
  };
  if (props.noShadow) {
    shadowStyle = {};
  }
  return (
    <View style={[styles.containerStyle, props.style, shadowStyle,{...props.style}]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 0.2
  }
};

export { Card };
