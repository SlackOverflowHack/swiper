import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation
} from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabStackParamList } from '../navigation/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swiper from 'react-native-deck-swiper';
import { Entypo, AntDesign } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';
import { ChatsScreenNavigationProps } from './ChatsScreen';
import { firebaseDb } from '../firebase';
import {
  doc,
  onSnapshot,
  collection,
  where,
  query,
  limit,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp
} from '@firebase/firestore';
import useAuth from '../hooks/useAuth';
import { Unsubscribe } from 'firebase/auth';
import { generateId } from '../lib/generateId';

export type ProfilesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Profiles'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const ProfilesScreen = () => {
  const tw = useTailwind();
  const [finished, setFinished] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const swipeRef = useRef(null);
  const navigation = useNavigation<ChatsScreenNavigationProps>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    return onSnapshot(doc(firebaseDb, 'users', user!.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.replace('EditProfile');
      } else {
      }
    });
  }, []);

  useEffect(() => {
    let unsub: Unsubscribe;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(firebaseDb, 'users', user?.uid!, 'passes')
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const likes = await getDocs(
        collection(firebaseDb, 'users', user?.uid!, 'likes')
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      unsub = onSnapshot(
        // build a query from a collection and different operations
        query(
          // Look inside "users" collection
          collection(firebaseDb, 'users'),
          // filter out the document with out own uid or id's already swiped
          where('id', 'not-in', [user?.uid!, ...passes, ...likes]),
          // only take 5 elements
          limit(5)
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs.map((doc) => ({
              ...(doc.data() as Profile),
              id: doc.id
            }))
          );
          setLoading(false);
        }
      );
    };
    fetchCards();
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  const swipeLeft = async (index: number) => {
    console.log('swiped left');
    if (!profiles[index]) return;
    const userSwiped = profiles[index];
    setDoc(
      doc(firebaseDb, 'users', user?.uid!, 'passes', userSwiped.id),
      userSwiped
    );
  };
  const swipeRight = async (index: number) => {
    console.log('swiped right on', index);
    if (!profiles[index]) return;
    const userSwiped = profiles[index];
    const loggedInProfile = (await (
      await getDoc(doc(firebaseDb, 'users', user?.uid!))
    ).data()) as Profile;
    // Would be better if match information was processed strictly server-side, meh
    const didUserLikeMe = await (
      await getDoc(doc(firebaseDb, 'users', userSwiped.id, 'likes', user?.uid!))
    ).exists();
    if (didUserLikeMe) {
      console.log('yay its a match');
      // Create match
      setDoc(
        doc(firebaseDb, 'matches', generateId(user?.uid!, userSwiped.id)),
        {
          users: {
            [user?.uid!]: loggedInProfile,
            [userSwiped.id]: userSwiped
          },
          usersMatched: [user?.uid!, userSwiped.id],
          timestamp: serverTimestamp()
        }
      ).then(() =>
        navigation.navigate('Match', {
          userProfile: loggedInProfile,
          matchedProfile: userSwiped
        })
      );
    }
    setDoc(
      doc(firebaseDb, 'users', user?.uid!, 'likes', userSwiped.id),
      userSwiped
    );
  };

  return loading ? (
    <View></View>
  ) : (
    <SafeAreaView style={tw('flex-1 justify-start')}>
      <HeaderComponent />

      <View style={tw('flex-1')}>
        <Swiper
          useViewOverflow={false}
          onSwipedAll={() => setFinished(true)}
          ref={swipeRef}
          backgroundColor='#4FD0E9'
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          cards={profiles}
          containerStyle={tw('bg-transparent')}
          renderCard={(card) =>
            !card ? (
              <View
                style={[
                  tw(
                    'bg-white rounded-xl h-3/4 items-center justify-center flex-col'
                  ),
                  styles.cardShadow
                ]}
              >
                <Text style={tw('font-bold pb-5 text-center')}>
                  Looks like you're done, no more profiles!
                </Text>
                <Image
                  resizeMode='contain'
                  source={{
                    uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037'
                  }}
                  style={tw('h-20 w-full')}
                />
              </View>
            ) : (
              <View
                style={[
                  tw('bg-white rounded-xl h-3/4 relative'),
                  styles.cardShadow
                ]}
                key={card.id}
              >
                <Image
                  source={{ uri: card.photoUrl }}
                  style={tw('absolute top-0 h-full w-full rounded-xl')}
                />
                <View
                  style={[
                    tw(
                      'bg-white w-full h-20 absolute bottom-0 justify-between flex-row px-6 py-2 rounded-b-xl'
                    )
                  ]}
                >
                  <View>
                    <Text style={tw('text-xl font-bold')}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw('text-2xl font-bold')}>{card.age}</Text>
                </View>
              </View>
            )
          }
          overlayLabels={{
            left: {
              title: 'Nope!',
              style: {
                label: {
                  textAlign: 'right',
                  color: '#FF0000'
                }
              }
            },
            right: {
              title: 'Cool!',
              style: {
                label: {
                  color: '#4DED30'
                }
              }
            }
          }}
          onSwipedLeft={swipeLeft}
          onSwipedRight={swipeRight}
        />
      </View>
      {!finished && (
        <View style={tw('flex flex-row justify-evenly mb-3')}>
          <TouchableOpacity
            onPress={() => !finished && (swipeRef?.current as any).swipeLeft()}
            style={tw(
              'items-center justify-center rounded-full w-16 h-16 bg-red-200'
            )}
          >
            <Entypo name='cross' color='red' size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => !finished && (swipeRef?.current as any).swipeRight()}
            style={tw(
              'items-center justify-center rounded-full w-16 h-16 bg-green-200'
            )}
          >
            <AntDesign name='heart' color='green' size={24} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilesScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
