import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface Props {
  sheetRef: any;
}

const MoreBottomMenu: React.FC<Props> = ({ sheetRef }) => {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default MoreBottomMenu;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
