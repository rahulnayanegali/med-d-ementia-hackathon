import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MedicationScreen } from './src/screens/MedicationScreen';
import { HealthCheckScreen } from './src/screens/HealthCheckScreen';

export type RootStackParamList = {
  Medication: undefined;
  HealthCheck: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Medication" component={MedicationScreen} />
        <Stack.Screen name="HealthCheck" component={HealthCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
