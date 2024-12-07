import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  FlatList,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import ArrowUpIconSvg from "../../icons/ArrowUpIconSvg";

import { colors } from "../../styles/global";

const CommentsScreen = (props) => {
  const item = props.route.params.item;
  const [userComment, setUserComment] = useState("");

  const handleSendComment = () => {
    if (!userComment) return;
    props.navigation.navigate("PostsList", { userComment });
    setUserComment("");
  };

  const sendComment = (
    <TouchableOpacity
      onPress={handleSendComment}
      style={{ position: "absolute", top: 8, right: 16 }}
    >
      <TouchableOpacity
        onPress={handleSendComment}
        style={{
          borderRadius: 100,
          backgroundColor: "#FF6C00",
          width: 34,
          height: 34,
        }}
      >
        <ArrowUpIconSvg />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const avatar_photo = require("../../assets/img/china-6796350_1280.jpg");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image style={styles.commentedImage} source={{ uri: item.imgUrl }} />
        <FlatList
          style={styles.list}
          data={item.comments || []}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.commentsWrapper,
                index % 2 === 0 ? styles.commentEven : styles.commentOdd,
              ]}
            >
              {index % 2 === 0 && (
                <View style={styles.commentAvatarContainer}>
                  <Image
                    style={styles.commentAvatar}
                    source={{ uri: item?.user.avatar }}
                  />
                </View>
              )}
              <View style={styles.commentContainer}>
                <Text style={styles.text}>{item?.text}</Text>
                <Text style={styles.dateTime}>{item?.dateTime}</Text>
              </View>
              {index % 2 !== 0 && (
                <View style={styles.commentAvatarContainer}>
                  <Image
                    style={styles.commentAvatar}
                    source={{ uri: item?.user.avatar }}
                  />
                </View>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={userComment}
          placeholder="Коментувати..."
          onChangeText={setUserComment}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
          <ArrowUpIconSvg />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    flexDirection: "column",
    justifyContent: "space-between",
  },
  commentedImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderColor: colors.border_gray,
    color: colors.black_primary,
    fontSize: 16,
  },
  inputWrapper: {
    borderRadius: 20,
    position: "relative",
    marginBottom: 32,
    backgroundColor: colors.light_gray,
    borderWidth: 1,
    borderColor: colors.border_gray,
    marginHorizontal: 16,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  commentBox: {
    flex: 1,
    gap: 16,
    flexDirection: "row",
    marginBottom: 24,
  },
  commentTextBlock: {
    padding: 16,
    borderLeftRadius: 6,
    backgroundColor: colors.light_gray,
  },
  commentAvatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: colors.light_gray,
  },
  commentContainer: {
    flex: 1,
    flexShrink: 1,
    padding: 16,
    gap: 8,
    borderRadius: 8,
    backgroundColor: colors.light_gray,
    marginBottom: 24,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  dateTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: colors.text_gray,
  },
  commentsWrapper: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentEven: {
    flexDirection: "row",
  },
  commentOdd: {
    flexDirection: "row",
  },
  sendButton: {
    position: "absolute",
    right: 16,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
