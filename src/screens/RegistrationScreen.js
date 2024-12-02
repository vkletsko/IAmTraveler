import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { colors } from "../../styles/global";

import CustomInput from "../components/CustomInput";
import Button from "../components/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const loginValidationSchema = yup.object().shape({
  login: yup
    .string()
    .min(4, ({ min }) => `Login must be at least ${min} characters`)
    .required("Login is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(2, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const RegistrationScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const onFormSubmit = (values, actions) => {
    console.log("RegistrationScreen onFormSubmit: ", values);
    onSignUp(values);

    actions.resetForm();
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSignUp = () => {
    console.log("signUp");
  };

  const onSignIn = () => {
    console.log("signIn");
    navigation.navigate("Signin", {});
  };

  const showButton = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>Показати</Text>
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <>
        <Image
          source={require("../../assets/img/main_bg.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Formik
            initialValues={{ login: "", email: "", password: "" }}
            onSubmit={onFormSubmit}
            validationSchema={loginValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, isValid }) => (
              <View style={styles.formContainer}>
                <View style={styles.addPhotoRect}></View>
                <Image
                  style={styles.addPhotoImg}
                  source={require("../../assets/img/add_photo-icon.png")}
                ></Image>
                <Text style={styles.title}>Реєстрація</Text>

                <View style={[styles.innerContainer, styles.inputContainer]}>
                  <Field
                    component={CustomInput}
                    name="login"
                    autoFocus={true}
                    placeholder="Логін"
                    // onBlur={handleBlur('login')}
                    // onTextChange={handleChange('login')}
                  />

                  <Field
                    component={CustomInput}
                    name="email"
                    placeholder="Адреса електронної пошти"
                    // onBlur={handleBlur('email')}
                    // onTextChange={handleChange('email')}
                    keyboardType="email-address"
                  />

                  <Field
                    component={CustomInput}
                    name="password"
                    placeholder="Пароль"
                    // onBlur={handleBlur('password')}
                    // onTextChange={handleChange('password')}
                    rightButton={showButton}
                    outerStyles={styles.passwordButton}
                    secureTextEntry={isPasswordVisible}
                  />
                </View>

                <View style={[styles.innerContainer, styles.buttonContainer]}>
                  <Button onPress={handleSubmit} disabled={!isValid}>
                    <Text style={[styles.baseText, styles.loginButtonText]}>
                      Зареєстуватися
                    </Text>
                  </Button>

                  <View style={styles.signUpContainer}>
                    <Text style={[styles.baseText, styles.passwordButtonText]}>
                      Вже є акаунт?
                      <TouchableWithoutFeedback onPress={onSignIn}>
                        <Text style={styles.signUpText}> Увійти</Text>
                      </TouchableWithoutFeedback>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </>
    </Pressable>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
    zIndex: 1,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  addPhotoRect: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: SCREEN_WIDTH / 2 - 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginBottom: 0,
  },
  addPhotoImg: {
    width: 25,
    height: 25,
    zIndex: 2,
    position: "absolute",
    top: 20,
    left: 248,
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "65%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
    marginTop: 50,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
  },
});
