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
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default BottomTabs;
