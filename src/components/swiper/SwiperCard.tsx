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
import { Localize } from '../../localized';

interface Props {
  course: Veranstaltung;
}

const SwiperCard: React.FC<Props> = ({ course }) => {
  const tw = useTailwind();
  return (
    <View
      style={[tw('bg-white rounded-xl h-3/4'), styles.cardShadow]}
      key={course.guid}
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
              {course.name}
            </Text>
            <View style={tw('flex flex-row items-center justify-start mb-3')}>
              <Ionicons name='location' color='white' size={24} />
              <View style={{ marginLeft: 5 }}>
                <Text style={tw('text-white')}>
                  {course.veranstaltungsort.adresse.strasse},{' '}
                  {course.veranstaltungsort.adresse.plz},{' '}
                  {course.veranstaltungsort.adresse.ort},{' '}
                  {course.veranstaltungsort.adresse.land}
                </Text>
              </View>
            </View>
            {(course.wochentag || course.termin) && (
              <View style={tw('flex flex-row items-center justify-start mb-3')}>
                <Feather name='clock' color='white' size={22} />

                <Text style={{ color: 'white', marginLeft: 5 }}>
                  {course.wochentag?.join(', ')}{' '}
                  {course.termin && (
                    <React.Fragment>
                      {course.wochentag ? '-' : ''}{' '}
                      {course.termin?.beginn_uhrzeit}{' '}
                      {Localize('swipeCardTimeSeparator')}{' '}
                      {course.termin?.ende_uhrzeit}{' '}
                      {Localize('swipeCardTimeEnd')}
                    </React.Fragment>
                  )}
                </Text>
              </View>
            )}
            {(course.zielgruppe || course.level) && (
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
                      {course.zielgruppe && course.level ? ' | ' : ''}
                      {Localize('swipeCardFitnessLevelText')}: {course.level}
                    </Text>
                  )}
                </View>
              </View>
            )}
            {course.dozent && (
              <View style={tw('flex-row items-center justify-start mb-3')}>
                <MaterialIcons name='contact-mail' color='white' size={22} />
                <Text style={{ color: 'white', marginLeft: 5 }}>
                  {course.dozent.titel || course.dozent.anrede}{' '}
                  {course.dozent.vorname} {course.dozent.name}
                </Text>
              </View>
            )}
            {course.veranstaltungsort.name && (
              <View style={tw('flex-row items-center justify-start')}>
                <Text style={{ color: 'white', fontStyle: 'italic' }}>
                  {course.veranstaltungsort.name}
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
