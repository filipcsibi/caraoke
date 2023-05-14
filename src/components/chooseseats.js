import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { KeyboardAvoidingView } from "react-native";

export const ChooseSeatsScreen = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);
  const [visible4, setVisible4] = useState(true);
  const [snr, setSnr] = useState(0);
  const { songName, artistName, songImage, audioFile, lyrics } = route.params;

  const [selectedSeat, setSelectedSeat] = useState(0);
  const [passengerName, setPassengerName] = useState("");
  const [passengersList, setPassengersList] = useState(["", "", "", ""]);

  const toggleModal = (props) => {
    setModalVisible(!isModalVisible);
    setSnr(props);
  };

  const handleSeatPress = (seatNumber) => {
    setSelectedSeat(seatNumber);
    toggleModal(seatNumber);
  };

  const handleNameChange = (text) => {
    setPassengersList((prevList) => {
      const updatedList = [...prevList];
      updatedList[selectedSeat - 1] = text;
      return updatedList;
    });
  };
  const handleVisible = (props) => {
    if (passengersList[props - 1] !== "") {
      if (props === 1) setVisible(false);
      if (props === 2) setVisible2(false);
      if (props === 3) setVisible3(false);
      if (props === 4) setVisible4(false);
    }
  };

  const handleSubmit = (props) => {
    // Handle the submitted passenger name
    console.log(
      "Passenger ",
      selectedSeat,
      " name:",
      passengersList[selectedSeat - 1]
    );

    // Close the modal and clear the selected seat and passenger name
    setSelectedSeat(0);
    setPassengerName(passengersList[selectedSeat - 1]);
    handleVisible(props);
    toggleModal(props);
  };
  const masinaTop = require("../../assets/1.png");
  const masinaBot = require("../../assets/2.png");

  const handleStart = (props) => {
    if (
      passengersList[0] !== "" ||
      passengersList[1] !== "" ||
      passengersList[2] !== "" ||
      passengersList[3] !== ""
    ) {
      navigation.navigate("songscreen", {
        songName: songName,
        artistName: artistName,
        songImage: songImage,
        audioFile: audioFile,
        passengersList: passengersList,
        lyrics: lyrics,
      });
    } else Alert.alert("Please fill at least one seat!");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Animatable.View animation="fadeIn" duration={3000}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 65,
            height: 50,
            marginTop: 10,
            marginLeft: 15,
          }}
        >
          <Image style={{width: 50, height: 50, margin: 10}} source={require("../../assets/left-arrow.png")} />
        </TouchableOpacity>
      </Animatable.View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "40%",
            width: "35%",
            left: -40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animatable.Image
            animation={{
              from: { translateX: 1000 },
              to: { translateX: 0 },
            }}
            source={masinaTop}
            style={styles.carSeatsImage}
          />
          <Animatable.Image
            animation={{
              from: { translateX: 1000 },
              to: { translateX: 0 },
            }}
            source={masinaBot}
            style={styles.carSeatsImage}
          />
        </View>
        <View
          style={{
            height: "40%",
            width: "35%",
            left: -50,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animatable.Image
            animation={{
              from: { translateX: 1000 },
              to: { translateX: 0 },
            }}
            source={masinaTop}
            style={styles.carSeatsImage}
          />
          <Animatable.Image
            animation={{
              from: { translateX: 1000 },
              to: { translateX: 0 },
            }}
            source={masinaBot}
            style={styles.carSeatsImage}
          />
        </View>
      </View>
      {visible ? (
        <Animatable.View
          style={styles.seatButton1}
          animation="fadeIn"
          duration={800}
          delay={700}
        >
          <TouchableOpacity
            onPress={() => handleSeatPress(1)}
            style={{ width: 160, height: 100 }}
          >
            <Image
              source={require("../../assets/plus.png")}
              style={styles.addPerson}
            />
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Text style={styles.textButton1}>{passengersList[0]}</Text>
      )}

      {visible2 ? (
        <Animatable.View
          style={styles.seatButton2}
          animation="fadeIn"
          duration={800}
          delay={700}
        >
          <TouchableOpacity
            onPress={() => handleSeatPress(2)}
            style={{ width: 160, height: 120 }}
          >
            <Image
              source={require("../../assets/plus.png")}
              style={styles.addPerson}
            />
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Text style={styles.textButton2}>{passengersList[1]}</Text>
      )}

      {visible3 ? (
        <Animatable.View
          style={styles.seatButton3}
          animation="fadeIn"
          duration={800}
          delay={700}
        >
          <TouchableOpacity
            onPress={() => handleSeatPress(3)}
            style={{ width: 160, height: 120 }}
          >
            <Image
              source={require("../../assets/plus.png")}
              style={styles.addPerson}
            />
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Text style={styles.textButton3}>{passengersList[2]}</Text>
      )}

      {visible4 ? (
        <Animatable.View
          style={styles.seatButton4}
          animation="fadeIn"
          duration={800}
          delay={700}
        >
          <TouchableOpacity
            onPress={() => handleSeatPress(4)}
            style={{ width: 160, height: 120 }}
          >
            <Image
              source={require("../../assets/plus.png")}
              style={styles.addPerson}
            />
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Text style={styles.textButton4}>{passengersList[3]}</Text>
      )}
      <View
        style={{
          backgroundColor: "white",
          height: 70,
          width: 100,
          right: 50,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: 30,
          position: "absolute",
        }}
      >
        <Animatable.View animation={"fadeIn"} duration={4000}>
          <TouchableOpacity onPress={handleStart} style={{ opacity: 0.7 }}>
            <Text
              style={{
                color: "black",
                fontSize: 50,
                fontWeight: "bold",
              }}
            >
              Sing!
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Modal for inputting passenger name */}
      <Modal visible={isModalVisible} animationType="slide" supportedOrientations={["landscape"]}>
        <View style={modalStyles.modalContainer}>

          <Animatable.View animation="fadeIn" duration={2000} style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
            <TextInput
              style={modalStyles.input}
              onChangeText={(text) => handleNameChange(text)} // Pass the text value
              value={passengersList[selectedSeat - 1]} // Use the passenger name from the list
              placeholder="Passenger name..."
              placeholderTextColor={"gray"}
            />
          </Animatable.View>

          <Animatable.View style={{ flexDirection: "row", alignItems: "center", gap: 50 }} animation="fadeInUp" duration={2000}>
            <TouchableOpacity style={modalStyles.submitButton} onPress={() => handleSubmit(snr)}>
              <Text style={modalStyles.submitButtonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.cancelButton} onPress={() => toggleModal(false)}>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </Animatable.View>

        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 80,
    width: "60%",
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: "#2C2C2C",
    fontSize: 45,
    marginBottom: 50,
  },
  submitButton: {
    width: "30%",
    backgroundColor: "#1A1A1A",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 45,
  },
  cancelButton: {
    width: "30%",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2C2C2C",
    elevation: 3,
  },
  cancelButtonText: {
    color: "#2C2C2C",
    fontWeight: "bold",
    fontSize: 45,
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  carSeatsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  borderedText: {
    borderWidth: 12,
    borderColor: "black",
    padding: 10,
  },

  textButton1: {
    fontWeight: "bold",
    position: "absolute",
    color: "white",
    fontSize: 60,
    top: "62%",
    opacity: 0.7,
    left: "25%",
  },

  textButton2: {
    fontWeight: "bold",
    position: "absolute",
    color: "white",
    opacity: 0.7,
    fontSize: 60,
    top: "19%",
    left: "24%",
  },

  textButton3: {
    fontWeight: "bold",
    position: "absolute",
    color: "white",
    fontSize: 60,
    opacity: 0.7,
    top: "19%",
    left: "55%",
  },

  textButton4: {
    fontWeight: "bold",
    position: "absolute",
    color: "white",
    fontSize: 60,
    opacity: 0.7,
    top: "62%",
    left: "55%",
  },

  addPerson: {
    position: "absolute",
    borderRadius: 30,
    width: 80,
    height: 80,
    resizeMode: "contain",
    opacity: 0.8,
  },

  seatButton1: {
    position: "absolute",
    width: 100,
    height: 100,
    opacity: 0.5,
    bottom: "15%",
    left: "28.5%",
  },

  seatButton2: {
    position: "absolute",
    width: 65,
    height: 65,
    opacity: 0.5,
    top: "19%",
    left: "28.5%",
  },

  seatButton3: {
    position: "absolute",
    width: 65,
    height: 65,
    opacity: 0.5,
    top: "19%",
    right: "33.5%",
  },

  seatButton4: {
    position: "absolute",
    width: 65,
    height: 65,
    bottom: "23%",
    right: "33.5%",
  },
});
