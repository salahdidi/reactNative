import { StyleSheet, Text, View } from "react-native";
function Section({ title, containerStyle, children }) { 
  return ( 
    <View style={styles.section}> 
      <Text style={styles.sectionTitle}>{title}</Text> 
      <View style={[styles.demo, containerStyle]}> 
        {children} 
      </View> 
    </View> 
  ); 
} 
const styles = StyleSheet.create({ 
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12, color: '#555', marginBottom: 6, fontWeight: 'bold'
  },
  demo: {
    backgroundColor: '#e0e0e0', borderRadius: 8, overflow: 'hidden'
  },
});
export default Section;