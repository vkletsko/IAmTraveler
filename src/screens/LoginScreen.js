import { useState } from "react";
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

import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { loginDB } from "../db/auth";
import { useDispatch } from "react-redux";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(2, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const LoginScreen = ({ navigation, route }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const dispatch = useDispatch();

  const onFormSubmit = (values, actions) => {
    console.log("LoginScreen onFormSubmit: ", values);
    onSignIn(values);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSignIn = async (values) => {
    console.log("LoginScreen onSignIn: ", values);

    try {
      await loginDB(values, dispatch);
    } catch (error) {
      console.error("Error in loginDB:", error);
    }
  };

  const onSignUp = () => {
    navigation.navigate("Signup", {});
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
            initialValues={{ email: "", password: "" }}
            onSubmit={onFormSubmit}
            validationSchema={loginValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, isValid }) => (
              <View style={styles.formContainer}>
                <Text style={styles.title}>Увійти</Text>

                <View style={[styles.innerContainer, styles.inputContainer]}>
                  <Field
                    component={FormInput}
                    name="email"
                    autoFocus={true}
                    placeholder="Адреса електронної пошти"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <Field
                    component={FormInput}
                    name="password"
                    placeholder="Пароль"
                    rightButton={showButton}
                    outerStyles={styles.passwordButton}
                    autoCapitalize="none"
                    secureTextEntry={isPasswordVisible}
                  />
                </View>

                <View style={[styles.innerContainer, styles.buttonContainer]}>
                  <Button onPress={handleSubmit} disabled={!isValid}>
                    <Text style={[styles.baseText, styles.loginButtonText]}>
                      Увійти
                    </Text>
                  </Button>

                  <View style={styles.signUpContainer}>
                    <Text style={[styles.baseText, styles.passwordButtonText]}>
                      Немає акаунту?
                      <TouchableWithoutFeedback onPress={onSignUp}>
                        <Text style={styles.signUpText}> Зареєструватися</Text>
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

export default LoginScreen;

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
  formContainer: {
    width: SCREEN_WIDTH,
    height: "55%",
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
