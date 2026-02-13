import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import HomeIcon from '../icon/HomeIcon';
import CandyGridIcon from '../icon/CandyBoxIcon';

import MoreBottomMenu from '../navigation/MoreBottomMenu';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const bottomSheetRef = useRef<any>(null);

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
          component={ProfileScreen} // dummy, won't navigate
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // ⛔ stop navigation
              bottomSheetRef.current?.snapToIndex(0); // ✅ open menu
            },
          }}
        />
      </Tab.Navigator>

      {/* Bottom Menu */}
      <MoreBottomMenu sheetRef={bottomSheetRef} />
    </>
  );
};

export default BottomTabs;
