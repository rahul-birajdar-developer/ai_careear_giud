import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#05091F",
    },

    keyboardView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: 70,
        paddingBottom: 30,
    },


    /* Header */

    header: {
        alignItems: "center",
        marginBottom: 30,
    },

    welcome: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "800",
        marginBottom: 7,
    },

    subtitle: {
        color: "#8F95BB",
        fontSize: 12,
    },


    /* Login / Signup */

    switchContainer: {
        flexDirection: "row",
        height: 48,
        backgroundColor: "#111735",
        borderRadius: 14,
        padding: 4,
        marginBottom: 20,
    },

    switchButton: {
        flex: 1,
        borderRadius: 11,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },

    activeSwitch: {
        elevation: 5,
    },

    activeSwitchGradient: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 11,
    },

    activeSwitchText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    switchText: {
        color: "#8A90B5",
        fontSize: 13,
        fontWeight: "500",
    },


    /* Inputs */

    inputContainer: {
        minHeight: 66,
        backgroundColor: "#101631",
        borderWidth: 1,
        borderColor: "rgba(119, 105, 220, 0.22)",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginBottom: 12,
    },

    inputContent: {
        flex: 1,
        marginLeft: 11,
    },

    inputLabel: {
        color: "#737A9F",
        fontSize: 9,
        marginBottom: 3,
    },

    input: {
        color: "#FFFFFF",
        fontSize: 13,
        paddingVertical: 3,
    },


    /* Forgot */

    forgotContainer: {
        alignItems: "flex-end",
        marginTop: -3,
        marginBottom: 17,
    },

    forgot: {
        color: "#A855F7",
        fontSize: 10,
        fontWeight: "600",
    },


    /* Main button */

    mainButtonWrapper: {
        width: "100%",
        marginTop: 3,
    },

    mainButton: {
        height: 49,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,

        shadowColor: "#7C3AED",
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 5,
        },

        elevation: 8,
    },

    mainButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    arrow: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },


    /* Divider */

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 22,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
    },

    orText: {
        color: "#737A9F",
        fontSize: 10,
        marginHorizontal: 12,
    },


    /* Social */

    socialContainer: {
        flexDirection: "row",
        gap: 10,
    },

    socialButton: {
        flex: 1,
        height: 44,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.09)",
        backgroundColor: "#0D1330",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
    },

    googleIcon: {
        color: "#4285F4",
        fontSize: 18,
        fontWeight: "800",
    },

    socialText: {
        color: "#D7D9EA",
        fontSize: 12,
        fontWeight: "500",
    },


    /* Bottom */

    bottomContainer: {
        alignItems: "center",
        marginTop: 25,
    },

    bottomText: {
        color: "#777D9F",
        fontSize: 11,
    },

    link: {
        color: "#A855F7",
        fontWeight: "700",
    },

});

export default styles;