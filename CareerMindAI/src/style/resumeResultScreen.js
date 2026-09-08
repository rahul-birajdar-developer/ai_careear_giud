import { StyleSheet, StatusBar } from "react-native";
import COLORS from "../constants/Colors";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 15,
        backgroundColor: COLORS.background,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },

    headerTextContainer: {
        flex: 1,
        marginLeft: 12,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.text,
    },

    headerSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    aiBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },

    content: {
        padding: 18,
        paddingBottom: 45,
    },

    scoreCard: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 15,
    },

    scoreTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    scoreLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.white,
    },

    scoreDescription: {
        fontSize: 12,
        color: COLORS.white,
        opacity: 0.75,
        marginTop: 4,
    },

    sparkleCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },

    scoreRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 22,
    },

    scoreCircle: {
        width: 105,
        height: 105,
        borderRadius: 53,
        borderWidth: 7,
        borderColor: "rgba(255,255,255,0.3)",
        alignItems: "center",
        justifyContent: "center",
    },

    scoreNumber: {
        fontSize: 34,
        fontWeight: "900",
        color: COLORS.white,
    },

    scoreOutOf: {
        fontSize: 11,
        color: COLORS.white,
        opacity: 0.8,
    },

    scoreMessage: {
        flex: 1,
        marginLeft: 18,
    },

    scoreMessageTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 6,
    },

    scoreMessageText: {
        fontSize: 12,
        lineHeight: 18,
        color: COLORS.white,
        opacity: 0.8,
    },

    smallCards: {
        flexDirection: "row",
        gap: 9,
        marginBottom: 25,
    },

    scoreSmallCard: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 17,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    smallIcon: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: COLORS.background2,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

    smallTitle: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    smallScore: {
        fontSize: 21,
        fontWeight: "800",
        color: COLORS.text,
        marginTop: 4,
    },

    smallOutOf: {
        fontSize: 10,
        color: COLORS.muted,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 11,
        marginTop: 3,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.text,
        marginLeft: 8,
    },

    card: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        marginBottom: 22,
    },


    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
    },

    greenIcon: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: "rgba(34,197,94,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    orangeIcon: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: "rgba(245,158,11,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    listText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textSecondary,
    },

    skillContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 9,
    },

    skillBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.background2,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 8,
    },

    skillText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 5,
    },

    cardDescription: {
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textSecondary,
        marginBottom: 14,
    },

    missingSkill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(168,85,247,0.1)",
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 8,
    },

    missingSkillText: {
        fontSize: 12,
        color: COLORS.primaryLight,
        marginLeft: 5,
    },

    recommendationCard: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        marginBottom: 25,
    },

    recommendationItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },

    numberCircle: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    numberText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "800",
    },

    recommendationText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textSecondary,
    },

    buttonWrapper: {
        marginTop: 3,
    },

    analyzeButton: {
        height: 56,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "800",
    },

});

export default styles;