import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../constants/Colors";
import styles from "../../style/resumeResultScreen";

const ResumeAnalysisResultScreen = ({ navigation, route }) => {

    const result = route?.params?.result || {};

    // Temporary sample data
    // Later these values will come from your backend AI response
    const score = result.atsScore;
    const atsScore = result.atsScore;
    const atsLabel = result.atsLabel;
    const keywordMatch = result.keywordMatch.pct;
    const strengths = result.strengths;
    const atsMessage = result.atsMessage;
    const improvements = result.suggestions;

    const skills = result.skills;


    const missingSkills = result.missingSkills || [
        "TypeScript",
        "Docker",
        "AWS",
    ];

    const recommendations = result.recommendations || [
        "Add numbers and measurable results to your projects.",
        "Include keywords related to your target job role.",
        "Add TypeScript to your skillset if relevant to your career goal.",
    ];

    return (
        <View style={styles.container}>

            {/* Header */}

            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={COLORS.text}
                    />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>

                    <Text style={styles.headerTitle}>
                        Resume Analysis
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        AI-powered resume review
                    </Text>

                </View>

                <View style={styles.aiBadge}>
                    <Ionicons
                        name="sparkles"
                        size={18}
                        color={COLORS.purpleLight}
                    />
                </View>

            </View>


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Overall Score */}

                <LinearGradient
                    colors={[
                        COLORS.primary,
                        COLORS.purple,
                        COLORS.blue,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.scoreCard}
                >

                    <View style={styles.scoreTop}>

                        <View>

                            <Text style={styles.scoreLabel}>
                                Overall Resume Score
                            </Text>

                            <Text style={styles.scoreDescription}>
                                Your resume is looking good
                            </Text>

                        </View>

                        <View style={styles.sparkleCircle}>
                            <Ionicons
                                name="sparkles"
                                size={22}
                                color={COLORS.white}
                            />
                        </View>

                    </View>

                    <View style={styles.scoreRow}>

                        <View style={styles.scoreCircle}>

                            <Text style={styles.scoreNumber}>
                                {score}
                            </Text>

                            <Text style={styles.scoreOutOf}>
                                /100
                            </Text>

                        </View>

                        <View style={styles.scoreMessage}>

                            <Text style={styles.scoreMessageTitle}>
                                {atsLabel + " ATS Score"}
                            </Text>

                            <Text style={styles.scoreMessageText}>
                                {atsMessage.substring(0, 150) + "  ..."}
                            </Text>

                        </View>

                    </View>

                </LinearGradient>


                {/* Score Cards */}

                <View style={styles.smallCards}>

                    <ScoreCard
                        icon="document-text-outline"
                        title="Content"
                        score={84}
                    />

                    <ScoreCard
                        icon="search-outline"
                        title="ATS Score"
                        score={atsScore}
                    />

                    <ScoreCard
                        icon="briefcase-outline"
                        title="Career Match"
                        score={keywordMatch}
                    />

                    <ScoreCard
                        icon="briefcase-outline"
                        title="Skill Match"
                        score={keywordMatch}
                    />

                </View>


                {/* Strengths */}

                <SectionTitle
                    icon="checkmark-circle"
                    title="Strengths"
                />

                <View style={styles.card}>
                    {strengths.map((item, index) => (

                        <View
                            key={index}
                            style={styles.listItem}
                        >

                            <View style={styles.greenIcon}>
                                <Ionicons
                                    name="checkmark"
                                    size={15}
                                    color={COLORS.green}
                                />
                            </View>

                            <Text style={styles.listText}>
                                {item}
                            </Text>

                        </View>

                    ))}

                </View>


                {/* Improvements */}

                <SectionTitle
                    icon="alert-circle"
                    title="Areas to Improve"
                />

                <View style={styles.card}>

                    {improvements.map((item, index) => (

                        <View
                            key={index}
                            style={styles.listItem}
                        >

                            <View style={styles.orangeIcon}>
                                <Ionicons
                                    name="alert"
                                    size={14}
                                    color={COLORS.orange}
                                />
                            </View>

                            <Text style={styles.listText}>
                                {item}
                            </Text>

                        </View>

                    ))}

                </View>


                {/* Skills */}

                <SectionTitle
                    icon="code-slash"
                    title="Detected Skills"
                />

                <View style={styles.card}>

                    <View style={styles.skillContainer}>

                        {skills.map((skill, index) => (

                            <View
                                key={index}
                                style={styles.skillBadge}
                            >

                                <Ionicons
                                    name="checkmark-circle"
                                    size={14}
                                    color={COLORS.cyan}
                                />

                                <Text style={styles.skillText}>
                                    {skill}
                                </Text>

                            </View>

                        ))}

                    </View>

                </View>


                {/* Missing Skills */}

                <SectionTitle
                    icon="trending-up"
                    title="Recommended Skills"
                />

                <View style={styles.card}>

                    <Text style={styles.cardDescription}>
                        These skills could improve your career
                        opportunities based on your resume.
                    </Text>

                    <View style={styles.skillContainer}>

                        {missingSkills.map((skill, index) => (

                            <View
                                key={index}
                                style={styles.missingSkill}
                            >

                                <Ionicons
                                    name="add-circle-outline"
                                    size={15}
                                    color={COLORS.purpleLight}
                                />

                                <Text style={styles.missingSkillText}>
                                    {skill}
                                </Text>

                            </View>

                        ))}

                    </View>

                </View>


                {/* AI Recommendations */}

                <SectionTitle
                    icon="sparkles"
                    title="AI Recommendations"
                />

                <LinearGradient
                    colors={[
                        COLORS.card,
                        COLORS.card2,
                    ]}
                    style={styles.recommendationCard}
                >

                    {recommendations.map((item, index) => (

                        <View
                            key={index}
                            style={styles.recommendationItem}
                        >

                            <View style={styles.numberCircle}>

                                <Text style={styles.numberText}>
                                    {index + 1}
                                </Text>

                            </View>

                            <Text style={styles.recommendationText}>
                                {item}
                            </Text>

                        </View>

                    ))}

                </LinearGradient>


                {/* Analyze Again */}

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                        navigation.navigate("ResumeAnalyzer")
                    }
                    style={styles.buttonWrapper}
                >

                    <LinearGradient
                        colors={[
                            COLORS.primaryLight,
                            COLORS.primary,
                            COLORS.blue,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.analyzeButton}
                    >

                        <Ionicons
                            name="refresh"
                            size={20}
                            color={COLORS.white}
                        />

                        <Text style={styles.buttonText}>
                            Analyze Another Resume
                        </Text>

                    </LinearGradient>

                </TouchableOpacity>

            </ScrollView>

        </View>
    );
};


// Score Card

const ScoreCard = ({
    icon,
    title,
    score,
}) => {

    return (
        <View style={styles.scoreSmallCard}>

            <View style={styles.smallIcon}>

                <Ionicons
                    name={icon}
                    size={18}
                    color={COLORS.purpleLight}
                />

            </View>

            <Text style={styles.smallTitle}>
                {title}
            </Text>

            <Text style={styles.smallScore}>
                {score}
            </Text>

            <Text style={styles.smallOutOf}>
                /100
            </Text>

        </View>
    );
};


// Section title

const SectionTitle = ({
    icon,
    title,
}) => {

    return (
        <View style={styles.sectionHeader}>

            <Ionicons
                name={icon}
                size={20}
                color={COLORS.purpleLight}
            />

            <Text style={styles.sectionTitle}>
                {title}
            </Text>

        </View>
    );
};


export default ResumeAnalysisResultScreen;


