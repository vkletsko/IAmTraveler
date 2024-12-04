import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import RegistrationScreen from "../screens/RegistrationScreen";
import MapScreen from "../screens/MapScreen";
import BackBtn from "../components/BackBtn";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const isLoggedIn = true;

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      {isLoggedIn ? (
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={LoginScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Signup" component={RegistrationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
