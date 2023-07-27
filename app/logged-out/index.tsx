import { View, StyleSheet, TouchableOpacity } from "react-native";
import Welcome from "../../components/Welcome";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../constants/Colors";
import { Text } from "../../components/Themed";
import { LOGGED_OUT_URL } from "../../constants/links";
// q: how do i create a stack navigator?
// a: https://reactnavigation.org/docs/stack-navigator/
export default function App() {
    const router = useRouter();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [returnElement, setReturnElement] = useState(<View></View>);

    useEffect(() => {
        AsyncStorage.getItem("hasOpenedApp").then((value: string | null) => {
            if (value !== "true") {
                router.replace(`${LOGGED_OUT_URL}/HeyAnimations`);
            }
        });
    }, []);

    // const checkIfLoggedIn = async () => {
    //     const response = await fetch(`${BASE_URL}/sessions`, {
    //         method: "GET",
    //         credentials: "include",
    //     });
    //     const data = await response.json();
    //     if (data.loggedIn) {
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    // };

    // useEffect(() => {
    //     checkIfLoggedIn();
    // }, []);

    return <LoggedOutElement />;
}

function LoggedOutElement() {
    const resetLocalStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log("LocalStorage data cleared.");
        } catch (error) {
            console.error("Error clearing LocalStorage:", error);
        }
    };
    return (
        <View style={styles.container}>
            <Welcome />
            <View style={styles.buttonContainer}>
                <Link
                    href={`${LOGGED_OUT_URL}/Register`}
                    style={styles.link}>
                    Register
                </Link>
                <Link
                    href={`${LOGGED_OUT_URL}/Login`}
                    style={styles.link}>
                    Login
                </Link>
            </View>
            <TouchableOpacity onPress={resetLocalStorage}>
                <Text style={styles.link}>Temp Reset LocalStorage</Text>
            </TouchableOpacity>
        </View>
    );
}

// function LoggedInElement() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>You are logged in!</Text>
//             <Link
//                 href="/Logout"
//                 style={styles.link}>
//                 Logout
//             </Link>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.dark.text,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    link: {
        color: colors.dark.text,
        fontSize: 18,
        margin: 10,
        padding: 10,
        backgroundColor: colors.dark.tint,
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
