import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import RegistrationScreen from "../screens/RegistrationScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      {user ? (
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
