import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
    StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";

import api from "../../services/api";

const ResumeAnalyzerScreen = ({ navigation }) => {

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickResume = async () => {

        try {

            const result =
                await DocumentPicker.getDocumentAsync({
                    type: "application/pdf",
                    copyToCacheDirectory: true,
                });

            if (result.canceled) {
                return;
            }

            const file = result.assets[0];

            setResume(file);

        } catch (error) {

            console.log("Document picker error:", error);

            Alert.alert(
                "Error",
                "Unable to select resume."
            );
        }
    };

    const analyzeResume = async () => {

        if (!resume) {

            Alert.alert(
                "Resume Required",
                "Please upload your resume first."
            );

            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", {
                uri: resume.uri,
                name: resume.name || "resume.pdf",
                type: resume.mimeType || "application/pdf",
            });

            console.log("Uploading resume...");

            const response = await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            console.log(
                "Resume analysis:",
                response.data
            );

            if (response.data?.success) {

                navigation.navigate(
                    "ResumeAnalysisResult",
                    {
                        result: response.data.data,
                    }
                );

            } else {

                Alert.alert(
                    "Analysis Failed",
                    response.data?.message ||
                    "Unable to analyze resume."
                );
            }

        } catch (error) {

            console.log(
                "Resume analysis error:",
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Error",
                error.response?.data?.message ||
                "Something went wrong while analyzing your resume."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* Header */}

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#17204D"
                    />
                </TouchableOpacity>

                <View>
                    <Text style={styles.headerTitle}>
                        Resume Analyzer
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        AI-powered resume analysis
                    </Text>
                </View>

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Hero */}

                <LinearGradient
                    colors={[
                        "#9B5CFF",
                        "#6335FF",
                        "#3B82F6",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroCard}
                >

                    <View style={styles.aiIcon}>
                        <Ionicons
                            name="sparkles"
                            size={28}
                            color="#FFFFFF"
                        />
                    </View>

                    <Text style={styles.heroTitle}>
                        Analyze Your Resume
                    </Text>

                    <Text style={styles.heroText}>
                        Get an AI-powered review of your
                        resume and discover how to improve
                        your chances of getting hired.
                    </Text>

                </LinearGradient>


                {/* What AI checks */}

                <Text style={styles.sectionTitle}>
                    What AI will analyze
                </Text>

                <View style={styles.features}>

                    <Feature
                        icon="document-text-outline"
                        title="Resume Quality"
                        text="Structure, formatting and content"
                    />

                    <Feature
                        icon="code-slash-outline"
                        title="Skills"
                        text="Technical and professional skills"
                    />

                    <Feature
                        icon="briefcase-outline"
                        title="Career Match"
                        text="Alignment with your career goals"
                    />

                    <Feature
                        icon="search-outline"
                        title="ATS Compatibility"
                        text="Keywords and ATS-friendly content"
                    />

                </View>


                {/* Upload */}

                <Text style={styles.sectionTitle}>
                    Upload Resume
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={pickResume}
                    style={styles.uploadBox}
                >

                    <View style={styles.uploadIcon}>
                        <Ionicons
                            name={
                                resume
                                    ? "document-text"
                                    : "cloud-upload-outline"
                            }
                            size={30}
                            color="#6335FF"
                        />
                    </View>

                    {resume ? (

                        <>
                            <Text style={styles.fileName}>
                                {resume.name}
                            </Text>

                            <Text style={styles.fileText}>
                                Resume selected
                            </Text>

                            <Text style={styles.changeText}>
                                Tap to change
                            </Text>
                        </>

                    ) : (

                        <>
                            <Text style={styles.uploadTitle}>
                                Upload your resume
                            </Text>

                            <Text style={styles.uploadText}>
                                PDF files only
                            </Text>
                        </>

                    )}

                </TouchableOpacity>


                {/* Analyze button */}

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={analyzeResume}
                    disabled={loading}
                >

                    <LinearGradient
                        colors={[
                            "#9B5CFF",
                            "#6335FF",
                            "#3B82F6",
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.analyzeButton}
                    >

                        {loading ? (

                            <>

                                <ActivityIndicator
                                    color="#FFFFFF"
                                />

                                <Text style={styles.buttonText}>
                                    Analyzing Resume...
                                </Text>

                            </>

                        ) : (

                            <>

                                <Ionicons
                                    name="sparkles"
                                    size={20}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.buttonText}>
                                    Analyze Resume
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={20}
                                    color="#FFFFFF"
                                />

                            </>

                        )}

                    </LinearGradient>

                </TouchableOpacity>

            </ScrollView>

        </View>
    );
};


const Feature = ({
    icon,
    title,
    text,
}) => {

    return (
        <View style={styles.feature}>

            <View style={styles.featureIcon}>

                <Ionicons
                    name={icon}
                    size={21}
                    color="#6335FF"
                />

            </View>

            <View style={{ flex: 1 }}>

                <Text style={styles.featureTitle}>
                    {title}
                </Text>

                <Text style={styles.featureText}>
                    {text}
                </Text>

            </View>

        </View>
    );
};


export default ResumeAnalyzerScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F7F8FF",
        paddingTop: StatusBar.currentHeight || 0,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: "#FFFFFF",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F1F2FA",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    headerTitle: {
        fontSize: 21,
        fontWeight: "700",
        color: "#17204D",
    },

    headerSubtitle: {
        fontSize: 12,
        color: "#69739D",
        marginTop: 2,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    heroCard: {
        borderRadius: 22,
        padding: 22,
        marginBottom: 25,
    },

    aiIcon: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },

    heroTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 8,
    },

    heroText: {
        color: "#FFFFFF",
        fontSize: 14,
        lineHeight: 21,
        opacity: 0.9,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#17204D",
        marginBottom: 13,
    },

    features: {
        marginBottom: 25,
    },

    feature: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
    },

    featureIcon: {
        width: 44,
        height: 44,
        borderRadius: 13,
        backgroundColor: "#F0ECFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 13,
    },

    featureTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#17204D",
    },

    featureText: {
        fontSize: 12,
        color: "#69739D",
        marginTop: 3,
    },

    uploadBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: "#DAD6FF",
        borderStyle: "dashed",
        padding: 25,
        alignItems: "center",
        marginBottom: 20,
    },

    uploadIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F0ECFF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    uploadTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#17204D",
    },

    uploadText: {
        fontSize: 12,
        color: "#69739D",
        marginTop: 5,
    },

    fileName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#17204D",
        textAlign: "center",
    },

    fileText: {
        fontSize: 12,
        color: "#4CAF50",
        marginTop: 5,
    },

    changeText: {
        fontSize: 12,
        color: "#6335FF",
        marginTop: 8,
        fontWeight: "600",
    },

    analyzeButton: {
        height: 58,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

});