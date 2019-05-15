import React, { Component } from "react";
import { View } from "react-native";
import {
  ListItem,
  Overlay,
  Avatar,
  Button,
  Input,
  Text,
  Icon
} from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import {
  getCategoryList,
  errorHandler,
  postCategory,
  deleteCategory
} from "../../../actions";
import { MessageAlert, ConfirmAlert } from "../../../components/Alerts";
import List from "../../../components/List";
import icon from "../../../../assets/images/icon.png";
import styles from "../../styles";

class CategoryListScreen extends Component {
  state = {
    id: "",
    category: "",
    categoryPlaceholder: "",
    search: "",
    loading: false,
    refreshing: false,
    data: [],
    error: null,
    fullData: [],
    postLoading: false,
    deleteLoading: false,
    layoutVisible: false,
    layoutError: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Active Category",
      headerStyle: {
        backgroundColor: "#11CDEF"
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <Avatar
          rounded
          containerStyle={{ backgroundColor: "#afafaf" }}
          icon={{ name: "plus", type: "font-awesome" }}
          overlayContainerStyle={{ backgroundColor: "#00CC66" }}
          size={40}
          onPress={navigation.getParam("layoutVisible")}
          containerStyle={{ marginRight: 5 }}
        />
      ),
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
    this.props.navigation.setParams({
      layoutVisible: this.handleLayout
    });
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    getCategoryList()
      .then(res => {
        if (res.data.success) {
          var data = Object.keys(res.data.data).map(key => {
            const categoryItem = res.data.data[key];
            obj = {};
            obj["id"] = key;
            obj["name"] = categoryItem;
            return obj;
          });

          this.setState({
            loading: false,
            refreshing: false,
            data: data
          });
        } else {
          this.setState({
            error: res.data.message,
            refreshing: false,
            loading: false
          });
        }
      })
      .catch(err =>
        this.setState({
          loading: false,
          refreshing: false,
          error: errorHandler(err)
        })
      );
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  handlePostCategory = () => {
    this.setState({ postLoading: true, layoutError: "" });
    const { category, id } = this.state;
    postCategory({ category, id })
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              postLoading: false,
              category: "",
              categoryPlaceholder: "",
              layoutVisible: false,
              id: "",
              data: []
            },
            this.makeRemoteRequest()
          );
        } else {
          this.setState({
            layoutError: res.data.errors.category_name[0],
            postLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          layoutError: errorHandler(err),
          postLoading: false
        });
      });
  };

  handleDeleteCategory = () => {
    this.setState({ deleteLoading: true, layoutError: "" });
    deleteCategory(this.state.id)
      .then(res => {
        if (res.data.success) {
          this.setState(
            {
              deleteLoading: false,
              category: "",
              categoryPlaceholder: "",
              layoutVisible: false,
              id: "",
              data: []
            },
            this.makeRemoteRequest()
          );
          MessageAlert("Category Deleted", "Category Has been deleted");
        } else {
          this.setState({
            layoutError: res.data.message,
            deleteLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          layoutError: errorHandler(err),
          deleteLoading: false
        });
      });
  };

  handleLayout = () => {
    this.setState({
      layoutVisible: true
    });
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontWeight: "500", fontSize: 18, color: "#1B73B4" }}
      chevron={true}
      onPress={() =>
        this.setState({
          categoryPlaceholder: item.name,
          id: item.id,
          layoutVisible: true
        })
      }
    />
  );

  renderOverlay = () => {
    const {
      layoutVisible,
      categoryPlaceholder,
      category,
      layoutError,
      postLoading,
      id,
      deleteLoading
    } = this.state;
    const INITIAL_LAYOUT = {
      layoutVisible: false,
      category: "",
      categoryPlaceholder: "",
      id: "",
      layoutError: ""
    };
    return (
      <Overlay
        isVisible={layoutVisible}
        height={"auto"}
        overlayContainerStyle={{ padding: 100 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
        onBackdropPress={() =>
          !postLoading && !deleteLoading ? this.setState(INITIAL_LAYOUT) : null
        }
      >
        <View>
          <Icon
            raised
            reverse
            name={"times"}
            type={"font-awesome"}
            color={"#1B73B4"}
            size={18}
            underlayColor={"black"}
            containerStyle={{
              zIndex: 99999,
              position: "absolute",
              right: -32,
              top: -30
            }}
            onPress={() => this.setState({ layoutVisible: false })}
          />

          <View style={styles.categoryOverlayContainer}>
            <Text style={styles.categoryOverlayTitle}>
              {id ? "Change" : "Add"} Category
            </Text>
          </View>

          <Input
            placeholder={
              categoryPlaceholder ? categoryPlaceholder : "Category Name"
            }
            value={category}
            onChangeText={category => this.setState({ category })}
            editable={!postLoading && !deleteLoading}
          />
          <Text style={{ color: "red" }}>{layoutError}</Text>
          <View
            style={[styles.flexContainerRow, styles.categoryOverlayContainer]}
          >
            <Button
              title={id ? "UPDATE" : "ADD"}
              type="clear"
              onPress={this.handlePostCategory.bind()}
              loading={postLoading}
              disabled={postLoading || deleteLoading}
              containerStyle={styles.categoryOverlayButton}
            />
            {id ? (
              <Button
                title="DELETE"
                type="clear"
                onPress={() =>
                  ConfirmAlert(
                    "Delete Category",
                    `Do you want to Delete ${categoryPlaceholder}?`,
                    this.handleDeleteCategory
                  )
                }
                loading={deleteLoading}
                disabled={postLoading || deleteLoading}
                containerStyle={styles.categoryOverlayButton}
              />
            ) : null}
          </View>
        </View>
      </Overlay>
    );
  };

  render() {
    const { data, error, loading, refreshing } = this.state;
    const {
      makeRemoteRequest,
      renderItem,
      renderOverlay,
      handleRefresh
    } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <NavigationEvents onDidFocus={makeRemoteRequest} />
        {renderOverlay()}
        <List
          data={data}
          renderItem={renderItem}
          loading={loading}
          emptyText={"No Active Category"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 75 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    );
  }
}

export default CategoryListScreen;
