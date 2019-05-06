import React, { Component } from "react";
import { ScrollView, StatusBar, Dimensions, Text, ActivityIndicator } from "react-native";
import { Avatar, Card } from 'react-native-elements'
import { BarChart,LineChart } from "react-native-chart-kit";
import { MessageAlert } from "../../components/Alerts";
import {
  getOwnerOrderTotal,
  getOwnerOrderSales,
  errorHandler
} from "../../actions";
import Loading from "../../components/Loading";

const chartFormat = data => {
  return {
    labels: data.month,
    datasets: [
      {
        data: data.data
      }
    ]
  };
};

const chartConfigs = {
  backgroundColor: "white",
  backgroundGradientFrom: "#1B73B4",
  backgroundGradientTo: "#11CDEF",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};
const graphStyle = {
  alignItems: 'center',
  marginVertical: 8,
  borderRadius: 16,
  paddingHorizontal: 20
}

class OwnerScreen extends Component {
  state = {
    orderTotal: {
      labels: [],
      datasets: [
        {
          data: []
        }
      ]
    },
    orderSales: {
      labels: [],
      datasets: [
        {
          data: []
        }
      ]
    },
    loading: false,
    error: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#11CDEF"
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <Avatar
          containerStyle={{ backgroundColor: "transparent", marginLeft: 5 }}
          overlayContainerStyle={{ backgroundColor: "transparent" }}
          icon={{ name: "bars", type: "font-awesome", color: "#FFF" }}
          size={50}
          onPress={() => navigation.openDrawer()}
        />
      )
    };
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    const promises = [getOwnerOrderSales(), getOwnerOrderTotal()];
    Promise.all(promises)
      .then(res => {
        this.setState({
          orderSales: chartFormat(res[0].data.data),
          orderTotal: chartFormat(res[1].data.data),
          loading: false
        });
        console.log(this.state.orderSales);
      })
      .catch(err => {
        this.setState({ loading: false });
        MessageAlert("Request Failed", errorHandler(err[0] ? err[0] : err[1]));
      });
  };

  renderTabBar() {
    return <StatusBar hidden />;
  }

  render() {
    const width = Dimensions.get("window").width-40;
    const height = 220;
    if(this.state.loading) return <ActivityIndicator size={'large'} />
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <Card
          title={'Sales Total'}
        >
        <BarChart
          width={width}
          height={height}
          data={this.state.orderTotal}
          chartConfig={chartConfigs}
          style={graphStyle}
        />
        </Card>

<Card
  title={'Order Total'}
>
        <BarChart
          width={width}
          height={height}
          data={this.state.orderTotal}
          chartConfig={chartConfigs}
          style={graphStyle}
        />
              </Card>
      </ScrollView>
    );
  }
}

export default OwnerScreen;
