import React, { Component } from "react";
import Axios from "axios";
import { useScreens } from "react-native-screens";

import { BASE_URL } from "./src/constants/API";
import AppNavigator from "./src/navigation/AppNavigator";

useScreens();

export default class App extends Component {
  async componentWillMount() {
    Axios.defaults.headers.common["Accept"] = "application/json";
    Axios.defaults.headers.common["Origin"] = "app";
    Axios.defaults.baseURL = BASE_URL;
  }
  render() {
    return <AppNavigator />;
  }
}
