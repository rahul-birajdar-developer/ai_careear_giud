import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../style/LoginScreen";

const LoginScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        // For now go to dashboard.
        // Later we will connect your backend authentication.
        navigation.replace("Dashboard");
    };

    return (
        <LinearGradient
            colors={["#05091F", "#080B2E", "#0A0D38"]}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor="#05091F"
            />

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    {/* Header */}

                    <View style={styles.header}>

                        <Text style={styles.welcome}>
                            Welcome Back 👋
                        </Text>

                        <Text style={styles.subtitle}>
                            Login to continue your journey
                        </Text>

                    </View>


                    {/* Login / Signup switch */}

                    <View style={styles.switchContainer}>

                        <TouchableOpacity
                            style={[
                                styles.switchButton,
                                isLogin && styles.activeSwitch,
                            ]}
                            onPress={() => setIsLogin(true)}
                        >
                            {isLogin ? (
                                <LinearGradient
                                    colors={["#7C3AED", "#4F46E5"]}
                                    style={styles.activeSwitchGradient}
                                >
                                    <Text style={styles.activeSwitchText}>
                                        Login
                                    </Text>
                                </LinearGradient>
                            ) : (
                                <Text style={styles.switchText}>
                                    Login
                                </Text>
                            )}
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[
                                styles.switchButton,
                                !isLogin && styles.activeSwitch,
                            ]}
                            onPress={() => setIsLogin(false)}
                        >
                            {!isLogin ? (
                                <LinearGradient
                                    colors={["#7C3AED", "#4F46E5"]}
                                    style={styles.activeSwitchGradient}
                                >
                                    <Text style={styles.activeSwitchText}>
                                        Sign Up
                                    </Text>
                                </LinearGradient>
                            ) : (
                                <Text style={styles.switchText}>
                                    Sign Up
                                </Text>
                            )}
                        </TouchableOpacity>

                    </View>


                    {/* Email */}

                    <View style={styles.inputContainer}>

                        <Ionicons
                            name="mail-outline"
                            size={19}
                            color="#8B91B5"
                        />

                        <View style={styles.inputContent}>

                            <Text style={styles.inputLabel}>
                                Email or Phone
                            </Text>

                            <TextInput
                                placeholder="rahul@gmail.com"
                                placeholderTextColor="#747A9C"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                        </View>

                    </View>


                    {/* Password */}

                    <View style={styles.inputContainer}>

                        <Ionicons
                            name="lock-closed-outline"
                            size={19}
                            color="#8B91B5"
                        />

                        <View style={styles.inputContent}>

                            <Text style={styles.inputLabel}>
                                Password
                            </Text>

                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="#747A9C"
                                style={styles.input}
                                secureTextEntry={!showPassword}
                            />

                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            <Ionicons
                                name={
                                    showPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={19}
                                color="#8B91B5"
                            />
                        </TouchableOpacity>

                    </View>


                    {/* Forgot password */}

                    {isLogin && (
                        <TouchableOpacity
                            style={styles.forgotContainer}
                        >
                            <Text style={styles.forgot}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    )}


                    {/* Main button */}

                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={handleSubmit}
                        style={styles.mainButtonWrapper}
                    >
                        <LinearGradient
                            colors={["#7C3AED", "#4F46E5"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.mainButton}
                        >

                            <Text style={styles.mainButtonText}>
                                {isLogin
                                    ? "Login"
                                    : "Create Account"}
                            </Text>

                            <Text style={styles.arrow}>
                                →
                            </Text>

                        </LinearGradient>
                    </TouchableOpacity>


                    {/* Divider */}

                    <View style={styles.dividerContainer}>

                        <View style={styles.divider} />

                        <Text style={styles.orText}>
                            or continue with
                        </Text>

                        <View style={styles.divider} />

                    </View>


                    {/* Social login */}

                    <View style={styles.socialContainer}>

                        <TouchableOpacity style={styles.socialButton}>

                            <Text style={styles.googleIcon}>
                                G
                            </Text>

                            <Text style={styles.socialText}>
                                Google
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.socialButton}>

                            <Ionicons
                                name="logo-github"
                                size={20}
                                color="#FFFFFF"
                            />

                            <Text style={styles.socialText}>
                                GitHub
                            </Text>

                        </TouchableOpacity>

                    </View>


                    {/* Bottom */}

                    <View style={styles.bottomContainer}>

                        {isLogin ? (
                            <Text style={styles.bottomText}>
                                Don't have an account?{" "}
                                <Text
                                    style={styles.link}
                                    onPress={() =>
                                        setIsLogin(false)
                                    }
                                >
                                    Sign Up
                                </Text>
                            </Text>
                        ) : (
                            <Text style={styles.bottomText}>
                                Already have an account?{" "}
                                <Text
                                    style={styles.link}
                                    onPress={() =>
                                        setIsLogin(true)
                                    }
                                >
                                    Login
                                </Text>
                            </Text>
                        )}

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </LinearGradient>
    );
};

export default LoginScreen;


