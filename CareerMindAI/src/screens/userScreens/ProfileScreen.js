import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../constants/Colors";
import styles from "../../style/profileScreen"


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


                {/* Personal Information */}
                {/* <Text style={styles.sectionTitle}>
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

                </View> */}


                {/* Skills */}

                {/* <View style={styles.sectionHeader}>

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

                </View> */}


                {/* 
                 */}


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
                        icon="briefcase-outline"
                        title="Career Profile"
                        subtitle="Manage your skills, goals & career data"
                        onPress={() =>
                            navigation.navigate("CareerProfile")
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


