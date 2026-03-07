import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Chips, Empty, SecHdr } from '../components/Shared';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { C } from '../styles/colors';

const TYPE_CLS = {
  Alert: C.red,
  Incident: C.orange,
  Evacuation: C.green,
  Resource: C.blue,
  Resident: C.purple,
  User: C.t2,
  Auth: C.blue,
  System: C.t2,
};

export default function ActivityLogScreen({ navigation }) {
  const { activityLog, reload } = useApp();
  const { logout } = useAuth();
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setBusy(true);
    reload().finally(() => setBusy(false));
  }, []);

  const types = ['All', ...new Set(activityLog.map(l => l.type).filter(Boolean))];

  const filtered = activityLog.filter(l => {
    const matchSearch = !q || (
      (l.action || '').toLowerCase().includes(q.toLowerCase()) || 
      (l.userName || '').toLowerCase().includes(q.toLowerCase()) ||
      (l.createdAt && new Date(l.createdAt).toLocaleDateString('en-PH').includes(q)) ||
      (l.createdAt && new Date(l.createdAt).toLocaleString('en-PH', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }).includes(q))
    );
    const matchType = typeFilter === 'All' || l.type === typeFilter;
    return matchSearch && matchType;
  });

  async function onRefresh() {
    setBusy(true);
    await reload();
    setBusy(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* HEADER */}
      <View style={s.headerContainer}>
        <TouchableOpacity onPress={() => setSidebarOpen(true)} style={s.hamburger}>
          <Text style={s.hamburgerText}>☰</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Activity</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={s.searchBar}>
        <View style={s.searchContainer}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search action, user, or date (e.g. Mar 7)..."
            placeholderTextColor={C.t3}
            value={q}
            onChangeText={setQ}
          />
          {q && (
            <TouchableOpacity 
              style={s.clearBtn}
              onPress={() => setQ('')}
            >
              <Text style={s.clearBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={s.fbar}>
        <Chips opts={types} val={typeFilter} onSelect={setTypeFilter} />
      </View>

      <ScrollView contentContainerStyle={s.list} refreshControl={<RefreshControl refreshing={busy} onRefresh={onRefresh} tintColor={C.blue} />}>
        <View style={s.info}>
          <SecHdr title="Audit Trail" count={activityLog.length} />
          <Text style={s.countText}>
            {filtered.length} record{filtered.length !== 1 ? 's' : ''} found
            {q && ` matching "${q}"`}
            {typeFilter !== 'All' && ` · Type: ${typeFilter}`}
          </Text>
          {q && /^\d{1,2}/.test(q) && (
            <Text style={s.hintText}>💡 Searching by date: Try "Mar 7" or "2024-03-07"</Text>
          )}
        </View>

        {filtered.map((log, i) => (
          <View key={log.id || i} style={s.card}>
            <View style={s.top}>
              <View style={[s.avatar, { backgroundColor: TYPE_CLS[log.type] || C.t2 }]}>
                <Text style={s.avatarTxt}>{(log.userName || 'S')[0].toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.action}>{log.action || '—'}</Text>
                <View style={s.meta}>
                  <View style={[s.badge, { backgroundColor: TYPE_CLS[log.type] + '22' }]}>
                    <Text style={[s.badgeTxt, { color: TYPE_CLS[log.type] }]}>{log.type || 'System'}</Text>
                  </View>
                  <Text style={s.user}>{log.userName || 'System'}</Text>
                </View>
              </View>
            </View>

            <View style={s.bottom}>
              <Text style={s.timestamp}>
                {log.createdAt
                  ? new Date(log.createdAt).toLocaleDateString('en-PH', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'}
              </Text>
              {log.urgent && <Text style={s.urgent}>⚠️ Urgent</Text>}
            </View>
          </View>
        ))}

        {filtered.length === 0 && !busy && (
          <Empty
            emoji="📋"
            title={activityLog.length === 0 ? 'No activity yet' : 'No matching records'}
          />
        )}
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentRoute="ActivityLog"
        onNavigate={(screenName) => {
          navigation.navigate(screenName);
          setSidebarOpen(false);
        }}
        onLogout={() => {
          setSidebarOpen(false);
          logout();
        }}
        userName="User"
      />
    </View>
  );
}

const s = StyleSheet.create({
  headerContainer: {
    backgroundColor: C.card,
    borderBottomColor: C.border,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    padding: 8,
    marginLeft: -8,
  },
  hamburgerText: {
    fontSize: 24,
    color: C.t1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.t1,
    flex: 1,
    textAlign: 'center',
  },
  searchBar: {
    padding: 11,
    paddingBottom: 0,
    backgroundColor: C.card,
  },
  fbar: {
    backgroundColor: C.card,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  list: {
    padding: 12,
  },
  searchBar: {
    padding: 11,
    paddingBottom: 8,
    backgroundColor: C.card,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.el,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: C.t3,
  },
  searchInput: {
    flex: 1,
    color: C.t1,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  clearBtn: {
    padding: 6,
    marginLeft: 4,
  },
  clearBtnText: {
    fontSize: 16,
    color: C.t2,
    fontWeight: '700',
  },
  info: {
    marginBottom: 12,
  },
  countText: {
    fontSize: 12,
    color: C.t2,
    fontWeight: '500',
    marginTop: 6,
  },
  hintText: {
    fontSize: 11,
    color: C.blue,
    marginTop: 6,
    fontWeight: '500',
  },
  subText: {
    fontSize: 10,
    color: C.t3,
    marginTop: 6,
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 13,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: C.border,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    marginBottom: 9,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarTxt: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  action: {
    fontSize: 12,
    fontWeight: '600',
    color: C.t1,
    lineHeight: 17,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 5,
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeTxt: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  user: {
    fontSize: 10,
    color: C.t3,
    fontWeight: '500',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: {
    fontSize: 10,
    color: C.t3,
  },
  urgent: {
    fontSize: 11,
    color: C.red,
    fontWeight: '700',
  },
});