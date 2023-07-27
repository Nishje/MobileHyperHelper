import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from "react-native";
import {
    HEY_INTERVAL_DURATION,
    HEY_SHAKE_DURATION,
    HEY_SHAKE_WAIT_DURATION,
} from "../../constants/numbers";
import HeyText from "../../components/HeyText";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../constants/Colors";
import { LOGGED_OUT_URL } from "../../constants/links";

const AMOUNT_OF_HEYS_AT_ONCE = 10;

export default function HeyAnimation() {
    const router = useRouter();
    const [showMultipleHey, setShowMultipleHey] = useState(true);
    const [heys, setHeys] = useState<number[]>([]);
    const [keyCount, setKeyCount] = useState(0);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

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

    useEffect(() => {
        if (showMultipleHey) {
            startShakeAnimation();
        }
    }, [showMultipleHey]);

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

    const redirectToHome = () => {
        AsyncStorage.setItem("hasOpenedApp", "true");
        router.replace(`/${LOGGED_OUT_URL}`);
    };

    const removeHey = (id: number) => {
        setHeys((prevHeys) => prevHeys.filter((item) => item !== id));
    };

    const startShakeAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnim, {
                    toValue: 0,
                    duration: HEY_SHAKE_WAIT_DURATION,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 10,
                    duration: HEY_SHAKE_DURATION,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: -10,
                    duration: HEY_SHAKE_DURATION,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 0,
                    duration: HEY_SHAKE_DURATION,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
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
                onPress={showMultipleHey ? handleScreenTouch : redirectToHome}>
                {showMultipleHey ? (
                    <View>{heyTexts}</View>
                ) : (
                    <Animated.View
                        style={[
                            styles.centeredText,
                            { transform: [{ translateX: shakeAnim }] },
                        ]}>
                        <Text style={styles.heyTextCentered}>Hey</Text>
                    </Animated.View>
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
        backgroundColor: colors.dark.background,
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
        color: colors.dark.text,
    },
    heyTextCentered: {
        fontSize: 32,
        fontWeight: "bold",
        marginHorizontal: 10,
        color: colors.dark.text,
    },
    centeredText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: colors.dark.text,
    },
});
