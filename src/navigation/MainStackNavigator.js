import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import RegistrationScreen from "../screens/RegistrationScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const isLoggedIn = true;

  return (
    <Stack.Navigator
      // initialRouteName=""
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        // Якщо користувач залогінений, показуємо головний екран
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      ) : (
        // Якщо користувач не залогінений, показуємо екрани Login та Signup
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
