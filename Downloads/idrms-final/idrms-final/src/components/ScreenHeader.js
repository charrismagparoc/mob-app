import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../styles/colors';

export function ScreenHeader({ title, onMenuPress, rightElement }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.wrap, { paddingTop: Math.max(insets.top, 8) }]}>
      <TouchableOpacity onPress={onMenuPress} style={s.menuBtn} activeOpacity={0.7}>
        <Ionicons name="menu" size={26} color={C.t1} />
      </TouchableOpacity>
      <Text style={s.title} numberOfLines={1}>{title}</Text>
      <View style={s.right}>{rightElement || null}</View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:    { backgroundColor: C.card, borderBottomColor: C.border, borderBottomWidth: 1, paddingHorizontal: 14, paddingBottom: 12, flexDirection: 'row', alignItems: 'center' },
  menuBtn: { padding: 6, marginLeft: -4 },
  title:   { flex: 1, fontSize: 15, fontWeight: '700', color: C.t1, textAlign: 'center', marginHorizontal: 6 },
  right:   { width: 38, alignItems: 'flex-end' },
});
