import React from "react";
import { Icon } from "react-native-elements";

////DRAWER
export const HomeIcon = ({ tintColor }) => (
  <Icon name={"home"} type={"material"} color={tintColor} />
);
export const RestoIcon = ({ tintColor }) => (
  <Icon name={"store"} type={"material"} color={tintColor} />
);
export const OrderIcon = ({ tintColor }) => (
  <Icon name={"history"} type={"FontAwesome"} color={tintColor} />
);
