import React from "react";
import { Icon } from "react-native-elements";

////Category
export const categoryActiveIcon = ({ tintColor }) => (
  <Icon name={"list-ul"} type={"font-awesome"} color={tintColor} size={20} />
);
export const categoryDeletedIcon = ({ tintColor }) => (
  <Icon name={"archive"} type={"font-awesome"} color={tintColor} size={20} />
);
////Drawer
export const OrderIcon = ({ tintColor }) => (
  <Icon name={"file-cabinet"} type={"material-community"} color={tintColor} />
);
export const MenuIcon = ({ tintColor }) => (
  <Icon
    name={"silverware-fork-knife"}
    type={"material-community"}
    color={tintColor}
  />
);
export const CategoryIcon = ({ tintColor }) => (
  <Icon name={"file-cabinet"} type={"material-community"} color={tintColor} />
);
export const SalesIcon = ({ tintColor }) => (
  <Icon name={"receipt"} type={"material"} color={tintColor} />
);
export const ReportIcon = ({ tintColor }) => (
  <Icon name={"user"} type={"font-awesome"} color={tintColor} />
);
