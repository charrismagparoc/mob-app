import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DropFilter, Empty, Search, SecHdr } from '../components/Shared';
import { useApp } from '../context/AppContext';
import { C } from '../styles/colors';

const TYPE_ICON = {
  Alert:      { icon: 'megaphone',       color: C.red    },
  Incident:   { icon: 'warning',         color: C.orange },
  Evacuation: { icon: 'location',        color: C.green  },
  Resource:   { icon: 'cube',            color: C.blue   },
  Resident:   { icon: 'person',          color: C.purple },
  User:       { icon: 'person-circle',   color: C.t2     },
  Auth:       { icon: 'log-in',          color: C.blue   },
  System:     { icon: 'settings',        color: C.t2     },
};

function getAuthStatus(log) {
  if (log.type !== 'Auth') return null;
  if (log.userStatus) return log.userStatus;
  const action = (log.action || '').toLowerCase();
  if (action.includes('signed in') || action.includes('login')) return 'Active';
  if (action.includes('signed out') || action.includes('logout') || action.includes('offline')) return 'Inactive';
  return null;
}

export default function ActivityLogScreen() {
  const insets = useSafeAreaInsets();
  const { activityLog, reload } = useApp();
  const [q, setQ]                   = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [busy, setBusy]             = useState(false);

  useEffect(() => { setBusy(true); reload().finally(() => setBusy(false)); }, []);

  // auto-refresh every 30s for real-time updates
  useEffect(() => {
    const interval = setInterval(() => { reload(); }, 30000);
    return () => clearInterval(interval);
  }, [reload]);

  const types    = ['All', ...new Set(activityLog.map(l => l.type).filter(Boolean))];
  const filtered = activityLog.filter(l =>
    (!q ||
      (l.action||'').toLowerCase().includes(q.toLowerCase()) ||
      (l.userName||'').toLowerCase().includes(q.toLowerCase())) &&
    (typeFilter === 'All' || l.type === typeFilter)
  );

  async function onRefresh() { setBusy(true); await reload(); setBusy(false); }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={[s.topBar, { paddingTop: insets.top + 14 }]}>
        <View style={s.logoRow}>
          <Ionicons name="shield-checkmark" size={20} color={C.blue} />
          <Text style={s.title}>Activity Log</Text>
        </View>
      </View>

      <View style={s.bar}>
        <Search value={q} onChange={setQ} placeholder="Search action, user..." />
      </View>

      <View style={s.filterRow}>
        <DropFilter label="Type" value={typeFilter} opts={types} onSelect={setTypeFilter} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={<RefreshControl refreshing={busy} onRefresh={onRefresh} tintColor={C.blue} />}>

        <View style={s.meta}>
          <SecHdr title="Audit Trail" count={activityLog.length} />
          <Text style={s.count}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</Text>
        </View>

        {filtered.map((log, i) => {
          const cfg        = TYPE_ICON[log.type] || TYPE_ICON.System;
          const authStatus = getAuthStatus(log);
          const isActive   = authStatus === 'Active';
          const role       = log.userRole || '';

          return (
            <View key={log.id || i} style={[s.card, i % 2 === 1 && s.zebra]}>
              <View style={[s.iconCircle, { backgroundColor: cfg.color + '20' }]}>
                <Ionicons name={cfg.icon} size={15} color={cfg.color} />
              </View>

              <View style={{ flex: 1 }}>
                <View style={s.actionRow}>
                  {log.urgent && <Ionicons name="alert-circle" size={11} color={C.red} />}
                  <Text style={s.actionTxt} numberOfLines={2}>{log.action || '—'}</Text>
                </View>

                <View style={s.metaRow}>
                  <Ionicons name="person-outline" size={10} color={C.t3} />
                  <Text style={s.metaTxt}>{log.userName || 'System'}</Text>
                  {role ? (
                    <View style={[s.rolePill, { backgroundColor: role === 'Admin' ? C.red + '22' : C.blue + '22' }]}>
                      <Text style={[s.roleTxt, { color: role === 'Admin' ? C.red : C.blue }]}>{role}</Text>
                    </View>
                  ) : null}
                  <Ionicons name="time-outline" size={10} color={C.t3} style={{ marginLeft: 6 }} />
                  <Text style={s.metaTxt}>
                    {log.createdAt ? new Date(log.createdAt).toLocaleString('en-PH', {
                      month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    }) : '—'}
                  </Text>
                </View>
              </View>

              {authStatus ? (
                <View style={[s.statusPill, { backgroundColor: isActive ? '#4caf5022' : '#9e9e9e22' }]}>
                  <View style={[s.statusDot, { backgroundColor: isActive ? '#4caf50' : '#9e9e9e' }]} />
                  <Text style={[s.statusTxt, { color: isActive ? '#4caf50' : '#9e9e9e' }]}>
                    {authStatus}
                  </Text>
                </View>
              ) : (
                <View style={[s.typePill, { backgroundColor: cfg.color + '20' }]}>
                  <Text style={[s.typeTxt, { color: cfg.color }]}>{log.type || 'System'}</Text>
                </View>
              )}
            </View>
          );
        })}

        {filtered.length === 0 && !busy &&
          <Empty iconName="list-outline" title={activityLog.length === 0 ? 'No activity yet' : 'No matching records'} />}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  topBar:     { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 14, backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border },
  logoRow:    { flexDirection: 'row', alignItems: 'center', gap: 7 },
  title:      { fontSize: 17, fontWeight: '800', color: C.t1 },
  bar:        { padding: 12, backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border },
  filterRow:  { flexDirection: 'row', gap: 8, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border },
  meta:       { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 4 },
  count:      { fontSize: 11, color: C.t3, marginBottom: 6 },
  card:       { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  zebra:      { backgroundColor: 'rgba(255,255,255,0.02)' },
  iconCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  actionRow:  { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  actionTxt:  { fontSize: 12, color: C.t1, flex: 1, fontWeight: '600' },
  metaRow:    { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  metaTxt:    { fontSize: 10, color: C.t3 },
  rolePill:   { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4, marginLeft: 4 },
  roleTxt:    { fontSize: 9, fontWeight: '800' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusDot:  { width: 6, height: 6, borderRadius: 3 },
  statusTxt:  { fontSize: 10, fontWeight: '700' },
  typePill:   { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  typeTxt:    { fontSize: 9, fontWeight: '700' },
});