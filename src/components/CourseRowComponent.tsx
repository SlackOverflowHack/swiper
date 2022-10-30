import { View, TouchableOpacity, Text } from 'react-native';
import { Badge, Button, Card, Title, Paragraph, Chip } from 'react-native-paper';
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
    <>
      {course.termine?.length && (
        <Card style={{marginBottom: '10px'}}>
        <Card.Content>
          <Title>{course.titel}</Title>
          <Paragraph>{course.beschreibung}</Paragraph>
          <Chip style={{marginTop: '5px'}}>{(new Date(course.termine[
            //Object.keys(course.termine)[0]
            0
          ].datum)).toLocaleDateString(Localization.locale, {
            weekday: 'long'
          })}{' '}
          </Chip>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" textColor="#008800">Cancel</Button>
          <Button buttonColor="#00aa00">Ok</Button>
        </Card.Actions>
      </Card>
      )}
    </>
  );
};

export default CourseRowComponent;
