import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { textColor } from "../constants/textColor";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.text}>Username:</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input}></TextInput>
            <TouchableOpacity>
                <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
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
        backgroundColor: "#121212",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: textColor,
    },
    text: {
        fontSize: 18,
        color: textColor,
    },
    input: {
        fontSize: 18,
        color: textColor,
        border: "1px solid #B2EBF2",
        borderRadius: 5,
    },
    button: {
        fontSize: 18,
        color: textColor,
        borderRadius: 5,
        backgroundColor: "#00ACC1",
        padding: 10,
        margin: 10,
    },
    link: {
        fontSize: 12,
        color: textColor,
        margin: 10,
        textDecorationLine: "underline",
    },
});
