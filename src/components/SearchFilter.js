import React, { Component } from "React";
import { Animated, View, Text } from "react-native";
import { Overlay, Icon } from "react-native-elements";
import MultiSelect from "react-native-multiple-select";
import _ from "lodash";

const items = [
    {
        id: '92iijs7yta',
        name: 'Ondo',
    },
    {
        id: 'a0s0a8ssbsd',
        name: 'Ogun',
    },
    {
        id: '16hbajsabsd',
        name: 'Calabar',
    },
    ]

class Search extends Component {
  state = {
    toggleFilter: false,
    selectedItems: []
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
        this.state.toggleFilter ? 1 : 0
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleFilter: this.handleSearchVisible
    });
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.toggleFilter ? 1 : 0,
      duration: 100
    }).start();
  }

  handleSearchVisible = () => {
    this.setState({ toggleFilter: !this.state.toggleFilter });
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const viewStyle = {
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
      }),
      position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      zIndex: 9999,
      backgroundColor: 'white'
    };
    const { selectedItems } = this.state
    if (!this.state.toggleFilter) return null;
    return (
      <Animated.View
        style={viewStyle}
      >
        <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Tag"
            searchInputPlaceholderText="Search Tags..."
            onChangeInput={ (text)=> console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
        />
        <View>
          <Text>{selectedItems}</Text>
        </View>   
      </Animated.View>
    );
  }
}

export default Search;
