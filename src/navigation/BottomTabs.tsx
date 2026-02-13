import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import HomeIcon from '../icon/HomeIcon';
import CandyGridIcon from '../icon/CandyBoxIcon';

import MoreBottomMenu from '../navigation/MoreBottomMenu';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = (action: string) => {
    setVisible(false)
    switch (action) {
      case 'Help Desk':
        console.log('Navigate to Help Desk');
        break;
      case 'Policies':
        console.log('Open Policies');
        break;

      case 'LogOut':
        console.log('Open Policies');
        break;

      default:
        // just close modal (overlay / back button)
        break;
    }
  };
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#04A554',
          tabBarInactiveTintColor: '#999',
          tabBarIcon: ({ color, focused }) => {
            if (route.name === 'Home') {
              return <HomeIcon color={color} size={focused ? 26 : 24} />;
            }
            if (route.name === 'More') {
              return <CandyGridIcon color={color} size={focused ? 26 : 24} />;
            }
            return null;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen
          name="More"
          component={ProfileScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setVisible(true); // ✅ open sheet
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
