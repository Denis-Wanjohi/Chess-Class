import BlackPawn from '@/components/pieces/BlackPawn.vue';
import WhitePawn from '@/components/pieces/WhitePawn.vue';
import WhiteRook from '@/components/pieces/WhiteRook.vue';
import BlackRook from '@/components/pieces/BlackRook.vue';
import WhiteKnight from '@/components/pieces/WhiteKnight.vue';
import BlackKnight from '@/components/pieces/BlackKnight.vue';
import WhiteBishop from '@/components/pieces/WhiteBishop.vue';
import BlackBishop from '@/components/pieces/BlackBishop.vue';
import WhiteQueen from '@/components/pieces/WhiteQueen.vue';
import BlackQueen from '@/components/pieces/BlackQueen.vue';
import WhiteKing from '@/components/pieces/WhiteKing.vue';
import BlackKing from '@/components/pieces/BlackKing.vue';
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