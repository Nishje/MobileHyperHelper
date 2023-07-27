import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={styles.button}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 18,
        color: colors.dark.text,
        borderRadius: 5,
        backgroundColor: colors.dark.tint,
        padding: 10,
        margin: 10,
    },
});
