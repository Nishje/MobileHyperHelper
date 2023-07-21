import { Link } from "expo-router";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { textColor } from "../constants/textColor";

export default function Register() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.text}>Username:</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input}></TextInput>
            <TouchableOpacity>
                <Text style={styles.button}>Register</Text>
            </TouchableOpacity>
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
