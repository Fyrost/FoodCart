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
      opacity: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
    };
    const { selectedItems } = this.state
    if (!this.state.toggleFilter) return null;
    return (
      <Animated.View
        style={viewStyle}
      >
        <MultiSelect
            items={items}
            uniqueKey={"id"}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText={"Pick Tag"}
            searchInputPlaceholderText={"Search Tags..."}
            onChangeInput={ (text)=> console.log(text)}
            tagRemoveIconColor={"#11CDEF"}
            tagBorderColor={"#11CDEF"}
            tagTextColor={"#11CDEF"}
            selectedItemTextColor={"#CCC"}
            selectedItemIconColor={"#CCC"}
            itemTextColor={"#000"}
            displayKey={"name"}
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor={"#11CDEF"}
            submitButtonText={"Submit"}
            styleInputGroup={{ paddingHorizontal: 10, paddingVertical: 10  }}
        />
      </Animated.View>
    );
  }
}

export default Search;
