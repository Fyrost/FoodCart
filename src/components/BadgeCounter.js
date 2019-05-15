import React, { Component } from "React";
import { Badge } from "react-native-elements";

class BadgeCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  timeout = 0;
  componentDidMount() {
    this.makeRemoteRequest();
    this.timeout = setInterval(this.makeRemoteRequest, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  makeRemoteRequest = () => {
    this.props.promise().then(res => {
      this.setState({
        value: res.data.data.toString()
      });
    });
  };
  render() {
    if (!this.state.value || this.state.value === "0") return null;
    return (
      <Badge
        value={this.state.value}
        status={this.props.status || "error"}
        textStyle={this.props.textStyle || { fontSize: 14 }}
        badgeStyle={
          this.props.badgeStyle || { borderColor: "transparent", padding: 5 }
        }
        containerStyle={
          this.props.containerStyle || {
            marginRight: 10
          }
        }
        {...this.props}
      />
    );
  }
}

export default BadgeCounter;
