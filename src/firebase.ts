import Constants from 'expo-constants';
import { getApps, initializeApp } from "firebase/app";
import { initializeAuth, Auth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import * as SecureStorage from 'expo-secure-store';
import { Buffer } from "buffer";
import { getFirestore } from '@firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
    authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
    projectId: Constants.expoConfig?.extra?.firebaseProjectId,
    storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
    appId: Constants.expoConfig?.extra?.firebaseAppId,
};

// Initialize Firebase
export const firebaseApp = getApps()[0] || initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
let a: Auth | undefined = undefined;
try
{
    a = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence({
            getItem: (key) => Platform.OS === 'web' ? Promise.resolve(localStorage.getItem(keyEncode(key))) : SecureStorage.getItemAsync(keyEncode(key)),
            removeItem: (key) => Platform.OS === 'web' ? Promise.resolve(localStorage.removeItem(keyEncode(key))) : SecureStorage.deleteItemAsync(keyEncode(key)),
            setItem: (key, value) => Platform.OS === 'web' ? Promise.resolve(localStorage.setItem(keyEncode(key), value)) : SecureStorage.setItemAsync(keyEncode(key), value)

        }),
        popupRedirectResolver: undefined
    });
} catch
{
    a = getAuth(firebaseApp);
}
export const auth = a;

const keyEncode = (s: string) =>
{
    return Buffer.from(s, 'utf-8').toString('base64').replace(/=/g, '_');
};