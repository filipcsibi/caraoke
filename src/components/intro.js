import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import lyricsData from "../data/lyrics.json";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.searchBar}>
      <Image
        source={require("../../assets/searchBarIcon.png")}
        style={styles.searchBarImage}
      />
      <TextInput
        style={styles.searchBarTextInput}
        placeholder="Search..."
        placeholderTextColor="#000"
        keyboardType="default"
        returnKeyType="search"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
    </View>
  );
};

export function IntroScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const songs = [
    {
      songName: "Shape of You",
      artistName: "Edd Sherran",
      songImage: require("../../assets/shape_of_you_cover.png"),
      audioFile: require("../../assets/shapeOfYou.mp3"),
      lyrics: lyricsData.songs[0].lyrics,
      beginningDuration: 10000,
    },
    {
      songName: "Nebun de Alb",
      artistName: "Emeric Imre",
      songImage: require("../../assets/nebun_de_alb_img.jpg"),
      audioFile: require("../../assets/nebun.mp3"),
      lyrics: lyricsData.songs[1].lyrics,
    },
    {
      songName: "Master of Puppets",
      artistName: "Metallica",
      songImage: require("../../assets/master_of_puppets_img.jpg"),
      audioFile: require("../../assets/masterofpuppets.mp3"),
      lyrics: lyricsData.songs[2].lyrics,
    },
    {
      songName: "As it was",
      artistName: "Harry Styles",
      songImage: require("../../assets/harry_styles_img.jpg"),
      audioFile: require("../../assets/asitwas.mp3"),
      lyrics: lyricsData.songs[3].lyrics,
    },
    {
      songName: "Come as you are",
      artistName: "Nirvana",
      songImage: require("../../assets/come_as_you_are_img.jpg"),
      audioFile: require("../../assets/comeas.mp3"),
      lyrics: lyricsData.songs[4].lyrics,
    },
  ];

  const filteredSongs = songs.filter((song) =>
    song.songName.toLowerCase().includes(searchText.toLowerCase())
  );

  const SongCard = ({
    songName,
    artistName,
    songImage,
    audioFile,
    lyrics,
    onPress,
  }) => {
    return (
      <TouchableOpacity style={styles.songCard} onPress={onPress}>
        <Image source={songImage} style={styles.songCover} />
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 10 }}>
            {songName}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "200", marginLeft: 10 }}>
            {artistName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  console.log(filteredSongs[1].audioFile);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        style={{ width: "90%", marginTop: 20 }}
        containerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        data={filteredSongs}
        renderItem={({ item }) => (
          <SongCard
            songName={item.songName}
            artistName={item.artistName}
            songImage={item.songImage}
            onPress={() =>
              navigation.navigate("choosescreen", {
                songName: item.songName,
                artistName: item.artistName,
                songImage: item.songImage,
                audioFile: item.audioFile,
                lyrics: item.lyrics,
              })
            }
          />
        )}
        keyExtractor={(item) => item.songName}
      />
    </SafeAreaView>
  );
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgray",
  },

  searchBar: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  searchBarImage: {
    left: 10,
    width: 30,
    height: 30,
  },

  searchBarTextInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "200",
    paddingLeft: 30,
  },

  songCard: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },

  songCover: {
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default IntroScreen;
