<script setup>
import axiosClient from '@/axios/axios';
// import socket from '@/socket/socket'
import echo from '@/echo'
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { reactive } from 'vue';
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
const boardConfig = reactive({
  coordinates: true,
  viewOnly: false,
  animation: { enabled: false },
  draggable: { enabled: true },
  selectable: { enabled: true },
  orientation: 'black',
});
const board = ref(null)
const boardKey = ref(0)
const peiceMoved = ()=>{
  axiosClient.post('/play',{
    'board' : board.value.getFen()
  })
  .then((res)=>{

  })
  .catch((err)=>{
    console.error(err)
  })
}
onMounted(() => {
  echo.channel('playGame').listen('PlayGame', (event) => {
      boardConfig.fen = event.board
      boardKey.value += 1 
  });
});

// onUnmounted(() => {
//   socket.off('playGame');
// });

</script>

<template>
  <TheChessboard 
    :key="boardKey"
    :board-config="boardConfig" 
    @board-created="(api)=> board = api"
    v-on:move="peiceMoved"
    reactive-config  />
</template>