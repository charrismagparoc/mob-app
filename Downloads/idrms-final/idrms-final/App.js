import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ActivityLogScreen from './src/screens/ActivityLogScreen';
import AlertsScreen      from './src/screens/AlertsScreen';
import DashboardScreen   from './src/screens/DashboardScreen';
import EvacuationScreen  from './src/screens/EvacuationScreen';
import IncidentsScreen   from './src/screens/IncidentsScreen';
import LoginScreen       from './src/screens/LoginScreen';
import MapScreen         from './src/screens/MapScreen';
import ReportsScreen     from './src/screens/ReportsScreen';
import ResidentsScreen   from './src/screens/ResidentsScreen';
import ResourcesScreen   from './src/screens/ResourcesScreen';
import RiskScreen        from './src/screens/RiskScreen';
import UsersScreen       from './src/screens/UsersScreen';

import { Sidebar }               from './src/components/Sidebar';
import { AppProvider }           from './src/context/AppContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { C }                     from './src/styles/colors';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NAV_THEME = {
  dark: true,
  colors: { primary: C.blue, background: C.bg, card: C.card, text: C.t1, border: C.border, notification: C.red },
};

const TAB_ICONS = {
  Dashboard:  { active: 'home',      inactive: 'home-outline'      },
  Alerts:     { active: 'megaphone', inactive: 'megaphone-outline'  },
  Evacuation: { active: 'location',  inactive: 'location-outline'   },
  Residents:  { active: 'people',    inactive: 'people-outline'     },
  Resources:  { active: 'cube',      inactive: 'cube-outline'       },
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const cfg = TAB_ICONS[route.name];
          if (!cfg) return null;
          return <Ionicons name={focused ? cfg.active : cfg.inactive} size={23} color={color} />;
        },
        tabBarActiveTintColor:   C.blue,
        tabBarInactiveTintColor: C.t3,
        tabBarStyle: {
          backgroundColor: C.card,
          borderTopColor:  C.border,
          borderTopWidth:  1,
          height:          Platform.OS === 'ios' ? 82 : 62,
          paddingBottom:   Platform.OS === 'ios' ? 26 : 8,
          paddingTop:      6,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        headerShown:      false,
      })}
    >
      <Tab.Screen name="Dashboard"  component={DashboardScreen}  />
      <Tab.Screen name="Alerts"     component={AlertsScreen}     />
      <Tab.Screen name="Evacuation" component={EvacuationScreen} />
      <Tab.Screen name="Residents"  component={ResidentsScreen}  />
      <Tab.Screen name="Resources"  component={ResourcesScreen}  />
      <Tab.Screen name="Incidents"   component={IncidentsScreen}   options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Risk"        component={RiskScreen}        options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Reports"     component={ReportsScreen}     options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Users"       component={UsersScreen}       options={{ tabBarButton: () => null }} />
      <Tab.Screen name="ActivityLog" component={ActivityLogScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Map"         component={MapScreen}         options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function Root() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <NavigationContainer theme={NAV_THEME}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {user ? (
          <Stack.Screen name="App" children={() => (
            <View style={{ flex: 1, backgroundColor: C.bg }}>
              <Tabs />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}
                currentRoute="Dashboard" onNavigate={() => {}} onLogout={logout}
                userName={user?.name || 'User'} />
            </View>
          )} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  componentDidCatch(e) { console.error('CRASH:', e.message); }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) return (
      <View style={{ flex:1, backgroundColor:'#0c1120', alignItems:'center', justifyContent:'center', padding:24 }}>
        <Text style={{ color:'#e84855', fontSize:16, fontWeight:'700', marginBottom:12 }}>Something went wrong</Text>
        <Text style={{ color:'#e2e8f4', fontSize:12, textAlign:'center' }}>{this.state.error.message}</Text>
      </View>
    );
    return this.props.children;
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <AuthProvider>
          <AppProvider>
            <StatusBar style="light" backgroundColor={C.bg} />
            <Root />
          </AppProvider>
        </AuthProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
