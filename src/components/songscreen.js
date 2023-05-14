import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-native";
import lyricsData from "../data/lyrics.json";
import MusicPlayer from "../components/song";
import { PlayContext } from "../providers/PlayProvider";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";

export default function Lyrics(props) {
  const navigation = useNavigation();
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [lyricOnScreen, setLyricOnScreen] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [intervalId, setIntervalId] = useState(null);
  const { isPlaying, setIsPlaying } = useContext(PlayContext);

  // Set the lyrics from the imported JSON
  useEffect(() => {
    setLyrics(props.lyrics);
  }, []);

  // Set the current lyric index based on the duration each lyric has
  useEffect(() => {
    console.log(currentLyricIndex, lyrics.length - 1);
    console.log(props.users)
    if (isPlaying && currentLyricIndex < lyrics.length - 1) {
      const interval = setInterval(() => {
        setCurrentLyricIndex((prev) => prev + 1);
      }, lyrics[currentLyricIndex].duration);
      return () => clearInterval(interval);
    }
    //if i am at the last lyric, then i want to navigate to a page where i can see the score
    else if (currentLyricIndex === lyrics.length - 1) {
      //console.log(props.users)
      navigation.navigate("endscreen", {users: props.users});
    }
  }, [currentLyricIndex, isPlaying]);

  // Show only 5 lyrics at a time
  useEffect(() => {
    if (currentLyricIndex < 2) {
      setHighlightIndex(currentLyricIndex);
      setLyricOnScreen(lyrics.slice(0, 5));
    } else {
      setHighlightIndex(2);
      setLyricOnScreen(
        lyrics.slice(currentLyricIndex - 2, currentLyricIndex + 3)
      );
    }
  }, [currentLyricIndex, lyrics]);

  return (
    <View style={styles.container}>
      {lyricOnScreen.map((lyric, index) => (
        <Text
          key={index}
          style={{
            fontWeight: index === highlightIndex ? "bold" : "100",
            fontSize: 25,
          }}
        >
          {lyric.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
  },
});
