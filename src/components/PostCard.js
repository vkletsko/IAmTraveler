import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CommentIconSvg from "../../icons/CommentIconSvg";
import LocationIconSvg from "../../icons/LocationIconSvg";
import LikeIconSvg from "../../icons/LikeIconSvg";
import { colors } from "../../styles/global";

const PostCard = ({
  item,
  onCommentsNavigate,
  onMapNavigate,
  isProfileView = false,
}) => {
  return (
    <View style={styles.card}>
      <Image source={item.imgUrl} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.desc}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            onCommentsNavigate(item, isProfileView ? "Profile" : "Post")
          }
        >
          <CommentIconSvg isProfileView={isProfileView} />
          <Text style={styles.comments}>{item.comments}</Text>
          {isProfileView && (
            <>
              <LikeIconSvg />
              <Text style={styles.comments}>{likes}</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            onMapNavigate(item, isProfileView ? "Profile" : "Posts")
          }
        >
          <LocationIconSvg />
          <Text style={styles.location}>{item.locationTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 24,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    color: colors.black_primary,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
    margin: 8,
  },
  location: {
    color: colors.black_primary,
    fontFamily: "Roboto",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationSkipInk: "none",
    textDecorationThickness: "auto",
    textUnderlineOffset: "auto",
    textUnderlinePosition: "from-font",
    marginHorizontal: 8,
  },
  likes: {
    fontSize: 14,
    color: colors.text_gray,
    marginHorizontal: 8,
    marginBottom: 4,
  },
  comments: {
    color: colors.text_gray,
    fontFamily: "Roboto",
    fontSize: 16,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  desc: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PostCard;
