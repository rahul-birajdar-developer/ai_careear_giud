import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import LearningRoadmap from "./screens/LearningRoadmap";
import Reports from "./screens/Reports";
import Profile from "./screens/Profile";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: "#6335FF",
                tabBarInactiveTintColor: "#69739D",

                tabBarStyle: {
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 0,
                    elevation: 10,
                },

                tabBarIcon: ({ focused, color }) => {

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
                                ? "time"
                                : "time-outline";
                            break;

                        case "Profile":
                            icon = focused
                                ? "person"
                                : "person-outline";
                            break;
                    }

                    return (
                        <Ionicons
                            name={icon}
                            size={23}
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

            <Tab.Screen
                name="Learn"
                component={LearningRoadmap}
            />

            <Tab.Screen
                name="Tools"
                component={Reports}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
            />

        </Tab.Navigator>
    );
}