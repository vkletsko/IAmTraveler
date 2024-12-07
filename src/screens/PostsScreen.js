import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";

import PostCard from "../components/PostCard";
import { posts } from "../../data/postsMock.js";

const PostsScreen = ({ navigation, route }) => {
  const avatar_photo = require("../../assets/img/avatar.jpeg");

  const navigateToComments = (item) => {
    navigation.navigate("Comments", { item, source: "Posts" });
  };

  const navigateToMap = (item) => {
    // console.log("parentNavigation", parentNavigation);
    navigation.navigate("Map", { item, source: "Posts" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={avatar_photo} />
          <View style={styles.user}>
            <Text style={styles.userName}>Юлія Букавель</Text>
            <Text style={styles.userEmail}>email@icloud.com</Text>
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({ item }) => (
            <PostCard
              item={item}
              onCommentsNavigate={() => navigateToComments(item, "Posts")}
              onMapNavigate={() => navigateToMap(item)}
            />
          )}
        />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  user: {
    marginLeft: 16,
  },
  userName: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "bold",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
  },
  list: {
    flex: 1,
  },
  navigator: {
    flex: 0.1,
    marginBottom: 34,
  },
});

export default PostsScreen;
