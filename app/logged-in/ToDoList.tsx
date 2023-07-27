import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import colors from "../../constants/Colors";
import Checkbox from "../../components/Checkbox";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import SubmitField from "../../components/SubmitField";

interface ToDoListProps {}

interface ToDoItem {
    id: number;
    title: string;
    checked: boolean;
}

export default function ToDoList() {
    const [items, setItems] = useState<ToDoItem[]>([]);

    const fetchItems = async () => {
        const items: ToDoItem[] = [
            { title: "Todo list", checked: true, id: 1 },
            { title: "Promodoro(?) timer", checked: false, id: 2 },
            { title: "log for learning", checked: false, id: 3 },
            { title: "log for eating pattern", checked: true, id: 4 },
            { title: "log for emotions", checked: false, id: 5 },
            { title: "subway surfer type content", checked: false, id: 6 },
            { title: "fidget thingy?", checked: false, id: 7 },
        ];
        setItems(organizeItems(items));
    };

    const organizeItems = (items: ToDoItem[]) => {
        const checkedItems = items.filter((item) => item.checked);
        const uncheckedItems = items.filter((item) => !item.checked);
        return [...uncheckedItems, ...checkedItems];
    };

    const handleCheckboxChange = (itemId: number) => {
        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
            );
            return organizeItems(updatedItems);
        });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const onSubmit = (input: string) => {
        const newItems = [
            ...items,
            { title: input, checked: false, id: items.length + 1 },
        ];
        setItems(organizeItems(newItems));
    };

    const checkBoxes = items.map((item) => {
        return (
            <Checkbox
                id={item.id}
                key={item.id}
                title={item.title}
                checked={item.checked}
                onPress={handleCheckboxChange}
            />
        );
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ToDoList</Text>
            {checkBoxes}
            <SubmitField onSubmit={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.dark.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: colors.dark.text,
    },
    text: {
        fontSize: 18,
        color: colors.dark.text,
    },
});
