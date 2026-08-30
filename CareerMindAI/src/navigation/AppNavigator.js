import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/Authontication/LoginScreen";
import SignupScreen from "../screens/Authontication/SignupScreen";
import ForgotPasswordScreen from "../screens/Authontication/ForgotPasswordScreen";
import VerifyOTPScreen from "../screens/Authontication/VerifyOTPScreen";
import NewPasswordScreen from "../screens/Authontication/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import ToolsScreen from "../screens/userScreens/ToolsScreen";
import ProfileScreen from "../screens/userScreens/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
            />

            {/* Authonitication Screens */}
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />

            <Stack.Screen
                name="Signup"
                component={SignupScreen}
            />

            <Stack.Screen
                name="forget"
                component={ForgotPasswordScreen}
            />

            <Stack.Screen
                name="VerifyOTP"
                component={VerifyOTPScreen}
            />

            <Stack.Screen
                name="NewPassword"
                component={NewPasswordScreen}
            />

            {/* Home Screens */}
            <Stack.Screen
                name="Main"
                component={HomeScreen}
            />

            <Stack.Screen
                name="Tools"
                component={ToolsScreen}
            />

            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;