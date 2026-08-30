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
    Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../style/ForgotPasswordScreen";
import api from "../../services/api";

const ForgotPasswordScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        email: "",
    });
    const [loading, setLoading] = useState(false)

    const handleSendCode = async () => {
        const email = String(form.email ?? "").trim().toLowerCase();

        if (!email) {
            Alert.alert(
                "Required",
                "Please enter your email"
            );
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Alert.alert(
                "Invalid Email",
                "Please enter a valid email address"
            );
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "users/forgetpasword",
                {
                    email: email,
                }
            );

            console.log(
                "Forgot password response:",
                response.data
            );

            if (response.data?.success) {

                Alert.alert(
                    "Email Sent",
                    "Password reset link has been sent to your email."
                );

            } else {

                Alert.alert(
                    "Error",
                    response.data?.message ||
                    "Unable to send reset link"
                );
            }

        } catch (error) {

            console.log(
                "Forgot password error:",
                error.response?.data || error.message
            );

            Alert.alert(
                "Error",
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#070B2D"
            />

            <LinearGradient
                colors={["#070B2D", "#0D1240", "#080B32"]}
                style={styles.gradient}
            >
                {/* Background glow */}
                <View style={styles.glowTop} />
                <View style={styles.glowBottom} />

                <KeyboardAvoidingView
                    style={styles.keyboard}
                    behavior={
                        Platform.OS === "ios" ? "padding" : undefined
                    }
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.content}
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
                                    color="#FFFFFF"
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
                                        color="#FFFFFF"
                                    />
                                </LinearGradient>
                            </View>
                        </View>

                        {/* Illustration */}
                        <View style={styles.illustrationContainer}>
                            <View style={styles.outerCircle}>
                                <LinearGradient
                                    colors={["#9B5CFF", "#3B82F6"]}
                                    style={styles.lockCircle}
                                >
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={48}
                                        color="#FFFFFF"
                                    />
                                </LinearGradient>
                            </View>

                            <View style={styles.smallIcon}>
                                <Ionicons
                                    name="key-outline"
                                    size={20}
                                    color="#A66BFF"
                                />
                            </View>

                            <View style={styles.smallIconTwo}>
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={20}
                                    color="#3B82F6"
                                />
                            </View>
                        </View>

                        {/* Heading */}
                        <View style={styles.heading}>
                            <Text style={styles.title}>
                                Forgot Password?
                            </Text>

                            <Text style={styles.subtitle}>
                                Don't worry, it happens to everyone.
                            </Text>

                            <Text style={styles.description}>
                                Enter the email address associated with
                                your account and we'll send you a
                                verification code to reset your password.
                            </Text>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color="#A7AED0"
                            />

                            <View style={styles.inputContent}>
                                <Text style={styles.label}>
                                    Email Address
                                </Text>

                                <TextInput
                                    value={form.email}
                                    onChangeText={(text) =>
                                        setForm({
                                            ...form,
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

                        {/* Send Button */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleSendCode}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={["#9B5CFF", "#6335FF", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.sendButton}
                            >
                                {loading ? (
                                    <Text style={styles.sendText}>
                                        Sending...
                                    </Text>
                                ) : (
                                    <>
                                        <Text style={styles.sendText}>
                                            Send Reset Link
                                        </Text>

                                        <Ionicons
                                            name="arrow-forward"
                                            size={19}
                                            color="#FFFFFF"
                                        />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Back to Login */}
                        <TouchableOpacity
                            style={styles.backLogin}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={15}
                                color="#A66BFF"
                            />

                            <Text style={styles.backLoginText}>
                                Back to Login
                            </Text>
                        </TouchableOpacity>

                        {/* Security message */}
                        <View style={styles.securityBox}>
                            <View style={styles.securityIcon}>
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={18}
                                    color="#10B981"
                                />
                            </View>

                            <View style={styles.securityContent}>
                                <Text style={styles.securityTitle}>
                                    Your account is secure
                                </Text>

                                <Text style={styles.securityText}>
                                    We will never ask for your password or
                                    other sensitive information by email.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;

