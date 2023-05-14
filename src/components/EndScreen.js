import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, TextInput, SafeAreaView  } from "react-native";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
 
export function EndScreen ({users}) {

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
      
  const users_mockup = ["Calin", "Tudor",  "Mihaiela"];
  const shuffledUsers = shuffleArray([...users_mockup]);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const first_score = getRandomNumber(80, 100);
  const second_score = getRandomNumber(60, 80);
  const third_score = getRandomNumber(40, 60);
 
  const Placement = ({name, delayTime, img, score}) => {
    return (
      <View style={styles.placementContainer}>
        <Animatable.Image delay={delayTime} animation={{
              from: { translateX: -1000 },
              to: { translateX: 0 },
            }} source={img} style={{width: 90, height: 90}}/>
 
        <Animatable.Text delay={delayTime} animation={{
              from: { translateX: 1000 },
              to: { translateX: 0 },
            }} style={styles.placementText}> <Text style={{fontWeight: "bold"}}>{name}</Text> - {score}% accuracy</Animatable.Text>
      </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
        <Animatable.Text animation={"slideInDown"} style={styles.title}>Top singers</Animatable.Text>
 
        <View style={{width: "100%", height: "80%", flexDirection: "row", alignItems: "center"}}> 
          <View>
            <Placement name={shuffledUsers[0]} delayTime={1000} img={require("../../assets/first_place.png")} score={first_score}/>
            {shuffledUsers[1] && <Placement name={shuffledUsers[1]} delayTime={2000} img={require("../../assets/second_place.png")} score={second_score}/>}
            {shuffledUsers[2] && <Placement name={shuffledUsers[2]} delayTime={3000} img={require("../../assets/third_place.png")} score={third_score}/>}
          </View>

          <Animatable.View delay={3700} animation={{from: {translateY: 1000}, to: {translateY: 0}}} style={{width: "100%"}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <Text style={{ fontSize: 50, color: "black", fontWeight: "bold" }}>Finish</Text>
            </TouchableOpacity>
          </Animatable.View>

        </View>
 
    </SafeAreaView>
  );
};
 
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "lightgray",
    },
 
    title :{
        fontSize: 40,
        fontWeight: "bold",
        color: "black",
        marginTop: 20,
    },
 
    placementContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 20,
      marginLeft: 30,
    },
 
    placementText: {
      fontSize: 30,
      fontWeight: "400",
      color: "black",
      marginLeft: 20,
    },
 
    button: {
      width: "30%",
      height: "40%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 10,
      marginLeft: 100,
    },
 
});
 
export default EndScreen;
