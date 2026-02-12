import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [mobile, setMobile] = useState<string>('');
  const [pin, setPin] = useState<string[]>(['', '', '', '']);

  const pinRefs = useRef<Array<TextInput | null>>([]);

  // ✅ Mobile number validation (only integers)
  const handleMobileChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setMobile(numeric);
  };

  // ✅ PIN change handler
  const handlePinChange = (text: string, index: number) => {
    const numeric = text.replace(/[^0-9]/g, '');

    const newPin = [...pin];
    newPin[index] = numeric;
    setPin(newPin);

    // Move to next box automatically
    if (numeric && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }
  };
const handleKeyPress = (
  e: any,
  index: number
) => {
  if (e.nativeEvent.key === 'Backspace') {
    const newPin = [...pin];

    if (pin[index] !== '') {
      // If current box has value → clear it
      newPin[index] = '';
      setPin(newPin);
    } else if (index > 0) {
      // If empty → move to previous box
      pinRefs.current[index - 1]?.focus();
      newPin[index - 1] = '';
      setPin(newPin);
    }
  }
};
  const handleLogin = (): void => {
    if (mobile.length !== 10) {
      Alert.alert('Error', 'Enter valid 10-digit mobile number');
      return;
    }

    if (pin.some(digit => digit === '')) {
      Alert.alert('Error', 'Enter complete 4-digit PIN');
      return;
    }

    const finalPin = pin.join('');
    Alert.alert('Success', `Mobile: ${mobile}\nPIN: ${finalPin}`);
    onLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Login</Text>

      {/* Mobile Input */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="number-pad"
        maxLength={10}
        value={mobile}
        onChangeText={handleMobileChange}
      />

      {/* PIN 4 Boxes */}
      <View style={styles.pinContainer}>
  {pin.map((digit, index) => (
  <TextInput
    key={index}
    ref={(ref: TextInput | null) => {
      pinRefs.current[index] = ref;
    }}
    style={styles.pinBox}
    keyboardType="number-pad"
    maxLength={1}
    secureTextEntry
    value={digit}
    onChangeText={(text) => handlePinChange(text, index)}
    onKeyPress={(e) => handleKeyPress(e, index)}
  />
))}

      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pinBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#2e86de',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#2e86de',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
