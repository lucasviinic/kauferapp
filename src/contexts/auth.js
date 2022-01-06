import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

const AuthContext = createContext({signed: true, user: {}, loading: true, signIn(){}});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(){
      const storageUser = await AsyncStorage.getItem('RNAuth:user');
      const storageToken = await AsyncStorage.getItem('RNAuth:token');

      api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('RNAuth:token', response.token);
  }

  function signOut(){
    AsyncStorage.clear().then(() => {
      setUser(null)
    });
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;