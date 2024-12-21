import BlackPawn from '@/components/BlackPawn.vue';
import WhitePawn from '@/components/WhitePawn.vue';
import WhiteRook from '@/components/WhiteRook.vue';
import BlackRook from '@/components/BlackRook.vue';
import WhiteKnight from '@/components/WhiteKnight.vue';
import BlackKnight from '@/components/BlackKnight.vue';
import WhiteBishop from '@/components/WhiteBishop.vue';
import BlackBishop from '@/components/BlackBishop.vue';
import WhiteQueen from '@/components/WhiteQueen.vue';
import BlackQueen from '@/components/BlackQueen.vue';
import WhiteKing from '@/components/WhiteKing.vue';
import BlackKing from '@/components/BlackKing.vue';
import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
    state: () => ({
        board: [
            [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook], // Row 1
            [WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],         // Row 2
            [null, null, null, null, null, null, null, null],                        // Row 3
            [null, null, null, null, null, null, null, null],                        // Row 4
            [null, null, null, null, null, null, null, null],                        // Row 5
            [null, null, null, null, null, null, null, null],                        // Row 6
            [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],         // Row 7
            [BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook] // Row 8
        ],
        currentPlayer: 'white',
    }),
    actions: {
        initializeBoard() {
            // Initialize the chess board with pieces
            this.board = [
                // Define the initial state of the chess board
            ];
        },
        movePiece(from, to) {
            // Logic to move a piece from one position to another
        },
        switchPlayer() {
            this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        },
    },
    getters: {
        getPiece: (state) => (position) => {
            // Logic to get a piece at a specific position
            return state.board[position];
        },
    },
});