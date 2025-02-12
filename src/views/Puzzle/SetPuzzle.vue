<script setup>
import { TheChessboard } from 'vue3-chessboard';
import {ref} from 'vue';
import { reactive } from 'vue';
import {usePuzzleStore} from '@/stores/puzzle.js'
import { useCounterStore } from '@/stores/counter';
import axiosClient from '@/axios/axios'
const puzzleStore = ref(usePuzzleStore())
const board = ref()
const fen = ref()
const isPuzzleSet = ref(false)
const isPuzzleSolSet = ref(false)
const boardConfig = reactive({

})

const setBoard  = ()=>{
    fen.value = board.value.getFen()
}
const setPuzzle = ()=>{
puzzleStore.value.puzzleBoard =  board.value.getFen()
isPuzzleSet.value = true
}
const setSolution = ()=>{
puzzleStore.value.puzzleSolution =  board.value.getFen()
isPuzzleSolSet.value = true
}
const uploadPuzzle = ()=>{
    let data = {
        'puzzle':puzzleStore.value.puzzleBoard,
        'solution': puzzleStore.value.puzzleSolution 
    }
    axiosClient.post('/upload-puzzle',data)
    .then((res)=>{
        console.log(res)
    })
    .catch(err=>{
        alert(err)
    })
}
</script>

<template>

 <div>
    <p>SET PUZZLE</p>
    <p>Move the pieces to the puzzle position</p>
    <TheChessboard
        style="width:300px; height:300px"
        @board-created="(api)=>board = api"
        @move="setBoard"
    ></TheChessboard>
    <button @click="setPuzzle" v-if="!isPuzzleSet">Set Puzzle</button>
    <button @click="setSolution" v-if="isPuzzleSet && !isPuzzleSolSet">Set Solution</button>
    <button @click="uploadPuzzle" v-if="isPuzzleSet && isPuzzleSolSet">Upload Puzzle</button>
 </div>
</template>