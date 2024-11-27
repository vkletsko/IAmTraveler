import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

const bg = require("../assets/main_bg.png");
const add_photo = require("../assets/add_photo-icon.png");

const RegistrationScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.register_section}>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.inputGroup}>
            <TextInput style={styles.input} placeholder="Логін" />
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
            />
            <View style={styles.passwordFieldGroup}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Пароль"readOnly
                placeholderTextColor="#B0B0B0"
                secureTextEntry={!isPasswordVisible}
              />
              <Pressable
                style={styles.button}
                onPress={togglePasswordVisible}>
                <Text style={styles.textButton}>
                  {isPasswordVisible ? "Скрыть" : "Показати"}
                </Text>
              </Pressable>
            </View>
          </View>
          <Pressable onPress={onRegisterFunction} style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Зареєстуватися</Text>
          </Pressable>
          <Pressable onPress={onSignInFunction} style={styles.signInButton}>
            <Text style={styles.textButtonSignIn}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </View>
        <View style={styles.addPhotoRect}></View>
        <Image style={styles.addPhotoImg} source={add_photo}></Image>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  register_section: {
    backgroundColor: "rgb(255, 255, 255)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    height: 549,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  addPhotoRect: {
    width: 120,
    height: 120,
    zIndex: 2,
    position: "absolute",
    top: 170,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addPhotoImg: {
    width: 25,
    height: 25,
    zIndex: 2,
    position: "absolute",
    top: 250,
    left: 248,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: 0.3,
    paddingTop: 92,
    paddingBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#BDBDBD",
    fontSize: 16,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 27,
  },
  mainButton: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    flexDirection: "column",
    alignItems: "center",
  },
  mainButtonText: {
    color: "white",
  },
  textButton: {
    fontSize: 16,
    color: "#1B4371",
  },
  passwordFieldGroup: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
  },
  passwordInput: {
    color: '#BDBDBD',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal'
  },
  signInButton: {
    margin: 16,
  },
  textButtonSignIn: {
    color: '#1B4371',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});

const onRegisterFunction = () => {};
const onSignInFunction = () => {};

export default RegistrationScreen;
