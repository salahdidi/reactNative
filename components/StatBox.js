import {  StyleSheet, Text, View } from "react-native";

function StatBox({ label, value }) { 
  return ( 
    <View style={styles.statBox}> 
      <Text style={styles.statValue}>{value}</Text> 
      <Text style={styles.statLabel}>{label}</Text> 
    </View> 
  ); 
}
const styles = StyleSheet.create({ 
  statBox:   { flex: 1, alignItems: 'center' }, 
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1E4D8C' }, 
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 }, 
}); 

export default StatBox;