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
import styles from "../../style/SignupScreen";
import COLORS from "../../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSignup = () => {
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        // Later:
        navigation.replace("Main");
    };

    return (
        <SafeAreaProvider style={styles.containerFirst}>
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
                    style={styles.keyboard}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
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
                                    color="#fff"
                                />
                            </TouchableOpacity>

                            <View style={styles.logo}>
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

                        {/* Heading */}

                        <View style={styles.titleBox}>

                            <Text style={styles.title}>
                                Create Account 🚀
                            </Text>

                            <Text style={styles.subtitle}>
                                Start building your dream career
                            </Text>

                        </View>

                        {/* Login Signup */}

                        <View style={styles.switchContainer}>

                            <TouchableOpacity
                                style={styles.inactiveSwitch}
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={styles.inactiveText}>
                                    Login
                                </Text>
                            </TouchableOpacity>

                            <LinearGradient
                                colors={["#7B3CFF", "#5D31F5"]}
                                style={styles.activeSwitch}
                            >
                                <Text style={styles.activeText}>
                                    Sign Up
                                </Text>
                            </LinearGradient>

                        </View>

                        {/* Full Name */}

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="person-outline"
                                size={19}
                                color={COLORS.secondary}
                            />

                            <View style={styles.inputContent}>

                                <Text style={styles.label}>
                                    Full Name
                                </Text>

                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Rahul Birajdar"
                                    placeholderTextColor="#69739D"
                                    style={styles.input}
                                />

                            </View>

                        </View>

                        {/* Email */}

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="mail-outline"
                                size={19}
                                color={COLORS.secondary}
                            />

                            <View style={styles.inputContent}>

                                <Text style={styles.label}>
                                    Email Address
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

                                <Text style={styles.label}>
                                    Password
                                </Text>

                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Create password"
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

                        {/* Confirm Password */}

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="shield-checkmark-outline"
                                size={19}
                                color={COLORS.secondary}
                            />

                            <View style={styles.inputContent}>

                                <Text style={styles.label}>
                                    Confirm Password
                                </Text>

                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="Confirm password"
                                    placeholderTextColor="#69739D"
                                    secureTextEntry={!showConfirm}
                                    style={styles.input}
                                />

                            </View>

                            <TouchableOpacity
                                onPress={() =>
                                    setShowConfirm(!showConfirm)
                                }
                            >
                                <Ionicons
                                    name={
                                        showConfirm
                                            ? "eye-outline"
                                            : "eye-off-outline"
                                    }
                                    size={19}
                                    color={COLORS.secondary}
                                />
                            </TouchableOpacity>

                        </View>


                        {/* Terms */}

                        <Text style={styles.terms}>
                            By creating an account, you agree to our{" "}
                            <Text style={styles.link}>
                                Terms
                            </Text>{" "}
                            and{" "}
                            <Text style={styles.link}>
                                Privacy Policy
                            </Text>
                        </Text>

                        {/* Signup */}

                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleSignup}
                        >

                            <LinearGradient
                                colors={["#9B5CFF", "#6335FF", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.signupButton}
                            >

                                <Text style={styles.signupButtonText}>
                                    Create Account
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={19}
                                    color="#fff"
                                />

                            </LinearGradient>

                        </TouchableOpacity>

                        {/* Divider */}

                        <View style={styles.dividerBox}>

                            <View style={styles.divider} />

                            <Text style={styles.or}>
                                or sign up with
                            </Text>

                            <View style={styles.divider} />

                        </View>

                        {/* Social */}

                        <View style={styles.socialRow}>

                            <TouchableOpacity style={styles.socialButton}>

                                <Text style={styles.google}>
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
                                    color="#fff"
                                />

                                <Text style={styles.socialText}>
                                    GitHub
                                </Text>

                            </TouchableOpacity>

                        </View>

                        {/* Login */}

                        <View style={styles.loginTextBox}>

                            <Text style={styles.normalText}>
                                Already have an account?{" "}
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={styles.loginLink}>
                                    Login
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaProvider>
    );
};

export default SignupScreen;

