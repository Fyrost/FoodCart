import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-elements";
import KeyboardShift from "../../../components/KeyboardShift";
import { inputHandler } from "../../../actions";
import { MessageAlert } from "../../../components/Alerts";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import { getMenuPicker, getMenuEdit, errorHandler } from "../../../actions";
import styles from "../../styles";

class MAInfoScreen extends Component {
  state = {
    name: { text: "", error: "" },
    description: { text: "", error: "" },
    price: { text: "", error: "" },
    cookTime: { text: "", error: "" },
    category: "",
    tag: [],
    tempPicture: "",
    categoryList: [],

    loading: false,
    postLoading: false
  };
  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    this.setState({ loading: true });
    const id = this.props.navigation.getParam("menuId");
    id
      ? getMenuEdit(id)
          .then(res => {
            const { success } = res.data;
            if (success) {
              const {
                category_list,
                menu_details: {
                  name,
                  description,
                  price,
                  cooking_time,
                  image_name,
                  tag,
                  category
                }
              } = res.data.data;
              let tags = [];
              tags = tag.map(obj => {
                return obj.name;
              });
              this.setState(
                {
                  id: id,
                  category: `${category[0].id}`,
                  categoryList: category_list,
                  name: { text: name },
                  description: { text: description },
                  price: { text: price },
                  cookTime: { text: cooking_time },
                  tag: tags,
                  tempPicture: image_name
                    ? `http://pinoyfoodcart.com/image/menu/${image_name}`
                    : null,
                  loading: false
                },
                console.log(this.state)
              );
            } else {
              this.setState({
                error: res.data.message,
                loading: false
              });
            }
          })
          .catch(err => {
            this.setState({
              loading: false
            });
            MessageAlert("Manage Menu", errorHandler(err));
          })
      : getMenuPicker()
          .then(res => {
            const {
              success,
              data: { category_list },
              message
            } = res.data;
            if (success) {
              this.setState({
                categoryList: category_list,
                category: Object.keys(category_list)[0],
                loading: false
              });
            } else {
              this.setState({
                error: message,
                loading: false
              });
            }
          })
          .catch(err => {
            this.setState({
              loading: false
            });
            MessageAlert("Manage Menu", errorHandler(err));
          });
  };

  checkError = () => {
    const { name, price, cookTime } = this.state;
    return (
      name.error == "" &&
      price.error == "" &&
      cookTime.error == "" &&
      name.text != "" &&
      price.text != "" &&
      cookTime.text != ""
    );
  };

  handleContinue = () => {
    const {
      id,
      name,
      description,
      price,
      cookTime,
      category,
      tag,
      tempPicture,
      categoryList
    } = this.state;
    this.checkError()
      ? this.props.navigation.navigate("MACategoryTag", {
          menuId:id,
          name: name.text,
          description: description.text,
          price: price.text,
          cookTime: cookTime.text,
          category,
          tag,
          tempPicture,
          categoryList
        })
      : this.setState({
          name: inputHandler({ menuName: name }, "menuName"),
          price: inputHandler({ menuPrice: price }, "menuPrice"),
          cookTime: inputHandler({ cookTime }, "cookTime")
        });
  };

  render() {
    if (this.state.loading) return <ActivityIndicator size="large" />;
    return (
      <KeyboardShift style={[styles.menuAddBody, styles.horizontalPadding16]}>
        <View style={styles.ownerFormRow}>
          <Text style={styles.menuAddTitle}>What's the new menu?</Text>
        </View>
        <FloatingLabelInput
          label={"Menu Name"}
          value={this.state.name.text}
          onChangeText={text => this.setState({ name: { text } })}
          onBlur={() =>
            this.setState({
              name: inputHandler(
                {
                  menuName: this.state.name
                },
                "menuName"
              )
            })
          }
          autoCapitalize={"words"}
          errorMessage={this.state.name.error}
          editable={!this.state.postLoading}
        />

        <FloatingLabelInput
          label={"Menu Description"}
          value={this.state.description.text}
          autoCapitalize={"sentences"}
          onChangeText={text => this.setState({ description: { text } })}
          editable={!this.state.postLoading}
        />

        <FloatingLabelInput
          label={"Menu Price"}
          value={this.state.price.text}
          onChangeText={text => this.setState({ price: { text } })}
          onBlur={() =>
            this.setState({
              price: inputHandler(
                {
                  menuPrice: this.state.price
                },
                "menuPrice"
              )
            })
          }
          errorMessage={this.state.price.error}
          editable={!this.state.postLoading}
          keyboardType={"numeric"}
        />

        <FloatingLabelInput
          label={"Cook Time in Minutes"}
          value={this.state.cookTime.text}
          onChangeText={text => this.setState({ cookTime: { text } })}
          errorMessage={this.state.cookTime.error}
          onBlur={() =>
            this.setState({
              cookTime: inputHandler(
                {
                  cookTime: this.state.cookTime
                },
                "cookTime"
              )
            })
          }
          editable={!this.state.postLoading}
          keyboardType={"numeric"}
        />

        <View style={styles.flexContainer} />
        <Button
          title={"NEXT"}
          titleStyle={{ alignItems: "center" }}
          buttonStyle={{ borderRadius: 0, elevation: 3 }}
          containerStyle={[styles.flexContainer, { width: "50%" }]}
          onPress={this.handleContinue.bind(this)}
        />
      </KeyboardShift>
    );
  }
}

export default MAInfoScreen;
