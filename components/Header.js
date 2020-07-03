import React, { useState, setState } from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Dimensions,
  Modal,
  View,
} from "react-native";
import { Button, Block, NavBar, Text, theme } from "galio-framework";
import Card from "../components/Card";

import Icon from "./Icon";
import Input from "./Input";
import Tabs from "./Tabs";
import argonTheme from "../constants/Theme";
import { ScrollView } from "react-native-gesture-handler";
import { startAsync } from "expo/build/AR";
import events from "../constants/events";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Pro")}
  >
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("View Items")}
  >
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  state = {
    modalVisible: false,
  };

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    const BellButton = ({ isWhite, style, navigation }) => (
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => this.setState({ modalVisible: true })}
      >
        <Icon
          family="ArgonExtra"
          size={16}
          name="bell"
          color={argonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
          onPress={() => this.setState({ modalVisible: true })}
        />
        <Block middle style={styles.notify} />
      </TouchableOpacity>
    );

    if (title === "Title") {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <BasketButton
          key="basket-title"
          navigation={navigation}
          isWhite={white}
        />,
      ];
    }

    switch (title) {
      case "Home":
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Deals":
        return [
          <BellButton key="chat-categories" navigation={navigation} />,
          <BasketButton key="basket-categories" navigation={navigation} />,
        ];
      case "Categories":
        return [
          <BellButton
            key="chat-categories"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-categories"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Category":
        return [
          <BellButton
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Profile":
        return [
          <BellButton
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Product":
        return [
          <SearchButton
            key="search-product"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-product"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Search":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Settings":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          <BasketButton
            key="basket-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Announcement"
        placeholderTextColor={"#8898AA"}
        //onFocus={() => navigation.navigate("Profile")}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="search-zoom-in"
            family="ArgonExtra"
            onPress={() => navigation.navigate("View Items")}
          />
        }
      />
    );
  };

  renderOptions = () => {
    const { navigation, optionLeft, optionMiddle, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Button
            shadowless
            style={[styles.tab, styles.divider]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Block row middle>
              <Icon
                name="diamond"
                family="ArgonExtra"
                style={{ paddingRight: 8 }}
                color={argonTheme.COLORS.ICON}
              />
              <Text size={16} style={styles.tabTitle}>
                {optionLeft || "Profile"}
              </Text>
            </Block>
          </Button>
          <Button
            shadowless
            style={[styles.tab, styles.divider]}
            onPress={() => navigation.navigate("Articles")}
          >
            <Block row middle>
              <Icon
                name="diamond"
                family="ArgonExtra"
                style={{ paddingRight: 8 }}
                color={argonTheme.COLORS.ICON}
              />
              <Text size={16} style={styles.tabTitle}>
                {optionMiddle || "Article"}
              </Text>
            </Block>
          </Button>
          <Button
            shadowless
            style={styles.tab}
            onPress={() => navigation.navigate("Profile")}
          >
            <Block row middle>
              <Icon
                size={16}
                name="bag-17"
                family="ArgonExtra"
                style={{ paddingRight: 8 }}
                color={argonTheme.COLORS.ICON}
              />
              <Text size={16} style={styles.tabTitle}>
                {optionRight || "Fashion"}
              </Text>
            </Block>
          </Button>
        </ScrollView>
      </Block>
    );
  };
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };

  renderModal = () => {
    return (
      <View>
        <Modal transparent visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.container}
              activeOpacity={1}
              onPressOut={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <ScrollView
                //directionalLockEnabled={true}
                contentContainerStyle={styles.scrollModal}
              >
                <TouchableWithoutFeedback>
                  <View style={styles.modalContainer}>
                    <Block>
                      {events.map((page) => (
                        <Text
                          style={{
                            margin: 10,
                            borderColor: "#777",
                            borderWidth: 1,
                          }}
                        >
                          {page.title}
                        </Text>
                      ))}
                    </Block>

                    <Text style={{ margin: 10 }}>
                      Potato and stuff here sdajbfaasfa \n \n,{"\n\n\n"}
                      sdasad
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = [
      "Search",
      "Categories",
      "Deals",
      "Pro",
      "Profile",
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: "center" }}
          left={
            <Icon
              name={back ? "chevron-left" : "menu"}
              family="entypo"
              size={20}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
              }
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? "WHITE" : "HEADER"] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
        {this.state.modalVisible
          ? this.renderModal()
          : console.log("not rendering")}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    //height: height / 2,
    // width: width - theme.SIZES.BASE * 2,
    //backgroundColor: "#777",
    //position: "absolute",
    //left: theme.SIZES.BASE,
    //top: theme.SIZES.BASE * 4,
    //borderRadius: 20,
    overflow: "hidden",
  },
  modalContainer: {
    //margin: 10,
    position: "absolute",
    left: -171,
    top: 80,
    //height: height / 2 - 20,
    width: width - theme.SIZES.BASE * 2,
    backgroundColor: "#eee",
    borderTopRightRadius: 0,
    borderRadius: 20,
  },
  container: {
    height: height,
    width: width,
    //backgroundColor: "#e1341e",
  },
  button: {
    padding: 12,
    position: "relative",
  },
  scrollModal: {
    paddingVertical: theme.SIZES.BASE,
    alignSelf: "center",
    height: height * 1.2,
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.33,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "400",
    color: argonTheme.COLORS.HEADER,
  },
});

export default withNavigation(Header);
