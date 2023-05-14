import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-native";
import lyricsData from "../data/lyrics.json";
import MusicPlayer from "../components/song";
import { PlayContext } from "../providers/PlayProvider";

export default function Lyrics({ props }) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [lyricOnScreen, setLyricOnScreen] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [intervalId, setIntervalId] = useState(null);
  const { isPlaying, setIsPlaying } = useContext(PlayContext);

  // Set the lyrics from the imported JSON
  useEffect(() => {
    setLyrics(props);
    console.log(props);
  }, []);

  // Set the current lyric index based on the duration each lyric has
  useEffect(() => {
    if (isPlaying && currentLyricIndex < lyrics.length - 1) {
      const interval = setInterval(() => {
        setCurrentLyricIndex((prev) => prev + 1);
      }, lyrics[currentLyricIndex].duration);
      return () => clearInterval(interval);
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
      {/* <Button title={isPlaying ? "Pause" : "Play"} onPress={handlePlayPause} /> */}
      <View style={{ height: "70%" }}>
        {lyricOnScreen.map((lyric, index) => (
          <Text
            key={index}
            style={{
              fontWeight: index === highlightIndex ? "bold" : "100",
              fontSize: 30,
            }}
          >
            {lyric.text}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
