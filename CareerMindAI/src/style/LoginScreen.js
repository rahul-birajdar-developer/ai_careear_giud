import { StyleSheet,StatusBar } from "react-native";
import COLORS from "../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },

    keyboardView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 35,
    },

    glowTop: {
        position: "absolute",
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: "#6635FF",
        opacity: 0.08,
        top: -100,
        right: -100,
    },

    glowBottom: {
        position: "absolute",
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: "#168BFF",
        opacity: 0.06,
        bottom: -100,
        left: -100,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },

    smallLogo: {
        width: 42,
        height: 42,
        borderRadius: 13,
        overflow: "hidden",
    },

    logoGradient: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    titleContainer: {
        alignItems: "center",
        marginTop: 45,
        marginBottom: 30,
    },

    title: {
        color: COLORS.text,
        fontSize: 25,
        fontWeight: "800",
    },

    subtitle: {
        color: COLORS.secondary,
        fontSize: 13,
        marginTop: 8,
    },

    switchContainer: {
        height: 50,
        backgroundColor: "#11163D",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: "row",
        padding: 4,
        marginBottom: 22,
    },

    activeSwitch: {
        flex: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    activeSwitchText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },

    inactiveSwitch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    inactiveSwitchText: {
        color: COLORS.secondary,
        fontSize: 13,
        fontWeight: "500",
    },

    inputContainer: {
        minHeight: 68,
        backgroundColor: "rgba(17,23,71,0.85)",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        marginBottom: 13,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    inputContent: {
        flex: 1,
    },

    inputLabel: {
        color: COLORS.muted,
        fontSize: 10,
        marginBottom: 3,
    },

    input: {
        color: COLORS.text,
        fontSize: 13,
        padding: 0,
        height: 25,
    },

    forgotContainer: {
        alignItems: "flex-end",
        marginTop: -3,
        marginBottom: 20,
    },

    forgotText: {
        color: "#A66BFF",
        fontSize: 11,
        fontWeight: "600",
    },

    loginButton: {
        height: 53,
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,

        shadowColor: "#713CFF",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.4,
        shadowRadius: 14,
        elevation: 9,
    },

    loginButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },

    orText: {
        color: COLORS.muted,
        fontSize: 11,
        marginHorizontal: 12,
    },

    socialRow: {
        flexDirection: "row",
        gap: 10,
    },

    socialButton: {
        flex: 1,
        height: 48,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: "rgba(17,23,71,0.8)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
    },

    googleIcon: {
        color: "#4285F4",
        fontSize: 19,
        fontWeight: "800",
    },

    socialText: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: "600",
    },

    bottomText: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },

    bottomNormal: {
        color: COLORS.muted,
        fontSize: 11,
    },

    signupLink: {
        color: "#A66BFF",
        fontSize: 11,
        fontWeight: "700",
    },
});

export default styles;