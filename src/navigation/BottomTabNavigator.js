import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "../../styles/global";

import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostNavigator from "../navigation/CreatePostNavigator";
import LogoutButton from "../components/LogoutButton";

import ProfileIconSvg from "../../icons/ProfileIconSvg";
import GridIconSvg from "../../icons/GridIconSvg";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={({ navigation }) => ({
        tabBarLabel: "",
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          tabBarIcon: ({ focused }) => (
            <GridIconSvg size={24} color={focused ? colors.orange : "black"} />
          ),
          headerRight: () => (
            <LogoutButton onPress={() => console.log("log out")} />
          ),
          headerLeftContainerStyle: styles.headerLeftIconsPadding,
          headerRightContainerStyle: styles.headerRightIconsPadding,
        })}
      />

      <Tab.Screen
        name="CreatePosts"
        component={CreatePostNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
          // headerLeft: () => <BackBtn onPress={() => navigation.goBack()} />,
          // headerLeftContainerStyle: styles.headerLeftIconsPadding,
          // headerRightContainerStyle: styles.headerRightIconsPadding,
          tabBarIcon: ({ focused }) => (
            <View style={styles.addButton}>
              <Ionicons name="add" size={24} color={colors.white} />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: () => (
            <LogoutButton onPress={() => console.log("log out")} />
          ),
          tabBarIcon: ({ focused }) => (
            <ProfileIconSvg
              size={24}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    display: "flex",
    paddingTop: 16,
  },
  addButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightIconsPadding: {
    paddingRight: 16,
  },
  headerLeftIconsPadding: {
    paddingLeft: 16,
  },
});

export default BottomTabNavigator;
