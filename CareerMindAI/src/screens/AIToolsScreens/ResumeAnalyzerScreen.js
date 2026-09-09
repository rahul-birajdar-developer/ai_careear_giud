import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import styles from "../../style/resumeAnalyzeScreen";

import api from "../../services/api";

const ResumeAnalyzerScreen = ({ navigation }) => {

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    // job title
    const [jobTitle, setJobTitle] = useState("");

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

            formData.append("resumeFile", {
                uri: resume.uri,
                name: resume.name || "resume.pdf",
                type: resume.mimeType || "application/pdf",
                jobTitle:resume.jobTitle,
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
                response.data.data.resumeData
            );

            if (response.data?.success) {

                navigation.navigate(
                    "ResumeAnalysisResult",
                    {
                        result: response.data.data.resumeData,
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

                <View style={styles.jobRoleContainer}>
                    <Text style={styles.jobRoleLabel}>
                        Target Job Role
                    </Text>

                    <TextInput
                        value={jobTitle}
                        onChangeText={setJobTitle}
                        placeholder="Example: Frontend Developer, Java Developer"
                        placeholderTextColor={"#6F78A5"}
                        style={styles.jobRoleInput}
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


