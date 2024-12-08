import React, { useState } from "react";
import Constants from "expo-constants";
import {
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import uuid from "react-native-uuid";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/global";
import * as Location from "expo-location";

import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from "expo-image-picker";

import { useSelector } from "react-redux";
import { addPost, getImageUrl, uploadImage } from "../db/firestore";

import LocationIconSvg from "../../icons/LocationIconSvg";
import Button from "../components/Button";
import Input from "../components/Input";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const PLACES_KEY = "AIzaSyAuHImUJQLfuIjzhq7iDYbe5Rw1Bs09SM0";

const CreatePostsScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    title: "",
    location: "",
  });
  const [cameraViewActivated, setCameraViewActivated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const user = useSelector((state) => state.user.userInfo);

  const onInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onTakePicture = async () => {
    if (!cameraViewActivated) {
      setCameraViewActivated(true);
    }

    console.log("camera taking a picture1: ", camera.current);
    if (camera.current && cameraViewActivated) {
      console.log("camera taking a picture: ", camera.current);
      const picture = await camera.current.takePictureAsync();
      if (picture?.uri) {
        setSelectedImage(picture.uri);
        setCameraViewActivated(false);
        await MediaLibrary.createAssetAsync(picture.uri);
      }
    } else {
      console.log("camera not activated");
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setSelectedImage(uri);

      const response = await fetch(uri);
      const file = await response.blob();
      const fileName = uri.split("/").pop(); // Отримуємо ім'я файлу з URI

      const fileType = file.type; // Отримуємо тип файлу
      const imageFile = new File([file], fileName, { type: fileType });

      const uploadedImage = await uploadImage(user.uid, imageFile, fileName);
      setUploadedImage(uploadedImage);
    }
  };

  const onPublishPost = async () => {
    if (isButtonDisabled) {
      alert("Please fill in all fields.");
      return;
    }

    let currentLocation = null;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      currentLocation = location;
    })();

    const post = {
      id: uuid.v4(),
      imgUrl: uploadedImage,
      title: inputs.title,
      comments: [],
      likes: 0,
      locationTitle: inputs.location,
      geoLocation: currentLocation,
    };

    if (!user) return;

    try {
      await addPost(user?.uid, { ...post });
    } catch (error) {
      console.error("Error adding post:", error);
    }

    navigation.navigate("PostsListNavigator", { post });
    onCleanUp();
  };

  const onCleanUp = () => {
    setInputs({ title: "", location: "" });
    setSelectedImage("");
    setUploadedImage("");
    setCameraViewActivated(false);
  };

  const isButtonDisabled = !(inputs.title.trim() && inputs.location.trim());

  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionsText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <>
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            {cameraViewActivated ? (
              <CameraView style={styles.emptyImgContainer} facing={facing}>
                {selectedImage && (
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                )}

                <TouchableOpacity
                  style={styles.cameraIconWrapper}
                  onPress={onTakePicture}
                  hitSlop={20}
                >
                  <Ionicons name="camera" size={34} color="gray" />
                </TouchableOpacity>
              </CameraView>
            ) : (
              <View style={styles.emptyImgContainer} facing={facing}>
                {selectedImage && (
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                )}

                <TouchableOpacity
                  style={styles.cameraIconWrapper}
                  onPress={onTakePicture}
                  hitSlop={20}
                >
                  <Ionicons name="camera" size={34} color="gray" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={pickImage}>
              <Text style={[styles.btnText, styles.grayText]}>
                Завантажте фото
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Input
              name="title"
              value={inputs.title}
              placeholder="Назва..."
              outerStyles={styles.input}
              onTextChange={(value) => onInputChange("title", value)}
            />

            <View style={styles.locationInputWrapper}>
              {/* <GooglePlacesAutocomplete
                placeholder="Місцевість..."
                minLength={4}
                enablePoweredByContainer={false}
                fetchDetails
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log("google autocompl: ", data, details);
                  onInputChange("location", data.description);
                }}
                onFail={(error) => console.error(error)}
                query={{
                  key: {Constants.expoConfig.googlePlacesKey},
                  language: "en", // language of the results
                }}
                styles={{
                  container: {
                    flex: 1,
                  },
                  textInputContainer: {
                    flexDirection: "row",
                    paddingHorizontal: 8,
                    // paddingLeft: 28,
                  },
                  textInput: {
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    fontSize: 15,
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.border_gray,
                  },
                  row: {
                    backgroundColor: "#FFFFFF",
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                  listView: {
                    maxHeight: 160,
                  },
                }}
              /> */}
              <TextInput
                style={styles.locationInput}
                value={inputs.location}
                onChangeText={(value) => onInputChange("location", value)}
                placeholder="Місцевість..."
                placeholderTextColor={colors.text_gray}
                keyboardType="default"
                autoCapitalize="none"
              />
              <LocationIconSvg style={styles.locationIcon} />
            </View>
          </View>

          <Button onPress={onPublishPost}>
            <Text style={styles.btnText}>Опублікувати</Text>
          </Button>

          <Button buttonStyle={styles.deleteBtn} onPress={onCleanUp}>
            <Ionicons name="trash" color={colors.text_gray} size={24} />
          </Button>
        </View>
      </>
    </Pressable>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "400",
    color: colors.white,
    textAlign: "center",
  },
  grayText: {
    textAlign: "left",
    color: colors.text_gray,
  },
  imageContainer: {
    gap: 8,
  },
  emptyImgContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: colors.white,
  },
  deleteBtn: {
    position: "absolute",
    left: "46%",
    bottom: "14%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_gray,
  },
  locationInputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 32,
  },
  locationInput: {
    paddingLeft: 28,
    height: 50,
    borderBottomWidth: 1,
    padding: 16,
    paddingHorizontal: 0,
    borderColor: colors.border_gray,
    color: colors.black_primary,
    fontSize: 16,
    marginBottom: 16,
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
});
