import React, { Component } from "React";
import { Animated } from "react-native";
import MultiSelect from "react-native-multiple-select";
import _ from "lodash";

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
      })
    };
    if (!this.state.toggleFilter) return null;
    return (
      <Animated.View style={viewStyle}>
        <MultiSelect
          items={this.props.items}
          uniqueKey={this.props.uniqueKey}
          displayKey={this.props.displayKey}
          onSelectedItemsChange={this.props.onSelectedItemsChange}
          selectedItems={this.props.selectedItems}
          selectText={"Pick Tag"}
          searchInputPlaceholderText={"Search Tags..."}
          onChangeInput={this.props.onChangeInput}
          tagRemoveIconColor={"#11CDEF"}
          tagBorderColor={"#11CDEF"}
          tagTextColor={"#11CDEF"}
          selectedItemTextColor={"#CCC"}
          selectedItemIconColor={"#CCC"}
          itemTextColor={"#000"}
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor={"#11CDEF"}
          submitButtonText={"Submit"}
          styleInputGroup={{ paddingHorizontal: 10, paddingVertical: 10 }}
        />
      </Animated.View>
    );
  }
}

export default Search;
