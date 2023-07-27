import { useState } from "react";
import { CheckBox } from "react-native-elements";
import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

interface CheckboxProps {
    id: number;
    title: string;
    checked: boolean;
    onPress: (id: number) => void;
}
export default function Checkbox({
    title,
    checked,
    onPress,
    id,
}: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);
    return (
        <CheckBox
            titleProps={{ style: styles.text }}
            containerStyle={styles.container}
            style={styles.checkbox}
            title={title}
            checked={isChecked}
            onPress={() => {
                setIsChecked(!isChecked);
                onPress(id);
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: "30%",
        backgroundColor: colors.dark.background,
        borderColor: colors.dark.tint,
    },
    checkbox: {
        color: colors.dark.text,
        alignSelf: "center",
    },
    text: {
        color: colors.dark.text,
    },
});
