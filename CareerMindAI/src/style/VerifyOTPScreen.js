import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#070B2D",
    },

    gradient: {
        flex: 1,
        paddingHorizontal: 24,
    },

    keyboard: {
        flex: 1,
    },

    glowTop: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: "#6D35FF",
        opacity: 0.08,
        top: -120,
        right: -100,
    },

    glowBottom: {
        position: "absolute",
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: "#3B82F6",
        opacity: 0.07,
        bottom: -100,
        left: -100,
    },

    header: {
        height: 60,
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
        borderColor: "#252D68",
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
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

    main: {
        flex: 1,
        alignItems: "center",
        paddingTop: 45,
    },

    iconOuter: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(109,53,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(139,92,246,0.16)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
    },

    iconCircle: {
        width: 95,
        height: 95,
        borderRadius: 48,
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#713CFF",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.45,
        shadowRadius: 20,
        elevation: 12,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "800",
    },

    subtitle: {
        color: "#7F88B1",
        fontSize: 12,
        marginTop: 10,
    },

    email: {
        color: "#A66BFF",
        fontSize: 12,
        fontWeight: "700",
        marginTop: 5,
    },

    otpContainer: {
        flexDirection: "row",
        gap: 8,
        marginTop: 30,
    },

    otpInput: {
        width: 45,
        height: 53,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#252D68",
        backgroundColor: "#111747",
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
    },

    otpInputActive: {
        borderColor: "#8B5CFF",
        backgroundColor: "#161B50",
    },

    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },

    timerText: {
        color: "#6F78A5",
        fontSize: 11,
    },

    resendText: {
        color: "#A66BFF",
        fontSize: 11,
        fontWeight: "700",
        marginLeft: 5,
    },

    verifyWrapper: {
        width: "100%",
        marginTop: 25,
    },

    verifyButton: {
        height: 54,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,

        shadowColor: "#713CFF",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
    },

    verifyText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    changeEmail: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 20,
    },

    changeEmailText: {
        color: "#A66BFF",
        fontSize: 11,
        fontWeight: "600",
    },

    securityBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(16,185,129,0.05)",
        borderWidth: 1,
        borderColor: "rgba(16,185,129,0.15)",
        borderRadius: 13,
        padding: 13,
        marginBottom: 18,
    },

    securityIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "rgba(16,185,129,0.08)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    securityContent: {
        flex: 1,
    },

    securityTitle: {
        color: "#D5D9EE",
        fontSize: 11,
        fontWeight: "700",
        marginBottom: 3,
    },

    securityText: {
        color: "#6F78A5",
        fontSize: 9.5,
    },
});

export default styles;