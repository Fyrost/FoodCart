import { createStackNavigator } from "react-navigation";
import { leftDrawerButton,rightSearchButton } from "../navOptions/navButtons";
import { headerStyles } from "../navOptions/navStyles";
import AdminUsersListScreen from "../../../screens/admin/users/AdminUsersListScreen";

const AdminUsersList = {
  screen: AdminUsersListScreen,
  navigationOptions: ({ navigation }) => ({
    title: "User List",
    headerLeft: leftDrawerButton({ navigation }),
    headerRight: rightSearchButton({navigation})
  })
};

const UsersNavigator = createStackNavigator(
  { AdminUsersList },
  { defaultNavigationOptions: headerStyles }
);

export { UsersNavigator };
