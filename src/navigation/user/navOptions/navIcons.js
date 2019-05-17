import React from "react";
import { View } from 'react-native'
import { Icon, Image } from "react-native-elements";

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

////TAB
///ORDER
export const OnProgressIcon = ({ tintColor }) => (
  <Icon name={'progress-clock'} type={'material-community'} color={tintColor} />
);
export const HistoryIcon = ({ tintColor }) => (
  <Icon name={'history'} type={'material'} color={tintColor} />
);
export const HomeLogo = () => (
  <Image 
  source={{ uri: 'http://pinoyfoodcart.com/material/img/navBrand.png'}} 
  style={{
    height: 35,
    width: 150, 
    alignSelf: 'center',  
    resizeMode: 'cover',
  }} />  
);
