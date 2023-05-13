import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { useContext } from "react";

import Spacer from "../components/spacer";
import { PlayContext } from "../providers/PlayProvider";

export default function MusicPlayer(props) {
  const [sound, setSound] = React.useState();
  const playIcon = require("../../assets/playIcon.png");
  const stopIcon = require("../../assets/pauseIcon.png");
  const { isPlaying, setIsPlaying } = useContext(PlayContext);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(props.soundFile);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setIsPlaying(true);
  }

  const toggleSound = async () => {
    if (isPlaying) {
      console.log("Stopping Sound");
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
    } else {
      await playSound();
    }
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image source={props.albumPhoto} style={styles.albumPhoto} />
      <Spacer height={20} />
      <Text style={styles.title}>{props.songName}</Text>
      <Text style={styles.artist}>{props.songArtist}</Text>
      <Spacer height={5} />
      <TouchableOpacity style={styles.button} onPress={toggleSound}>
        <Image source={isPlaying ? stopIcon : playIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  playButton: {
    backgroundColor: "#db3e32",
    borderRadius: 30,
    padding: 20,
  },
  btnsCnt: {
    flexDirection: "row",
  },
  icon: {
    height: 50,
    width: 50,
  },

  albumPhoto: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },

  artist: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
});
