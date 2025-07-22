import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AppContext } from './context/AppContext';

// Define color palettes for both themes
const Colors = {
    light: {
        background: '#fff',
        text: '#1c1c1e',
        header: '#fff',
        border: '#eee',
        primary: '#007BFF',
        todayText: '#007BFF',
        activityText: '#333',
        placeholder: '#888',
        modalBg: 'rgba(0, 0, 0, 0.5)',
        modalView: '#fff',
        modalInput: '#ddd',
        cancelButton: '#6c757d',
    },
    dark: {
        background: '#000',
        text: '#fff',
        header: '#1c1c1e',
        border: '#3a3a3c',
        primary: '#0A84FF',
        todayText: '#0A84FF',
        activityText: '#f2f2f7',
        placeholder: '#6e6e72',
        modalBg: 'rgba(0, 0, 0, 0.7)',
        modalView: '#2c2c2e',
        modalInput: '#545458',
        cancelButton: '#545458',
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

export default function CalendarScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { items, setItems, colorScheme } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    const [selectedDay, setSelectedDay] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [newActivity, setNewActivity] = useState('');

    const handleAddActivity = () => {
        if (!newActivity.trim()) {
            Alert.alert('Error', 'Activity cannot be empty.');
            return;
        }
        if (!selectedDay) {
            Alert.alert('Error', 'Please select a day to add an activity to.');
            setModalVisible(false);
            return;
        }
        const newItems = { ...items };
        if (newItems[selectedDay]) {
            newItems[selectedDay].push(newActivity);
        } else {
            newItems[selectedDay] = [newActivity];
        }
        setItems(newItems);
        setNewActivity('');
        setModalVisible(false);
    };

    const getMarkedDates = () => {
        const marked: { [key: string]: any } = {};
        for (const date in items) {
            if (items[date] && items[date].length > 0) {
                marked[date] = { marked: true, dotColor: theme.primary };
            }
        }
        if (selectedDay) {
            marked[selectedDay] = { ...marked[selectedDay], selected: true, selectedColor: theme.primary };
        }
        return marked;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Calendar</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>

            <Calendar
                onDayPress={(day) => setSelectedDay(day.dateString)}
                markedDates={getMarkedDates()}
                theme={{
                    backgroundColor: theme.background,
                    calendarBackground: theme.background,
                    textSectionTitleColor: theme.text,
                    dayTextColor: theme.text,
                    todayTextColor: theme.todayText,
                    selectedDayTextColor: '#ffffff',
                    monthTextColor: theme.text,
                    indicatorColor: theme.primary,
                    arrowColor: theme.primary,
                }}
            />

            <View style={styles.activitiesContainer}>
                <Text style={styles.activitiesHeader}>
                    Activities for: {selectedDay || 'No day selected'}
                </Text>
                <FlatList
                    data={items[selectedDay] || []}
                    renderItem={({ item }) => <Text style={styles.activityItem}>- {item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={styles.noActivityText}>No activities for this day.</Text>}
                />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Add Activity</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Add New Activity</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="E.g., Workout for 30 minutes"
                            placeholderTextColor={theme.placeholder}
                            value={newActivity}
                            onChangeText={setNewActivity}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleAddActivity}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const dynamicStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.header,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.text,
    },
    doneButton: {
        fontSize: 18,
        color: theme.primary,
        fontWeight: '600',
    },
    activitiesContainer: {
        flex: 1,
        padding: 20,
    },
    activitiesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        paddingBottom: 10,
        color: theme.text,
    },
    activityItem: {
        fontSize: 16,
        paddingVertical: 8,
        color: theme.activityText,
    },
    noActivityText: {
        fontSize: 16,
        color: theme.placeholder,
        textAlign: 'center',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 30,
        position: 'absolute',
        bottom: 30,
        right: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.modalBg,
    },
    modalView: {
        width: '85%',
        backgroundColor: theme.modalView,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.text,
    },
    modalInput: {
        width: '100%',
        height: 50,
        backgroundColor: theme.background,
        borderColor: theme.modalInput,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: theme.text,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: theme.cancelButton,
    },
    saveButton: {
        backgroundColor: theme.primary,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
