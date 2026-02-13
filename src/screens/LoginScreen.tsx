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
        contentContainerStyle={GlobalStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box}>
          <View style={styles.iconContainer}>
            <EmployeeIcon size={60} />
          </View>

          <Text style={GlobalStyles.title}>Welcome To Field Pro!</Text>
          <Text style={GlobalStyles.subTitle}>Track your Work</Text>

          <Text style={[GlobalStyles.inputHeader, { marginTop: 20 }]}>
            Mobile Number
          </Text>

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
              { marginHorizontal: 20 },
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
  },

  box: {
    width: '100%',
    paddingBottom: 40,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 30,
  },

  pinBox: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY_BLUE,
    backgroundColor: '#fff',
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.PRIMARY_BLUE, // green border
    borderRadius: 6,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
    marginLeft:20,
    marginRight:20
  },
   countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginRight: 12,
  },

  divider: {
    width: 1.5,
    height: 28,
    backgroundColor: '#000',
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0, // important for Android alignment
  },
});
