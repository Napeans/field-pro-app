import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
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
  const [hasSignature, setHasSignature] = useState(false);
  const [currentSignature, setCurrentSignature] = useState<string | null>(null);

  const handleOK = async () => {
    console.log('handleOK called');
    try {
      let signature = null;
      const ref = signatureCanvasRef.current;
      
      if (!ref) {
        Alert.alert('Error', 'Canvas not ready');
        return;
      }
      
      // Wait longer to ensure canvas methods are initialized
      await new Promise(resolve => setTimeout(() => resolve(null), 500));
      
      // Check if currentSignature was already captured by onOK callback (most reliable)
      if (currentSignature) {
        console.log('Using currentSignature from onOK callback, length:', currentSignature.length);
        signature = currentSignature;
      }
      
      // If still no signature, try canvas methods with retry logic
      let retries = 0;
      const maxRetries = 3;
      
      while (!signature && retries < maxRetries) {
        console.log(`Retry attempt ${retries + 1}/${maxRetries}`);
        
        // Try: signatureToImageUrl if available
        if (typeof ref.signatureToImageUrl === 'function') {
          console.log('Trying signatureToImageUrl...');
          try {
            signature = await ref.signatureToImageUrl();
            if (signature) {
              console.log('signatureToImageUrl successful, length:', signature.length);
              break;
            }
          } catch (e) {
            console.log('signatureToImageUrl failed:', e);
          }
        }
        
        // Try: encodedSignature if available
        if (!signature && typeof ref.encodedSignature === 'function') {
          console.log('Trying encodedSignature...');
          try {
            signature = await ref.encodedSignature();
            if (signature) {
              console.log('encodedSignature successful, length:', signature.length);
              break;
            }
          } catch (e) {
            console.log('encodedSignature failed:', e);
          }
        }
        
        // Try: readSignature if available
        if (!signature && typeof ref.readSignature === 'function') {
          console.log('Trying readSignature...');
          try {
            signature = await ref.readSignature();
            if (signature) {
              console.log('readSignature successful, length:', signature.length);
              break;
            }
          } catch (e) {
            console.log('readSignature failed:', e);
          }
        }
        
        // If no signature yet, wait and retry
        if (!signature) {
          retries++;
          if (retries < maxRetries) {
            console.log('Waiting before retry...');
            await new Promise(resolve => setTimeout(() => resolve(null), 200));
          }
        }
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
    setHasSignature(false);
    setCurrentSignature(null);
  };

  // Called when signature is saved/confirmed
  const handleSignatureSave = (signature: string) => {
    console.log('handleSignatureSave called, signature length:', signature?.length);
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
          setHasSignature(true);
          console.log('Drawing started');
        }}
        onEnd={() => {
          console.log('Stroke ended');
        }}
        onOK={handleSignatureSave}
        penColor={Colors.PRIMARY_BLUE}
        style={styles.canvas}
      />



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
});

export default SignaturePad;
