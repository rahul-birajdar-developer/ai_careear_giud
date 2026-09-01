import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import styles from "../style/HomeScreen";
import COLORS from "../constants/Colors";


const HomeScreen = ({ navigation }) => {

    const quickActions = [
        {
            title: "Resume\nAnalyzer",
            icon: "document-text-outline",
            color: "#38BDF8",
            screen: "ResumeAnalyzer",
        },
        {
            title: "Skill Gap\nAnalyzer",
            icon: "analytics-outline",
            color: "#F59E0B",
            screen: "SkillGap",
        },
        {
            title: "Learning\nRoadmap",
            icon: "book-outline",
            color: "#22C55E",
            screen: "LearningRoadmap",
        },
        {
            title: "Interview\nPrep",
            icon: "people-outline",
            color: "#EC4899",
            screen: "InterviewPrep",
        },
        {
            title: "Cover Letter",
            icon: "document-outline",
            color: "#38BDF8",
            screen: "CoverLetter",
        },
        {
            title: "Career\nAdvisor",
            icon: "sparkles-outline",
            color: "#A855F7",
            screen: "CareerAdvisor",
        },
    ];

    const handleAction = (screen) => {
        if (navigation) {
            navigation.navigate(screen);
        }
    };
    const [resumeAnalyzed, setResumeAnalyzed] = useState(false);

    return (
        <View style={styles.safeArea}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.background}
            />

            <View style={styles.container}>

                {/* ================= HEADER ================= */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.greeting}>
                            Hi Rahul 👋
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => navigation?.navigate("Profile")}
                    >
                        <Image
                            source={{
                                uri: "https://i.pravatar.cc/150?img=12",
                            }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>

                </View>

                {/* ================= CONTENT ================= */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >

                    {/* ================= SEARCH ================= */}

                    <View style={styles.searchContainer}>

                        <Ionicons
                            name="search-outline"
                            size={18}
                            color={COLORS.subText}
                        />

                        <TextInput
                            placeholder="Search anything..."
                            placeholderTextColor={COLORS.subText}
                            style={styles.searchInput}
                        />

                    </View>


                    {/* ================= AI BANNER ================= */}

                    <LinearGradient
                        colors={[
                            "#21115E",
                            "#24136F",
                            "#172A78",
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.aiBanner}
                    >

                        {/* Glow */}

                        <View style={styles.bannerGlow} />

                        <View style={styles.bannerContent}>

                            <Text style={styles.bannerTitle}>
                                Your Career, Supercharged
                            </Text>

                            <Text style={styles.bannerTitle}>
                                with AI
                            </Text>

                            <TouchableOpacity
                                style={styles.exploreButton}
                                onPress={() => navigation?.navigate("CareerAdvisor")}
                            >
                                <Text style={styles.exploreText}>
                                    Explore Tools →
                                </Text>
                            </TouchableOpacity>

                        </View>


                        {/* Robot */}

                        <View style={styles.robotContainer}>

                            <View style={styles.robotHead}>

                                <View style={styles.robotEyeLeft} />
                                <View style={styles.robotEyeRight} />

                                <View style={styles.robotSmile} />

                            </View>

                            <View style={styles.robotBody} />

                            <View style={styles.robotArmLeft} />
                            <View style={styles.robotArmRight} />

                        </View>

                    </LinearGradient>


                    {/* ================= QUICK ACTION TITLE ================= */}

                    <Text style={styles.sectionTitle}>
                        Quick Actions
                    </Text>


                    {/* ================= QUICK ACTION GRID ================= */}

                    <View style={styles.grid}>

                        {quickActions.map((item, index) => (

                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                style={styles.actionWrapper}
                                onPress={() => handleAction(item.screen)}
                            >

                                <LinearGradient
                                    colors={[
                                        `${item.color}18`,
                                        `${item.color}08`,
                                    ]}
                                    style={[
                                        styles.actionCard,
                                        {
                                            borderColor: `${item.color}35`,
                                        },
                                    ]}
                                >

                                    <View
                                        style={[
                                            styles.actionIcon,
                                            {
                                                backgroundColor:
                                                    `${item.color}20`,
                                            },
                                        ]}
                                    >

                                        <Ionicons
                                            name={item.icon}
                                            size={21}
                                            color={item.color}
                                        />

                                    </View>

                                    <Text style={styles.actionText}>
                                        {item.title}
                                    </Text>

                                </LinearGradient>

                            </TouchableOpacity>

                        ))}

                    </View>
                    {/* ================= CAREER JOURNEY ================= */}

                    {!resumeAnalyzed ? (
                        <LinearGradient
                            colors={["#101A45", "#15104A"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.startCareerCard}
                        >
                            <View style={styles.startCareerTop}>

                                <View style={styles.rocketBox}>
                                    <Ionicons
                                        name="rocket"
                                        size={25}
                                        color="#A855F7"
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.startCareerTitle}>
                                        Start Your Career Journey
                                    </Text>

                                    <Text style={styles.startCareerDescription}>
                                        Upload your resume and let AI analyze
                                        your skills, ATS score and career potential.
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.startFeatures}>

                                <View style={styles.featureItem}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={15}
                                        color="#34D399"
                                    />
                                    <Text style={styles.featureText}>
                                        ATS Score
                                    </Text>
                                </View>

                                <View style={styles.featureItem}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={15}
                                        color="#34D399"
                                    />
                                    <Text style={styles.featureText}>
                                        Skill Analysis
                                    </Text>
                                </View>

                                <View style={styles.featureItem}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={15}
                                        color="#34D399"
                                    />
                                    <Text style={styles.featureText}>
                                        Career Insights
                                    </Text>
                                </View>

                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.analyzeButton}
                                onPress={() => navigation.navigate("ResumeAnalyzer")}
                            >
                                <Ionicons
                                    name="document-text-outline"
                                    size={17}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.analyzeButtonText} onPress={() => setResumeAnalyzed(true)}>
                                    Analyze My Resume
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={16}
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>

                        </LinearGradient>
                    ) : (

                        <>
                            {/* ================= CAREER PROGRESS ================= */}

                            <View style={styles.progressCard}>

                                <View style={styles.progressHeader}>

                                    <View>
                                        <Text style={styles.sectionTitle}>
                                            Career Progress
                                        </Text>

                                        <Text style={styles.sectionSubtitle}>
                                            Your career readiness
                                        </Text>
                                    </View>

                                    <View style={styles.scoreCircle}>
                                        <Text style={styles.scoreText}>
                                            68%
                                        </Text>
                                    </View>

                                </View>

                                {/* Resume */}

                                <View style={styles.progressItem}>

                                    <View style={styles.progressLabelRow}>
                                        <Text style={styles.progressLabel}>
                                            Resume
                                        </Text>

                                        <Text style={styles.progressValue}>
                                            72%
                                        </Text>
                                    </View>

                                    <View style={styles.progressBar}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: "72%",
                                                    backgroundColor: "#A855F7",
                                                },
                                            ]}
                                        />
                                    </View>

                                </View>

                                {/* Skills */}

                                <View style={styles.progressItem}>

                                    <View style={styles.progressLabelRow}>
                                        <Text style={styles.progressLabel}>
                                            Skills
                                        </Text>

                                        <Text style={styles.progressValue}>
                                            65%
                                        </Text>
                                    </View>

                                    <View style={styles.progressBar}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: "65%",
                                                    backgroundColor: "#22C55E",
                                                },
                                            ]}
                                        />
                                    </View>

                                </View>

                                {/* Interview */}

                                <View style={styles.progressItem}>

                                    <View style={styles.progressLabelRow}>
                                        <Text style={styles.progressLabel}>
                                            Interview
                                        </Text>

                                        <Text style={styles.progressValue}>
                                            48%
                                        </Text>
                                    </View>

                                    <View style={styles.progressBar}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: "48%",
                                                    backgroundColor: "#38BDF8",
                                                },
                                            ]}
                                        />
                                    </View>

                                </View>

                                <TouchableOpacity
                                    style={styles.viewAnalysisButton}
                                    onPress={() =>
                                        navigation.navigate("ResumeAnalysisResult")
                                    }
                                >
                                    <Text style={styles.viewAnalysisText}>
                                        View Full Analysis
                                    </Text>

                                    <Ionicons
                                        name="arrow-forward"
                                        size={15}
                                        color="#A78BFA"
                                    />
                                </TouchableOpacity>

                            </View>


                            {/* ================= CONTINUE LEARNING ================= */}

                            <View style={styles.learningCard}>

                                <View style={styles.learningHeader}>

                                    <View>
                                        <Text style={styles.sectionTitle}>
                                            Continue Learning
                                        </Text>

                                        <Text style={styles.sectionSubtitle}>
                                            Pick up where you left off
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("LearningRoadmap")
                                        }
                                    >
                                        <Text style={styles.seeAllText}>
                                            See All
                                        </Text>
                                    </TouchableOpacity>

                                </View>


                                <View style={styles.learningContent}>

                                    <View style={styles.reactIcon}>
                                        <Ionicons
                                            name="logo-react"
                                            size={28}
                                            color="#61DAFB"
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>

                                        <Text style={styles.learningTitle}>
                                            React.js
                                        </Text>

                                        <Text style={styles.learningSubtitle}>
                                            Frontend Developer Roadmap
                                        </Text>

                                        <View style={styles.learningProgressRow}>

                                            <View style={styles.learningProgressBar}>
                                                <View
                                                    style={[
                                                        styles.learningProgressFill,
                                                        {
                                                            width: "65%",
                                                        },
                                                    ]}
                                                />
                                            </View>

                                            <Text style={styles.learningPercentage}>
                                                65%
                                            </Text>

                                        </View>

                                    </View>

                                    <TouchableOpacity
                                        style={styles.learningArrow}
                                        onPress={() =>
                                            navigation.navigate("LearningRoadmap")
                                        }
                                    >
                                        <Ionicons
                                            name="arrow-forward"
                                            size={17}
                                            color="#FFFFFF"
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </>
                    )}

                    {/* ================= AI TIP ================= */}

                    <LinearGradient
                        colors={[
                            "#111943",
                            "#0B1235",
                        ]}
                        style={styles.tipCard}
                    >

                        <View style={styles.tipIcon}>
                            <MaterialCommunityIcons
                                name="lightbulb-on-outline"
                                size={22}
                                color="#FBBF24"
                            />
                        </View>

                        <View style={styles.tipContent}>

                            <Text style={styles.tipTitle}>
                                AI Career Tip
                            </Text>

                            <Text style={styles.tipText}>
                                Keep your resume updated with measurable
                                achievements to improve your chances.
                            </Text>

                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={COLORS.subText}
                        />

                    </LinearGradient>

                </ScrollView>



            </View>

        </View>
    );
};

export default HomeScreen;