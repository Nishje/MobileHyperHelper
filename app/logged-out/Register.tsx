import { Link } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import colors from "../../constants/Colors";
import LabeledInputs from "../../components/LabeledInputs";
import { useEffect, useState } from "react";
import {
    REGEX_EMAIL,
    REGEX_PASSWORD,
} from "../../constants/regularExpressions";
import Button from "../../components/Button";
import { MINIMAL_USER_NAME_LENGTH } from "../../constants/numbers";
import { BASE_URL } from "../../constants/links";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("Submitting");

    const validateRegistration = () => {
        if (!REGEX_EMAIL.test(email)) {
            setModalText("Invalid email");
            setIsModalVisible(true);
            return false;
        }
        if (username.length < MINIMAL_USER_NAME_LENGTH) {
            setModalText(
                `Username must be at least ${MINIMAL_USER_NAME_LENGTH} characters long`
            );
            setIsModalVisible(true);
            return false;
        }
        if (!REGEX_PASSWORD.test(password)) {
            setModalText("Invalid password");
            setIsModalVisible(true);
            return false;
        }
        if (password !== passwordConfirm) {
            setModalText("Passwords do not match");
            setIsModalVisible(true);
            return false;
        }
        return true;
    };

    const makeRequest = async () => {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                password,
            }),
        });

        const data = response.status;
        if (data === 201) {
            setModalText("Registration successful");
            setIsModalVisible(true);
        } else {
            setModalText("Registration failed");
            setIsModalVisible(true);
        }
        console.log(response);
    };

    const onSubmit = async () => {
        if (validateRegistration()) {
            await makeRequest();
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            onSubmit().then(() => setIsSubmitting(false));
        }
    }, [isSubmitting]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}>
                <View style={styles.container}>
                    <Text style={styles.title}>{modalText}</Text>
                    <Button
                        text="Close"
                        onClick={() => setIsModalVisible(false)}
                    />
                </View>
            </Modal>
            <Text style={styles.title}>Register</Text>
            <LabeledInputs
                label="Email"
                placeholder="Enter your email"
                onChange={(text) => setEmail(text)}
            />
            <LabeledInputs
                label="Username"
                placeholder="Enter your username"
                onChange={(text) => setUsername(text)}
            />
            <LabeledInputs
                label="Password"
                placeholder="Enter your password"
                isPassword={true}
                onChange={(text) => setPassword(text)}
            />
            <LabeledInputs
                label="Confirm Password"
                placeholder="Confirm your password"
                isPassword={true}
                onChange={(text) => setPasswordConfirm(text)}
            />
            <Button
                text="Register"
                onClick={() => setIsSubmitting(true)}
            />
            <Link
                href="/Login"
                style={styles.link}>
                already have an account? login here
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: colors.dark.text,
    },
    text: {
        fontSize: 18,
        color: colors.dark.text,
    },
    input: {
        fontSize: 18,
        color: colors.dark.text,
        border: "1px solid #B2EBF2",
        borderRadius: 5,
    },
    button: {
        fontSize: 18,
        color: colors.dark.text,
        borderRadius: 5,
        backgroundColor: colors.dark.tint,
        padding: 10,
        margin: 10,
    },
    link: {
        fontSize: 12,
        color: colors.dark.text,
        margin: 10,
        textDecorationLine: "underline",
    },
});
