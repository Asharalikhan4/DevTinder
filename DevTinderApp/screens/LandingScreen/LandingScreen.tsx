import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../config/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SafeScreen from "../../components/SafeScreen/SafeScreen";



const LandingScreen: FC = () => {

    const navigation = useNavigation();

    const handleSigninClick = () => {
        navigation.navigate("SigninScreen");
    };

    return (
        <SafeScreen style={styles.landingScreen}>
            {/* <CustomCarousel data={carouselData} /> */}
            <View style={styles.button}>
                <Pressable>
                    <Text style={styles.buttonText}>Create an Account</Text>
                </Pressable>
            </View>

            <View style={styles.signInBlock}>
                <Text style={styles.promptText}>Already have an account?{` `}</Text>
                <Pressable onPress={handleSigninClick}>
                    <Text style={styles.signInText}>Sign in</Text>
                </Pressable>
            </View>
        </SafeScreen>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    landingScreen: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    signInBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    promptText: {
        fontSize: 16,
    },
    signInText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});