import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import BackBtn from "../components/BackBtn";
import LogoutButton from "../components/LogoutButton";

import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";
import PostsScreen from "../screens/PostsScreen";
import { logoutDB } from "../db/auth";
import { useDispatch } from "react-redux";

const Stack = createStackNavigator();

const PostsListNavigator = ({ parentNavigation }) => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      initialRouteName="PostsList"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: styles.headerRightIconsPadding,
        headerLeftContainerStyle: styles.headerLeftIconsPadding,
      })}
    >
      <Stack.Screen
        name="PostsList"
        component={PostsScreen}
        options={{
          gestureEnabled: false,
          title: "Публікації",
          headerRight: () => (
            <LogoutButton onPress={() => logoutDB(dispatch)} />
          ),
        }}
      />

      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={({ route, navigation }) => ({
          title: "Мапа",
          headerLeft: () => {
            const source = route.params?.source;
            return (
              <BackBtn
                onPress={() => {
                  navigation.goBack();
                }}
              />
            );
          },
        })}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Коментарі",
          tabBarVisible: true,
          headerLeft: () => {
            const source = route.params?.source;
            return (
              <BackBtn
                onPress={() => {
                  navigation.goBack();
                }}
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default PostsListNavigator;

const styles = StyleSheet.create({
  headerRightIconsPadding: {
    paddingRight: 16,
  },
  headerLeftIconsPadding: {
    paddingLeft: 16,
  },
});
