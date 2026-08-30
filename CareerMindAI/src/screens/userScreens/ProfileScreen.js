import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
    background: "#07132F",
    card: "#101F43",
    card2: "#142653",
    primary: "#6335FF",
    purple: "#9B5CFF",
    blue: "#3B82F6",
    white: "#FFFFFF",
    text: "#DDE5FF",
    muted: "#8794B8",
    border: "#24345F",
    danger: "#EF4444",
};

const ProfileScreen = ({ navigation }) => {

    // Later you can replace these with API/user data
    const user = {
        name: "Rahul Birajdar",
        email: "rahul@gmail.com",
        phone: "+91 9876543210",
        role: "Computer Engineering Student",
        profileImage: null,
        skills: [
            "React Native",
            "JavaScript",
            "Python",
        ],
    };

    const handleLogout = () => {

        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {

                        try {
                            await AsyncStorage.multiRemove([
                                "token",
                                "user",
                            ]);

                            navigation.replace("Login");

                        } catch (error) {
                            console.log(
                                "Logout error:",
                                error
                            );
                        }
                    },
                },
            ]
        );
    };

    const MenuItem = ({
        icon,
        title,
        subtitle,
        onPress,
        danger = false,
    }) => {

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.menuItem}
                onPress={onPress}
            >

                <View
                    style={[
                        styles.menuIcon,
                        danger && styles.dangerIcon,
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={21}
                        color={
                            danger
                                ? COLORS.danger
                                : COLORS.blue
                        }
                    />
                </View>

                <View style={styles.menuContent}>

                    <Text
                        style={[
                            styles.menuTitle,
                            danger && styles.dangerText,
                        ]}
                    >
                        {title}
                    </Text>

                    {subtitle && (
                        <Text style={styles.menuSubtitle}>
                            {subtitle}
                        </Text>
                    )}

                </View>

                <Ionicons
                    name="chevron-forward"
                    size={19}
                    color={COLORS.muted}
                />

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Header */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.smallTitle}>
                            CAREERMIND AI
                        </Text>

                        <Text style={styles.title}>
                            My Profile
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() =>
                            navigation.navigate("Settings")
                        }
                    >
                        <Ionicons
                            name="settings-outline"
                            size={22}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>

                </View>


                {/* Profile Card */}

                <LinearGradient
                    colors={[
                        "#6335FF",
                        "#7C3AED",
                        "#3B82F6",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.profileCard}
                >

                    <View style={styles.profileTop}>

                        <View style={styles.avatarContainer}>

                            {user.profileImage ? (

                                <Image
                                    source={{
                                        uri: user.profileImage,
                                    }}
                                    style={styles.avatar}
                                />

                            ) : (

                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {user.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </Text>
                                </View>

                            )}

                            <TouchableOpacity
                                style={styles.editAvatar}
                                onPress={() =>
                                    navigation.navigate(
                                        "EditProfile"
                                    )
                                }
                            >
                                <Ionicons
                                    name="camera"
                                    size={13}
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>

                        </View>


                        <View style={styles.profileInfo}>

                            <Text style={styles.profileName}>
                                {user.name}
                            </Text>

                            <Text style={styles.profileRole}>
                                {user.role}
                            </Text>

                            <View style={styles.verifiedRow}>

                                <Ionicons
                                    name="checkmark-circle"
                                    size={15}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.verifiedText}>
                                    Profile Verified
                                </Text>

                            </View>

                        </View>

                    </View>


                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={() =>
                            navigation.navigate(
                                "EditProfile"
                            )
                        }
                    >

                        <Ionicons
                            name="create-outline"
                            size={17}
                            color={COLORS.white}
                        />

                        <Text style={styles.editProfileText}>
                            Edit Profile
                        </Text>

                    </TouchableOpacity>

                </LinearGradient>

                <View style={styles.progressCard}>

                    {/* <View style={styles.progressTop}>

                        <View>
                            <Text style={styles.progressLabel}>
                                Career Readiness
                            </Text>

                            <Text style={styles.progressNumber}>
                                72%
                            </Text>
                        </View>

                        <View style={styles.progressCircle}>

                            <Ionicons
                                name="trending-up"
                                size={25}
                                color={COLORS.blue}
                            />

                        </View>

                    </View> */}


                    <View style={styles.progressBarBackground}>

                        <View
                            style={[
                                styles.progressBar,
                                {
                                    width: "72%",
                                },
                            ]}
                        />

                    </View>

                    <Text style={styles.progressHint}>
                        You're making good progress. Keep
                        improving your skills.
                    </Text>

                </View>


                {/* Personal Information */}

                <Text style={styles.sectionTitle}>
                    Personal Information
                </Text>

                <View style={styles.infoCard}>

                    <View style={styles.infoRow}>

                        <View style={styles.infoIcon}>
                            <Ionicons
                                name="mail-outline"
                                size={19}
                                color={COLORS.blue}
                            />
                        </View>

                        <View style={styles.infoContent}>

                            <Text style={styles.infoLabel}>
                                Email
                            </Text>

                            <Text style={styles.infoValue}>
                                {user.email}
                            </Text>

                        </View>

                    </View>


                    <View style={styles.divider} />


                    <View style={styles.infoRow}>

                        <View style={styles.infoIcon}>
                            <Ionicons
                                name="call-outline"
                                size={19}
                                color={COLORS.blue}
                            />
                        </View>

                        <View style={styles.infoContent}>

                            <Text style={styles.infoLabel}>
                                Mobile Number
                            </Text>

                            <Text style={styles.infoValue}>
                                {user.phone}
                            </Text>

                        </View>

                    </View>

                </View>


                {/* Skills */}

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        My Skills
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Skills")
                        }
                    >
                        <Text style={styles.viewText}>
                            Manage
                        </Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.skillsCard}>

                    {user.skills.map((skill, index) => (

                        <View
                            key={index}
                            style={styles.skillChip}
                        >

                            <Ionicons
                                name="checkmark-circle"
                                size={15}
                                color={COLORS.blue}
                            />

                            <Text style={styles.skillText}>
                                {skill}
                            </Text>

                        </View>

                    ))}

                    <TouchableOpacity
                        style={styles.addSkill}
                        onPress={() =>
                            navigation.navigate("Skills")
                        }
                    >

                        <Ionicons
                            name="add"
                            size={18}
                            color={COLORS.purple}
                        />

                        <Text style={styles.addSkillText}>
                            Add Skill
                        </Text>

                    </TouchableOpacity>

                </View>


                {/* Account */}

                <Text style={styles.sectionTitle}>
                    Account
                </Text>

                <View style={styles.menuCard}>

                    <MenuItem
                        icon="person-outline"
                        title="Edit Profile"
                        subtitle="Update your personal information"
                        onPress={() =>
                            navigation.navigate(
                                "EditProfile"
                            )
                        }
                    />

                    <View style={styles.menuDivider} />

                    <MenuItem
                        icon="lock-closed-outline"
                        title="Change Password"
                        subtitle="Update your account password"
                        onPress={() =>
                            navigation.navigate(
                                "ChangePassword"
                            )
                        }
                    />

                    <View style={styles.menuDivider} />

                    <MenuItem
                        icon="notifications-outline"
                        title="Notifications"
                        subtitle="Manage your notifications"
                        onPress={() =>
                            navigation.navigate(
                                "Notifications"
                            )
                        }
                    />

                    <View style={styles.menuDivider} />

                    <MenuItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        subtitle="Get help with CareerMind AI"
                        onPress={() =>
                            navigation.navigate(
                                "HelpSupport"
                            )
                        }
                    />

                </View>


                {/* Logout */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >

                    <Ionicons
                        name="log-out-outline"
                        size={21}
                        color={COLORS.danger}
                    />

                    <Text style={styles.logoutText}>
                        Logout
                    </Text>

                </TouchableOpacity>
                <Text style={styles.version}>
                    CareerMind AI • Version 1.0.0
                </Text>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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