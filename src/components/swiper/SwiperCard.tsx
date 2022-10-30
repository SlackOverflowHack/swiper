import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground
} from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as Localization from 'expo-localization';

interface Props {
  course: Kurs;
}

const SwiperCard: React.FC<Props> = ({ course }) => {
  const tw = useTailwind();
  return (
    <View
      style={[tw('bg-white rounded-xl h-3/4'), styles.cardShadow]}
      key={course.id}
    >
      <ImageBackground
        resizeMode='cover'
        source={
          Platform.OS === 'web'
            ? require('../../../assets/tennis_bg.png')
            : require('../../../assets/tennis_bg.png')
        }
        style={tw(
          'flex-1 flex-col items-center justify-center h-full rounded-lg overflow-hidden'
        )}
      >
        <View
          style={tw(
            'items-start justify-between w-full h-full p-5 bg-black/60'
          )}
        >
          <View />
          <View>
            <Text style={tw('text-white font-bold text-2xl mb-3')}>
              {course.titel}
            </Text>
            <View style={tw('flex flex-row items-center justify-start mb-3')}>
              <Ionicons name='location' color='white' size={24} />
              <View style={{ marginLeft: 5 }}>
                <Text style={tw('text-white')}>
                  {course.ort.adresse.strasse}, {course.ort.adresse.plz},{' '}
                  {course.ort.adresse.ort}, {course.ort.adresse.land}
                </Text>
              </View>
            </View>
            <View style={tw('flex flex-row items-center justify-start mb-3')}>
              <Feather name='clock' color='white' size={22} />

              <Text style={{ color: 'white', marginLeft: 5 }}>
                {(new Date(course.termine[
                  0
                ].datum)).toLocaleDateString(Localization.locale, {
                  weekday: 'long'
                })}{' '}
              </Text>
            </View>
            {course.zielgruppe && (
              <View style={tw('flex-row items-center justify-start mb-3')}>
                <Feather name='target' color='white' size={22} />
                <View
                  style={[
                    tw('flex-col items-start justify-center'),
                    {
                      marginLeft: 5
                    }
                  ]}
                >
                  {course.zielgruppe && (
                    <Text style={{ color: 'white' }}>
                      {course.zielgruppe.join(', ')}
                    </Text>
                  )}
                </View>
              </View>
            )}
            {course.kontakt && (
              <View style={tw('flex-row items-center justify-start mb-3')}>
                <MaterialIcons name='contact-mail' color='white' size={22} />
                <Text style={{ color: 'white', marginLeft: 5 }}>
                  {course.kontakt.titel || course.kontakt.anrede}{' '}
                  {course.kontakt.vorname} {course.kontakt.name}
                </Text>
              </View>
            )}
            {course.ort.name && (
              <View style={tw('flex-row items-center justify-start')}>
                <Text style={{ color: 'white', fontStyle: 'italic' }}>
                  {course.ort.name}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SwiperCard;
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
