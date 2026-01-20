import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useChatRoomsStore = create(
  persist(
    (set, get) => ({
      openRooms: [],

      joinRoom: (roomId) => {
        const { openRooms } = get();
        const alreadyOpen = openRooms.find(room => room.roomId === roomId);

        if (!alreadyOpen) {
          set({
            openRooms: [...openRooms, { roomId, joinedAt: new Date() }],
          });
        }
      },

      leaveRoom: (roomId) => {
        set({
          openRooms: get().openRooms.filter(room => room.roomId !== roomId),
        });
      },

      isRoomOpen: (roomId) => {
        return get().openRooms.some(room => room.roomId === roomId);
      },

      getOpenRooms: () => {
        return get().openRooms;
      },
    }),
    {
      name: 'venux-chat-rooms',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
