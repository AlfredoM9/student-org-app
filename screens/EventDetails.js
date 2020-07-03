import React from "react";
import { Block, Text, theme, Button } from "galio-framework";
import { StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import PropTypes from "prop-types";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function EventDetails({ route }) {
  // console.log(JSON.stringify(route.params));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Block flex>
        <Block row style={styles.header}>
          <Block style={styles.imageContainer}>
            <Image
              style={styles.headerImage}
              source={{ uri: route.params.item.image }}
            />
          </Block>
          <Block flex>
            <Text h5 style={styles.titleText}>
              {route.params.item.title}
            </Text>
          </Block>
        </Block>

        <Block style={styles.paragraph}>
          <Block style={styles.line}></Block>
          <Text>{route.params.item.content}</Text>
        </Block>
        <Block style={styles.button}>
          <Button>RSVP</Button>
        </Block>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    borderColor: "#777",
    borderWidth: 1,
    width: screenWidth - theme.SIZES.BASE,
    marginTop: 10,
  },
  header: {
    alignSelf: "center",
    height: theme.SIZES.BASE * 6,
  },
  titleText: {
    marginTop: theme.SIZES.BASE,
    margin: 2,
  },
  button: {
    alignSelf: "center",
  },
  container: {
    width: screenWidth - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,

    alignSelf: "center",
  },
  headerImage: {
    position: "absolute",
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    borderWidth: 1,
    borderBottomColor: "#777",
    height: theme.SIZES.BASE * 8,
    width: theme.SIZES.BASE * 8,
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  paragraph: {
    margin: 30,
    marginLeft: 0,
  },
});

export default EventDetails;
