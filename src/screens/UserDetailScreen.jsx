import { useState, useEffect } from 'react'; 
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'; 
 
export default function UserDetailScreen({ route }) { 
  const { userId } = route.params; 
  const [user,    setUser]    = useState(null); 
  const [loading, setLoading] = useState(true); 
 
  useEffect(() => { 
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`) 
      .then(r => r.json()) 
      .then(data => { setUser(data); setLoading(false); }); 
  }, [userId]); 
 
  if (loading) return ( 
    <View style={styles.center}> 
      <ActivityIndicator size='large' color='#1E4D8C' /> 
    </View> 
  ); 
 
  return ( 
    <ScrollView style={styles.screen}> 
      {/* Avatar initial */} 
      <View style={styles.avatarLg}> 
        <Text style={styles.avatarText}>{user.name.charAt(0)}</Text> 
      </View> 
 
      <Text style={styles.name}>{user.name}</Text> 
      <Text style={styles.username}>@{user.username}</Text> 
 
      {/* Detail rows */} 
      {[ 
        { label: 'Email',   value: user.email }, 
        { label: 'Phone',   value: user.phone }, 
        { label: 'Website', value: user.website }, 
        { label: 'Company', value: user.company.name }, 
        { label: 'City',    value: user.address.city }, 
      ].map(row => ( 
        <View key={row.label} style={styles.row}> 
          <Text style={styles.rowLabel}>{row.label}</Text> 
          <Text style={styles.rowValue}>{row.value}</Text> 
        </View> 
      ))} 
    </ScrollView> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  screen:     { flex: 1, backgroundColor: '#fff' }, 
  center:     { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
  avatarLg:   { width: 100, height: 100, borderRadius: 50, backgroundColor: 
'#1E4D8C', 
                justifyContent: 'center', alignItems: 'center', 
                alignSelf: 'center', marginTop: 32, marginBottom: 16 }, 
  avatarText: { color: 'white', fontSize: 40, fontWeight: 'bold' }, 
  name:       { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 
'#222' }, 
  username:   { fontSize: 15, color: '#888', textAlign: 'center', marginBottom: 24 
}, 
  row:        { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 14, 
                borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }, 
  rowLabel:   { width: 80, fontSize: 14, color: '#888', fontWeight: '600' }, 
  rowValue:   { flex: 1, fontSize: 14, color: '#222' }, 
}); 