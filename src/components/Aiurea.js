import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";

export default function Aiurea() {
  return (
    <View style={styles.container}>
      <Text>AIUREA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
  },
});
