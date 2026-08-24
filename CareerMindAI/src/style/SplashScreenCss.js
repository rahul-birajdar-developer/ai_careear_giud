import { StyleSheet } from "react-native";
import COLORS from "../constants/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        paddingVertical:38,
        justifyContent: "space-between",
        overflow: "hidden",
    },

    glowOne: {
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "#5725FF",
        opacity: 0.08,
        top: -100,
        right: -80,
    },

    glowTwo: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: "#168BFF",
        opacity: 0.06,
        bottom: 100,
        left: -100,
    },

    logoSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },

    logoGlow: {
        width: 200,
        height: 200,
        borderRadius: 75,
        backgroundColor: "rgba(111,53,255,0.12)",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#783CFF",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 35,
        elevation: 20,
    },

    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 52.5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },

    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 28,
    },

    aiText: {
        fontSize: 29,
        fontWeight: "800",
        color: "#B85CFF",
    },

    brandText: {
        fontSize: 29,
        fontWeight: "800",
        color: COLORS.text,
        marginLeft: 7,
    },

    tagline: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 9,
        letterSpacing: 0.4,
    },

    description: {
        color: "#727BAA",
        fontSize: 12,
        marginTop: 34,
    },

    bottomSection: {
        paddingBottom: 30,
    },

    welcomeText: {
        textAlign: "center",
        color: "#B9C0DF",
        fontSize: 13,
        marginBottom: 16,
    },

    getStartedButton: {
        height: 54,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,

        shadowColor: "#713CFF",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.45,
        shadowRadius: 15,
        elevation: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    }
});

export default styles;