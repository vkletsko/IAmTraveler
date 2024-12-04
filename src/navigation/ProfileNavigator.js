import { createStackNavigator } from "@react-navigation/stack";

import BackBtn from "../components/BackBtn";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import CameraScreen from "../screens/CameraScreen";
import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";

const Stack = createStackNavigator();

const ProfileNavigator = ({ parentNavigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerLeft: () => <BackBtn onPress={() => parentNavigation.goBack()} />,
      })}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          gestureEnabled: false,
          title: "Профіль",
        }}
      />

      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={({ route, navigation }) => ({
          title: "Мапа",
          headerLeftContainerStyle: styles.headerLeftIconsPadding,
          headerRightContainerStyle: styles.headerRightIconsPadding,
          headerLeft: () => {
            const source = route.params?.source;
            return (
              <BackBtn
                onPress={() => {
                  if (source === "Profile") {
                    navigation.navigate("Profile");
                  } else {
                    navigation.navigate("Posts");
                  }
                }}
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
