import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ActivityLogScreen from './src/screens/ActivityLogScreen';
import MapScreen from './src/screens/MapScreen';
import UsersScreen from './src/screens/UsersScreen';

import { Sidebar } from './src/components/Sidebar';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { C } from './src/styles/colors';

import AlertsScreen from './src/screens/AlertsScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import EvacuationScreen from './src/screens/EvacuationScreen';
import IncidentsScreen from './src/screens/IncidentsScreen';
import LoginScreen from './src/screens/LoginScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import ResidentsScreen from './src/screens/ResidentsScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import RiskScreen from './src/screens/RiskScreen';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NAV_THEME = {
  dark: true,
  colors: {
    primary:      C.blue,
    background:   C.bg,
    card:         C.card,
    text:         C.t1,
    border:       C.border,
    notification: C.red,
  },
};

const HDR_STYLE = {
  backgroundColor:  C.card,
  elevation:        0,
  shadowColor:      'transparent',
  borderBottomWidth: 1,
  borderBottomColor: C.border,
};

function TabIcon({ icon, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 28, height: 26 }}>
      <Text style={{ fontSize: focused ? 19 : 16 }}>{icon}</Text>
    </View>
  );
}

// Wrapper component for screens that need the header + sidebar
function ScreenWithSidebar({ 
  screenComponent: ScreenComponent, 
  screenName,
  sidebarState,
  onOpenSidebar,
}) {
  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header with Hamburger */}
      <View style={{
        backgroundColor: C.card,
        borderBottomColor: C.border,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity
          onPress={onOpenSidebar}
          style={{
            padding: 8,
            marginLeft: -8,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 24 }}>☰</Text>
        </TouchableOpacity>
        
        <Text style={{
          fontSize: 15,
          fontWeight: '700',
          color: C.t1,
        }}>
          {screenName}
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Screen Content */}
      <ScreenComponent />

      {/* Sidebar Overlay */}
      <Sidebar
        isOpen={sidebarState.isOpen}
        onClose={sidebarState.onClose}
        currentRoute={screenName}
        onNavigate={sidebarState.onNavigate}
        onLogout={sidebarState.onLogout}
        userName={sidebarState.userName}
      />
    </View>
  );
}

function Tabs({ sidebarState }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:   C.blue,
        tabBarInactiveTintColor: C.t3,
        tabBarStyle: {
          backgroundColor: C.card,
          borderTopColor:  C.border,
          borderTopWidth:  1,
          height:          60,
          paddingBottom:   7,
          paddingTop:      4,
        },
        tabBarLabelStyle:    { fontSize: 9, fontWeight: '700' },
        headerShown:         false,
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} />,
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="📢" focused={focused} />,
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Evacuation" 
        component={EvacuationScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="🏕️" focused={focused} />,
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Residents" 
        component={ResidentsScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="👥" focused={focused} />,
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="📦" focused={focused} />,
          headerShown: false,
        }} 
      />

      {/* Hidden tabs - accessible via sidebar */}
      <Tab.Screen 
        name="Incidents" 
        component={IncidentsScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="⚠️" focused={focused} />,
          tabBarButton: () => null, // Hide from bottom nav
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Risk" 
        component={RiskScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
          tabBarButton: () => null, // Hide from bottom nav
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{ 
          tabBarIcon: ({ focused }) => <TabIcon icon="📈" focused={focused} />,
          tabBarButton: () => null, // Hide from bottom nav
          headerShown: false,
        }}
      />
      <Tab.Screen 
      name="Users" 
      component={UsersScreen}
      options={{ 
      headerShown: false,
      tabBarIcon: ({ focused }) => <TabIcon icon="👥" focused={focused} />,
      tabBarButton: () => null, // Hide from bottom, show in sidebar only
  }} 
/>

      <Tab.Screen 
      name="ActivityLog" 
      component={ActivityLogScreen}
      options={{ 
        headerShown: false,
      tabBarIcon: ({ focused }) => <TabIcon icon="📋" focused={focused} />,
      tabBarButton: () => null, // Hide from bottom, show in sidebar only
  }} 
/>
      <Tab.Screen 
      name="Map" 
      component={MapScreen}
      options={{ 
      headerShown: false,
      tabBarIcon: ({ focused }) => <TabIcon icon="🗺️" focused={focused} />,
      tabBarButton: () => null, // Hide from bottom nav
  }} 
/>

    </Tab.Navigator>
  );
}

function Root() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarState = {
    isOpen: sidebarOpen,
    onClose: () => setSidebarOpen(false),
    onNavigate: (screenName) => {
      // Navigation will happen automatically via tab navigator
    },
    onLogout: logout,
    userName: user?.name || 'User',
  };

  return (
    <NavigationContainer theme={NAV_THEME}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {user ? (
          <Stack.Screen 
            name="App" 
            children={() => (
              <View style={{ flex: 1 }}>
                <Tabs sidebarState={sidebarState} />
                <Sidebar
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                  currentRoute="Dashboard"
                  onNavigate={() => {}}
                  onLogout={logout}
                  userName={user?.name || 'User'}
                />
              </View>
            )}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  componentDidCatch(error, info) {
    console.error('CRASH:', error.message);
    console.error('STACK:', info.componentStack);
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, backgroundColor: '#0c1120', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ color: '#e84855', fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Crash Details:</Text>
          <Text style={{ color: '#e2e8f4', fontSize: 12, textAlign: 'center' }}>{this.state.error.message}</Text>
        </View>
      );
    }
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