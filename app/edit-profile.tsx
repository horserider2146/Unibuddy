import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from './context/AppContext';

// Define color palettes for both themes
const Colors = {
    light: {
        background: '#f0f2f5',
        text: '#1c1c1e',
        header: '#fff',
        border: '#ddd',
        inputBg: '#fff',
        inputText: '#000',
        placeholder: '#c7c7cc',
        primary: '#007BFF',
    },
    dark: {
        background: '#000',
        text: '#fff',
        header: '#1c1c1e',
        border: '#3a3a3c',
        inputBg: '#1c1c1e',
        inputText: '#fff',
        placeholder: '#8e8e93',
        primary: '#0A84FF',
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

// Lists for the dropdowns - Note the 'label' and 'value' keys for the new library
const subjectItems = [
    { label: 'Calculus', value: 'Calculus' }, { label: 'LADE', value: 'LADE' },
    { label: 'BEE', value: 'BEE' }, { label: 'QSP', value: 'QSP' },
    { label: 'Physics', value: 'Physics' }, { label: 'PEM', value: 'PEM' },
    { label: 'PPS', value: 'PPS' }, { label: 'PDA', value: 'PDA' }, { label: 'PP', value: 'PP' },
];
const streamItems = [
    { label: 'B.Tech', value: 'B.Tech' },
    { label: 'MBATech', value: 'MBATech' },
];
const branchItems = [
    { label: 'CE', value: 'CE' }, { label: 'Data Science', value: 'Data Science' },
    { label: 'AI', value: 'AI' }, { label: 'IT', value: 'IT' },
    { label: 'Civil', value: 'Civil' }, { label: 'Mechanical', value: 'Mechanical' },
    { label: 'CSBS', value: 'CSBS' },
];
const yearItems = [
    { label: 'I', value: 'I' }, { label: 'II', value: 'II' },
    { label: 'III', value: 'III' }, { label: 'IV', value: 'IV' }, { label: 'V', value: 'V' },
];

export default function EditProfileScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    if (!context) {
        return <Text>Error: App context is not available.</Text>;
    }

    const { name, subjects, stream, branch, year, setName, setSubjects, setStream, setBranch, setYear, colorScheme } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);
    const pickerStyles = dynamicPickerStyles(theme);

    const [currentName, setCurrentName] = useState(name);
    const [currentSubjects, setCurrentSubjects] = useState(subjects);
    const [currentStream, setCurrentStream] = useState(stream);
    const [currentBranch, setCurrentBranch] = useState(branch);
    const [currentYear, setCurrentYear] = useState(year);

    const handleSave = () => {
        setName(currentName);
        setSubjects(currentSubjects);
        setStream(currentStream);
        setBranch(currentBranch);
        setYear(currentYear);
        Alert.alert('Profile Saved!', 'Your information has been updated.');
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={currentName}
                    onChangeText={setCurrentName}
                    placeholder="Enter your name"
                    placeholderTextColor={theme.placeholder}
                />

                <Text style={styles.label}>Teaching Subjects</Text>
                <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={subjectItems}
                    labelField="label"
                    valueField="value"
                    placeholder="Select subjects"
                    value={currentSubjects}
                    onChange={(item: string[]) => {
                        setCurrentSubjects(item);
                    }}
                    selectedStyle={styles.selectedStyle}
                    containerStyle={{ backgroundColor: theme.inputBg }}
                    itemContainerStyle={{ backgroundColor: theme.inputBg }}
                    itemTextStyle={{ color: theme.inputText }}
                    activeColor={theme.primary}
                />

                <Text style={styles.label}>Stream</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setCurrentStream(value)}
                        items={streamItems}
                        value={currentStream}
                        placeholder={{ label: 'Select a stream...', value: null, color: theme.placeholder }}
                        style={pickerStyles}
                    />
                </View>

                <Text style={styles.label}>Branch</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setCurrentBranch(value)}
                        items={branchItems}
                        value={currentBranch}
                        placeholder={{ label: 'Select a branch...', value: null, color: theme.placeholder }}
                        style={pickerStyles}
                    />
                </View>

                <Text style={styles.label}>Year</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setCurrentYear(value)}
                        items={yearItems}
                        value={currentYear}
                        placeholder={{ label: 'Select a year...', value: null, color: theme.placeholder }}
                        style={pickerStyles}
                    />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const dynamicStyles = (theme: Theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.border, backgroundColor: theme.header },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: theme.text },
    doneButton: { fontSize: 18, color: theme.primary, fontWeight: '600' },
    content: { padding: 20 },
    label: { fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 8, marginTop: 10 },
    input: { backgroundColor: theme.inputBg, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: theme.border, color: theme.inputText },
    pickerContainer: { backgroundColor: theme.inputBg, borderRadius: 8, borderWidth: 1, borderColor: theme.border, marginBottom: 10 },
    saveButton: { backgroundColor: theme.primary, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20, marginBottom: 40 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    // Styles for the new MultiSelect component
    dropdown: {
        height: 50,
        backgroundColor: theme.inputBg,
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: theme.border,
        marginBottom: 10,
    },
    placeholderStyle: {
        fontSize: 16,
        color: theme.placeholder,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: theme.inputText,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: theme.inputBg,
        borderColor: theme.border,
        color: theme.inputText,
    },
    selectedStyle: {
        borderRadius: 12,
        backgroundColor: theme.primary,
    },
});

const dynamicPickerStyles = (theme: Theme) => StyleSheet.create({
    inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, color: theme.inputText },
    inputAndroid: { fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, color: theme.inputText },
    placeholder: { color: theme.placeholder },
});
