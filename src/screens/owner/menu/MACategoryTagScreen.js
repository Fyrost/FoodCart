import React, { Component } from "react";
import { View, Picker, Image, ActivityIndicator } from "react-native";
import { ImagePicker } from "expo";
import {
  Button,
  Text,
  ListItem,
  Overlay,
  Icon,
  Input
} from "react-native-elements";
import TagInput from "react-native-tag-input";
import { MessageAlert } from "../../../components/Alerts";
import ToolTipHelper from "../../../components/ToolTipHelper";
import missing from "../../../../assets/images/missing.png";
import styles from "../../styles";
import {
  postCategory,
  getMenuPicker,
  postMenu,
  errorHandler
} from "../../../actions";

class MenuAddScreen extends Component {
  state = {
    category: "",
    tags: [],
    picture: "",
    categoryError: "",
    addCategory: "",
    tagText: "",
    loading: false,
    postLoading: false,
    overlayLoading: false,
    dropdownLoading: false,
    categoryList: {},
    layoutVisible: false,
    error: null,
    layoutError: "",
    progress: ""
  };

  componentDidMount() {
    const { category, tag, categoryList } = this.props.navigation.state.params;
    this.setState({
      category,
      tags: tag,
      categoryList
    });
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });

    if (!result.cancelled) {
      this.setState({ picture: result.uri });
    }
  };

  handlePostMenu = () => {
    this.setState({ postLoading: true, categoryError: "" });
    const { category, tags, picture } = this.state;
    const {
      menuId,
      name,
      description,
      price,
      cookTime
    } = this.props.navigation.state.params;
    postMenu(
      {
        name: name,
        description: description,
        price: price,
        cookTime: cookTime,
        category,
        tags,
        picture,
        id: menuId
      },
      this.setState.bind(this)
    )
      .then(res => {
        const { success } = res.data;
        if (success) {
          this.setState(
            {
              postLoading: false,
              name: "",
              description: "",
              price: "",
              cookTime: "",
              tags: [],
              picture: null
            },
            () => {
              MessageAlert("Manage Menu", "Successfully Added");
              this.props.navigation.popToTop();
            }
          );
        } else {
          const {
            errors: { menu_category }
          } = res.data;
          this.setState({
            categoryError: menu_category && menu_category[0],
            postLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          error: errorHandler(err),
          postLoading: false
        });
      });
  };

  handlePostCategory = () => {
    this.setState({ overlayLoading: true, layoutError: "" });
    const { addCategory } = this.state;
    postCategory({ category: addCategory })
      .then(res => {
        if (res.data.success) {
          this.setState({
            overlayLoading: false,
            addCategory: "",
            layoutVisible: false,
            dropdownLoading: true,
            categoryList: []
          });
          return getMenuPicker();
        } else {
          this.setState({
            layoutError: res.data.errors.category_name[0],
            overlayLoading: false
          });
        }
      })
      .then(res => {
        if (!this.state.layoutError) {
          if (res.data.success) {
            const { category_list } = res.data.data;
            this.setState({
              category: Object.keys(category_list)[0],
              categoryList: category_list,
              dropdownLoading: false
            });
          } else {
            this.setState({
              error: res.data.message,
              dropdownLoading: false
            });
          }
        }
      })
      .catch(err => {
        this.setState({
          layoutError: errorHandler(err),
          overlayLoading: false,
          dropdownLoading: false
        });
      });
  };

  handleTag = tagText => {
    this.setState({ tagText });

    const lastTyped = tagText.charAt(tagText.length - 1);
    const parseWhen = [",", ";"];

    if (parseWhen.indexOf(lastTyped) > -1) {
      if (tagText.length <= 1 || this.state.tags.length >= 5) {
        this.setState({ tagText: "" });
      } else {
        this.setState({
          tags: Array.from(new Set([...this.state.tags, this.state.tagText])),
          tagText: ""
        });
      }
    }
  };

  tagInputProps = {
    autoCapitalize: "characters",
    blurOnSubmit: true,
    onSubmitEditing: () => {
      this.handleTag(`${this.state.tagText};`);
    },
    style: {
      marginTop: 8
    }
  };

  renderOverlay = () => {
    const {
      layoutVisible,
      addCategory,
      layoutError,
      overlayLoading
    } = this.state;
    const INITIAL_LAYOUT = {
      layoutVisible: false,
      addCategory: "",
      layoutError: ""
    };
    return (
      <Overlay
        isVisible={layoutVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() => this.setState(INITIAL_LAYOUT)}
      >
        <View>
          <View style={styles.categoryOverlayContainer}>
            <Text style={styles.categoryOverlayTitle} h4>
              Add Category
            </Text>
          </View>

          <Input
            placeholder={"Category Name"}
            value={addCategory}
            onChangeText={addCategory => this.setState({ addCategory })}
            editable={!overlayLoading}
          />
          <Text style={{ color: "red" }}>{layoutError}</Text>
          <View
            style={[styles.flexContainerRow, styles.categoryOverlayContainer]}
          >
            <Button
              title={"ADD"}
              type={"outline"}
              onPress={this.handlePostCategory.bind()}
              loading={overlayLoading}
              disabled={overlayLoading}
              containerStyle={styles.categoryOverlayButton}
            />
          </View>
        </View>
      </Overlay>
    );
  };

  renderCategoryDropdown = () => {
    return !this.state.dropdownLoading ? (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Picker
          style={styles.flexContainer}
          selectedValue={this.state.category}
          mode={"dropdown"}
          onValueChange={category => this.setState({ category })}
          enabled={!this.state.postLoading}
        >
          {Object.keys(this.state.categoryList).map((key, index) => {
            const categoryItem = this.state.categoryList[key];
            return <Picker.Item label={categoryItem} value={key} key={index} />;
          })}
        </Picker>
        <Button
          icon={
            <Icon
              name={"plus"}
              type={"font-awesome"}
              color={"white"}
              size={14}
            />
          }
          buttonStyle={{
            backgroundColor: "#11CDEF",
            borderRadius: 0,
            paddingHorizontal: 10
          }}
          raised
          disabled={this.state.postLoading}
          onPress={() => this.setState({ layoutVisible: true })}
        />
      </View>
    ) : (
      <ActivityIndicator size="large" />
    );
  };
  render() {
    const {
      loading,
      categoryError,
      tags,
      tagText,
      error,
      picture,
      postLoading,
      progress
    } = this.state;
    const { menuId, tempPicture } = this.props.navigation.state.params;

    if (loading) return <ActivityIndicator size="large" />;
    return (
      <View style={[styles.menuAddBody, styles.horizontalPadding16]}>
        {this.renderOverlay()}
        <View style={styles.ownerFormRow}>
          <Text style={[styles.flexContainer, styles.menuAddText]}>
            Menu Category
          </Text>
          {this.renderCategoryDropdown()}
        </View>
        <Text style={styles.menuAddPickerError}>{categoryError}</Text>
        <View
          style={[
            {
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center"
            }
          ]}
        >
          <Text style={styles.menuAddText}>Menu Tags </Text>
          <ToolTipHelper>
            <Text style={[styles.menuAddNote]}>
              To create a "tag", you must end it with a comma ( , ) or a
              semi-colon ( ; ). And new tags will be sent to the administrator
              for review. Limit of 5
            </Text>
          </ToolTipHelper>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderBottomWidth: 1
          }}
        >
          <TagInput
            value={tags}
            onChange={tags => this.setState({ tags })}
            labelExtractor={tag => tag}
            text={tagText}
            onChangeText={this.handleTag}
            inputProps={this.tagInputProps}
            maxHeight={75}
            editable={!postLoading}
          />
        </View>
        <View
          style={[
            {
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20
            }
          ]}
        >
          <Text style={styles.menuAddText}>Menu Photo </Text>
          <ToolTipHelper>
            <Text style={styles.menuAddNote}>
              You can add your menu even without a picture, you can change it
              later on
            </Text>
          </ToolTipHelper>
        </View>
        <ListItem
          containerStyle={{ height: 50, width: "100%", top: 50 }}
          title={
            <Button
              title={"CHOOSE PHOTO"}
              raised
              buttonStyle={{ backgroundColor: "#11CDEF", borderRadius: 0 }}
              disabled={postLoading}
              onPress={() => this.pickImage()}
            />
          }
          subtitle={
            error ? <Text style={{ color: "#EF1B17" }}>{error}</Text> : null
          }
          chevron={false}
          leftElement={
            <View>
              <Image
                source={
                  picture
                    ? { uri: picture }
                    : tempPicture
                    ? { uri: tempPicture }
                    : missing
                }
                style={{ resizeMode: "cover", height: 100, width: 100 }}
              />
            </View>
          }
        />

        <View style={{ flex: 2 }} />
        <Button
          title={
            !postLoading
              ? menuId
                ? "UPDATE MENU"
                : "ADD MENU"
              : progress
              ? progress
              : "loading"
          }
          titleStyle={{ alignItems: "center" }}
          buttonStyle={{ borderRadius: 0, elevation: 3 }}
          containerStyle={[styles.flexContainer, { width: "50%" }]}
          disabled={postLoading}
          onPress={this.handlePostMenu.bind()}
        />
      </View>
    );
  }
}

export default MenuAddScreen;
