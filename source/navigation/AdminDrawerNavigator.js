import React from 'react'
import { Icon, Avatar } from 'react-native-elements'  
import { createDrawerNavigator, createStackNavigator, HeaderBackButton } from "react-navigation";

import TagTabNavigator from "./admin/TagTabNavigator";
import PartnerTabNavigator from "./admin/PartnerTabNavigator";
import AdminRestoStackNavigator from "./admin/AdminRestoStackNavigator";
import AdminMenuStackNavigator from "./admin/AdminMenuStackNavigator";
import AdminCustomerStackNavigator from "./admin/AdminCustomerStackNavigator";
import AdminSalesTabNavigator from './admin/AdminSalesTabNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import DrawerLayout from "../components/DrawerLayout";
import AdminRestoViewScreen from "../screens/admin/resto/AdminRestoViewScreen";
import AdminReportStackNavigator from "./admin/AdminReportStackNavigator"
const AdminDrawer = createDrawerNavigator(
  {
    Tag: {
      screen: TagTabNavigator,
      navigationOptions: {
        title: 'Tags',
        drawerIcon: ({ tintColor }) => (
          <Icon name={'tags'} type={'font-awesome'} color={tintColor} />
        )
      },
    },
    Partnership: {
      screen: PartnerTabNavigator,
      navigationOptions: {
        title: 'Partnership',
        drawerIcon: ({ tintColor }) => (
          <Icon name={'handshake-o'} type={'font-awesome'} color={tintColor} />
        )
      }
    },
    AdminResto: {
      screen: AdminRestoStackNavigator,
      navigationOptions: {
        title: "Restaurant",
        drawerIcon: ({ tintColor }) => (
          <Icon name={'store'} type={'material'} color={tintColor} />
        )
      }
    },
    AdminMenu: {
      screen: AdminMenuStackNavigator,
      navigationOptions: {
        title: "Menu",
        drawerIcon: ({ tintColor }) => (
          <Icon name={'silverware-fork-knife'} type={'material-community'} color={tintColor} />
        )
      }
    },
    AdminCustomer: {
      screen: AdminCustomerStackNavigator,
      navigationOptions: {
        title: "Customer",
        drawerIcon: ({ tintColor }) => (
          <Icon name={'users'} type={'font-awesome'} color={tintColor} />
        )
      }
    },
    AdminSales: {
      screen: AdminSalesTabNavigator,
      navigationOptions: {
        title: "Sales",
        drawerIcon: ({ tintColor }) => (
          <Icon name={'payment'} type={'material'} color={tintColor} />
        )
      }
    },
    AdminReport: {
      screen: AdminReportStackNavigator,
      navigationOptions: {
        title: "Reported Users",
        drawerIcon: ({ tintColor }) => (
          <Icon name={'report'} type={'material'} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: "Partnership",
    contentComponent: DrawerLayout,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  },
  
);

export default createStackNavigator({
  AdminDrawer:{
    screen:AdminDrawer,
    navigationOptions:{
      header:null
    }
  },
  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions:{
      header:null
    }
  },
  AdminRestoView: {
    screen: AdminRestoViewScreen,
    navigationOptions: ({navigation}) =>( {
      title: "Restaurant Details",
      headerStyle: {
        backgroundColor: "#11CDEF"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <HeaderBackButton
          tintColor={"white"}
          onPress={() => navigation.goBack()}
        />
      )
    })
  }
},
{
  mode: 'modal',
})