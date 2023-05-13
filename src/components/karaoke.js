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
import MusicPlayer from "../components/song";
import Lyrics from "../components/songscreen";
import { PlayProvider } from "../providers/PlayProvider";

export default function Karaoke({ navigation, route }) {
  const backBtn = require("../../assets/left-arrow.png");
  const { songName, artistName, songImage, passengersList, audioFile, lyrics } =
    route.params;
  console.log(audioFile);

  return (
    <PlayProvider>
      <View style={styles.container} supportedOrientations={["landscape"]}>
        <StatusBar style="auto" />
        {/* <View style={{height:"40%"}}> */}
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
        {/* </View> */}
        <View style={{ width: "60%", height: "100%" }}>
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
