import { useState } from 'react';
import {
    Modal, View, Text, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, StyleSheet
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function AddUserModal({ visible, onClose, onAdd }) {
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = 'Name is required';
        if (!email.includes('@')) e.email = 'Enter a valid email';
        return e;
    };

    const handleAdd = () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        onAdd({
            id: Date.now(), name, email, phone: 'N/A', website: 'N/A',
            company: { name: 'N/A' }, address: { city: 'N/A' },
            username: name.toLowerCase().replace(' ', '.')
        });
        setName(''); setEmail(''); setErrors({});
        onClose();
    };

    return (
        <Modal visible={visible} animationType='slide' transparent
            onRequestClose={onClose}>
            {/* Backdrop */}
            <View style={styles.backdrop}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ width: '100%' }}
                >
                    <View style={[styles.sheet, { backgroundColor: theme.card }]}>
                        <Text style={[styles.title, { color: theme.text }]}>Add New User</Text>

                        <Text style={[styles.label, { color: theme.text }]}>Full Name</Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: theme.bg,
                                borderColor: errors.name ? '#cc0000' : theme.border, color:
                                    theme.text
                            }]}
                            placeholder='Alice Martin'
                            placeholderTextColor={theme.subText}
                            value={name} onChangeText={setName}
                        />
                        {errors.name && <Text style={styles.err}>{errors.name}</Text>}

                        <Text style={[styles.label, { color: theme.text }]}>Email</Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: theme.bg,
                                borderColor: errors.email ? '#cc0000' : theme.border, color:
                                    theme.text
                            }]}
                            placeholder='alice@example.com'
                            placeholderTextColor={theme.subText}
                            value={email} onChangeText={setEmail}
                            keyboardType='email-address' autoCapitalize='none'
                        />
                        {errors.email && <Text style={styles.err}>{errors.email}</Text>}

                        <View style={styles.btnRow}>
                            <TouchableOpacity style={[styles.btn, styles.btnCancel]}
                                onPress={onClose}>
                                <Text style={[styles.btnText, { color: theme.text }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: theme.primary }]}
                                onPress={handleAdd}
                            >
                                <Text style={[styles.btnText, { color: 'white' }]}>Add User</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 12 },
    input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 15 },
    err: { color: '#cc0000', fontSize: 13, marginTop: 4 },
    btnRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
    btn: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
    btnCancel: { backgroundColor: '#f0f0f0' },
    btnText: { fontWeight: 'bold', fontSize: 15 },
}); 