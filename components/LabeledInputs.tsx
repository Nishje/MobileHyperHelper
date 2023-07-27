import { useState } from "react";
import {
    TextInput,
    Text,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from "react-native";
import colors from "../constants/Colors";

interface LabeledInputsProps {
    label: string;
    placeholder?: string;
    isPassword?: boolean;
    onChange?: (text: string) => void;
}

export default function LabeledInputs({
    label,
    placeholder,
    isPassword = false,
    onChange,
}: LabeledInputsProps) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const text = e.nativeEvent.text;
        setText(text);
        if (onChange) onChange(text);
    };

    return (
        <>
            <Text style={styles.text}>{label}:</Text>
            <TextInput
                style={isFocused ? styles.focusedInput : styles.input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={colors.dark.placeholder}
                onChange={handleChange}
                placeholder={placeholder ? placeholder : ""}
                secureTextEntry={isPassword}
                passwordRules={
                    isPassword
                        ? "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                        : ""
                }
                value={text}></TextInput>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: colors.dark.text,
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
