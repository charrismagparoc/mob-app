import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated, Dimensions, Platform,
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../styles/colors';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(width * 0.78, 300);

const mainNavItems = [
  { name: 'Dashboard',  icon: 'home-outline',      iconActive: 'home',         label: 'Dashboard'   },
  { name: 'Incidents',  icon: 'warning-outline',   iconActive: 'warning',      label: 'Incidents'   },
  { name: 'Alerts',     icon: 'megaphone-outline', iconActive: 'megaphone',    label: 'Alerts'      },
  { name: 'Evacuation', icon: 'location-outline',  iconActive: 'location',     label: 'Evacuation'  },
];

const secondaryNavItems = [
  { name: 'Residents',   icon: 'people-outline',       iconActive: 'people',          label: 'Residents'    },
  { name: 'Resources',   icon: 'cube-outline',          iconActive: 'cube',            label: 'Resources'    },
  { name: 'Risk',        icon: 'analytics-outline',     iconActive: 'analytics',       label: 'Risk'         },
  { name: 'Reports',     icon: 'bar-chart-outline',     iconActive: 'bar-chart',       label: 'Reports'      },
  { name: 'Users',       icon: 'person-outline',        iconActive: 'person',          label: 'Users'        },
  { name: 'ActivityLog', icon: 'list-outline',           iconActive: 'list',            label: 'Activity Log' },
  { name: 'Map',         icon: 'map-outline',            iconActive: 'map',             label: 'GIS Map'      },
];

export function Sidebar({ isOpen, onClose, currentRoute, onNavigate, onLogout, userName = 'User' }) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleNavPress = (screenName) => { onNavigate(screenName); onClose(); };
  const handleLogout   = () => { onLogout(); onClose(); };

  const renderNavItem = (item) => {
    const active = currentRoute === item.name;
    return (
      <TouchableOpacity key={item.name}
        style={[s.navItem, active && s.navItemActive]}
        onPress={() => handleNavPress(item.name)}
        activeOpacity={0.7}>
        <Ionicons
          name={active ? item.iconActive : item.icon}
          size={20}
          color={active ? C.blue : C.t3}
          style={s.navIcon}
        />
        <Text style={[s.navLabel, !active && s.navLabelInactive]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isOpen && (
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={onClose} />
      )}
      <Animated.View style={[s.container, { transform: [{ translateX: slideAnim }] }]}>
        {/* Header with safe area top padding */}
        <View style={[s.header, { paddingTop: Math.max(insets.top, 16) + 8 }]}>
          <View style={s.logoRow}>
            <Ionicons name="shield-checkmark" size={22} color={C.blue} />
            <Text style={s.title}>IDRMS</Text>
          </View>
          <Text style={s.subtitle}>Welcome, {userName}</Text>
        </View>

        <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>MAIN</Text>
            {mainNavItems.map(renderNavItem)}
          </View>
          <View style={s.section}>
            <Text style={s.sectionTitle}>MORE</Text>
            {secondaryNavItems.map(renderNavItem)}
          </View>
        </ScrollView>

        <View style={[s.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={18} color={C.red} />
            <Text style={s.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const s = StyleSheet.create({
  overlay:         { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 998 },
  container:       { position: 'absolute', left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH, backgroundColor: C.card, borderRightColor: C.border, borderRightWidth: 1, zIndex: 999, elevation: 10 },
  header:          { paddingHorizontal: 20, paddingBottom: 18, borderBottomColor: C.border, borderBottomWidth: 1 },
  logoRow:         { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  title:           { fontSize: 18, fontWeight: '800', color: C.t1, letterSpacing: 0.5 },
  subtitle:        { fontSize: 12, color: C.t3, fontWeight: '500' },
  scroll:          { flex: 1 },
  section:         { paddingTop: 16 },
  sectionTitle:    { paddingHorizontal: 20, fontSize: 10, fontWeight: '700', color: C.t3, letterSpacing: 1.2, marginBottom: 4 },
  navItem:         { paddingHorizontal: 16, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 2.5, borderLeftColor: 'transparent', marginHorizontal: 8, borderRadius: 8, marginBottom: 2 },
  navItemActive:   { borderLeftColor: C.blue, backgroundColor: 'rgba(91,192,235,0.10)' },
  navIcon:         { marginRight: 13, width: 22, textAlign: 'center' },
  navLabel:        { fontSize: 13, fontWeight: '600', color: C.t1 },
  navLabelInactive:{ color: C.t2 },
  footer:          { paddingHorizontal: 16, paddingTop: 14, borderTopColor: C.border, borderTopWidth: 1 },
  logoutBtn:       { backgroundColor: 'rgba(232,72,85,0.12)', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  logoutText:      { color: C.red, fontWeight: '700', fontSize: 13 },
});
