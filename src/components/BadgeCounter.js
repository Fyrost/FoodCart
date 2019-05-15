import React, { Component } from "React";
import { Badge } from "react-native-elements";

class BadgeCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  timeout = 0
  componentDidMount() {
    this.makeRemoteRequest();
    this.timeout = setInterval(this.makeRemoteRequest, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.timeout)
  }

  makeRemoteRequest = () => {
    this.props.promise().then(res => {
      this.setState({
        value: res.data.data.toString()
      });
    });
  };
  render() {
    if (!this.state.value) return null;
    return (
      <Badge
        value={this.state.value}
        status={this.props.status || "error"}
        containerStyle={{ backgroundColor: "transparent", marginRight: 10 }}
      />
    );
  }
}

export default BadgeCounter;
