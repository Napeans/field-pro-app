import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { Colors } from '../theme/GlobalStyles';
import { BellAlertIcon,ArrowLeftIcon } from "react-native-heroicons/solid";
const HomeScreen: React.FC = () => {
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [allocatedJobs, setAllocatedJobs] = useState<Array<{
    id: string;
    title: string;
    address: string;
    time: string;
    checkedIn: boolean;
  }>>([
    { id: 'J-1001', title: 'Replace AC Filter', address: '123 Main St, Springfield', time: '08:00 AM', checkedIn: false },
    { id: 'J-1002', title: 'Inspect Generator', address: '45 Industrial Rd, Shelbyville', time: '10:30 AM', checkedIn: false },
    { id: 'J-1003', title: 'Fix Leak', address: '88 River Ave, Ogden', time: '01:00 PM', checkedIn: false },
  ]);

  const handleCheckIn = () => {
    setCheckedIn(prev => !prev);
    Alert.alert('Check-in', !checkedIn ? 'Checked in successfully' : 'Checked out');
  };

  const handleJobPress = (id: string) => {
    Alert.alert('Job selected', `Open job ${id}`);
  };

  const handleJobCheckIn = (id: string) => {
    const job = allocatedJobs.find(j => j.id === id);
    if (!job) return;
    const willBeCheckedIn = !job.checkedIn;
    setAllocatedJobs(prev => prev.map(j => (j.id === id ? { ...j, checkedIn: willBeCheckedIn } : j)));
    Alert.alert('Job Check-in', willBeCheckedIn ? `Checked in to ${job.id}` : `Checked out of ${job.id}`);
  };

  const [notifCount, setNotifCount] = useState<number>(100);

  return (
      <View style={[{backgroundColor:'white'}]}>
      <View
    style={{
      width: '100%',
      height: 65,
      backgroundColor: Colors.PRIMARY_BLUE,
      paddingHorizontal: 15
    }}
  >
    <View style={{marginTop: 20, flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',}}>
    <TouchableOpacity
      style={{ width: 44, height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}
      activeOpacity={0.7}
    >
      <ArrowLeftIcon size={28} color="white" />
    </TouchableOpacity>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Home</Text>
    </View>

    <TouchableOpacity
      style={{ width: 44, height: '100%', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', overflow: 'visible' }}
      activeOpacity={0.7}
      onPress={() => { /* open notifications */ }}
    >
      <BellAlertIcon size={28} color="white" />

      {notifCount > 0 && (
        <View style={{ position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FF3B30', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 }}>
          <Text style={{ color: 'white', fontSize: 11, fontWeight: '700' }}>{notifCount > 99 ? '99+' : notifCount}</Text>
        </View>
      )}
    </TouchableOpacity>
    </View>
  </View>
      
  <View style={{ padding: 16 }}>



    <View style={{ marginTop: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Allocated Jobs</Text>
      {allocatedJobs.map(job => (
        <View key={job.id} style={styles.jobItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.jobId}>{job.id}</Text>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobAddress}>{job.address}</Text>
            <Text style={styles.jobTime}>{job.time}</Text>
          </View>

          <TouchableOpacity
            style={[styles.jobButton, job.checkedIn ? styles.jobButtonChecked : null]}
            onPress={() => handleJobCheckIn(job.id)}
          >
            <Text style={styles.jobButtonText}>{job.checkedIn ? 'Checked In' : 'Check In'}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  statusText: {
    marginTop: 6,
    color: '#333',
  },
  jobItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  jobAddress: {
    color: '#666',
    marginTop: 6,
    fontSize: 13,
  },
  jobTime: {
    color: '#666',
    marginTop: 4,
    fontSize: 13,
  },
  jobButton: {
    backgroundColor: Colors.PRIMARY_BLUE,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  jobButtonChecked: {
    backgroundColor: '#4CAF50',
  },
  jobButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
