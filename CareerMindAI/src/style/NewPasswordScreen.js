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
        paddingTop: 25,
    },

    iconOuter: {
        width: 145,
        height: 145,
        borderRadius: 73,
        backgroundColor: "rgba(109,53,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(139,92,246,0.16)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 22,
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
        marginBottom: 9,
    },

    subtitle: {
        color: "#7F88B1",
        fontSize: 11.5,
        lineHeight: 18,
    },

    inputContainer: {
        width: "100%",
        height: 58,
        backgroundColor: "#111747",
        borderWidth: 1,
        borderColor: "#252D68",
        borderRadius: 12,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
        marginTop: 14,
    },

    input: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 13,
        height: "100%",
    },

    requirements: {
        width: "100%",
        backgroundColor: "rgba(17,23,71,0.55)",
        borderWidth: 1,
        borderColor: "#252D68",
        borderRadius: 12,
        padding: 13,
        marginTop: 14,
    },

    requirementTitle: {
        color: "#C6CBE3",
        fontSize: 11,
        fontWeight: "700",
        marginBottom: 9,
    },

    requirement: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    requirementText: {
        color: "#6F78A5",
        fontSize: 10,
        marginLeft: 7,
    },

    requirementValid: {
        color: "#10B981",
    },

    buttonWrapper: {
        width: "100%",
        marginTop: 18,
    },

    button: {
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

    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    bottom: {
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },

    bottomText: {
        color: "#69739D",
        fontSize: 10,
    },
});

export default styles