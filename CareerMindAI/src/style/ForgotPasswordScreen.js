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

    content: {
        flexGrow: 1,
        paddingTop: 18,
        paddingBottom: 30,
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

    illustrationContainer: {
        height: 230,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    outerCircle: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: "rgba(109,53,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(139,92,246,0.16)",
        alignItems: "center",
        justifyContent: "center",
    },

    lockCircle: {
        width: 105,
        height: 105,
        borderRadius: 53,
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

    smallIcon: {
        position: "absolute",
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: "#111747",
        borderWidth: 1,
        borderColor: "#252D68",
        alignItems: "center",
        justifyContent: "center",
        left: 38,
        top: 38,
    },

    smallIconTwo: {
        position: "absolute",
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: "#111747",
        borderWidth: 1,
        borderColor: "#252D68",
        alignItems: "center",
        justifyContent: "center",
        right: 38,
        bottom: 35,
    },

    heading: {
        alignItems: "center",
        marginBottom: 25,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "800",
    },

    subtitle: {
        color: "#A7AED0",
        fontSize: 13,
        marginTop: 8,
    },

    description: {
        color: "#747DA7",
        fontSize: 12,
        lineHeight: 19,
        textAlign: "center",
        marginTop: 12,
        maxWidth: 340,
    },

    inputContainer: {
        minHeight: 67,
        backgroundColor: "rgba(17,23,71,0.85)",
        borderWidth: 1,
        borderColor: "#252D68",
        borderRadius: 12,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },

    inputContent: {
        flex: 1,
    },

    label: {
        color: "#6F78A5",
        fontSize: 10,
        marginBottom: 3,
    },

    input: {
        color: "#FFFFFF",
        fontSize: 13,
        height: 25,
        padding: 0,
    },

    sendButton: {
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

    sendText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    backLogin: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 22,
    },

    backLoginText: {
        color: "#A66BFF",
        fontSize: 12,
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
        marginTop: 28,
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
        lineHeight: 15,
    },
});

export default styles;