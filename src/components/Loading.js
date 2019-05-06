import React, { Component } from 'React'
import { ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'



class Loading extends Component{
  render(){
    const opacity = this.props.opacity || .8
    const size = this.props.size || 'large'
    return (
      this.props.loading && (
        <Overlay
          isVisible
          height='auto'
          windowBackgroundColor={`rgba(0, 0, 0, ${opacity})`}
          containerStyle={{justifyContent:'center',alignItems:'center'}}
          overlayStyle={{elevation: 0}}
          overlayBackgroundColor='transparent'
        >
          <ActivityIndicator size={size} />
        </Overlay>
        )
    )
  }
}

export default Loading