import { Text, View, StyleSheet } from "react-native";
import { textColor } from "../constants/textColor";
import HeyAnimation from "../app/HeyAnimations";

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
        color: textColor,
    },
    text: {
        fontSize: 18,
        color: textColor,
    },
});
