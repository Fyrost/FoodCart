import React, { Component } from "React";
import { View, Text, TextInput, Animated } from "react-native";

class FloatingLabelInput extends Component {
  state = {
    isFocused: false
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value ? 1 : 0);
  }

  handleShow = () =>
    this.setState({
      xVisible: this.props.value ? true : false
    });

  handleFocus = () =>
    this.setState(
      {
        isFocused: true
      },
      () => (this.props.onFocus ? this.props.onFocus() : null)
    );

  handleBlur = () => {
    this.setState(
      {
        isFocused: false
      },
      () => (this.props.onBlur ? this.props.onBlur() : null)
    );
  };
  handleBackPress = () =>
    this.setState({
      isFocused: this.props.value ? true : false
    });
  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value ? 1 : 0,
      duration: 200
    }).start();
  }

  render() {
    const { label, ...props } = this.props;

    const inputContainerStyle = {
      alignContent: "center",
      paddingTop: 18,
      paddingBottom: 4,
      flexDirection: "row",
      borderBottomWidth: this.state.isFocused || this.props.value ? 3 : 1,
      borderBottomColor: this.props.errorMessage
        ? "red"
        : this.state.isFocused || this.props.value
        ? "#11CDEF"
        : "#ABABAF"
    };

    const textInputStyle = {
      height: this.props.height || 24,
      fontSize: this.props.fontSize || 20,

      color: "#000",
      width: "100%"
    };

    const labelStyle = {
      position: "absolute",
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 0]
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14]
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ABABAF", "#11CDEF"]
      })
    };

    const errorStyle = {
      color: "#EF1B17"
    };

    return (
      <View style={[{ flex: 1 }, this.props.containerStyle]}>
        <View style={inputContainerStyle}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <TextInput
            {...props}
            ref={this.props.inputRef}
            style={textInputStyle}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            autoCapitalize={this.props.autoCapitalize || "none"}
            autoComplete={this.props.autoComplete || "off"}
            autoCorrect={this.props.autoCorrect || false}
          />
        </View>
        <Text style={errorStyle}>{this.props.errorMessage}</Text>
      </View>
    );
  }
}

export default FloatingLabelInput;
