/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CourseRowComponent from '../../components/CourseRowComponent';
import HeaderComponent from '../../components/HeaderComponent';
import { useTailwind } from 'tailwind-rn/dist';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDb } from '../../firebase';
import useAuth from '../../hooks/useAuth';

const CourseScreen = () => {
  const tw = useTailwind();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Kurs[]>([]);
  const { user } = useAuth();

  const mycurses = [];
  useEffect(() => {
    setLoading(true);
    console.log("foo");
    getDocs(collection(firebaseDb, 'courses')).then((result) => {
      console.log(result.docs.length);
      const fireCourses = result.docs
        .map((doc) => ({
          ...(doc.data() as unknown as Kurs),
          id: doc.id
        }))
        .filter(
          (course) =>
            course.permanentMembers.find((id) => id === user?.uid) ||
            Object.keys(course.termine).some((k) =>
              course.termine[parseInt(k)].anmeldungen.find((id) => id === user?.uid)
            )
        );
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
