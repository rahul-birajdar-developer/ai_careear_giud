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
    ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../style/SignupScreen";
import COLORS from "../../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import api from "../../services/api";

const SignupScreen = ({ navigation }) => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSignup = async () => {

        // 1. Validate required fields FIRST
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password
        ) {
            alert("All fields are required!");
            return;
        }

        // 2. Confirm password
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // 3. Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email.trim())) {
            alert("Please enter a valid email");
            return;
        }

        // const phoneRegex = /^[6-9]\d{9}$/;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // if (!phoneRegex.test(formData.phone.trim())) {
        //     alert("Please enter a valid 10-digit mobile number");
        //     return;
        // }

        if (!passwordRegex.test(formData.password)) {
            alert(
                "Password must have 8+ characters, " +
                "uppercase, lowercase, number and special character."
            );
            return;
        }

        try {
            setLoading(true);

            // 4. Create FormData AFTER validation
            const data = new FormData();

            data.append("name", formData.name.trim());
            data.append("email", formData.email.trim().toLowerCase());
            data.append("password", formData.password);

            console.log("Creating account...");

            const response = await api.post(
                "users/register",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Signup response:", response.data);

            // 6. Check successful response
            if (response.data?.success) {

                alert(
                    "Signup Successful",
                    [
                        {
                            text: "Continue",
                            onPress: () => {
                                navigation.replace("Main");
                            },
                        },
                    ]
                );

                setLoading(false);

            } else {

                alert(
                    response.data?.message ||
                    "Something went wrong!"
                );
            }

        } catch (error) {
            console.log(
                "Signup error:",
                error.response?.data || error.message
            );

            if (error.response?.status === 400) {
                alert(
                    error.response?.data?.message ||
                    "Email already exists"
                );
                return;
            }

            alert("Something went wrong. Please try again.");
        }
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
                                    value={formData.name}
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            name: text,
                                        })
                                    }
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
                                    value={formData.email}
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            email: text,
                                        })
                                    }
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
                                    value={formData.password}
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            password: text,
                                        })
                                    }
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

                                {loading ? (
                                    <>
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />

                                        <Text style={styles.signupButtonText}>
                                            Creating Account...
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.signupButtonText}>
                                            Create Account
                                        </Text>

                                        <Ionicons
                                            name="arrow-forward"
                                            size={19}
                                            color="#fff"
                                        />
                                    </>
                                )}

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

