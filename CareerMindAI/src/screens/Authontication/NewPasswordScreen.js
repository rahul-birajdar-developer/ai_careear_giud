import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../style/NewPasswordScreen";

const NewPasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleResetPassword = () => {
        if (!password || !confirmPassword) {
            console.log("Please fill all fields");
            return;
        }

        if (password.length < 8) {
            console.log("Password must contain at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        console.log("Password reset successfully");

        navigation.replace("Login");
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

                    {/* Main */}
                    <View style={styles.main}>
                        {/* Illustration */}
                        <View style={styles.iconOuter}>
                            <LinearGradient
                                colors={["#9B5CFF", "#3B82F6"]}
                                style={styles.iconCircle}
                            >
                                <Ionicons
                                    name="lock-open-outline"
                                    size={44}
                                    color="#FFFFFF"
                                />
                            </LinearGradient>
                        </View>

                        <Text style={styles.title}>
                            Create New Password
                        </Text>

                        <Text style={styles.subtitle}>
                            Your new password must be different from
                        </Text>

                        <Text style={styles.subtitle}>
                            your previously used password.
                        </Text>

                        {/* New Password */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={19}
                                color="#8D96BC"
                            />

                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="New password"
                                placeholderTextColor="#69739D"
                                secureTextEntry={!showPassword}
                                style={styles.input}
                            />

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
                                    color="#737DA8"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={19}
                                color="#8D96BC"
                            />

                            <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm new password"
                                placeholderTextColor="#69739D"
                                secureTextEntry={!showConfirm}
                                style={styles.input}
                            />

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
                                    color="#737DA8"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Password Requirements */}
                        <View style={styles.requirements}>
                            <Text style={styles.requirementTitle}>
                                Password requirements
                            </Text>

                            <Requirement
                                text="At least 8 characters"
                                valid={password.length >= 8}
                            />

                            <Requirement
                                text="Contains an uppercase letter"
                                valid={/[A-Z]/.test(password)}
                            />

                            <Requirement
                                text="Contains a number"
                                valid={/[0-9]/.test(password)}
                            />

                            <Requirement
                                text="Passwords match"
                                valid={
                                    password.length > 0 &&
                                    password === confirmPassword
                                }
                            />
                        </View>

                        {/* Reset Button */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleResetPassword}
                            style={styles.buttonWrapper}
                        >
                            <LinearGradient
                                colors={["#9B5CFF", "#6335FF", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    Reset Password
                                </Text>

                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom message */}
                    <View style={styles.bottom}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={15}
                            color="#10B981"
                        />

                        <Text style={styles.bottomText}>
                            Your password is encrypted and secure
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const Requirement = ({ text, valid }) => {
    return (
        <View style={styles.requirement}>
            <Ionicons
                name={
                    valid
                        ? "checkmark-circle"
                        : "ellipse-outline"
                }
                size={15}
                color={valid ? "#10B981" : "#68729D"}
            />

            <Text
                style={[
                    styles.requirementText,
                    valid && styles.requirementValid,
                ]}
            >
                {text}
            </Text>
        </View>
    );
};

export default NewPasswordScreen;

