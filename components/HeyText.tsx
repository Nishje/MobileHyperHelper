import { useRef, useEffect } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { HEY_INTERVAL_DURATION } from "../constants/numbers";
import colors from "../constants/Colors";
interface HeyTextProps {
    id: number;
    removeHey: (id: number) => void;
}

export default function HeyText({ id, removeHey }: HeyTextProps) {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: HEY_INTERVAL_DURATION,
            useNativeDriver: true,
        }).start(() => {
            removeHey(id);
        });
    }, [id, fadeAnim, removeHey]);

    const style = {
        ...styles.heyText,
        top: Math.floor(Math.random() * (Dimensions.get("window").height - 70)),
        left: Math.floor(Math.random() * (Dimensions.get("window").width - 70)),
        opacity: fadeAnim,
    };

    return (
        <Animated.Text
            style={style}
            key={id}>
            Hey
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    heyText: {
        position: "absolute",
        fontSize: 32,
        fontWeight: "bold",
        marginHorizontal: 10,
        color: colors.dark.text,
    },
});
