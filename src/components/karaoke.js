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
import { useState, useEffect } from "react";
import MusicPlayer from "../components/song";
import Lyrics from "../components/songscreen";
import { PlayProvider } from "../providers/PlayProvider";

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
  console.log(passengersList);

  const [playerIndex, setPlayerIndex] = useState(0);
  const players = passengersList;

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    }, 10000); // Change player every 10 seconds

    return () => clearInterval(interval);
  }, [playerIndex]);

  return (
    <PlayProvider>
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
          <Lyrics props={lyrics} />
        </View>
      </View>
    </PlayProvider>
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
