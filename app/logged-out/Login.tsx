import { StyleSheet, Text, View, Modal } from "react-native";
import { Link } from "expo-router";
import colors from "../../constants/Colors";
import LabeledInputs from "../../components/LabeledInputs";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { BASE_URL } from "../../constants/links";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("Submitting");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateRegistration = () => {
        if (email.length < 1) {
            setModalText("Email must be at least 1 character long");
            setIsModalVisible(true);
            return false;
        }
        if (password.length < 1) {
            setModalText("Password must be at least 1 character long");
            setIsModalVisible(true);
            return false;
        }
        return true;
    };

    const makeRequest = async () => {
        const response = await fetch(`${BASE_URL}/sessions`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = response.status;
        if (data === 201) {
            setModalText("Login successful");
            setIsModalVisible(true);
        } else {
            setModalText("Login failed");
            setIsModalVisible(true);
        }
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
            <Text style={styles.title}>Login</Text>
            <LabeledInputs
                label="Email"
                placeholder="Enter your email"
                onChange={(text) => setEmail(text)}
            />
            <LabeledInputs
                label="Password"
                placeholder="Enter your password"
                isPassword={true}
                onChange={(text) => setPassword(text)}
            />
            <Button
                text="Login"
                onClick={() => setIsSubmitting(true)}
            />
            <Link
                href="/Register"
                style={styles.link}>
                already have an account? register here
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
