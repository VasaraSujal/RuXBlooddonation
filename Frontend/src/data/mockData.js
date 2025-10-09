import { BLOOD_GROUPS, RARE_BLOOD_GROUPS } from '../utils/constants.js';

export const mockDonors = [
  {
    id: '1',
    name: 'John Doe',
    bloodGroup: 'O-',
    distance: '2.3 km',
    isRare: true,
    coordinates: [28.6129, 77.2295],
    available: true,
    phone: '+91 9876543210',
    lastDonation: '2024-08-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    bloodGroup: 'AB-',
    distance: '1.8 km',
    isRare: true,
    coordinates: [28.6289, 77.2165],
    available: true,
    phone: '+91 9876543211',
    lastDonation: '2024-09-10'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    bloodGroup: 'A+',
    distance: '3.5 km',
    isRare: false,
    coordinates: [28.5985, 77.2012],
    available: false,
    phone: '+91 9876543212',
    lastDonation: '2024-10-01'
  },
  {
    id: '4',
    name: 'Emily Chen',
    bloodGroup: 'B-',
    distance: '4.2 km',
    isRare: true,
    coordinates: [28.6425, 77.2245],
    available: true,
    phone: '+91 9876543213',
    lastDonation: '2024-07-22'
  },
  {
    id: '5',
    name: 'David Brown',
    bloodGroup: 'O+',
    distance: '0.9 km',
    isRare: false,
    coordinates: [28.6089, 77.2145],
    available: true,
    phone: '+91 9876543214',
    lastDonation: '2024-09-05'
  },
  {
    id: '6',
    name: 'Lisa Martinez',
    bloodGroup: 'A-',
    distance: '5.1 km',
    isRare: true,
    coordinates: [28.5725, 77.1892],
    available: true,
    phone: '+91 9876543215',
    lastDonation: '2024-08-28'
  }
];

export const mockHospitals = [
  {
    id: '1',
    name: 'City General Hospital',
    bloodNeeded: 'O-',
    distance: '1.2 km',
    urgency: 'high',
    unitsNeeded: 5,
    coordinates: [28.6195, 77.2125],
    contact: '+91 11-2345-6789',
    address: 'Connaught Place, New Delhi'
  },
  {
    id: '2',
    name: 'Metro Medical Center',
    bloodNeeded: 'AB+',
    distance: '2.8 km',
    urgency: 'medium',
    unitsNeeded: 2,
    coordinates: [28.6355, 77.2245],
    contact: '+91 11-2345-6790',
    address: 'Karol Bagh, New Delhi'
  },
  {
    id: '3',
    name: 'Apollo Healthcare',
    bloodNeeded: 'A+',
    distance: '3.4 km',
    urgency: 'low',
    unitsNeeded: 3,
    coordinates: [28.5875, 77.1995],
    contact: '+91 11-2345-6791',
    address: 'South Extension, New Delhi'
  },
  {
    id: '4',
    name: 'Emergency Care Hospital',
    bloodNeeded: 'B-',
    distance: '0.7 km',
    urgency: 'critical',
    unitsNeeded: 8,
    coordinates: [28.6089, 77.2210],
    contact: '+91 11-2345-6792',
    address: 'India Gate, New Delhi'
  },
  {
    id: '5',
    name: 'Fortis Medical Institute',
    bloodNeeded: 'O+',
    distance: '4.5 km',
    urgency: 'medium',
    unitsNeeded: 4,
    coordinates: [28.6512, 77.2315],
    contact: '+91 11-2345-6793',
    address: 'Rohini, New Delhi'
  },
  {
    id: '6',
    name: 'Max Super Speciality',
    bloodNeeded: 'AB-',
    distance: '6.2 km',
    urgency: 'high',
    unitsNeeded: 2,
    coordinates: [28.5645, 77.1785],
    contact: '+91 11-2345-6794',
    address: 'Saket, New Delhi'
  }
];