import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { C } from '../styles/colors';

const TAB_ITEMS = [
  { name: 'Dashboard',   icon: 'home-outline',      iconActive: 'home' },
  { name: 'Alerts',      icon: 'megaphone-outline', iconActive: 'megaphone' },
  { name: 'Evacuation',  icon: 'location-outline',  iconActive: 'location' },
  { name: 'Residents',   icon: 'people-outline',    iconActive: 'people' },
  { name: 'Resources',   icon: 'cube-outline',      iconActive: 'cube' },
  { name: 'Incidents',   icon: 'warning-outline',   iconActive: 'warning' },
  { name: 'Risk',        icon: 'analytics-outline', iconActive: 'analytics' },
  { name: 'Reports',     icon: 'bar-chart-outline', iconActive: 'bar-chart' },
  { name: 'Map',         icon: 'map-outline',       iconActive: 'map' },
  { name: 'Users',       icon: 'person-outline',    iconActive: 'person' },
  { name: 'ActivityLog', icon: 'list-outline',      iconActive: 'list' },
];

const MAIN_TABS = TAB_ITEMS.slice(0, 5);
const MORE_TABS = TAB_ITEMS.slice(5);

export function BottomTabNavigator({ currentRoute, onNavigate }) {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { log } = useApp();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleNavigate = (screenName) => {
    onNavigate(screenName);
    setShowMoreMenu(false);
  };

const handleLogout = async () => {
  setShowLogoutModal(false);
  if (log && user) {
    log('Signed out: ' + user.name, 'Auth', user.name);
  }
  await logout();
};

  return (
    <>
      <View style={[s.container, { paddingBottom: insets.bottom }]}>
        <View style={s.tabBar}>
          {MAIN_TABS.map((item) => {
            const active = currentRoute === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                style={[s.tabItem, active && s.tabItemActive]}
                onPress={() => handleNavigate(item.name)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={active ? item.iconActive : item.icon}
                  size={20}
                  color={active ? C.blue : C.t3}
                />
                {active && <Text style={s.tabLabel}>{item.name}</Text>}
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[s.tabItem, currentRoute === 'More' && s.tabItemActive]}
            onPress={() => setShowMoreMenu(!showMoreMenu)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showMoreMenu ? 'ellipsis-vertical' : 'ellipsis-horizontal'}
              size={20}
              color={C.t3}
            />
          </TouchableOpacity>
        </View>

        {/* Logout Button - Icon only */}
        <TouchableOpacity
          style={s.logoutBtn}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color={C.red} />
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowLogoutModal(false)}>
          <View style={s.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={s.modalCenter}>
          <View style={s.modalBox}>
            <Ionicons name="alert-circle-outline" size={44} color={C.red} style={{ marginBottom: 12 }} />
            <Text style={s.modalTitle}>Sign Out</Text>
            <Text style={s.modalMsg}>Are you sure you want to sign out?</Text>
            <View style={s.modalBtns}>
              <TouchableOpacity
                style={s.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={s.modalCancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.modalLogoutBtn}
                onPress={handleLogout}
              >
                <Text style={s.modalLogoutTxt}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* More Menu Modal */}
      <Modal
        visible={showMoreMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMoreMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMoreMenu(false)}>
          <View style={moreMenuStyles.overlay}>
            <TouchableWithoutFeedback>
              <View style={moreMenuStyles.sheet}>
                <View style={moreMenuStyles.handle} />
                <Text style={moreMenuStyles.title}>More Screens</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {MORE_TABS.map((item) => {
                    const active = currentRoute === item.name;
                    return (
                      <TouchableOpacity
                        key={item.name}
                        style={[moreMenuStyles.menuItem, active && moreMenuStyles.menuItemActive]}
                        onPress={() => handleNavigate(item.name)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={active ? item.iconActive : item.icon}
                          size={20}
                          color={active ? C.blue : C.t3}
                          style={moreMenuStyles.menuIcon}
                        />
                        <Text style={[moreMenuStyles.menuText, active && moreMenuStyles.menuTextActive]}>
                          {item.name}
                        </Text>
                        {active && (
                          <Ionicons name="checkmark-circle" size={18} color={C.blue} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <TouchableOpacity
                  style={moreMenuStyles.closeBtn}
                  onPress={() => setShowMoreMenu(false)}
                >
                  <Text style={moreMenuStyles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  container:      { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.border },
  tabBar:         { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 8 },
  tabItem:        { alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 12 },
  tabItemActive:  { backgroundColor: C.el, borderRadius: 12, paddingHorizontal: 14 },
  tabLabel:       { fontSize: 9, fontWeight: '700', color: C.blue, letterSpacing: 0.3 },
  logoutBtn:      { padding: 10, marginRight: 8, marginBottom: 4 },
  modalOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  modalCenter:    { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  modalBox:       { backgroundColor: C.card, borderRadius: 14, padding: 20, width: '100%', borderWidth: 1, borderColor: C.border, alignItems: 'center' },
  modalTitle:     { fontSize: 18, fontWeight: '800', color: C.t1, marginBottom: 8 },
  modalMsg:       { fontSize: 14, color: C.t2, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalBtns:      { flexDirection: 'row', gap: 12, width: '100%' },
  modalCancelBtn: { flex: 1, backgroundColor: C.el, borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  modalCancelTxt: { color: C.t2, fontSize: 13, fontWeight: '600' },
  modalLogoutBtn: { flex: 1, backgroundColor: C.red, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  modalLogoutTxt: { color: '#fff', fontSize: 13, fontWeight: '800' },
});

const moreMenuStyles = StyleSheet.create({
  overlay:           { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet:             { backgroundColor: C.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 16, paddingTop: 12, maxHeight: '88%', borderTopWidth: 1, borderTopColor: C.border },
  handle:            { width: 38, height: 4, backgroundColor: C.border, borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  title:             { fontSize: 16, fontWeight: '700', color: C.t1, marginBottom: 12, paddingHorizontal: 4 },
  menuItem:          { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: C.border, gap: 12 },
  menuItemActive:    { backgroundColor: C.el, borderRadius: 8, marginHorizontal: 4, marginBottom: 4, borderBottomWidth: 0, paddingHorizontal: 16 },
  menuIcon:          { width: 24 },
  menuText:          { flex: 1, fontSize: 14, fontWeight: '600', color: C.t2 },
  menuTextActive:    { color: C.blue, fontWeight: '700' },
  closeBtn:          { backgroundColor: C.el, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8, marginBottom: 16, borderWidth: 1, borderColor: C.border },
  closeBtnText:      { fontSize: 14, fontWeight: '700', color: C.t1 },
});