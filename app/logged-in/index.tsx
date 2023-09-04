import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import { LOGGED_IN_URL } from "../../constants/links";
import { Link, useRouter } from "expo-router";
import { makeApiRequest } from "../../constants/makeRequest";

interface FetchedData {
    name: string | null;
}

export default function HomeScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState("");

    const getUserName = async () => {
        const data = await makeApiRequest("/users/me", "GET");
        if (data.name) {
            setUserName(data.name);
        } else {
            router.replace(`/logged-out`);
        }
    };

    useEffect(() => {
        getUserName();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.text}>Welcome {userName}</Text>
            <Link
                href={`${LOGGED_IN_URL}/ToDoList`}
                style={styles.link}>
                To Do List
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.dark.text,
    },
    text: {
        fontSize: 16,
        color: colors.dark.text,
    },
    link: {
        fontSize: 16,
        color: colors.dark.text,
    },
});
