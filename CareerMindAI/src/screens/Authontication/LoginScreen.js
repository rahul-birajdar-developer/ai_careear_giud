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
import COLORS from "../../constants/Colors";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log("Login:", email, password);

        // Later:
        // navigation.replace("Main");
    };

    return (
        <LinearGradient
            colors={[
                COLORS.background,
                COLORS.background2,
                COLORS.background,
            ]}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.background}
            />

            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >

                    {/* Header */}

                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={21}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>

                        <View style={styles.smallLogo}>
                            <LinearGradient
                                colors={["#9B5CFF", "#3B82F6"]}
                                style={styles.logoGradient}
                            >
                                <Ionicons
                                    name="sparkles"
                                    size={20}
                                    color="#fff"
                                />
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Title */}

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Welcome Back 👋
                        </Text>

                        <Text style={styles.subtitle}>
                            Login to continue your career journey
                        </Text>
                    </View>

                    {/* Login / Signup Toggle */}

                    <View style={styles.switchContainer}>

                        <LinearGradient
                            colors={["#7B3CFF", "#5D31F5"]}
                            style={styles.activeSwitch}
                        >
                            <Text style={styles.activeSwitchText}>
                                Login
                            </Text>
                        </LinearGradient>

                        <TouchableOpacity
                            style={styles.inactiveSwitch}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={styles.inactiveSwitchText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* Email */}

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={19}
                            color={COLORS.secondary}
                        />

                        <View style={styles.inputContent}>
                            <Text style={styles.inputLabel}>
                                Email or Phone
                            </Text>

                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="rahul@gmail.com"
                                placeholderTextColor="#69739D"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Password */}

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={19}
                            color={COLORS.secondary}
                        />

                        <View style={styles.inputContent}>
                            <Text style={styles.inputLabel}>
                                Password
                            </Text>

                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor="#69739D"
                                secureTextEntry={!showPassword}
                                style={styles.input}
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
                                color={COLORS.secondary}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password */}

                    <TouchableOpacity
                        style={styles.forgotContainer}
                        onPress={() => navigation.navigate("forget")}
                    >
                        <Text style={styles.forgotText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* Login Button */}

                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={handleLogin}
                    >
                        <LinearGradient
                            colors={["#9B5CFF", "#6335FF", "#3B82F6"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>
                                Login
                            </Text>

                            <Ionicons
                                name="arrow-forward"
                                size={19}
                                color="#fff"
                            />
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

                    {/* Social Buttons */}

                    <View style={styles.socialRow}>

                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.googleIcon}>G</Text>

                            <Text style={styles.socialText}>
                                Google
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons
                                name="logo-github"
                                size={20}
                                color="#fff"
                            />

                            <Text style={styles.socialText}>
                                GitHub
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* Signup */}

                    <View style={styles.bottomText}>
                        <Text style={styles.bottomNormal}>
                            Don't have an account?{" "}
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text style={styles.signupLink}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default LoginScreen;

