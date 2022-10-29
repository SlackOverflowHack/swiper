import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import ChatRowComponent from './ChatRowComponent';
interface Props {
  chats: ChatMatch[];
}
const ChatListComponent: React.FC<Props> = ({ chats }) => {
  const tw = useTailwind();
  return chats.length ? (
    <FlatList
      style={tw('h-full')}
      data={chats}
      keyExtractor={(m) => m.id}
      renderItem={({ item }) => <ChatRowComponent chat={item} />}
    />
  ) : (
    <View style={tw('p-5')}>
      <Text style={tw('text-center text-xl')}>No matches at the moment ):</Text>
    </View>
  );
};

export default ChatListComponent;
