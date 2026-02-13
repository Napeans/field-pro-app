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
} from 'react-native';
import GlobalStyles,{Colors} from '../theme/GlobalStyles'
import EmployeeIcon from '../icon/EmployeeIcon'
interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [mobile, setMobile] = useState<string>('');
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const pinRefs = useRef<Array<TextInput | null>>([]);


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
  const handleMobileChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setMobile(numeric);
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={GlobalStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.box} >
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <EmployeeIcon size={60}/>
          </View>
            <Text style={GlobalStyles.title}>Welcome To Field Pro!</Text>
            <Text style={GlobalStyles.subTitle}>Track your Work</Text>
<Text style={[GlobalStyles.inputHeader, { marginTop: 20 }]}>Mobile Number</Text>

               <TextInput
        style={[GlobalStyles.input, { marginLeft: 20,marginEnd:20 }]}
        placeholder="Mobile Number"
        keyboardType="number-pad"
        maxLength={10}
             value={mobile}
        onChangeText={handleMobileChange}
      />

        <Text style={GlobalStyles.inputHeader}>Enter Pin</Text>
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
      <TouchableOpacity style={[GlobalStyles.button,{marginLeft: 20,marginEnd:20}]} onPress={handleLogin}>
        <Text style={GlobalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    height: 400,
  },
    pinBox: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: Colors.PRIMARY_BLUE,
        color: Colors.PRIMARY_BLUE,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:900,
    backgroundColor: '#fff',
  },
    pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginLeft: 20,
    marginEnd:20
  },
});