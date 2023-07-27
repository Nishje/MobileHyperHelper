import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "./[...missing]";
import { LOGGED_IN_URL } from "../constants/links";
import ToDoList from "./logged-in/ToDoList";
import HomeScreen from "./logged-in";

const Stack = createStackNavigator();

export default function LoggedInStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={`${LOGGED_IN_URL}/index`}
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={`${LOGGED_IN_URL}/ToDoList`}
                component={ToDoList}
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
