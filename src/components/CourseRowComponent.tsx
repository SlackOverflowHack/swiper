import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import * as Localization from 'expo-localization';
interface Props {
  course: Kurs;
}
const CourseRowComponent: React.FC<Props> = ({ course }) => {
  const tw = useTailwind();
  console.log(course);
  return (
    <TouchableOpacity>
      <View
        style={tw(
          'flex flex-row justify-between border-green-600 mb-1 bg-gray-200 rounded p-2'
        )}
      >
        <View>
          <Text>{course.titel}</Text>

          {course.termine?.length && (
            <Text style={{ color: 'white', marginLeft: 5 }}>
              {(new Date(course.termine[
                //Object.keys(course.termine)[0]
                0
              ].datum)).toLocaleDateString(Localization.locale, {
                weekday: 'long'
              })}{' '}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseRowComponent;
