import { View, StyleSheet } from "react-native";
import Welcome from "../components/Welcome";
import { textColor } from "../constants/textColor";
import { Link, Redirect, useRouter } from "expo-router";
import HeyAnimation from "./HeyAnimations";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const router = useRouter();
    // const [showMultipleHey, setShowMultipleHey] = useState(true);
    useEffect(() => {
        AsyncStorage.getItem("hasOpenedApp").then((value: string | null) => {
            if (value !== "true") {
                router.replace("/HeyAnimations");
            }
        });
    }, []);
    return (
        <View style={styles.container}>
            <Welcome />
            <View style={styles.buttonContainer}>
                <Link
                    href="/Register"
                    style={styles.link}>
                    Register
                </Link>
                <Link
                    href="/Login"
                    style={styles.link}>
                    Login
                </Link>
            </View>
            {/* <View style={styles.animationContainer}>
                <HeyAnimation />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: textColor,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    link: {
        color: textColor,
        fontSize: 18,
        margin: 10,
        padding: 10,
        backgroundColor: "#00ACC1",
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        margin: 20,
    },
    animationContainer: {
        position: "absolute", // Place the animation container above everything else
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
});
