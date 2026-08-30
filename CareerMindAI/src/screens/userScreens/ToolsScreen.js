import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
    background: "#07132F",
    card: "#101F43",
    card2: "#142653",
    primary: "#6335FF",
    purple: "#9B5CFF",
    blue: "#3B82F6",
    white: "#FFFFFF",
    text: "#DDE5FF",
    muted: "#8794B8",
    border: "#24345F",
};

const ToolsScreen = ({ navigation }) => {

    const tools = [
        {
            id: "resume",
            title: "Resume Analyzer",
            description: "Analyze your resume with AI",
            icon: "document-text-outline",
            color: "#8B5CF6",
            screen: "ResumeAnalysis",
        },
        {
            id: "skills",
            title: "Skill Gap Analyzer",
            description: "Find skills you need to improve",
            icon: "analytics-outline",
            color: "#3B82F6",
            screen: "SkillGap",
        },
        {
            id: "builder",
            title: "Resume Builder",
            description: "Create a professional resume",
            icon: "create-outline",
            color: "#A855F7",
            screen: "ResumeBuilder",
        },
        {
            id: "job",
            title: "Job Match",
            description: "Find jobs matching your skills",
            icon: "briefcase-outline",
            color: "#06B6D4",
            screen: "JobMatch",
        },
        {
            id: "interview",
            title: "Interview Practice",
            description: "Practice AI-powered interviews",
            icon: "mic-outline",
            color: "#EC4899",
            screen: "InterviewPractice",
        },
        {
            id: "salary",
            title: "Salary Insights",
            description: "Explore salary expectations",
            icon: "cash-outline",
            color: "#22C55E",
            screen: "SalaryInsights",
        },
        {
            id: "roadmap",
            title: "Learning Roadmap",
            description: "Get a personalized learning path",
            icon: "map-outline",
            color: "#F59E0B",
            screen: "LearningRoadmap",
        },
        {
            id: "reports",
            title: "Career Reports",
            description: "View your career progress",
            icon: "bar-chart-outline",
            color: "#6366F1",
            screen: "Reports",
        },
    ];

    const openTool = (screen) => {
        navigation?.navigate(screen);
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.smallTitle}>
                            CAREERMIND AI
                        </Text>

                        <Text style={styles.title}>
                            Career Tools
                        </Text>

                        <Text style={styles.subtitle}>
                            Everything you need to grow your career
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={COLORS.white}
                        />

                        <View style={styles.notificationDot} />
                    </TouchableOpacity>

                </View>


                {/* AI Banner */}

                <LinearGradient
                    colors={[
                        "#6335FF",
                        "#7C3AED",
                        "#3B82F6",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.aiBanner}
                >

                    <View style={styles.aiIcon}>
                        <Ionicons
                            name="sparkles"
                            size={25}
                            color="#FFFFFF"
                        />
                    </View>

                    <View style={styles.aiContent}>

                        <Text style={styles.aiTitle}>
                            AI Career Assistant
                        </Text>

                        <Text style={styles.aiText}>
                            Get personalized career guidance
                            based on your profile.
                        </Text>

                    </View>

                    <Ionicons
                        name="arrow-forward-circle"
                        size={30}
                        color="#FFFFFF"
                    />

                </LinearGradient>


                {/* Section title */}

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        Career Toolkit
                    </Text>

                    <Text style={styles.toolCount}>
                        {tools.length} tools
                    </Text>

                </View>


                {/* Tools */}

                <View style={styles.toolsGrid}>

                    {tools.map((tool) => (

                        <TouchableOpacity
                            key={tool.id}
                            activeOpacity={0.8}
                            style={styles.toolCard}
                            onPress={() =>
                                openTool(tool.screen)
                            }
                        >

                            <View
                                style={[
                                    styles.toolIcon,
                                    {
                                        backgroundColor:
                                            `${tool.color}20`,
                                    },
                                ]}
                            >

                                <Ionicons
                                    name={tool.icon}
                                    size={25}
                                    color={tool.color}
                                />

                            </View>

                            <Text style={styles.toolTitle}>
                                {tool.title}
                            </Text>

                            <Text
                                style={styles.toolDescription}
                                numberOfLines={2}
                            >
                                {tool.description}
                            </Text>

                            <View style={styles.openRow}>

                                <Text
                                    style={[
                                        styles.openText,
                                        {
                                            color: tool.color,
                                        },
                                    ]}
                                >
                                    Open
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={16}
                                    color={tool.color}
                                />

                            </View>

                        </TouchableOpacity>

                    ))}

                </View>


                {/* Bottom information card */}

                <View style={styles.tipCard}>

                    <View style={styles.tipIcon}>
                        <Ionicons
                            name="bulb-outline"
                            size={22}
                            color="#FBBF24"
                        />
                    </View>

                    <View style={styles.tipContent}>

                        <Text style={styles.tipTitle}>
                            Career Tip
                        </Text>

                        <Text style={styles.tipText}>
                            Analyze your resume first to discover
                            your strengths and skill gaps.
                        </Text>

                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

export default ToolsScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 35,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15,
        marginBottom: 22,
    },

    smallTitle: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        color: "#8B9AC4",
        marginBottom: 5,
    },

    title: {
        fontSize: 29,
        fontWeight: "800",
        color: COLORS.white,
    },

    subtitle: {
        fontSize: 13,
        color: COLORS.muted,
        marginTop: 5,
    },

    notificationButton: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: COLORS.card,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    notificationDot: {
        position: "absolute",
        right: 10,
        top: 9,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#EF4444",
    },

    aiBanner: {
        minHeight: 105,
        borderRadius: 22,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 28,
    },

    aiIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.18)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    aiContent: {
        flex: 1,
        paddingRight: 10,
    },

    aiTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 5,
    },

    aiText: {
        fontSize: 12,
        lineHeight: 18,
        color: "#E8E7FF",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: COLORS.white,
    },

    toolCount: {
        fontSize: 12,
        color: COLORS.muted,
    },

    toolsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    toolCard: {
        width: "48%",
        minHeight: 190,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 15,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    toolIcon: {
        width: 47,
        height: 47,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 13,
    },

    toolTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 6,
    },

    toolDescription: {
        fontSize: 11.5,
        lineHeight: 17,
        color: COLORS.muted,
        minHeight: 34,
    },

    openRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 13,
    },

    openText: {
        fontSize: 12,
        fontWeight: "700",
        marginRight: 5,
    },

    tipCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0D1B3A",
        borderRadius: 18,
        padding: 16,
        marginTop: 7,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    tipIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "rgba(251,191,36,0.12)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    tipContent: {
        flex: 1,
    },

    tipTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 4,
    },

    tipText: {
        fontSize: 11.5,
        lineHeight: 17,
        color: COLORS.muted,
    },

});