import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  Text,
  TextInput,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import uuid from "react-native-uuid";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/global";
import LocationIconSvg from "../../icons/LocationIconSvg";
import PhotoIconSvg from "../../icons/PhotoIconSvg";

import Button from "../components/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CreatePostsScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    title: "",
    location: "",
  });

  const [photoUrl, setPhotoUrl] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);

  const onInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onTakePicture = async () => {
    if (camera.current) {
      const picture = await camera.current.takePictureAsync();
      if (picture?.uri) {
        setPhotoUrl(picture.uri);
        await MediaLibrary.createAssetAsync(picture.uri);
      }
    }
  };

  const onUploadPhoto = () => {};

  const onPublishPhoto = () => {
    if (isButtonDisabled) {
      alert("Please fill in all fields.");
      return;
    }
    const post = {
      id: uuid.v4(),
      photo: photoUrl,
      title: inputs.title,
      comments: [],
      likes: 0,
      locationTitle: inputs.location,
      geoLocationCoords: {},
    };

    navigation.navigate("PostsListNavigator", { post });
    setInputs({ title: "", location: "" });
    setPhotoUrl("");
  };

  const onCleanUp = () => {
    setInputs({ title: "", location: "" });
    setPhotoUrl("");
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
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.photoBlock}>
              <CameraView style={styles.camera} facing={facing}>
                <View>
                  <TouchableOpacity
                    onPress={onTakePicture}
                    style={styles.photoIcon}
                  >
                    <PhotoIconSvg />
                  </TouchableOpacity>
                </View>
              </CameraView>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Ionicons name="refresh" color={colors.text_gray} size={24} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onUploadPhoto}>
              <Text style={styles.upload}>Завантажте фото</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={inputs.title}
              onChangeText={(value) => onInputChange("title", value)}
              placeholder="Назва..."
              placeholderTextColor={colors.text_gray}
              keyboardType="default"
              autoCapitalize="none"
            />
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.location]}
                value={inputs.location}
                onChangeText={(value) => onInputChange("location", value)}
                placeholder="Місцевість..."
                placeholderTextColor={colors.text_gray}
                keyboardType="default"
                autoCapitalize="none"
              />
              <LocationIconSvg style={styles.icon} />
            </View>
            <Pressable
              onPress={onPublishPhoto}
              style={[
                styles.activeSubmitButton,
                isButtonDisabled && styles.submitButton,
              ]}
            >
              <Text
                style={[
                  styles.activeSubmitButtonText,
                  isButtonDisabled && styles.submitButtonText,
                ]}
              >
                {" "}
                Опубліковати
              </Text>
            </Pressable>
            <Button buttonStyle={styles.deleteBtn} onPress={onCleanUp}>
              <Ionicons name="trash" color={colors.text_gray} size={24} />
            </Button>
          </View>
        </SafeAreaView>
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  photoBlock: {
    height: 240,
    flexShrink: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  photoIcon: {
    padding: 18,
    backgroundColor: "white",
    borderRadius: 50,
    width: 60,
  },
  upload: {
    color: colors.text_gray,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    padding: 16,
    paddingHorizontal: 0,
    borderColor: colors.border_gray,
    color: colors.black_primary,
    fontSize: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 32,
  },
  location: {
    paddingLeft: 28,
  },
  icon: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  submitButtonText: {
    color: colors.text_gray,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  activeSubmitButtonText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: colors.light_gray,
  },
  activeSubmitButton: {
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: colors.orange,
    color: colors.white,
  },
  deleteBtn: {
    position: "absolute",
    left: SCREEN_WIDTH / 2 - 50,
    top: "99%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_gray,
  },
  button: {
    right: 10,
    bottom: 10,
    position: "absolute",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  camera: {
    // flex: 1,
    // borderRadius: 8,
    // overflow: "hidden",
  },
  permissionsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
});

export default CreatePostsScreen;
