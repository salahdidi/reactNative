import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import UsersScreen from './src/screens/UsersScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HEADER_OPTS = {
  headerStyle: { backgroundColor: '#1E4D8C' },
  headerTintColor: 'white',
  headerTitleStyle: { fontWeight: 'bold' },
};

function HomeStack() {
  const { theme } = useTheme(); 
  return (
    
    <Stack.Navigator screenOptions={HEADER_OPTS}>
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Home' }}
      />
    </Stack.Navigator>
   
  );
}

function UsersStack() {
  return (
    <Stack.Navigator screenOptions={HEADER_OPTS}>
      <Stack.Screen name='Users' component={UsersScreen} options={{
        title: 'Users'
      }} />
      <Stack.Screen name='UserDetail' component={UserDetailScreen}
        options={({ route }) => ({ title: route.params.userName })} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={HEADER_OPTS}>
      <Stack.Screen name='Settings' component={SettingsScreen} options={{
        title:
          'Settings'
      }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider> 
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1E4D8C',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: { paddingBottom: 4 },
        }}
      >
        <Tab.Screen name='HomeTab' component={HomeStack}
          options={{ title: 'Home', tabBarLabel: 'Home' }} />
        <Tab.Screen name='UsersTab' component={UsersStack}
          options={{ title: 'Users', tabBarLabel: 'Users' }} />
        <Tab.Screen name='SettingsTab' component={SettingsStack}
          options={{ title: 'Settings', tabBarLabel: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
    </ThemeProvider> 
  );
}