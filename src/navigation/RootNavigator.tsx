import React, { useState } from 'react';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';

const RootNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return isLoggedIn ? (
    <BottomTabs />
  ) : (
    <AuthStack onLogin={() => setIsLoggedIn(true)} />
  );
};

export default RootNavigator;
