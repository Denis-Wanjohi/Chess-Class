<script setup>
import axiosClient from '@/axios/axios';
import { reactive } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { TheChessboard } from 'vue3-chessboard';

const board = ref()
const boardKey = ref(0)
const puzzles = ref()
const puzzle = ref()
onMounted(()=>{
    axiosClient.get('/puzzles')
    .then((res)=>{
        puzzles.value = res.data
    })
    .catch(err=>{
        alert(err)
    })
})
const boardConfig = reactive({
    fen:puzzle.value
})
function selectPuzzle(val){
    // console.log(puzzle.puzzle)
    puzzle.value = val.puzzle
    boardConfig.fen =  val.puzzle
    boardKey.value += 1
}

</script>

<template>
    <div>
        <div style="display: flex;">
            <div 
                v-for="puzzle in puzzles" 
                @click="selectPuzzle(puzzle)"
                style="
                    padding: 10px; 
                    background-color: burlywood; 
                    margin-left:4px ; 
                    margin-right:4px;
                    cursor: pointer;
            ">
                {{ puzzle.id }}
            </div>
        </div>
        {{ boardConfig }}
        
        <TheChessboard
            :key="boardKey"
            @board-created="(api)=> board = api"
            :board-config="boardConfig"
        />
    </div>
</template>