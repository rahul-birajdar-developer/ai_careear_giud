import React, { useRef, useState } from "react";
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
import styles from "../../style/VerifyOTPScreen";

const VerifyOTPScreen = ({ navigation, route }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputs = useRef([]);

    const email = route?.params?.email || "your email";

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (event, index) => {
        if (
            event.nativeEvent.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputs.current[index - 1]?.focus();
        }
    };

    const verifyOTP = () => {
        const code = otp.join("");

        if (code.length !== 6) {
            console.log("Enter complete OTP");
            return;
        }

        console.log("OTP:", code);

        navigation.navigate("NewPassword");
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

                        {/* Icon */}
                        <View style={styles.iconOuter}>
                            <LinearGradient
                                colors={["#9B5CFF", "#3B82F6"]}
                                style={styles.iconCircle}
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={42}
                                    color="#FFFFFF"
                                />
                            </LinearGradient>
                        </View>

                        <Text style={styles.title}>
                            Verify Your Email
                        </Text>

                        <Text style={styles.subtitle}>
                            We've sent a 6-digit verification code to
                        </Text>

                        <Text style={styles.email}>
                            {email}
                        </Text>

                        {/* OTP */}
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        inputs.current[index] = ref;
                                    }}
                                    value={digit}
                                    onChangeText={(value) =>
                                        handleChange(value, index)
                                    }
                                    onKeyPress={(event) =>
                                        handleKeyPress(event, index)
                                    }
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    style={[
                                        styles.otpInput,
                                        digit && styles.otpInputActive,
                                    ]}
                                    selectionColor="#9B5CFF"
                                />
                            ))}
                        </View>

                        {/* Timer */}
                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>
                                Didn't receive the code?
                            </Text>

                            <TouchableOpacity>
                                <Text style={styles.resendText}>
                                    Resend Code
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Verify */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={verifyOTP}
                            style={styles.verifyWrapper}
                        >
                            <LinearGradient
                                colors={["#9B5CFF", "#6335FF", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.verifyButton}
                            >
                                <Text style={styles.verifyText}>
                                    Verify Code
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={19}
                                    color="#FFFFFF"
                                />
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Change Email */}
                        <TouchableOpacity
                            style={styles.changeEmail}
                            onPress={() =>
                                navigation.navigate("ForgotPassword")
                            }
                        >
                            <Ionicons
                                name="create-outline"
                                size={15}
                                color="#A66BFF"
                            />

                            <Text style={styles.changeEmailText} onPress={() => navigation.goBack()}>
                                Change Email
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* Security */}
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
                                Secure Verification
                            </Text>

                            <Text style={styles.securityText}>
                                Never share your verification code with
                                anyone.
                            </Text>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default VerifyOTPScreen;

