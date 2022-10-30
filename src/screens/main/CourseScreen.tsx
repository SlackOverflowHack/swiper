/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CourseRowComponent from '../../components/CourseRowComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { useTailwind } from 'tailwind-rn/dist';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDb } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { User } from 'firebase/auth';

const CourseScreen = () => {
  const tw = useTailwind();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Kurs[]>([]);
  const user = useAuth().user as unknown as User;

  const mycurses = [];
  useEffect(() => {
    setLoading(true);
    console.log("foo");
    getDocs(collection(firebaseDb, 'courses')).then((result) => {
      const fireCourses: Kurs[] = [];

      result.docs.forEach((doc) => {
        let course: Kurs = doc.data() as unknown as Kurs;
        course.id = doc.id;

        if(course.permanentMembers.includes(user.uid) || course.interestedMembers.includes(user.uid)) {
          let foundInAbmeldungen = false;
          Object.entries(course.termine).forEach(([key, termin]) => {
            if(termin.abmeldungen.includes(user.uid)) {
              foundInAbmeldungen = true;
            }
          });
          if(!foundInAbmeldungen) {
            fireCourses.push(course);
          }
        } else {
          Object.entries(course.termine).forEach(([key, termin]) => {
            if(termin.anmeldungen.includes(user.uid)) {
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

  console.log(courses);

  return loading ? (
    <View style={tw('flex-1 items-center justify-center')}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>
  ) : (
    <View style={tw('flex-1')}>
      <HeaderComponent />
      <ScrollView style={tw('px-5 pb-5')}>
        {courses.length && (
          <FlatList
            data={courses}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => <CourseRowComponent course={item} />}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CourseScreen;
