import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "../style/SplashScreenCss";
import COLORS from "../constants/Colors";



const SplashScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={["#070B2D", "#0D1240", "#080B32"]}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.background}
            />

            {/* Top decorative glow */}
            <View style={styles.glowOne} />
            <View style={styles.glowTwo} />

            {/* Logo Area */}
            <View style={styles.logoSection}>

                <View style={styles.logoGlow}>
                    <LinearGradient
                        colors={["#8B5CFF", "#3B82F6"]}
                        style={styles.logoCircle}
                    >
                        <Ionicons
                            name="sparkles"
                            size={55}
                            color="#FFFFFF"
                        />
                    </LinearGradient>
                </View>

                <View style={styles.brandContainer}>
                    <Text style={styles.aiText}>AI</Text>
                    <Text style={styles.brandText}>CareerMind</Text>
                </View>

                <Text style={styles.tagline}>
                    Plan • Learn • Build • Succeed
                </Text>

                <Text style={styles.description}>
                    Your AI Powered Career Coach
                </Text>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>

                <Text style={styles.welcomeText}>
                    Build your future with AI
                </Text>

                <TouchableOpacity
                    activeOpacity={0.85}
                >
                    <LinearGradient
                        colors={["#9B5CFF", "#6335FF", "#3B82F6"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.getStartedButton}
                    >
                        <Text style={styles.buttonText}>
                            Get Started
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={19}
                            color="#FFFFFF"
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default SplashScreen;

