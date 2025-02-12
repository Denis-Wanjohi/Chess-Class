import { defineStore } from 'pinia';


export const useChallengeStore = defineStore('challenge', {
    state: () => ({
        creator: null,
        receiver: null,
        code:null,
    }),
    actions: {
        setCreator(creator) {
            this.creator = creator;
        },
        setReceiver(receiver) {
            this.receiver = receiver;
        },
        setCode(code){
            this.code = code
        }
    },
    getters: {
        getCreator: (state) => state.creator,
        getReceiver: (state) => state.receiver,
    },
});