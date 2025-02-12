import { defineStore } from "pinia";
export const usePuzzleStore =  defineStore('PuzzleStore',{
    state:()=>({
        puzzleBoard:'',
        puzzleSolution:'',
    })
})