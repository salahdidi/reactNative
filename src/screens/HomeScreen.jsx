import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { useTheme } from '../context/ThemeContext';
 
export default function HomeScreen({ navigation }) { 
  const {theme,mode} = useTheme();
  return ( 
    <View style={[styles.screen, { backgroundColor: theme.bg }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Home</Text> 
      <Text style={[styles.subtitle, { color: theme.subText }]}>A React Native app built in TP 2</Text> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  screen:   { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 
}, 
  title:    { fontSize: 32, fontWeight: 'bold', color: '#1E4D8C', marginBottom: 8 
}, 
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center' }, 
  btn:      { backgroundColor: '#1E4D8C', paddingHorizontal: 32, paddingVertical: 
14, 
              borderRadius: 10 }, 
  btnText:  { color: 'white', fontWeight: 'bold', fontSize: 16 }, 
}); 