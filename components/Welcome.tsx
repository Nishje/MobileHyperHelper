import { Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";

export default function Welcome() {
    return (
        <>
            <Text style={styles.title}>Welcome to Hyper Helper</Text>
            <Text style={styles.text}>This is the welcome page</Text>
        </>
    );
}

const styles = StyleSheet.create({
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
});
