import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Badge, Confirm, Empty, FInput, FormModal, FPick } from '../components/Shared';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { C } from '../styles/colors';

const ROLE_CLS = { Admin: C.red, Staff: C.blue };
const STATUS_CLS = { Active: C.green, Inactive: C.orange };
const EF = { name: '', role: 'Staff', email: '', status: 'Active', password: '' };

export default function UsersScreen({ navigation }) {
  const { users, addUser, updateUser, deleteUser, reload } = useApp();
  const { logout } = useAuth();
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ ...EF });
  const [edit, setEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [delId, setDelId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveErr, setSaveErr] = useState('');

  const list = users.filter(u => 
    !q || 
    u.name.toLowerCase().includes(q.toLowerCase()) || 
    u.email.toLowerCase().includes(q.toLowerCase()) ||
    (u.role && u.role.toLowerCase().includes(q.toLowerCase())) ||
    (u.status && u.status.toLowerCase().includes(q.toLowerCase()))
  );

  function openAdd() {
    setForm({ ...EF });
    setEdit(null);
    setSaveErr('');
    setShow(true);
  }

  function openEdit(u) {
    setForm({ ...u, password: '' });
    setEdit(u);
    setSaveErr('');
    setShow(true);
  }

  function set(k, v) {
    setForm(p => ({ ...p, [k]: v }));
  }

  async function save() {
    if (!form.name.trim()) {
      setSaveErr('Full name is required.');
      return;
    }
    if (!form.email.trim()) {
      setSaveErr('Email is required.');
      return;
    }
    if (!edit && !form.password.trim()) {
      setSaveErr('Password is required for new users.');
      return;
    }
    setSaveErr('');
    setSaving(true);
    try {
      if (edit) await updateUser(edit.id, form);
      else await addUser(form);
      setShow(false);
    } catch (e) {
      setSaveErr(e.message || 'Error saving user');
    }
    setSaving(false);
  }

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
        <Text style={s.headerTitle}>Users</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={s.bar}>
        <View style={s.searchContainer}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search users by name, email, role..."
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
        <TouchableOpacity style={s.add} onPress={openAdd}>
          <Text style={s.addTxt}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.list} refreshControl={<RefreshControl refreshing={busy} onRefresh={onRefresh} tintColor={C.blue} />}>
        <View style={s.countContainer}>
          <Text style={s.countText}>
            {list.length} {list.length === 1 ? 'user' : 'users'} found
            {q && ` matching "${q}"`}
          </Text>
        </View>

        {list.map(u => (
          <View key={String(u.id)} style={s.card}>
            <View style={s.top}>
              <View style={[s.avatar, { backgroundColor: ROLE_CLS[u.role] || C.blue }]}>
                <Text style={s.avatarTxt}>{(u.name || 'U')[0].toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{u.name}</Text>
                <Text style={s.email}>{u.email}</Text>
              </View>
              <TouchableOpacity onPress={() => openEdit(u)} style={s.iBtn}>
                <Text>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDelId(u.id)} style={s.iBtn}>
                <Text>🗑️</Text>
              </TouchableOpacity>
            </View>

            <View style={s.meta}>
              <Badge label={u.role} variant={u.role === 'Admin' ? 'danger' : 'info'} />
              <Badge label={u.status} variant={u.status === 'Active' ? 'success' : 'warning'} />
            </View>

            {u.lastLogin && (
              <Text style={s.lastLogin}>
                Last login: {new Date(u.lastLogin).toLocaleString()}
              </Text>
            )}
          </View>
        ))}

        {list.length === 0 && <Empty emoji="👥" title="No users found" />}
        <View style={{ height: 24 }} />
      </ScrollView>

      <FormModal
        visible={show}
        title={edit ? 'Edit User' : 'Add User'}
        onClose={() => setShow(false)}
        onSave={save}
        saving={saving}
      >
        <FInput label="Full Name *" value={form.name} onChange={v => set('name', v)} req />
        <FPick label="Role" value={form.role} opts={['Admin', 'Staff']} onChange={v => set('role', v)} />
        <FPick label="Status" value={form.status} opts={['Active', 'Inactive']} onChange={v => set('status', v)} />
        <FInput label="Email Address *" value={form.email} onChange={v => set('email', v)} placeholder="user@kauswagan.gov.ph" req />
        <FInput
          label={'Password ' + (edit ? '(leave blank to keep current)' : '*')}
          value={form.password || ''}
          onChange={v => set('password', v)}
          placeholder="Password..."
          type="password"
          req={!edit}
        />
        {saveErr && (
          <View style={s.errBox}>
            <Text style={s.errTxt}>{saveErr}</Text>
          </View>
        )}
      </FormModal>

      <Confirm
        visible={!!delId}
        title="Delete User"
        msg="Remove this user account permanently?"
        onOk={async () => {
          await deleteUser(delId);
          setDelId(null);
        }}
        onNo={() => setDelId(null)}
      />

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentRoute="Users"
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
  bar: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    backgroundColor: C.card,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  searchContainer: {
    flex: 1,
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
  add: {
    backgroundColor: C.blue,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 42,
  },
  addTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  list: {
    padding: 12,
  },
  countContainer: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 4,
  },
  countText: {
    fontSize: 12,
    color: C.t2,
    fontWeight: '500',
  },
  count: {
    fontSize: 11,
    color: C.t3,
    marginBottom: 7,
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
    alignItems: 'center',
    gap: 9,
    marginBottom: 9,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: C.t1,
  },
  email: {
    fontSize: 10,
    color: C.t3,
    marginTop: 2,
    fontFamily: 'monospace',
  },
  iBtn: {
    padding: 5,
  },
  meta: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 7,
  },
  lastLogin: {
    fontSize: 10,
    color: C.t3,
    fontStyle: 'italic',
  },
  errBox: {
    backgroundColor: C.red + '22',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: C.red + '44',
  },
  errTxt: {
    color: C.red,
    fontSize: 12,
    fontWeight: '600',
  },
});