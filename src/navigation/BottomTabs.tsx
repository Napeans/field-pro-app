import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import HomeIcon from '../icon/HomeIcon';
import CandyGridIcon from '../icon/CandyBoxIcon';
import MoreBottomMenu from '../navigation/MoreBottomMenu';

const Tab = createBottomTabNavigator();

interface Props {
  onLogOut?: () => void;
}

const BottomTabs: React.FC<Props> = ({ onLogOut }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<any>();

  const handleClose = (action: string) => {
    setVisible(false);

    switch (action) {
      case 'Help Desk':
        navigation.navigate('Profile'); // 👈 hidden tab
        break;

      case 'Policies':
        navigation.navigate('Settings'); // 👈 hidden tab
        break;

      case 'LogOut':
        onLogOut?.();
        break;

      default:
        break;
    }
  };

  return (
    <>
     <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: '#04A554',
    tabBarInactiveTintColor: '#999',
    tabBarLabelStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
      tabBarStyle: {
      paddingTop: 8,
      paddingBottom: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    tabBarIcon: ({ color, focused }) => {
      if (route.name === 'Home') {
        return <HomeIcon color={color} size={28} />;
      }
      if (route.name === 'More') {
        return <CandyGridIcon color={color} size={28} />;
      }
      return null;
    },
  })}
>
        {/* Visible Tab */}
        <Tab.Screen name="Home" component={HomeScreen} />

        {/* Hidden Profile Tab */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarButton: () => null, // 🔥 hides tab button
          }}
        />

        {/* Hidden Settings Tab */}
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarButton: () => null,
          }}
        />

        {/* More Tab */}
        <Tab.Screen
          name="More"
          component={HomeScreen} // dummy screen
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setVisible(true);
            },
          }}
        />
      </Tab.Navigator>

      <MoreBottomMenu
        visible={visible}
        onClose={handleClose}
      />
    </>
  );
};

export default BottomTabs;
