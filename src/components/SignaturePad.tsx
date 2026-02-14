import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { Colors } from '../theme/GlobalStyles';

type SignaturePadProps = {
  onSignatureCapture: (base64: string) => void;
  onCancel: () => void;
  onPreviewUpdate?: (base64: string) => void;
};

const SignaturePad: React.FC<SignaturePadProps> = ({ onSignatureCapture, onCancel, onPreviewUpdate }) => {
  const signatureCanvasRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [currentSignature, setCurrentSignature] = useState<string | null>(null);

  const handleOK = async () => {
    console.log('handleOK called');
    try {
      // Try to get signature from ref using available methods
      let signature = null;
      const ref = signatureCanvasRef.current;
      
      if (!ref) {
        Alert.alert('Error', 'Canvas not ready');
        return;
      }
      
      // First try: use readSignature if available
      if (typeof ref.readSignature === 'function') {
        console.log('Trying readSignature...');
        try {
          signature = await ref.readSignature();
          console.log('readSignature successful, length:', signature?.length);
        } catch (e) {
          console.log('readSignature failed:', e);
        }
      }
      
      // Second try: signatureToImageUrl if available
      if (!signature && typeof ref.signatureToImageUrl === 'function') {
        console.log('Trying signatureToImageUrl...');
        try {
          signature = await ref.signatureToImageUrl();
          console.log('signatureToImageUrl successful, length:', signature?.length);
        } catch (e) {
          console.log('signatureToImageUrl failed:', e);
        }
      }
      
      // Third try: encodedSignature if available
      if (!signature && typeof ref.encodedSignature === 'function') {
        console.log('Trying encodedSignature...');
        try {
          signature = await ref.encodedSignature();
          console.log('encodedSignature successful, length:', signature?.length);
        } catch (e) {
          console.log('encodedSignature failed:', e);
        }
      }
      
      // Fourth try: use currentSignature if onOK callback populated it
      if (!signature && currentSignature) {
        console.log('Using currentSignature from callback, length:', currentSignature.length);
        signature = currentSignature;
      }
      
      if (signature) {
        console.log('Sending signature to parent');
        onSignatureCapture(signature);
      } else {
        Alert.alert('Error', 'Could not capture signature. Please try again.');
      }
    } catch (error) {
      console.log('Error in handleOK:', error);
      Alert.alert('Error', 'Failed to capture signature');
    }
  };

  const handleClear = () => {
    signatureCanvasRef.current?.clearSignature();
    setIsDrawing(false);
    setHasSignature(false);
    setSignaturePreview(null);
    setCurrentSignature(null);
  };

  // Called when signature is saved/confirmed
  const handleSignatureSave = (signature: string) => {
    console.log('handleSignatureSave called, signature length:', signature?.length);
    setSignaturePreview(signature);
    setCurrentSignature(signature);
    if (onPreviewUpdate) {
      onPreviewUpdate(signature);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Signature</Text>
        <Text style={styles.subtitle}>Please sign below</Text>
      </View>

      <SignatureCanvas
        ref={signatureCanvasRef}
        onBegin={() => {
          setIsDrawing(true);
          setHasSignature(true);
          console.log('Drawing started');
        }}
        onEnd={() => {
          setIsDrawing(false);
          console.log('Stroke ended');
        }}
        onOK={handleSignatureSave}
        penColor={Colors.PRIMARY_BLUE}
        style={styles.canvas}
      />

      {/* Signature Preview Box */}
      {signaturePreview && (
        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Signature Preview</Text>
          <Image 
            source={{ uri: signaturePreview }} 
            style={styles.previewImage}
            resizeMode="contain"
          />
          <Text style={styles.previewStatus}>✓ Signature detected</Text>
        </View>
      )}

      {/* Debug info if drawing but no preview */}
      {isDrawing && !signaturePreview && (
        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Drawing...</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.okButton, !hasSignature && styles.okButtonDisabled]}
          onPress={handleOK}
          disabled={!hasSignature}
        >
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: Colors.PRIMARY_BLUE,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#e3f2fd',
    marginTop: 4,
  },
  canvas: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    margin: 16,
    backgroundColor: '#fafafa',
  },
  previewBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.PRIMARY_BLUE,
    marginBottom: 6,
  },
  previewImage: {
    width: '100%',
    height: 80,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  okButton: {
    backgroundColor: Colors.PRIMARY_BLUE,
  },
  okButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  previewStatus: {
    fontSize: 11,
    color: '#4CAF50',
    marginTop: 6,
    fontWeight: '500',
  },
});

export default SignaturePad;
