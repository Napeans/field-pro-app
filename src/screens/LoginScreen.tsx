import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import GlobalStyles, { Colors } from '../theme/GlobalStyles';
import EmployeeIcon from '../icon/EmployeeIcon';

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [mobile, setMobile] = useState<string>('');
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const pinRefs = useRef<Array<TextInput | null>>([]);

  /* ---------------- PIN HANDLING ---------------- */

  const handlePinChange = (text: string, index: number) => {
    const numeric = text.replace(/[^0-9]/g, '');

    const newPin = [...pin];
    newPin[index] = numeric;
    setPin(newPin);

    if (numeric && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }

    if (numeric && index === 3) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newPin = [...pin];

      if (pin[index] !== '') {
        newPin[index] = '';
        setPin(newPin);
      } else if (index > 0) {
        pinRefs.current[index - 1]?.focus();
        newPin[index - 1] = '';
        setPin(newPin);
      }
    }
  };

  /* ---------------- MOBILE HANDLING ---------------- */

  const handleMobileChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setMobile(numeric);
  };

  /* ---------------- VALIDATION ---------------- */

  const isMobileValid = mobile.length === 10;
  const isPinValid = pin.every(digit => digit !== '');
  const isFormValid = isMobileValid && isPinValid;

  /* ---------------- LOGIN ---------------- */

  const handleLogin = () => {
    if (!isFormValid) return;
    onLogin();
  };

  /* ---------------- UI ---------------- */

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <EmployeeIcon size={72} />
          </View>

          <Text style={GlobalStyles.title}>Welcome to Field Pro</Text>
          <Text style={GlobalStyles.subTitle}>Track your work, on time</Text>

          <Text style={[GlobalStyles.inputHeader, { marginTop: 18 }]}>Mobile Number</Text>

          {/* <TextInput
            style={[GlobalStyles.input, { marginHorizontal: 20 }]}
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={handleMobileChange}
          /> */}

           <View style={styles.mobileContainer}>
      <Text style={styles.countryCode}>+91</Text>

      <View style={styles.divider} />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="number-pad"
        maxLength={10}
        value={mobile}
        onChangeText={handleMobileChange}
        placeholderTextColor="#9E9E9E"
      />
    </View>

          <Text style={GlobalStyles.inputHeader}>Enter Pin</Text>

          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
    ref={(ref) => {
  pinRefs.current[index] = ref;
}}
                style={[
                  styles.pinBox,
                  digit && { borderColor: Colors.PRIMARY_BLUE },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                secureTextEntry
                value={digit}
                onChangeText={(text) => handlePinChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              GlobalStyles.button,
              styles.loginButton,
              !isFormValid && GlobalStyles.disabledButton,
            ]}
            onPress={handleLogin}
            disabled={!isFormValid}
          >
            <Text
              style={[
                GlobalStyles.buttonText,
                !isFormValid && GlobalStyles.disabledButtonText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 30,
    marginTop: 6,
  },

  pinBox: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    backgroundColor: '#fff',
  },

  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 12,
  },

  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginRight: 12,
  },

  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 0, // important for Android alignment
  },

  loginButton: {
    marginTop: 8,
    marginHorizontal: 0,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_BLUE,
    alignItems: 'center',
  },
});
