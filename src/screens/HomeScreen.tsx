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
  const [allocatedJobs, setAllocatedJobs] = useState<{id: string; title: string; location: string; time: string;}[]>([
    { id: 'J-1001', title: 'Replace AC Filter', location: 'Site A', time: '08:00 AM' },
    { id: 'J-1002', title: 'Inspect Generator', location: 'Site B', time: '10:30 AM' },
    { id: 'J-1003', title: 'Fix Leak', location: 'Site C', time: '01:00 PM' },
  ]);

  const handleCheckIn = () => {
    setCheckedIn(prev => !prev);
    Alert.alert('Check-in', !checkedIn ? 'Checked in successfully' : 'Checked out');
  };

  const handleJobPress = (id: string) => {
    Alert.alert('Job selected', `Open job ${id}`);
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
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={{ color: '#666' }}>{job.location} • {job.time}</Text>
          </View>
          <TouchableOpacity style={styles.jobButton} onPress={() => handleJobPress(job.id)}>
            <Text style={styles.jobButtonText}>Start</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  jobButton: {
    backgroundColor: Colors.PRIMARY_BLUE,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  jobButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
