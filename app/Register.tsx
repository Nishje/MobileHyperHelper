import { Link } from "expo-router";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import colors from "../constants/Colors";

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
