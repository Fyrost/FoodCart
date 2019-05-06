import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthStackNavigator from "./AuthStackNavigator";
import OwnerDrawerNavigator from "./OwnerDrawerNavigator";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import UserDrawerNavigator from "./UserDrawerNavigator";
import OwnerInitialScreen from "../screens/owner/InitialScreen";

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStackNavigator,
    Owner: createSwitchNavigator({
      OwnerInitial: OwnerInitialScreen,
      OwnerDrawer: OwnerDrawerNavigator
    }),
    Admin: AdminDrawerNavigator,
    User: UserDrawerNavigator
  })
);
