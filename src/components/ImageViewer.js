import React, { Component } from "React";
import { Text, View, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import Viewer from "react-native-image-zoom-viewer";
import { Image, Icon } from "react-native-elements";
class ImageViewer extends Component {
  state = {
    modalVisible: false,
    index: 0
  };

  handleOnPress = index => {
    this.setState({modalVisible:true, index})
  };
  render() {
    const { containerStyle, imageUrls,imageStyles, ...props } = this.props;
    return (
      <View style={containerStyle || defContainer}>
        {imageUrls.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleOnPress(index)}
              style={[styles.imgStyle,imageStyles]}
            >
              <Image
                source={{
                  uri: `${item.url}`
                }}
                style={[styles.imgStyle,imageStyles]}
                resizeMode={"cover"}
                PlaceholderContent={<ActivityIndicator />}
              />
            </TouchableOpacity>
          );
        })}

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <Icon 
            name={'close'} 
            type={'antdesign'} 
            color={'white'} 
            size={36} 
            underlayColor={'transparent'}
            containerStyle={{
              zIndex: 9999,
              position: 'absolute',
              right: 20,
              top: 30
            }}
            onPress={()=>this.setState({ modalVisible: false })}/>
          <Viewer
            imageUrls={imageUrls}
            index={this.state.index}
            onSwipeDown={() => {
              this.setState({ modalVisible: false });
            }}
            onMove={data => console.log(data)}
            enableSwipeDown={true}
            loadingRender={()=><ActivityIndicator />}
            {...props}
          />
        </Modal>
      </View>
    );
  }
}

export default ImageViewer;

const styles = {
  imgStyle: {
    height: 100,
    width: 100
  },
  defContainer: {
    flex: 1, 
    flexDirection: "row"
  }
};
