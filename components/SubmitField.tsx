import { TextInput, View, StyleSheet } from "react-native";
import Button from "./Button";
import { useState } from "react";
import colors from "../constants/Colors";

interface SubmitFieldProps {
    onSubmit: (input: string) => void;
}

export default function SubmitField({ onSubmit }: SubmitFieldProps) {
    const [input, setInput] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = () => {
        onSubmit(input);
        setInput("");
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={isFocused ? styles.focusedInput : styles.input}
                value={input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={setInput}
            />
            <Button
                text="Submit"
                onClick={handleSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        fontSize: 18,
        color: colors.dark.text,
        width: "80%",
        borderColor: "#B2EBF2",
        borderWidth: 3,
        borderRadius: 5,
        padding: 5,
    },
    focusedInput: {
        fontSize: 18,
        color: colors.light.text,
        width: "80%",
        borderColor: "#fff",
        borderWidth: 3,
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#fff",
        outlineStyle: "none",
    },
});
