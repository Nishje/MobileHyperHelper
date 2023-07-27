import { createStackNavigator } from "@react-navigation/stack";
import HeyAnimations from "./logged-out/HeyAnimations";
import Login from "./logged-out/Login";
import Register from "./logged-out/Register";
import App from "./logged-out";
import NotFoundScreen from "./[...missing]";
import { LOGGED_OUT_URL } from "../constants/links";

const Stack = createStackNavigator();

export default function LoggedInStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={`${LOGGED_OUT_URL}/index`}
                component={App}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={`${LOGGED_OUT_URL}/HeyAnimations`}
                component={HeyAnimations}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={`${LOGGED_OUT_URL}/Login`}
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={`${LOGGED_OUT_URL}/Register`}
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="[...missing]"
                component={NotFoundScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
