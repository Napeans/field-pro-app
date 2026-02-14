import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { Colors } from '../theme/GlobalStyles';

type SignaturePadProps = {
  onSignatureCapture: (base64: string) => void;
  onCancel: () => void;
  onPreviewUpdate?: (base64: string) => void;
};

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSignatureCapture,
  onCancel,
  onPreviewUpdate,
}) => {
  const signatureCanvasRef = useRef<any>(null);
  const [hasSignature, setHasSignature] = useState(false);

  /**
   * OK button
   * Just trigger canvas read
   */
  const handleOK = () => {
    if (!signatureCanvasRef.current) {
      Alert.alert('Error', 'Canvas not ready');
      return;
    }

    console.log('OK pressed → reading signature');
    signatureCanvasRef.current.readSignature();
  };

  /**
   * Called reliably by SignatureCanvas
   * This is the ONLY place we receive the base64
   */
  const handleSignatureSave = (signature: string) => {
    if (!signature) {
      Alert.alert('Error', 'No signature captured');
      return;
    }

    console.log('Signature captured, length:', signature.length);

    onPreviewUpdate?.(signature);
    onSignatureCapture(signature);
  };

  const handleClear = () => {
    signatureCanvasRef.current?.clearSignature();
    setHasSignature(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Signature</Text>
        <Text style={styles.subtitle}>Please sign below</Text>
      </View>

      <SignatureCanvas
        ref={signatureCanvasRef}
        onBegin={() => setHasSignature(true)}
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
          style={[
            styles.button,
            styles.okButton,
            !hasSignature && styles.okButtonDisabled,
          ]}
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
  },
  header: {
    backgroundColor: Colors.PRIMARY_BLUE,
    padding: 16,
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
    flex: 1,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
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
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  okButton: {
    backgroundColor: Colors.PRIMARY_BLUE,
  },
  okButtonDisabled: {
    backgroundColor: '#ccc',
  },
  okButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SignaturePad;
