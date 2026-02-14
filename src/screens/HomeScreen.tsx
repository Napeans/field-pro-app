import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  Modal,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { Colors } from '../theme/GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BellAlertIcon,ArrowLeftIcon } from "react-native-heroicons/solid";
const HomeScreen: React.FC = () => {
  const [allocatedJobs, setAllocatedJobs] = useState<Array<{
    id: string;
    title: string;
    address: string;
    time: string;
    date: Date;
    checkedIn: boolean;
    checkInTime: string | null;
    checkOutTime: string | null;
    customerName: string;
    customerMobile: string;
  }>>(() => {
    const today = new Date();
    const yesterday = new Date(); yesterday.setDate(today.getDate() - 2);
    const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    const lastWeek = new Date(); lastWeek.setDate(today.getDate() - 8);

    return [
      { id: 'J-1001', title: 'Replace AC Filter', address: '123 Main St, Springfield', time: '08:00 AM', date: today, checkedIn: false, checkInTime: null, checkOutTime: null, customerName: 'John Smith', customerMobile: '+1-555-0101' },
      { id: 'J-1002', title: 'Inspect Generator', address: '45 Industrial Rd, Shelbyville', time: '10:30 AM', date: yesterday, checkedIn: false, checkInTime: null, checkOutTime: null, customerName: 'Jane Doe', customerMobile: '+1-555-0102' },
      { id: 'J-1003', title: 'Fix Leak', address: '88 River Ave, Ogden', time: '01:00 PM', date: tomorrow, checkedIn: false, checkInTime: null, checkOutTime: null, customerName: 'Mike Johnson', customerMobile: '+1-555-0103' },
      { id: 'J-1004', title: 'Roof Inspection', address: '200 Hill St, Springfield', time: '03:00 PM', date: lastWeek, checkedIn: false, checkInTime: null, checkOutTime: null, customerName: 'Sarah Williams', customerMobile: '+1-555-0104' },
    ];
  });

  const [filter, setFilter] = useState<'today' | 'week' | 'all' | 'date'>('today');
  const [showPast, setShowPast] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Check-in Form Modal States
  const [showCheckInModal, setShowCheckInModal] = useState<boolean>(false);
  const [selectedJobForForm, setSelectedJobForForm] = useState<string | null>(null);
  const [engineerComments, setEngineerComments] = useState<string>('');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [customerSignature, setCustomerSignature] = useState<string | null>(null);

  const filteredJobs = (() => {
    const startOfToday = new Date(); startOfToday.setHours(0,0,0,0);
    const endOfToday = new Date(startOfToday); endOfToday.setHours(23,59,59,999);
    const endOfWeek = new Date(startOfToday); endOfWeek.setDate(endOfWeek.getDate() + 7);

    return allocatedJobs.filter(job => {
      const jd = job.date instanceof Date ? job.date : new Date(job.date);
      if (!showPast && jd < startOfToday) return false;
      if (filter === 'today') return jd >= startOfToday && jd <= endOfToday;
      if (filter === 'week') return jd >= startOfToday && jd <= endOfWeek;
      if (filter === 'date') return jd.toDateString() === selectedDate.toDateString();
      return true;
    });
  })();

  const handleJobCheckIn = (id: string) => {
    setSelectedJobForForm(id);
    setEngineerComments('');
    setBeforeImage(null);
    setAfterImage(null);
    setCustomerSignature(null);
    setShowCheckInModal(true);
  };

  const handleCheckInFormSubmit = () => {
    if (!selectedJobForForm) return;
    
    if (!engineerComments.trim()) {
      Alert.alert('Error', 'Please enter engineer comments');
      return;
    }

    const job = allocatedJobs.find(j => j.id === selectedJobForForm);
    if (!job) return;

    const now = new Date();
    const dateTimeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setAllocatedJobs(prev => prev.map(j => (j.id === selectedJobForForm ? { ...j, checkedIn: true, checkInTime: dateTimeStr } : j)));
    
    Alert.alert('Success', `Checked in to ${job.id} at ${dateTimeStr}\n\nEngineer Comments: ${engineerComments}`);
    
    setShowCheckInModal(false);
  };

  const handleCallCustomer = (phone: string, name: string) => {
    const tel = `tel:${phone}`;
    Linking.openURL(tel).catch(() => Alert.alert('Error', `Unable to make call to ${name}`));
  };

  const [notifCount, setNotifCount] = useState<number>(100);

  return (
      <View style={[{backgroundColor:'white'}]}>
      <View
    style={{
      width: '100%',
      height: 75,
      backgroundColor: Colors.PRIMARY_BLUE,
      paddingHorizontal: 15
    }}
  >
    <View style={{marginTop: 30, flexDirection: 'row',
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
    <View style={styles.filterBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{ alignItems: 'center', paddingRight: 8 }}
      >
        <View style={styles.filterChipsRow}>
          <TouchableOpacity style={[styles.chip, filter === 'today' && styles.chipActive]} onPress={() => setFilter('today')}>
            <Text style={[styles.chipText, filter === 'today' && styles.chipTextActive]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, filter === 'week' && styles.chipActive]} onPress={() => setFilter('week')}>
            <Text style={[styles.chipText, filter === 'week' && styles.chipTextActive]}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, filter === 'date' && styles.chipActive]} onPress={() => { setFilter('date'); setShowDatePicker(true); }}>
            <Text style={[styles.chipText, filter === 'date' && styles.chipTextActive]}>Date{filter==='date' ? ` (${selectedDate.toLocaleDateString()})` : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, filter === 'all' && styles.chipActive]} onPress={() => setFilter('all')}>
            <Text style={[styles.chipText, filter === 'all' && styles.chipTextActive]}>All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 8, color: '#444' }}>Show past</Text>
        <Switch value={showPast} onValueChange={setShowPast} />
      </View> */}
    </View>

    <View style={{ marginTop: 8, marginBottom: 6 }}>
      <Text style={{ fontSize: 14, color: '#444' }}>Showing {filteredJobs.length} of {allocatedJobs.length} jobs</Text>
    </View>

    <View style={{ marginTop: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Allocated Jobs</Text>
      {filteredJobs.map(job => (
        <View key={job.id} style={styles.jobTile}>
          {/* Section 1: Job Details with Check-in Button */}
          <View style={styles.jobSection1}>
            <View style={{ flex: 1 }}>
              <Text style={styles.jobId}>{job.id}</Text>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobAddress}>{job.address}</Text>
              <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
                <Text style={styles.jobTime}>{job.time}</Text>
                <Text style={styles.jobDate}>{(job.date instanceof Date ? job.date : new Date(job.date)).toLocaleDateString()}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.jobButton, job.checkedIn ? styles.jobButtonChecked : null]}
              onPress={() => handleJobCheckIn(job.id)}
            >
              <Text style={styles.jobButtonText}>{job.checkedIn ? 'In' : 'Check'}</Text>
            </TouchableOpacity>
          </View>

          {/* Section 2: Customer Info */}
          <View style={styles.jobSection2}>
            <View style={{ flex: 1 }}>
              <Text style={styles.customerName}>{job.customerName}</Text>
              <Text style={styles.customerMobile}>{job.customerMobile}</Text>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => handleCallCustomer(job.customerMobile, job.customerName)}
            >
              <Text style={styles.callButtonText}>📞 Call</Text>
            </TouchableOpacity>
          </View>

          {/* Section 3: Check-in and Check-out Times */}
          <View style={styles.jobSection3}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.timeLabel}>Check-in</Text>
              <Text style={styles.timeValue}>{job.checkInTime ? job.checkInTime.split(' ').slice(0, 1).join(' ') : '--'}</Text>
              <Text style={styles.timeSubLabel}>{job.checkInTime ? job.checkInTime.split(' ').slice(1).join(' ') : '--'}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.timeLabel}>Check-out</Text>
              <Text style={styles.timeValue}>{job.checkOutTime ? job.checkOutTime.split(' ').slice(0, 1).join(' ') : '--'}</Text>
              <Text style={styles.timeSubLabel}>{job.checkOutTime ? job.checkOutTime.split(' ').slice(1).join(' ') : '--'}</Text>
            </View>
          </View>
        </View>
      ))}

      {filteredJobs.length === 0 && (
        <Text style={{ color: '#666', marginTop: 8 }}>No jobs match the selected filter.</Text>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      {/* Check-in Form Modal */}
      <Modal
        visible={showCheckInModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowCheckInModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCheckInModal(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Check-in Form</Text>
            <View style={{ width: 30 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Engineer Comments */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Engineer Comments</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your comments here..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={engineerComments}
                onChangeText={setEngineerComments}
              />
            </View>

            {/* Before Image */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Before Image</Text>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => {
                  Alert.alert('Image Picker', 'Camera or Gallery functionality will be implemented');
                  setBeforeImage('before-image-placeholder');
                }}
              >
                <Text style={styles.imageButtonText}>📷 Capture / Upload Before Image</Text>
              </TouchableOpacity>
              {beforeImage && (
                <Text style={styles.imageStatus}>✓ Before image added</Text>
              )}
            </View>

            {/* After Image */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>After Image</Text>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => {
                  Alert.alert('Image Picker', 'Camera or Gallery functionality will be implemented');
                  setAfterImage('after-image-placeholder');
                }}
              >
                <Text style={styles.imageButtonText}>📷 Capture / Upload After Image</Text>
              </TouchableOpacity>
              {afterImage && (
                <Text style={styles.imageStatus}>✓ After image added</Text>
              )}
            </View>

            {/* Customer Signature */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Customer Signature</Text>
              <TouchableOpacity
                style={styles.signatureButton}
                onPress={() => {
                  Alert.alert('Signature Pad', 'Signature capture functionality will be implemented');
                  setCustomerSignature('signature-placeholder');
                }}
              >
                <Text style={styles.signatureButtonText}>✍️ Capture Signature</Text>
              </TouchableOpacity>
              {customerSignature && (
                <Text style={styles.imageStatus}>✓ Signature captured</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCheckInFormSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </Modal>
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
  jobTile: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 0,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  jobSection1: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobSection2: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobSection3: {
    padding: 12,
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
  jobDate: {
    color: '#666',
    marginLeft: 10,
    fontSize: 13,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  customerMobile: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  timeLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  timeSubLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: Colors.PRIMARY_BLUE,
    borderColor: Colors.PRIMARY_BLUE,
  },
  chipText: {
    color: '#444',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '700',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_BLUE,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111',
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.PRIMARY_BLUE,
  },
  signatureButton: {
    backgroundColor: '#f3e5f5',
    borderWidth: 1,
    borderColor: '#9c27b0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  signatureButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9c27b0',
  },
  imageStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 8,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
