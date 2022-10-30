import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Localize } from '../localized';
interface Props {
  course: Veranstaltung;
}
const CourseRowComponent: React.FC<Props> = ({ course }) => {
  const tw = useTailwind();
  return (
    <TouchableOpacity>
      <View
        style={tw(
          'flex flex-row justify-between border-green-600 mb-1 bg-gray-200 rounded p-2'
        )}
      >
        <View>
          <Text>{course.name}</Text>
          {course.wochentag && course.termin && (
            <Text style={{ color: 'white', marginLeft: 5 }}>
              {course.wochentag?.join(', ')}{' '}
              {course.termin && (
                <React.Fragment>
                  {course.wochentag ? '-' : ''} {course.termin?.beginn_uhrzeit}{' '}
                  {Localize('swipeCardTimeSeparator')}{' '}
                  {course.termin?.ende_uhrzeit} {Localize('swipeCardTimeEnd')}
                </React.Fragment>
              )}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseRowComponent;
