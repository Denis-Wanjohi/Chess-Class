import { defineStore } from 'pinia';

export const useCurrentGameStore = defineStore('currentGame', {
    state: () => ({
        challenger: null,
        receiver: null,
        board:null,
        color:null,
        isDone:null
    }),
    actions: {
        setChallenger(challenger) {
            this.challenger = challenger;
        },
        setReceiver(receiver) {
            this.receiver = receiver;
        },
        setBoard(board) {
            this.board = board;
        },
        setColor(color) {
            this.color = color;
        },
        setIsDone(isDone) {
            this.isDone = isDone;
        }
    },
});