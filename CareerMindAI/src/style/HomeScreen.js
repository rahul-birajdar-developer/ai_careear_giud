import { StyleSheet } from "react-native";
import COLORS from "../constants/Colors";
import { StatusBar } from "react-native";

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0
    },

    /* ---------- HEADER ---------- */

    header: {
        paddingHorizontal: 18,
        paddingTop: 8,
        paddingBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "800",
        letterSpacing: -0.3,
    },

    profileButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        padding: 2,
        borderWidth: 1,
        borderColor: "#8B5CF6",
    },

    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },

    /* ---------- SCROLL ---------- */

    scrollContent: {
        paddingHorizontal: 17,
        paddingBottom: 110,
    },

    /* ---------- SEARCH ---------- */

    searchContainer: {
        height: 42,
        borderRadius: 12,
        backgroundColor: "#080F32",
        borderWidth: 1,
        borderColor: COLORS.border,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 13,

        marginBottom: 16,
    },

    searchInput: {
        flex: 1,
        color: COLORS.white,
        fontSize: 12,
        marginLeft: 8,
    },

    /* ---------- AI BANNER ---------- */

    aiBanner: {
        height: 126,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#4C2BA3",

        overflow: "hidden",
        flexDirection: "row",

        marginBottom: 20,

        position: "relative",
    },

    bannerContent: {
        paddingLeft: 15,
        paddingTop: 18,
        zIndex: 5,
    },

    bannerTitle: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 17,
    },

    exploreButton: {
        marginTop: 14,
        backgroundColor: "#7438FF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: "flex-start",

        shadowColor: "#7C3AED",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },

    exploreText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: "700",
    },

    bannerGlow: {
        position: "absolute",
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#7138FF30",
        right: 50,
        top: -30,
    },

    /* ---------- ROBOT ---------- */

    robotContainer: {
        position: "absolute",
        right: 16,
        bottom: 5,
        width: 100,
        height: 105,
        alignItems: "center",
    },

    robotHead: {
        width: 68,
        height: 52,
        borderRadius: 17,
        backgroundColor: "#B6C7FF",
        borderWidth: 3,
        borderColor: "#6E75FF",

        position: "absolute",
        top: 10,

        alignItems: "center",
        justifyContent: "center",
    },

    robotEyeLeft: {
        position: "absolute",
        left: 17,
        top: 18,
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#4728FF",
    },

    robotEyeRight: {
        position: "absolute",
        right: 17,
        top: 18,
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#4728FF",
    },

    robotSmile: {
        position: "absolute",
        bottom: 9,
        width: 19,
        height: 6,
        borderBottomWidth: 2,
        borderColor: "#4728FF",
        borderRadius: 10,
    },

    robotBody: {
        position: "absolute",
        bottom: 0,
        width: 57,
        height: 42,
        borderRadius: 15,
        backgroundColor: "#8EA4FF",
        borderWidth: 3,
        borderColor: "#5F67FF",
    },

    robotArmLeft: {
        position: "absolute",
        width: 14,
        height: 35,
        borderRadius: 8,
        backgroundColor: "#7A8EFF",
        left: 3,
        bottom: 2,
        transform: [{ rotate: "18deg" }],
    },

    robotArmRight: {
        position: "absolute",
        width: 14,
        height: 35,
        borderRadius: 8,
        backgroundColor: "#7A8EFF",
        right: 3,
        bottom: 2,
        transform: [{ rotate: "-18deg" }],
    },

    /* ---------- SECTION ---------- */

    sectionTitle: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 10,
    },

    /* ---------- GRID ---------- */

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    actionWrapper: {
        width: "31.8%",
        marginBottom: 10,
    },

    actionCard: {
        height: 88,
        borderRadius: 11,
        borderWidth: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 4,
    },

    actionIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",

        marginBottom: 7,
    },

    actionText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 14,
    },

    /* ---------- AI TIP ---------- */

    tipCard: {
        minHeight: 78,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: COLORS.border,

        marginTop: 7,

        padding: 13,

        flexDirection: "row",
        alignItems: "center",
    },

    tipIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#F59E0B18",

        alignItems: "center",
        justifyContent: "center",

        marginRight: 11,
    },

    tipContent: {
        flex: 1,
    },

    tipTitle: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 4,
    },

    tipText: {
        color: COLORS.subText,
        fontSize: 10,
        lineHeight: 15,
    },

    /* ---------- BOTTOM NAV ---------- */

    bottomNav: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,

        height: 70,

        backgroundColor: "#070D2D",

        borderTopWidth: 1,
        borderTopColor: "#1B2450",

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        paddingBottom: 5,
    },

    bottomItem: {
        width: 65,
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    bottomIcon: {
        width: 40,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
    },

    bottomIconActive: {
        backgroundColor: "#7C3AED18",
    },

    bottomLabel: {
        color: COLORS.subText,
        fontSize: 9,
        marginTop: 2,
    },

    bottomLabelActive: {
        color: COLORS.purpleLight,
        fontWeight: "700",
    },

    startCareerCard: {
        borderRadius: 16,
        padding: 16,
        marginTop: 14,
        marginBottom: 14,

        borderWidth: 1,
        borderColor: "#343B78",
    },

    startCareerTop: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    rocketBox: {
        width: 46,
        height: 46,
        borderRadius: 13,

        backgroundColor: "#7C3AED25",

        alignItems: "center",
        justifyContent: "center",

        marginRight: 12,
    },

    startCareerTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 5,
    },

    startCareerDescription: {
        color: "#AEB7D8",
        fontSize: 11,
        lineHeight: 16,
    },

    startFeatures: {
        flexDirection: "row",
        flexWrap: "wrap",

        marginTop: 14,
        marginBottom: 14,
    },

    featureItem: {
        flexDirection: "row",
        alignItems: "center",

        marginRight: 14,
        marginBottom: 5,
    },

    featureText: {
        color: "#B8C0DD",
        fontSize: 10,
        marginLeft: 5,
    },

    analyzeButton: {
        height: 42,

        borderRadius: 10,

        backgroundColor: "#7138FF",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 8,

        shadowColor: "#7C3AED",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    analyzeButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },


    /* ================= CAREER PROGRESS ================= */

    progressCard: {
        backgroundColor: "#0B1438",

        borderWidth: 1,
        borderColor: "#202C5A",

        borderRadius: 16,

        padding: 16,

        marginTop: 14,
        marginBottom: 14,
    },

    progressHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 16,
    },

    sectionSubtitle: {
        color: "#7F8BB5",
        fontSize: 10,
        marginTop: 3,
    },

    scoreCircle: {
        width: 52,
        height: 52,

        borderRadius: 26,

        borderWidth: 4,
        borderColor: "#8B5CF6",

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#171547",
    },

    scoreText: {
        color: "#A78BFA",
        fontSize: 13,
        fontWeight: "800",
    },

    progressItem: {
        marginBottom: 12,
    },

    progressLabelRow: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: 6,
    },

    progressLabel: {
        color: "#B8C0DD",
        fontSize: 10.5,
    },

    progressValue: {
        color: "#FFFFFF",
        fontSize: 10.5,
        fontWeight: "700",
    },

    progressBar: {
        height: 5,

        backgroundColor: "#1B2447",

        borderRadius: 5,

        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 5,
    },

    viewAnalysisButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        marginTop: 4,
        paddingTop: 10,

        borderTopWidth: 1,
        borderTopColor: "#20294F",
    },

    viewAnalysisText: {
        color: "#A78BFA",
        fontSize: 11,
        fontWeight: "700",
        marginRight: 5,
    },


    /* ================= CONTINUE LEARNING ================= */

    learningCard: {
        backgroundColor: "#0B1438",

        borderWidth: 1,
        borderColor: "#202C5A",

        borderRadius: 16,

        padding: 16,

        marginBottom: 14,
    },

    learningHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 14,
    },

    seeAllText: {
        color: "#A78BFA",
        fontSize: 10.5,
        fontWeight: "700",
    },

    learningContent: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#111B42",

        borderRadius: 12,

        padding: 11,

        borderWidth: 1,
        borderColor: "#222E5B",
    },

    reactIcon: {
        width: 46,
        height: 46,

        borderRadius: 12,

        backgroundColor: "#0D2538",

        alignItems: "center",
        justifyContent: "center",

        marginRight: 11,
    },

    learningTitle: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "800",
    },

    learningSubtitle: {
        color: "#7F8BB5",
        fontSize: 9.5,
        marginTop: 3,
        marginBottom: 7,
    },

    learningProgressRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    learningProgressBar: {
        flex: 1,
        height: 5,

        backgroundColor: "#222B50",

        borderRadius: 5,

        overflow: "hidden",

        marginRight: 8,
    },

    learningProgressFill: {
        height: "100%",

        backgroundColor: "#8B5CF6",

        borderRadius: 5,
    },

    learningPercentage: {
        color: "#A78BFA",
        fontSize: 9,
        fontWeight: "700",
    },

    learningArrow: {
        width: 32,
        height: 32,

        borderRadius: 10,

        backgroundColor: "#7138FF",

        alignItems: "center",
        justifyContent: "center",

        marginLeft: 8,
    },

});

export default styles;