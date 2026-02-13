import React, { useState } from 'react';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

const RootNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <BottomTabs onLogOut={() => setIsLoggedIn(false)} />
  ) : (
    <AuthStack onLogin={() => setIsLoggedIn(true)} />
  );
};

export default RootNavigator;
