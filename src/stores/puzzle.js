import { defineStore } from "pinia";

export const usePuzzleStore = defineStore('puzzle',{
    state:()=>({
        board:"null",
        solution:"null",
        player:"null"
    }),
    actions:{
        setPuzzle(value){
            this.board = value
        },
        getPuzzle(){
            return this.board
        },
        getSolution(){
            return this.solution
        }
    }
});