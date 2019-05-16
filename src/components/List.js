import React, { Component } from "React";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import ActivityLoading from "./ActivityLoading";
class   List extends Component {
  keyExtractor = (item, index) => index.toString();

  renderFooter = () => {
    return this.props.loading ? (
      this.props.listFooterComponent ? (
        this.props.listFooterComponent
      ) : (
        <ActivityLoading type={"list"} />
      )
    ) : null;
  };

  renderEmpty = () => {
    return !this.props.loading ? (
      this.props.listEmptyComponent ? (
        this.props.listEmptyComponent
      ) : (
        <View
          style={this.props.emptyContainerStyle || defaultStyle.emptyContainer}
        >
          <Text style={this.props.emptyStyle || defaultStyle.emptyStyle}>
            {this.props.emptyText ? this.props.emptyText : "No Item"}
          </Text>
        </View>
      )
    ) : null;
  };

  renderSeparator = () => {
    return this.props.ItemSeparatorComponent ? (
      this.props.ItemSeparatorComponent
    ) : (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "lightgray"
        }}
      />
    );
  };

  render() {
    const {
      data,
      error,
      renderItem,
      listEmptyComponent,
      listFooterComponent,
      ...props
    } = this.props;
    const { keyExtractor, renderFooter, renderEmpty, renderSeparator } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <FlatList
          {...props}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty()}
          ListFooterComponent={renderFooter()}
          ItemSeparatorComponent={
            this.props.divider !== "none" && renderSeparator
          }
        />
      </View>
    );
  }
}

export default List;

const defaultStyle = {
  emptyContainer: {
    alignItems: "center",
    marginTop: 30
  },
  emptyStyle: {
    fontSize: 18,
    fontWeight: "500"
  }
};
