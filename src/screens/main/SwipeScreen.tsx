import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation
} from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabStackParamList } from '../../navigation/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swiper from 'react-native-deck-swiper';
import { Entypo, AntDesign } from '@expo/vector-icons';
import HeaderComponent from '../../components/HeaderComponent';
import { Localize } from '../../localized';
import SwiperCard from '../../components/swiper/SwiperCard';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firebaseDb } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { User } from 'firebase/auth';
import Constants from 'expo-constants';

export type SwipeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Search'>,
  NativeStackNavigationProp<RootStackParamList>
>;


const SwipeScreen = () => {
  const tw = useTailwind();
  const [finished, setFinished] = useState(false);
  const [courses, setCourses] = useState<Kurs[]>([]);
  const swipeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = useAuth().user as unknown as User;

  useEffect(() => {
    console.log(Constants.expoConfig?.extra?.SWIPEBACK_API);
    return onSnapshot(collection(firebaseDb, 'courses'), (result) => {
      console.log(result.docs.length);

      const fireCourses: Kurs[] = [];

      result.docs.forEach((doc) => {
        let course: Kurs = doc.data() as unknown as Kurs;
        course.id = doc.id;

        if(!course.permanentMembers.includes(user.uid) 
        && !course.interestedMembers.includes(user.uid) 
        && !course.uninterestedMembers.includes(user.uid)) {

          Object.entries(course.termine).forEach(([key, termin]) => {
            if(!termin.anmeldungen.includes(user.uid)) {
              fireCourses.push(course);
            }
          });
        }
      });
      
      setCourses(fireCourses);
      console.log(fireCourses);
      setLoading(false);
    });
  }, []);

  useLayoutEffect(() => {
    setCourses([...courses.reverse()]);
    setLoading(false);
  }, []);

  const swipeLeft = async (index: number) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken
       },
      body: JSON.stringify({ course_id: courses[index].id })
    };
    fetch(Constants.expoConfig?.extra?.SWIPEBACK_API + '/api/course/addUninterestedMember', requestOptions);
  };

  const swipeRight = async (index: number) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken
       },
      body: JSON.stringify({ course_id: courses[index].id })
    };
    fetch(Constants.expoConfig?.extra?.SWIPEBACK_API + '/api/course/addInterestedMember', requestOptions);
  };

  return loading ? (
    <View></View>
  ) : (
    <SafeAreaView
      style={tw('flex-1 flex-col justify-start items-center relative')}
    >
      <HeaderComponent />

      <View
        style={tw(
          'flex-1 flex-col items-center justify-start absolute top-0 w-full'
        )}
      >
        {swiperIndex < courses.length ? (
          <Swiper
            onSwiped={() => setSwiperIndex((old) => old + 1)}
            onTapCard={(index) => {
              courses[index] &&
                navigation.navigate('KursDetails', { course: courses[index] });
            }}
            useViewOverflow={false}
            onSwipedAll={() => setFinished(true)}
            ref={swipeRef}
            stackSize={5}
            cardIndex={swiperIndex}
            animateCardOpacity
            verticalSwipe={false}
            cards={courses}
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
                    {Localize('swipeScreenNoCardsText')}
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
                <SwiperCard course={card} />
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
        ) : (
          <View
            style={[
              tw(
                'bg-white rounded-xl h-3/4 items-center justify-center flex-col p-5 m-5'
              ),
              styles.cardShadow,
              {
                marginHorizontal: 15,
                marginTop: 80
              }
            ]}
          >
            <Text style={tw('font-bold pb-5 text-center')}>
              {Localize('swipeScreenNoCardsText')}
            </Text>
            <Image
              resizeMode='contain'
              source={{
                uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037'
              }}
              style={tw('h-20 w-full')}
            />
          </View>
        )}
      </View>
      {!finished && (
        <View
          style={[
            tw(
              'flex-1 flex-row justify-evenly h-full w-full absolute top-3/4 pt-8'
            )
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              !finished && (swipeRef?.current as any).swipeLeft()
            }
            style={tw(
              'items-center justify-center rounded-full w-16 h-16 bg-red-200'
            )}
          >
            <Entypo name='cross' color='red' size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              !finished && (swipeRef?.current as any).swipeRight()
            }
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

export default SwipeScreen;

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
