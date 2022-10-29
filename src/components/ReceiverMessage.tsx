import { View, Text, Image } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';

interface Props {
  message: Message;
  photoUrl: string;
}

const ReceiverMessage: React.FC<Props> = ({ message, photoUrl }) => {
  const tw = useTailwind();
  return (
    <View
      style={[
        tw('bg-red-600 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-16'),
        { alignSelf: 'flex-start', marginRight: 'auto' }
      ]}
    >
      <Image
        source={{ uri: photoUrl }}
        style={tw('h-12 w-12 rounded-full absolute top-0 -left-14')}
      />
      <Text style={tw('text-white')}>{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;
