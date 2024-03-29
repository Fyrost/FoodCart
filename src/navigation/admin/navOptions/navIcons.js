import React from "react";
import { Icon } from "react-native-elements";

////Partner
export const partnerPendingIcon = ({ tintColor }) => (
  <Icon name={"user"} type={"font-awesome"} color={tintColor} size={20} />
);
export const partnerApprovedIcon = ({ tintColor }) => (
  <Icon name={"user-plus"} type={"font-awesome"} color={tintColor} size={20} />
);
export const partnerRejectedIcon = ({ tintColor }) => (
  <Icon name={"user-times"} type={"font-awesome"} color={tintColor} size={20} />
);
////Sales
export const salesRestoIcon = ({ tintColor }) => (
  <Icon name={"store"} type={"material"} color={tintColor} size={20} />
);
export const salesMenuIcon = ({ tintColor }) => (
  <Icon
    name={"silverware-fork-knife"}
    type={"material-community"}
    color={tintColor}
    size={20}
  />
);
////Tags
export const tagPendingIcon = ({ tintColor }) => (
  <Icon name={"tag"} type={"material-community"} color={tintColor} size={20} />
);
export const tagApprovedIcon = ({ tintColor }) => (
  <Icon
    name={"tag-plus"}
    type={"material-community"}
    color={tintColor}
    size={20}
  />
);
export const tagRejectedIcon = ({ tintColor }) => (
  <Icon
    name={"tag-remove"}
    type={"material-community"}
    color={tintColor}
    size={20}
  />
);
////Drawer
export const partnerIcon = ({ tintColor }) => (
  <Icon name={"handshake-o"} type={"font-awesome"} color={tintColor} />
);
export const tagIcon = ({ tintColor }) => (
  <Icon name={"tags"} type={"font-awesome"} color={tintColor} />
);
export const restoIcon = ({ tintColor }) => (
  <Icon name={"store"} type={"material"} color={tintColor} />
);
export const menuIcon = ({ tintColor }) => (
  <Icon
    name={"silverware-fork-knife"}
    type={"material-community"}
    color={tintColor}
  />
);
export const customerIcon = ({ tintColor }) => (
  <Icon name={"user"} type={"font-awesome"} color={tintColor} />
);
export const userIcon = ({ tintColor }) => (
  <Icon name={"users"} type={"font-awesome"} color={tintColor} />
);
export const salesIcon = ({ tintColor }) => (
  <Icon name={"payment"} type={"material"} color={tintColor} />
);
export const reportIcon = ({ tintColor }) => (
  <Icon name={"exclamationcircleo"} type={"antdesign"} color={tintColor} />
);
export const logIcon = ({ tintColor }) => (
  <Icon name={"file-zip-o"} type={"font-awesome"} color={tintColor} />
);
export const orderIcon = ({ tintColor }) => (
  <Icon name={"clipboard-text-outline"} type={"material-community"} color={tintColor} />
);
export const banIcon = ({ tintColor }) => (
  <Icon name={"circle-with-minus"} type={"entypo"} color={tintColor} />
);
export const requestIcon = ({ tintColor }) => (
  <Icon name={"file1"} type={"antdesign"} color={tintColor} />
);