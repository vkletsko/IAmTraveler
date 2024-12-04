import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "../../styles/global";

import CreatePostNavigator from "../navigation/CreatePostNavigator";
import PostsListNavigator from "../navigation/PostsListNavigator";

import LogoutButton from "../components/LogoutButton";

import ProfileIconSvg from "../../icons/ProfileIconSvg";
import GridIconSvg from "../../icons/GridIconSvg";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ parentNavigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="PostsListNavigator"
      screenOptions={() => ({
        tabBarLabel: "",
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="PostsListNavigator"
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <GridIconSvg size={24} color={focused ? colors.orange : "black"} />
          ),
        })}
      >
        {(props) => (
          <PostsListNavigator {...props} parentNavigation={parentNavigation} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="CreatePosts"
        options={() => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={styles.addButton}>
              <Ionicons name="add" size={24} color={colors.white} />
            </View>
          ),
        })}
      >
        {(props) => <CreatePostNavigator parentNavigation={props.navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={({ navigation }) => ({
          title: "Профіль",
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
      >
        {(props) => <ProfileNavigator parentNavigation={props.navigation} />}
      </Tab.Screen>
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
