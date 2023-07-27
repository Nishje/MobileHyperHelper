import { BASE_URL } from "../constants/links";

interface User {
    name: string;
}

export async function getUserMe() {
    const response = await fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        credentials: "include",
    });
    const user: User = await response.json();
    return user;
}
