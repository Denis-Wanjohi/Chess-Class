<script setup>
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

let boardAPI;

// access the boardAPI in the onMounted hook
onMounted(() => {
  console.log(boardAPI?.getBoardPosition());
});

const boardConfig = reactive({
  movable:{
    free:false
  }
})

function boardChange(){
  console.log(boardAPI.getFen())
}
</script>

<template>
  <TheChessboard @board-created="(api) => (boardAPI = api)"  :board-config="boardConfig" @move="boardChange()" />
</template>