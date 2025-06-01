import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome6";
import SafeScreen from '../../components/SafeScreen/SafeScreen';
import { signupFormDataTypes } from '../../globalTypes/user';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [skillInput, setSkillInput] = useState('');
    const [signupFormData, setSignupFormData] = useState<signupFormDataTypes>({
        name: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        about: "",
        skills: [],
    });

    const handleInputChange = (fieldName: string, value: string) => {
        setSignupFormData(prev => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleAddSkill = () => {
        const trimmed = skillInput.trim();
        if (trimmed && !signupFormData.skills.includes(trimmed)) {
            setSignupFormData(prev => ({
                ...prev,
                skills: [...prev.skills, trimmed],
            }));
        }
        setSkillInput('');
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSignupFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove),
        }));
    };

    const handleSkillKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Enter') handleAddSkill();
    };

    console.log("Signup Form Data: ", signupFormData);

    return (
        <SafeScreen style={styles.container}>
            {/* <LinearGradient
        colors={['#E94057', '#F27121']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      /> */}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Ionicons name="heart" size={50} color="#E94057" />
                        </View>
                        <Text style={styles.appName}>Dev Tinder</Text>
                        {/* <Text style={styles.tagline}>Find your perfect match</Text> */}
                    </View>

                    {/* <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Create Account</Text>
                        <Text style={styles.headerSubtitle}>Find your perfect match today</Text>
                    </View> */}

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#8A8A8A" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor="#8A8A8A"
                                value={signupFormData.name}
                                onChangeText={text => handleInputChange("name", text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#8A8A8A" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#8A8A8A"
                                value={signupFormData.email}
                                onChangeText={text => handleInputChange("email", text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#8A8A8A" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#8A8A8A"
                                value={signupFormData.password}
                                onChangeText={text => handleInputChange("password", text)}
                                secureTextEntry={secureTextEntry}
                            />
                            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                <Ionicons
                                    name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#8A8A8A"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Gender */}
                        <View style={styles.inputContainer}>

                        </View>

                        {/* Age */}
                        <View style={styles.inputContainer}>
                            <FontAwesomeIcons name="cake-candles" size={20} color="#8A8A8A" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Age"
                                placeholderTextColor="#8A8A8A"
                                value={signupFormData.age}
                                onChangeText={text => handleInputChange("age", text)}
                                keyboardType="numeric"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* About */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="information-circle-outline" size={20} color="#8A8A8A" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Tell us about yourself"
                                placeholderTextColor="#8A8A8A"
                                value={signupFormData.about}
                                onChangeText={text => handleInputChange("about", text)}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Add a skill and press Enter"
                                placeholderTextColor="#8A8A8A"
                                value={skillInput}
                                onChangeText={setSkillInput}
                                onSubmitEditing={handleAddSkill}
                                onKeyPress={handleSkillKeyPress}
                                style={styles.input}
                                returnKeyType="done"
                            />
                            <TouchableOpacity onPress={handleAddSkill}>
                                <Ionicons name="arrow-forward-outline" size={20} color="#8A8A8A" style={styles.inputIcon} />
                            </TouchableOpacity>
                        </View>

                        {/* Display Skill Tags */}
                        <View style={styles.skillTagsContainer}>
                            {signupFormData.skills.map(skill => (
                                <View key={skill} style={styles.skillTag}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                                        <Ionicons name="close-outline" size={16} color="#E94057" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>
                                By signing up, you agree to our{' '}
                                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                                <Text style={styles.termsLink}>Privacy Policy</Text>
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.signUpButton}>
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.orContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={24} color="#E94057" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={24} color="#E94057" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-apple" size={24} color="#E94057" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
                            <Text style={styles.signInText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gradientBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '30%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        // marginTop: 60,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        // color: 'white',
        marginTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    headerContainer: {
        marginTop: 30,
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        height: 55,
        backgroundColor: '#F9F9F9',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
        fontSize: 16,
    },
    termsContainer: {
        marginBottom: 20,
    },
    termsText: {
        color: '#8A8A8A',
        fontSize: 14,
        lineHeight: 20,
    },
    termsLink: {
        color: '#E94057',
        fontWeight: '500',
    },
    signUpButton: {
        backgroundColor: '#E94057',
        borderRadius: 12,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E94057',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#EFEFEF',
    },
    orText: {
        color: '#8A8A8A',
        paddingHorizontal: 10,
        fontSize: 14,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    footerText: {
        color: '#8A8A8A',
        fontSize: 16,
    },
    signInText: {
        color: '#E94057',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skillTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 15,
    },
    skillTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE3E3',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    skillText: {
        color: '#E94057',
        fontSize: 14,
        marginRight: 6,
    },
});

export default SignupScreen;