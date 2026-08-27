import { StyleSheet, StatusBar } from "react-native";
import COLORS from "../constants/Colors";

const styles = StyleSheet.create({
    containerFirst: {
        flex: 1,
        backgroundColor: "#070B2D",
    },

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    keyboard: {
        flex: 1,
    },

    content: {
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

    titleBox: {
        alignItems: "center",
        marginTop: 32,
        marginBottom: 25,
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
        marginBottom: 20,
    },

    activeSwitch: {
        flex: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    activeText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },

    inactiveSwitch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    inactiveText: {
        color: COLORS.secondary,
        fontSize: 13,
    },

    inputContainer: {
        minHeight: 64,
        backgroundColor: "rgba(17,23,71,0.85)",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        marginBottom: 11,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    inputContent: {
        flex: 1,
    },

    label: {
        color: COLORS.muted,
        fontSize: 10,
        marginBottom: 3,
    },

    input: {
        color: "#fff",
        fontSize: 13,
        padding: 0,
        height: 24,
    },

    terms: {
        color: COLORS.muted,
        fontSize: 10.5,
        lineHeight: 17,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 18,
    },

    link: {
        color: "#A66BFF",
        fontWeight: "600",
    },

    signupButton: {
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

    signupButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },

    dividerBox: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 21,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },

    or: {
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
        height: 47,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: "rgba(17,23,71,0.8)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
    },

    google: {
        color: "#4285F4",
        fontSize: 19,
        fontWeight: "800",
    },

    socialText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },

    loginTextBox: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 22,
    },

    normalText: {
        color: COLORS.muted,
        fontSize: 11,
    },

    loginLink: {
        color: "#A66BFF",
        fontSize: 11,
        fontWeight: "700",
    },


});

export default styles;