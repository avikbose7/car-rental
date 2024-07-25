// user-store.js
import { useState, useEffect } from 'react';

const useUserStore = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
  }, []);

  return [userDetails, setUserDetails];
};

export default useUserStore;