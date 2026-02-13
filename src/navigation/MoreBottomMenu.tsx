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
    onClose
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
                    <View style={styles.row}>
                        <Text style={styles.left}>

                        </Text>

                        <Text style={styles.right}><TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>✕</Text>
                        </TouchableOpacity></Text>
                    </View>
                    <View>
                        <View style={styles.menuItem}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.menuText}>Help Desk</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuItem}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.menuText}>Policies</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menuItem}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.menuText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default MoreBottomMenu;

const styles = StyleSheet.create({
    menuItem: {
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    menuText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray'
    },
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
        padding: 10,
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
    row: {
        flexDirection: 'row', // horizontal layout
        alignItems: 'center', // vertical alignment center
        justifyContent: 'space-between', // push left and right to edges
        paddingHorizontal: 16,
        height: 50,
    },
    left: {
        fontSize: 16,
        color: '#333',
    },
    right: {
        fontSize: 16,
        color: '#555',
    },
    button: {
        position: 'absolute', // usually top-right
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee', // optional background
        borderRadius: 15, // make it round
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

