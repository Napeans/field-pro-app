import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { Colors } from '../theme/GlobalStyles';
import ImageUploader from './ImageUploader';

type CheckInFormProps = {
  visible: boolean;
  jobId: string | null;
  onClose: () => void;
  onSubmit: (data: {
    engineerComments: string;
    beforeImages?: string[];
    afterImages?: string[];
    customerSignature?: string | null;
  }) => void;
};

const CheckInForm: React.FC<CheckInFormProps> = ({ visible, jobId, onClose, onSubmit }) => {
  const [engineerComments, setEngineerComments] = useState<string>('');
  const [beforeImages, setBeforeImages] = useState<string[]>([]);
  const [afterImages, setAfterImages] = useState<string[]>([]);
  const [customerSignature, setCustomerSignature] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!engineerComments.trim()) {
      Alert.alert('Error', 'Please enter engineer comments');
      return;
    }

    onSubmit({ engineerComments, beforeImages, afterImages, customerSignature });

    // clear for next open
    setEngineerComments('');
    setBeforeImages([]);
    setAfterImages([]);
    setCustomerSignature(null);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
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

          {/* Before Images (multi) */}
          <View style={styles.formSection}>
            <ImageUploader
              images={beforeImages}
              onChange={setBeforeImages}
              maxImages={3}
              label="Before Images"
            />
          </View>

          {/* After Images (multi) */}
          <View style={styles.formSection}>
            <ImageUploader
              images={afterImages}
              onChange={setAfterImages}
              maxImages={3}
              label="After Images"
            />
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
            {customerSignature && <Text style={styles.imageStatus}>✓ Signature captured</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CheckInForm;
