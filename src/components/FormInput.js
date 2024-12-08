import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import { colors } from "../../styles/global";

const FormInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    outerStyles,
    rightButton,
    ...inputProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const hasError = errors[name] && touched[name];

  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <>
      <View style={[styles.input, isFocused && styles.focused, outerStyles]}>
        <TextInput
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          onFocus={onFocus}
          {...inputProps}
        />

        {rightButton}
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 16,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: colors.black_primary,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default FormInput;
