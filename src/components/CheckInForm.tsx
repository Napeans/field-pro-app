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
  Image,
} from 'react-native';
import { Colors } from '../theme/GlobalStyles';
import ImageUploader from './ImageUploader';
import SignaturePad from './SignaturePad';

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

const CheckInForm: React.FC<CheckInFormProps> = ({
  visible,
  jobId,
  onClose,
  onSubmit,
}) => {
  const [engineerComments, setEngineerComments] = useState('');
  const [beforeImages, setBeforeImages] = useState<string[]>([]);
  const [afterImages, setAfterImages] = useState<string[]>([]);
  const [customerSignature, setCustomerSignature] = useState<string | null>(
    null
  );
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  const handleSubmit = () => {
    if (!engineerComments.trim()) {
      Alert.alert('Error', 'Please enter engineer comments');
      return;
    }

    onSubmit({
      engineerComments,
      beforeImages,
      afterImages,
      customerSignature,
    });

    // reset after submit
    setEngineerComments('');
    setBeforeImages([]);
    setAfterImages([]);
    setCustomerSignature(null);
  };

  const handleSignatureCapture = (base64: string) => {
    console.log('Signature captured length:', base64?.length);
    setCustomerSignature(base64);
    setShowSignaturePad(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      {showSignaturePad ? (
        <SignaturePad
          onSignatureCapture={handleSignatureCapture}
          onCancel={() => setShowSignaturePad(false)}
        />
      ) : (
        <View style={styles.modalContainer}>
          {/* HEADER */}
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
                placeholder="Enter your comments..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={engineerComments}
                onChangeText={setEngineerComments}
              />
            </View>

            {/* Before Images */}
            <View style={styles.formSection}>
              <ImageUploader
                images={beforeImages}
                onChange={setBeforeImages}
                maxImages={3}
                label="Before Images"
              />
            </View>

            {/* After Images */}
            <View style={styles.formSection}>
              <ImageUploader
                images={afterImages}
                onChange={setAfterImages}
                maxImages={3}
                label="After Images"
              />
            </View>

            {/* Customer Signature */}
            {!customerSignature && (
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Customer Signature</Text>

                <TouchableOpacity
                  style={styles.signatureButton}
                  onPress={() => setShowSignaturePad(true)}
                >
                  <Text style={styles.signatureButtonText}>
                    ✍️ Capture Signature
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Signature Preview */}
            {customerSignature && (
              <View style={styles.signaturePreview}>
                <Text style={styles.signatureLabel}>
                  Captured Signature
                </Text>

                <Image
                  source={{ uri: customerSignature }}
                  style={styles.signatureThumbnail}
                  resizeMode="contain"
                />

                <Text style={styles.imageStatus}>
                  ✓ Signature captured
                </Text>

                <TouchableOpacity
                  onPress={() => setCustomerSignature(null)}
                >
                  <Text style={styles.removeSignatureText}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Submit */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <View style={{ height: 30 }} />
          </ScrollView>
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 15,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111',
    textAlignVertical: 'top',
  },
  signatureButton: {
    backgroundColor: '#f3e5f5',
    borderWidth: 1,
    borderColor: '#9c27b0',
    borderRadius: 8,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9c27b0',
  },
  signaturePreview: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signatureLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.PRIMARY_BLUE,
    marginBottom: 10,
  },
  signatureThumbnail: {
    width: '100%',
    height: 140,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  imageStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 8,
    fontWeight: '500',
  },
  removeSignatureText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#d32f2f',
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: 8,
    paddingVertical: 14,
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
