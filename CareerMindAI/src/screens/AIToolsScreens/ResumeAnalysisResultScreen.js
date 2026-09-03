import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import COLORS from "../../constants/Colors";

const ResumeAnalysisResultScreen = ({ navigation, route }) => {

    const result = route?.params?.result || {};

    // Temporary sample data
    // Later these values will come from your backend AI response
    const score = result.atsScore ;
    const atsScore = result.atsScore ;
    const atsLabel = result.atsLabel ;
    const keywordMatch = result.keywordMatch.pct ;
    const strengths = result.strengths ;

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
                                {atsLabel+" ATS Score"}
                            </Text>

                            <Text style={styles.scoreMessageText}>
                                Your resume has a strong foundation.
                                A few improvements can make it stronger.
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


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 15,
        backgroundColor: COLORS.background,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },

    headerTextContainer: {
        flex: 1,
        marginLeft: 12,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.text,
    },

    headerSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    aiBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },

    content: {
        padding: 18,
        paddingBottom: 45,
    },

    scoreCard: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 15,
    },

    scoreTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    scoreLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.white,
    },

    scoreDescription: {
        fontSize: 12,
        color: COLORS.white,
        opacity: 0.75,
        marginTop: 4,
    },

    sparkleCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },

    scoreRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 22,
    },

    scoreCircle: {
        width: 105,
        height: 105,
        borderRadius: 53,
        borderWidth: 7,
        borderColor: "rgba(255,255,255,0.3)",
        alignItems: "center",
        justifyContent: "center",
    },

    scoreNumber: {
        fontSize: 34,
        fontWeight: "900",
        color: COLORS.white,
    },

    scoreOutOf: {
        fontSize: 11,
        color: COLORS.white,
        opacity: 0.8,
    },

    scoreMessage: {
        flex: 1,
        marginLeft: 18,
    },

    scoreMessageTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 6,
    },

    scoreMessageText: {
        fontSize: 12,
        lineHeight: 18,
        color: COLORS.white,
        opacity: 0.8,
    },

    smallCards: {
        flexDirection: "row",
        gap: 9,
        marginBottom: 25,
    },

    scoreSmallCard: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 17,
        padding: 13,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    smallIcon: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: COLORS.background2,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    smallTitle: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    smallScore: {
        fontSize: 21,
        fontWeight: "800",
        color: COLORS.text,
        marginTop: 4,
    },

    smallOutOf: {
        fontSize: 10,
        color: COLORS.muted,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 11,
        marginTop: 3,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.text,
        marginLeft: 8,
    },

    card: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        marginBottom: 22,
    },

    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
    },

    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
    },

    greenIcon: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: "rgba(34,197,94,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    orangeIcon: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: "rgba(245,158,11,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    listText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textSecondary,
    },

    skillContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 9,
    },

    skillBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.background2,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 8,
    },

    skillText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 5,
    },

    cardDescription: {
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textSecondary,
        marginBottom: 14,
    },

    missingSkill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(168,85,247,0.1)",
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 8,
    },

    missingSkillText: {
        fontSize: 12,
        color: COLORS.primaryLight,
        marginLeft: 5,
    },

    recommendationCard: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        marginBottom: 25,
    },

    recommendationItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },

    numberCircle: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    numberText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "800",
    },

    recommendationText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textSecondary,
    },

    buttonWrapper: {
        marginTop: 3,
    },

    analyzeButton: {
        height: 56,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "800",
    },

});