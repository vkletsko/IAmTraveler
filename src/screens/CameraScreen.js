import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";

const CameraScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          )}

          <TouchableOpacity onPress={onTakePicture} style={styles.photoIcon}>
            <PhotoIconSvg />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
