import React, { useEffect, useState } from "react";
import LoggedOutStack from "./LoggedOutStack";
import LoggedInStack from "./LoggedInStack";
import { BASE_URL } from "../constants/links";
import { getUserMe } from "../services/user";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkIfLoggedIn = async () => {
        const data = await getUserMe();
        if (data.name) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return { isLoggedIn } ? <LoggedInStack /> : <LoggedOutStack />;
}
