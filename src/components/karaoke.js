import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import MusicPlayer from "../components/song";
import Lyrics from "../components/songscreen";
// import { PlayProvider } from "../providers/PlayProvider";
import { PlayContext } from "../providers/PlayProvider";

function Player({ name }) {
  return (
    <View
      style={{
        width: "80%",
        height: "20%",
        backgroundColor: "lightblue",
        marginLeft: 25,
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Now Singing: {name}
      </Text>
    </View>
  );
}

export default function Karaoke({ navigation, route }) {
  const backBtn = require("../../assets/left-arrow.png");
  const { songName, artistName, songImage, passengersList, audioFile, lyrics } =
    route.params;
  const [firstTime, setFirstTime] = useState(true);

  const [playerIndex, setPlayerIndex] = useState(0);
  const players = ["No one", ...passengersList.filter((item) => item !== "")];
  const { isPlaying, setIsPlaying } = useContext(PlayContext);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      //if it's the first time it is playing, then we don't want to change the player until lyrics[0].duration
      if (firstTime) {
        setFirstTime(false);
        interval = setInterval(() => {
          setPlayerIndex(1); // Skip "No one" and start rotating from the next player
        }, lyrics[0].duration - 3000);
      } else {
        interval = setInterval(() => {
          setPlayerIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex >= players.length ? 1 : nextIndex; // Skip "No one" if it reaches the end of the list
          });
        }, 8000);
      } // Change player every 10 seconds
    }
    return () => clearInterval(interval);
  }, [playerIndex, isPlaying]);

  return (
    <View style={styles.container} supportedOrientations={["landscape"]}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.pop(2)}
      >
        <Image source={backBtn} style={styles.icon} />
      </TouchableOpacity>
      <View style={{ width: "30%", height: "100%", marginLeft: 25 }}>
        <MusicPlayer
          soundFile={audioFile}
          albumPhoto={songImage}
          songName={songName}
          songArtist={artistName}
        />
      </View>
      <View
        style={{
          width: "70%",
          height: "100%",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Player name={players[playerIndex]} />
        <Lyrics 
          lyrics={lyrics}
          users={players} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  icon: {
    height: 40,
    width: 40,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 5,
  },
});
