import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SwipeScreenNavigationProp } from './SwipeScreen';
import { setDoc, doc, serverTimestamp, getDoc } from '@firebase/firestore';
import { firebaseDb } from '../firebase';

const EditProfileScreen = () => {
  const navigation = useNavigation<SwipeScreenNavigationProp>();
  const tw = useTailwind();
  const { user } = useAuth();
  const [image, setImage] = useState<string | undefined>(
    'https://xsgames.co/randomusers/assets/avatars/male/40.jpg'
  );
  const [job, setJob] = useState<string | undefined>('Saboteur');
  const [age, setAge] = useState<string | undefined>('12');
  const [name, setName] = useState<string | undefined>('Bob Ross');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getDoc(doc(firebaseDb, 'users', user!.uid))
        .then((result) => {
          if (result.exists()) {
            const { displayName, job, photoUrl, age } =
              result.data() as Profile;
            setImage(photoUrl);
            setAge(age);
            setJob(job);
            setName(displayName);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const formIncomplete = !image || !job || !age || !name || !user;

  const updateUserProfile = () => {
    setLoading(true);
    setDoc(doc(firebaseDb, 'users', user!.uid), {
      id: user!.uid,
      displayName: name,
      photoUrl: image!,
      job: job!,
      age: age!,
      timestamp: serverTimestamp()
    })
      .then(() => {
        navigation.navigate('Main');
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={tw('flex-1 items-center pt-1 px-5')}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
      >
        <ScrollView>
          {/* <Image
            style={tw('h-20 w-full z-50')}
            resizeMode='contain'
            source={require('../profile_logo.png')}
          /> */}
          <Text style={tw('text-xl text-gray-500 font-bold mb-5')}>
            Welcome, {name || user?.email}
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View style={tw('flex-1 items-center justify-start')}>
              <View style={tw('mb-3')}>
                <Text style={tw('text-center p-4 font-bold text-red-400')}>
                  Step 1: What is your Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={tw('text-center bg-gray-200 px-5 py-3 rounded-lg')}
                  placeholder='Enter your Name'
                />
              </View>
              <View style={tw('mb-3')}>
                <Text style={tw('text-center p-4 font-bold text-red-400')}>
                  Step 2: The Profile Pic
                </Text>
                <TextInput
                  value={image}
                  onChangeText={setImage}
                  style={tw('text-center bg-gray-200 px-5 py-3 rounded-lg')}
                  placeholder='Enter a Profile Pic URL'
                />
              </View>

              <View style={tw('mb-3')}>
                <Text style={tw('text-center p-4 font-bold text-red-400')}>
                  Step 3: What is your Occupation
                </Text>
                <TextInput
                  value={job}
                  onChangeText={setJob}
                  style={tw('text-center bg-gray-200 px-5 py-3 rounded-lg')}
                  placeholder='Enter your Occupation'
                />
              </View>

              <View style={tw('mb-6')}>
                <Text style={tw('text-center p-4 font-bold text-red-400')}>
                  Step 4: What is your Age?
                </Text>
                <TextInput
                  style={tw('text-center bg-gray-200 px-5 py-3 rounded-lg')}
                  placeholder='Enter your Age'
                  value={age}
                  onChangeText={setAge}
                  maxLength={2}
                  keyboardType='numeric'
                />
              </View>

              <View style={tw('flex-col my-auto')}>
                <TouchableOpacity
                  onPress={updateUserProfile}
                  disabled={formIncomplete || loading || !user}
                  style={[
                    tw('w-64 p-3 rounded-xl'),
                    tw(formIncomplete ? 'bg-gray-400' : 'bg-red-400')
                  ]}
                >
                  <Text style={tw('text-center text-white text-xl font-bold')}>
                    Update Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
