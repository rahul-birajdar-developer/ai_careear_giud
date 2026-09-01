import React from "react";
import {
    createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
// import LearningRoadmap from "../screens/LearningRoadmap";
import ToolScreen from "../screens/userScreens/ToolsScreen";
import ProfileScreen from "../screens/userScreens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor: "#A855F7",
                tabBarInactiveTintColor: "#9CA3AF",

                tabBarStyle: {
                    height: 70,
                    paddingTop: 8,
                    paddingBottom: 15,
                    backgroundColor: "#05052B",
                    borderTopWidth: 1,
                    borderTopColor: "#20205A",
                    marginBottom: 10
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },

                tabBarIcon: ({ focused, color, size }) => {

                    let icon;

                    switch (route.name) {

                        case "Home":
                            icon = focused
                                ? "home"
                                : "home-outline";
                            break;

                        case "Learn":
                            icon = focused
                                ? "book"
                                : "book-outline";
                            break;

                        case "Tools":
                            icon = focused
                                ? "sparkles-outline"
                                : "sparkles";
                            break;

                        case "Profile":
                            icon = focused
                                ? "person"
                                : "person-outline";
                            break;

                        default:
                            icon = "help-outline";
                            break;
                    }

                    return (
                        <Ionicons
                            name={icon}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            {/* <Tab.Screen
                name="Learn"
                component={LearningRoadmap}
            /> */}

            <Tab.Screen
                name="Tools"
                component={ToolScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />

        </Tab.Navigator>
    );
};

export default MainNavigator;