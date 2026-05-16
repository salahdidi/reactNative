import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { theme, mode, toggleTheme } = useTheme();

    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

            <View style={[styles.row, {
                backgroundColor: theme.card, borderColor:
                    theme.border
            }]}>
                <View>
                    <Text style={[styles.rowLabel, { color: theme.text }]}>Dark Mode</Text>
                    <Text style={[styles.rowSub, { color: theme.subText }]}>
                        Currently: {mode === 'dark' ? 'Dark' : 'Light'}
                    </Text>
                </View>
                <Switch
                    value={mode === 'dark'}
                    onValueChange={toggleTheme}
                    trackColor={{ true: theme.primary }}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    row: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems:
            'center',
        padding: 16, borderRadius: 12, borderWidth: 1
    },
    rowLabel: { fontSize: 16, fontWeight: '600' },
    rowSub: { fontSize: 13, marginTop: 2 },
});