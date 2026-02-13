import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';

interface MoreBottomMenuProps {
  visible: boolean;
  onClose: () => void;
  options?: string[]; // optional dynamic options
}

const MoreBottomMenu: React.FC<MoreBottomMenuProps> = ({
  visible,
  onClose,
  options = ['Option 1', 'Option 2'],
}) => {
  return (
    <Modal 
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Background overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Bottom Sheet */}
      <View style={styles.sheet}>
        <SafeAreaView>
          {/* Drag indicator */}
          <View style={styles.dragIndicator} />

          {/* Sheet title */}
          <Text style={styles.title}>More Menu</Text>

          {/* Menu options */}
          {options.map((item, index) => (
            <TouchableOpacity key={index} onPress={onClose}>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default MoreBottomMenu;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',  // ensures it covers everything
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',  // position it at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: 'white', // make it visible
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: 'black', // text visible
  },
  item: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
    color: 'black',
  },
});

