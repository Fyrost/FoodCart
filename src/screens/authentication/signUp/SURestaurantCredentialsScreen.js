import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Button, ListItem } from "react-native-elements";

import { ImagePicker } from "expo";

import { registerPartner, errorHandler } from "../../../actions";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import styles from "../../styles";

class SURestaurantCredentialsScreen extends Component {
  state = {
    permit1: "",
    permit2: "",
    permit3: "",
    loading: false,
    error: "",
    progress: ""
  };

  pickImage = async permit => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    }).then(result => {
      if (!result.cancelled) {
        this.setState({ [permit]: result.uri });
      }
    });
  };

  handleRegister = () => {
    const { permit1, permit2, permit3 } = this.state;
    const {
      restoName,
      address,
      firstName,
      middleName,
      lastName,
      contact,
      email
    } = this.props.navigation.state.params;
    if (permit1) {
      this.setState({ loading: true });
      registerPartner(
        {
          restoName,
          address,
          firstName,
          middleName,
          lastName,
          contact,
          email,
          permit1,
          permit2,
          permit3
        },
        this.setState.bind(this)
      )
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            this.setState({ loading: false, progress: "" });
            alert(res.data.message);
            this.props.navigation.popToTop();
          } else {
            this.setState({ loading: false, progress: "" });
            let arr = Object.entries(res.data.errors).map(([key, value]) => {
              return [...value];
            });
            alert(`${arr.join("\n")}`);
          }
        })
        .catch(err => {
          this.setState({ loading: false, progress: "" });
          alert(errorHandler(err));
        });
    } else {
      this.setState({ error: "Must have atleast Permit 1" });
    }
  };

  render() {
    const { permit1, permit2, permit3, loading } = this.state;
    const { pickImage, handleRegister } = this;
    return (
      <View style={[styles.horizontalPadding16, { flex: 1 }]}>
        <View style={[{ flex: 7, justifyContent: "space-around" }]}>
          <View style={{ flex: 1 }}>
            <Text>Please provide your business permits.</Text>
          </View>
          <ListItem
            title={"Permit 1"}
            subtitle={
              <Button
                title={"Add Permit"}
                onPress={() => pickImage("permit1")}
                disabled={loading}
              />
            }
            chevron={false}
            leftElement={
              <Image
                source={
                  permit1
                    ? { uri: permit1 }
                    : require("../../../../assets/images/missing.png")
                }
                style={{ resizeMode: "cover", height: 100, width: 100 }}
              />
            }
          />
          <ListItem
            title={"Permit 2"}
            subtitle={
              <Button
                title={"Add Permit"}
                onPress={() => pickImage("permit2")}
                disabled={loading}
              />
            }
            chevron={false}
            leftElement={
              <Image
                source={
                  permit2
                    ? { uri: permit2 }
                    : require("../../../../assets/images/missing.png")
                }
                style={{ resizeMode: "cover", height: 100, width: 100 }}
              />
            }
          />
          <ListItem
            title={"Permit 3"}
            subtitle={
              <Button
                title={"Add Permit"}
                onPress={() => pickImage("permit3")}
                disabled={loading}
              />
            }
            chevron={false}
            leftElement={
              <Image
                source={
                  permit3
                    ? { uri: permit3 }
                    : require("../../../../assets/images/missing.png")
                }
                style={{ resizeMode: "cover", height: 100, width: 100 }}
              />
            }
          />
        </View>
        <View
          style={[{ flex: 2, alignItems: "center", justifyContent: "center" }]}
        >
          <Button
            title={
              !loading
                ? "BECOME A PARTNER"
                : this.state.progress
                ? this.state.progress
                : "loading"
            }
            buttonStyle={styles.authButton}
            containerStyle={[
              styles.authButtonSize,
              { marginTop: -20, width: "50%" }
            ]}
            raised
            disabled={loading}
            onPress={handleRegister.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default SURestaurantCredentialsScreen;
