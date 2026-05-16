import { StyleSheet, Text, View } from "react-native";

function Box({ label, color }) { 
  return ( 
    <View style={[styles.box, { backgroundColor: color }]}> 
      <Text style={styles.boxLabel}>{label}</Text> 
    </View> 
  ); 
} 
const styles = StyleSheet.create({ 
    box: {
    width: 60, height: 60, justifyContent: 'center', alignItems:
      'center'
  },
  boxLabel: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
export default Box;