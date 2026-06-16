// data/mockData.ts

export interface Medication {
  id: string;
  name: string;
  emoji: string;
  scheduledDay: string;
  scheduledTime: string;
}

export interface Patient {
  firstName: string;
}

export interface Caregiver {
  name: string;
  phoneNumber: string;
}

export interface AppData {
  patient: Patient;
  caregiver: Caregiver;
  medications: Medication[];
}

export const mockData: AppData = {
  patient: {
    firstName: 'Sally',
  },
  caregiver: {
    name: 'Dr. Smith',
    phoneNumber: '+15551234567',
  },
  medications: [
    {
      id: '1',
      name: 'Donepezil',
      emoji: '💊',
      scheduledDay: 'Monday',
      scheduledTime: '8:00 AM',
    },
    {
      id: '2',
      name: 'Vitamin D',
      emoji: '☀️',
      scheduledDay: 'Monday',
      scheduledTime: '8:00 AM',
    },
    {
      id: '3',
      name: 'Blood Pressure',
      emoji: '❤️',
      scheduledDay: 'Monday',
      scheduledTime: '12:00 PM',
    },
  ],
};
