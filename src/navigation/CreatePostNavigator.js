import { createStackNavigator } from "@react-navigation/stack";

import BackBtn from "../components/BackBtn";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import CameraScreen from "../screens/CameraScreen";

const Stack = createStackNavigator();

const CreatePostNavigator = ({ parentNavigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="CreatePost"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerLeft: () => <BackBtn onPress={() => parentNavigation.goBack()} />,
      })}
    >
      <Stack.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          gestureEnabled: false,
          title: "Створити Публікацію",
        }}
      />

      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default CreatePostNavigator;
