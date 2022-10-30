import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import { useTailwind } from 'tailwind-rn/dist';
import CourseRowComponent from '../../components/CourseRowComponent';
import { collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import { firebaseDb } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { Localize } from '../../localized';

const SearchScreen = () => {
  const tw = useTailwind();
  const [courses, setCourses] = useState<Kurs[]>([]);
  const [loading, setLoading] = useState(true);
  const [textFilter, settextFilter] = useState('');
  const user = useAuth().user as unknown as User;

  useEffect(() => {
    return onSnapshot(collection(firebaseDb, 'courses'), (result) => {
      const fireCourses: Kurs[] = [];

      result.docs.forEach((doc) => {
        let course: Kurs = doc.data() as unknown as Kurs;
        course.id = doc.id;

        if(textFilter === "" ||
         (course.titel.includes(textFilter) && textFilter !== "") ||
         (course.beschreibung.includes(textFilter) && textFilter !== "")) {

          Object.entries(course.termine).forEach(([key, termin]) => {
            if(!termin.anmeldungen.includes(user.uid)) {
              fireCourses.push(course);
            }
          });
        }
      });

      setCourses(fireCourses);
      console.log(fireCourses.length);
      setLoading(false);
    });
  }, [textFilter]);


  return loading ? (
    <View style={tw('flex-1 items-center justify-center')}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>
  ) : (
    <View style={tw('flex-1')}>
      <HeaderComponent />
      {/* Search */}
      <View
        style={tw(
          'flex-1 flex-row w-full justify-between items-center px-5 py-5 mt-2'
        )}
      >
        <TextInput
          style={tw('bg-gray-200 px-3 py-2 rounded w-11/12')}
          placeholder={Localize('searchScreenSearchLabel')}
          value={textFilter}
          onChangeText={settextFilter}
        />
        <TouchableOpacity
          style={tw(
            'px-1 py-2 border-2 border-green-600 rounded-lg text-green-600'
          )}
        >
          <Text>{Localize('searchScreenSearchLabel')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={tw('px-5 pb-5')}>
        <FlatList
          data={courses}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => <CourseRowComponent course={item} />}
        />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
