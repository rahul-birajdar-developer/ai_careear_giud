import { StyleSheet, StatusBar } from "react-native";
import COLORS from "../constants/Colors";

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

    jobRoleContainer: {
        marginBottom: 20,
    },

    jobRoleLabel: {
        color: "black",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },

    jobRoleInput: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 13,
        color: COLORS.background,
        fontSize: 15,
    },

});

export default styles;