import { defineStore } from 'pinia';

export const useFriendsStore = defineStore('friends', {
    state: () => ({
        friends: []
    }),
    actions: {
        addFriend(friend) {
            this.friends.push(friend);
        },
        removeFriend(friend) {
            this.friends = this.friends.filter(f => f !== friend);
        },
        clearFriends() {
            this.friends = [];
        }
    },
    getters: {
        friendCount: (state) => state.friends.length,
        getFriends: (state) => state.friends
    }
});