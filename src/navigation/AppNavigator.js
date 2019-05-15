import { createAppContainer, createSwitchNavigator } from "react-navigation";
import checkLogin from "../screens/authentication/checkLogin";
import AuthStackNavigator from "./AuthStackNavigator";
import OwnerDrawerNavigator from "./owner/OwnerDrawerNavigator";
import AdminDrawerNavigator from "./admin/AdminDrawerNavigator";
import UserDrawerNavigator from "./user/UserDrawerNavigator";
import OwnerInitialScreen from "../screens/owner/InitialScreen";

export default createAppContainer(
  createSwitchNavigator({
    check: checkLogin,
    Auth: AuthStackNavigator,
    Owner: createSwitchNavigator({
      OwnerInitial: OwnerInitialScreen,
      OwnerDrawer: OwnerDrawerNavigator
    }),
    Admin: AdminDrawerNavigator,
    User: UserDrawerNavigator
  })
);
