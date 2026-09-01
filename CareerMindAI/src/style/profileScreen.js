import { StyleSheet, StatusBar } from "react-native";
import COLORS from "../constants/Colors"

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
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

    settingsButton: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: COLORS.card,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    profileCard: {
        borderRadius: 23,
        padding: 18,
        marginBottom: 27,
    },

    profileTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatarContainer: {
        position: "relative",
        marginRight: 15,
    },

    avatar: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.6)",
    },

    avatarText: {
        fontSize: 31,
        fontWeight: "800",
        color: COLORS.white,
    },

    editAvatar: {
        position: "absolute",
        right: -2,
        bottom: 1,
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    profileInfo: {
        flex: 1,
    },

    profileName: {
        fontSize: 21,
        fontWeight: "800",
        color: COLORS.white,
    },

    profileRole: {
        fontSize: 11.5,
        color: "#E2E7FF",
        marginTop: 4,
    },

    verifiedRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    verifiedText: {
        fontSize: 10.5,
        color: "#FFFFFF",
        marginLeft: 5,
        fontWeight: "600",
    },

    editProfileButton: {
        height: 43,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.16)",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },

    editProfileText: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: "700",
        marginLeft: 7,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 13,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 13,
    },

    viewText: {
        fontSize: 12,
        color: COLORS.purple,
        fontWeight: "700",
    },

    progressCard: {
        backgroundColor: COLORS.card,
        borderRadius: 19,
        padding: 17,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 25,
    },

    progressTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    progressLabel: {
        color: COLORS.muted,
        fontSize: 12,
        marginBottom: 4,
    },

    progressNumber: {
        color: COLORS.white,
        fontSize: 29,
        fontWeight: "800",
    },

    progressCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(59,130,246,0.12)",
        justifyContent: "center",
        alignItems: "center",
    },

    progressBarBackground: {
        height: 7,
        backgroundColor: "#1C2C50",
        borderRadius: 5,
        overflow: "hidden",
        marginTop: 15,
    },

    progressBar: {
        height: 7,
        backgroundColor: COLORS.blue,
        borderRadius: 5,
    },

    progressHint: {
        color: COLORS.muted,
        fontSize: 11,
        marginTop: 10,
    },

    infoCard: {
        backgroundColor: COLORS.card,
        borderRadius: 19,
        paddingHorizontal: 16,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },

    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "rgba(59,130,246,0.11)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    infoContent: {
        flex: 1,
    },

    infoLabel: {
        color: COLORS.muted,
        fontSize: 11,
        marginBottom: 3,
    },

    infoValue: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },

    skillsCard: {
        backgroundColor: COLORS.card,
        borderRadius: 19,
        padding: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: "row",
        flexWrap: "wrap",
    },

    skillChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#172850",
        paddingHorizontal: 11,
        paddingVertical: 9,
        borderRadius: 11,
        marginRight: 8,
        marginBottom: 8,
    },

    skillText: {
        color: COLORS.text,
        fontSize: 11,
        fontWeight: "600",
        marginLeft: 5,
    },

    addSkill: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 11,
        paddingVertical: 9,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#3B2C73",
        borderStyle: "dashed",
        marginBottom: 8,
    },

    addSkillText: {
        color: COLORS.purple,
        fontSize: 11,
        fontWeight: "700",
        marginLeft: 4,
    },

    menuCard: {
        backgroundColor: COLORS.card,
        borderRadius: 19,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 22,
    },

    menuItem: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
    },

    menuIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "rgba(59,130,246,0.11)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    dangerIcon: {
        backgroundColor: "rgba(239,68,68,0.1)",
    },

    menuContent: {
        flex: 1,
    },

    menuTitle: {
        fontSize: 13,
        color: COLORS.white,
        fontWeight: "700",
    },

    menuSubtitle: {
        fontSize: 10.5,
        color: COLORS.muted,
        marginTop: 3,
    },

    dangerText: {
        color: COLORS.danger,
    },

    menuDivider: {
        height: 1,
        backgroundColor: COLORS.border,
    },

    logoutButton: {
        height: 54,
        borderRadius: 16,
        backgroundColor: "rgba(239,68,68,0.08)",
        borderWidth: 1,
        borderColor: "rgba(239,68,68,0.18)",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    logoutText: {
        color: COLORS.danger,
        fontSize: 14,
        fontWeight: "800",
        marginLeft: 8,
    },

    version: {
        textAlign: "center",
        color: "#526184",
        fontSize: 10,
        marginTop: 18,
    },

});

export default styles;