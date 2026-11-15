import './global.css';
import { useState } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from './components/store';
import Home from './screens/Home';
import Documents from './screens/Documents';
import Schedule from './screens/Schedule';
import { MyRequests, MyAppointments, Notifications, Profile } from './screens/Lists';

const SIDEBAR = [
  ['home', 'Home'],
  ['requests', 'My Requests'],
  ['appointments', 'My Appointments'],
  ['notifications', 'Notifications'],
  ['profile', 'Settings'],
];
const TABS = [
  ['home', 'Home'],
  ['notifications', 'Notifications'],
  ['profile', 'Profile'],
];

function Shell() {
  const { width } = useWindowDimensions();
  const wide = width >= 900; // sidebar layout on web, tab bar on phones
  const [tab, setTab] = useState('home');
  const [service, setService] = useState(null);

  function openTab(nextTab) {
    setService(null);
    setTab(nextTab);
  }

  function showHome() {
    setService(null);
  }

  const back = wide ? null : () => openTab('profile');

  let body;
  if (service === 'documents') body = <Documents onBack={showHome} />;
  else if (service) body = <Schedule key={service} kind={service} onBack={showHome} />;
  else if (tab === 'home') body = <Home wide={wide} onOpen={setService} />;
  else if (tab === 'requests') body = <MyRequests onBack={back} />;
  else if (tab === 'appointments') body = <MyAppointments onBack={back} />;
  else if (tab === 'notifications') body = <Notifications />;
  else body = <Profile go={openTab} />;

  if (wide)
    return (
      <View className='flex-1 flex-row bg-ink'>
        <View className='w-60 border-r border-line p-4'>
          <Text className='mb-6 mt-2 text-xl font-bold text-white'>Barangay Services</Text>
          {SIDEBAR.map(([id, label]) => (
            <Pressable
              key={id}
              onPress={() => openTab(id)}
              className={`mb-1 flex-row items-center rounded-xl px-3 py-3 ${!service && tab === id ? 'bg-crimson' : ''}`}
            >
              <Text className='text-white'>{label}</Text>
            </Pressable>
          ))}
        </View>
        <View className='flex-1'>
          <View className='flex-row items-center justify-end border-b border-line px-6 py-4'>
            <Text className='text-white'>Zyruz Collado</Text>
          </View>
          {body}
          <View className='flex-row justify-between border-t border-line px-6 py-4'>
            <Text className='text-muted'>© 2026 Barangay Services Portal</Text>
            <Text className='text-muted'>Serving our community</Text>
          </View>
        </View>
      </View>
    );

  const active = tab === 'requests' || tab === 'appointments' ? 'profile' : tab;
  return (
    <View className='flex-1 bg-ink'>
      <View className='flex-row items-center justify-between px-5 py-4'>
        <Text className='text-lg font-bold text-white'>Barangay Services</Text>
        <Pressable onPress={() => openTab('profile')} className='rounded-lg px-2 py-1'>
          <Text className='text-sm text-white'>Profile</Text>
        </Pressable>
      </View>
      {body}
      <View className='flex-row border-t border-line bg-ink'>
        {TABS.map(([id, label]) => (
          <Pressable key={id} onPress={() => openTab(id)} className='flex-1 items-center py-3'>
            <Text className={`text-xs ${!service && active === id ? 'font-bold text-crimson' : 'text-muted'}`}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-ink'>
        <AppProvider>
          <Shell />
        </AppProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
