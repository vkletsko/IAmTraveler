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
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/global";
import LocationIconSvg from "../../icons/LocationIconSvg";
import PhotoIconSvg from "../../icons/PhotoIconSvg";

import Button from "../components/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CreatePostsScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const onClearData = () => {
    setSelectedImage("");
    setTitle("");
    setLocation("");
  };

  const navigateToCameraScreen = () => {
    console.log("navigateToCameraScreen");
  };

  const handleInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  onUploadPhoto = () => {};

  onPublishPhoto = () => {};

  const isButtonDisabled = !(title.trim() && location.trim());

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.photoBlock}>
              <TouchableOpacity
                onPress={navigateToCameraScreen}
                style={styles.photoIcon}
              >
                <PhotoIconSvg />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onUploadPhoto}>
              <Text style={styles.upload}>Завантажте фото</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(value) => handleInputChange("title", value)}
              placeholder="Назва..."
              placeholderTextColor={colors.text_gray}
              keyboardType="default"
              autoCapitalize="none"
            />
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.location]}
                value={location}
                onChangeText={(value) => handleInputChange("location", value)}
                placeholder="Місцевість..."
                placeholderTextColor={colors.text_gray}
                keyboardType="default"
                autoCapitalize="none"
                editable={false}
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
            <Button buttonStyle={styles.deleteBtn} onPress={onClearData}>
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
});

export default CreatePostsScreen;
