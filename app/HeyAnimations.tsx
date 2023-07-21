import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import { textColor } from "../constants/textColor";
import { HEY_INTERVAL_DURATION } from "../constants/durations";
import HeyText from "../components/HeyText";

const AMOUNT_OF_HEYS_AT_ONCE = 10;

export default function HeyAnimation() {
    const [showMultipleHey, setShowMultipleHey] = useState(true);
    const [heys, setHeys] = useState<number[]>([]);
    const [keyCount, setKeyCount] = useState(0);

    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (showMultipleHey) {
            const interval = setInterval(() => {
                setKeyCount((prevKeyCount) => prevKeyCount + 1);
            }, HEY_INTERVAL_DURATION);

            return () => clearInterval(interval);
        }
    }, [showMultipleHey]);

    useEffect(() => {
        if (showMultipleHey) {
            const timeout = setTimeout(() => {
                const id = keyCount;
                setHeys((prevHeys) => [...prevHeys, id]);
            }, HEY_INTERVAL_DURATION);

            return () => clearTimeout(timeout);
        }
    }, [keyCount, showMultipleHey]);

    const handleScreenTouch = () => {
        setShowMultipleHey(false);
        fadeOutHeys();
    };

    const fadeOutHeys = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: HEY_INTERVAL_DURATION / 2,
            useNativeDriver: true,
        }).start();
    };

    const handleReset = () => {
        setShowMultipleHey(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: HEY_INTERVAL_DURATION / 2,
            useNativeDriver: true,
        }).start();
    };

    const removeHey = (id: number) => {
        setHeys((prevHeys) => prevHeys.filter((item) => item !== id));
    };

    const heyTexts = [];
    for (let i = 0; i < AMOUNT_OF_HEYS_AT_ONCE; i++) {
        heyTexts.push(
            <Animated.View
                style={[styles.textContainer, { opacity: fadeAnim }]}
                key={i}>
                {heys.map((id) => (
                    <HeyText
                        key={id}
                        id={id}
                        removeHey={removeHey}
                    />
                ))}
            </Animated.View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.animationContainer}
                onPress={showMultipleHey ? handleScreenTouch : handleReset}>
                {showMultipleHey ? (
                    <View>{heyTexts}</View>
                ) : (
                    <View style={styles.centeredText}>
                        <Text style={styles.heyTextCentered}>Hey</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
    },
    animationContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    textContainer: {
        flexDirection: "row",
        color: textColor,
    },
    heyTextCentered: {
        fontSize: 32,
        fontWeight: "bold",
        marginHorizontal: 10,
        color: textColor,
    },
    centeredText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
    },
});
