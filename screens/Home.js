import { View, Text, Pressable, ScrollView } from 'react-native';

const SERVICES = [
  { id: 'documents', title: 'Document Request', description: 'Request barangay documents', accent: 'border-crimson' },
  { id: 'court', title: 'Court Schedule', description: 'Book a court date', accent: 'border-royal' },
  { id: 'clinic', title: 'Clinic Appointment', description: 'Schedule a clinic visit', accent: 'border-crimson' },
];

export default function Home({ wide, onOpen }) {
  return (
    <ScrollView className='flex-1' contentContainerClassName='p-6'>
      <Text className={`${wide ? 'text-4xl' : 'text-2xl'} font-bold text-white`}>
        Welcome to{' '}
        <Text className={wide ? 'text-white' : 'text-crimson'}>Barangay Services</Text>
      </Text>
      <Text className='mt-2 text-base text-muted'>Choose a service to get started.</Text>
      <View className={wide ? 'mt-6 flex-row gap-3' : 'mt-6 gap-3'}>
        {SERVICES.map((service) => (
          <Pressable
            key={service.id}
            onPress={() => onOpen(service.id)}
            className={`rounded-xl bg-card active:opacity-80 ${service.accent} ${
              wide ? 'flex-1 items-center border-t-4 p-6' : 'flex-row items-center border-l-4 p-4'
            }`}
          >
            <View className={wide ? 'mt-3 items-center' : 'flex-1'}>
              <Text className='text-lg font-semibold text-white'>{service.title}</Text>
              <Text className='text-sm text-muted'>{service.description}</Text>
            </View>
            <Text className={wide ? 'mt-4 text-2xl text-white' : 'text-2xl text-muted'}>
              {'>'}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
