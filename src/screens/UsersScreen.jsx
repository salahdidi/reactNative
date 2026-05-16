import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, RefreshControl, StyleSheet, SafeAreaView
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Alert } from 'react-native';
import AddUserModal from '../components/AddUserModal';



export default function UsersScreen({ navigation }) {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const handleDelete = (user) => {
    Alert.alert(
      'Delete User',                            // title 
      `Remove ${user.name} from the list?`,     // message 
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setUsers(prev => prev.filter(u => u.id !== user.id)),
        },
      ]
    );
  };
  const handleAddUser = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    } catch { setError('Could not load users.'); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, {
        backgroundColor: theme.card, borderColor: theme.border
      }]}
      onPress={() => navigation.navigate('UserDetail', {
        userId: item.id, userName:
          item.name
      })}
      onLongPress={() => handleDelete(item)}
    >
      <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.userName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.userEmail, {
          color: theme.subText
        }]}>{item.email}</Text>
      </View>
      <Text style={[styles.arrow, { color: theme.subText }]}>›</Text>
    </TouchableOpacity>
  );

  if (loading) return (
    <View style={[styles.center, { backgroundColor: theme.bg }]}>
      <ActivityIndicator size='large' color={theme.primary} />
    </View>
  );

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
        <AddUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddUser}
      />
      <TextInput
        style={[styles.search, {
          backgroundColor: theme.card,
          borderColor: theme.border, color: theme.text
        }]}
        placeholder='Search users...'
        placeholderTextColor={theme.subText}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={[styles.count, { color: theme.subText }]}>
        {filtered.length} of {users.length} users
      </Text>
      <FlatList
        data={filtered}
        keyExtractor={u => u.id.toString()}
        renderItem={renderUser}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() =>
          fetchUsers(true)} />}
        ListEmptyComponent={<Text style={[styles.empty, {
          color: theme.subText
        }]}>No results</Text>}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  search: {
    margin: 12, borderRadius: 10, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: 15
  },
  count: { marginLeft: 16, marginBottom: 4, fontSize: 13 },
  list: { paddingHorizontal: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: 10, marginBottom: 8, borderWidth: 1
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  avatarText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  info: { flex: 1 },
  userName: { fontSize: 15, fontWeight: 'bold' },
  userEmail: { fontSize: 13, marginTop: 2 },
  arrow: { fontSize: 24 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 15 },

  fab: {
    position: 'absolute', bottom: 24, right: 24, width: 56, height: 56,
    borderRadius: 28, justifyContent: 'center', alignItems: 'center',
    elevation: 6
  },
  fabText: { color: 'white', fontSize: 28, fontWeight: 'bold', lineHeight: 30 },
}); 