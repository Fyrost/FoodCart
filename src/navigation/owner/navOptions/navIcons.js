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
  <Icon name={"clipboard-text-outline"} type={"material-community"} color={tintColor} />
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
  <Icon name={"payment"} type={"material"} color={tintColor} />
);
export const ReportIcon = ({ tintColor }) => (
  <Icon name={"exclamationcircleo"} type={"antdesign"} color={tintColor} />
);
export const LogIcon = ({ tintColor }) => (
  <Icon name={"file-zip-o"} type={"font-awesome"} color={tintColor} />
);

////TAB
///ORDER
export const OnProgressIcon = ({ tintColor }) => (
  <Icon name={'progress-clock'} type={'material-community'} color={tintColor} />
);
export const HistoryIcon = ({ tintColor }) => (
  <Icon name={'history'} type={'material'} color={tintColor} />
);