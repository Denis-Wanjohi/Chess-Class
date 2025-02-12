<template>
  <TheChessboard 
    @move="moved"
    :board-config="boardConfig" 
    @board-created="(api)=> board = api"
    :reactive-config="true"
    :key="boardKey"
    />
</template>

<script setup>
import { watch,ref } from 'vue';
import { reactive } from 'vue';
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import { Chess } from 'chess.js';
import { onMounted } from 'vue';
const boardKey = ref(0)
const boardConfig = reactive({
  fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq - 0 5',
  coordinates: true,
  viewOnly: false,
  animation: { enabled: true },
  draggable: { enabled: true },
  selectable: { enabled: true },
  disableContextMenu: true,
  movable: {
    free: false, // set to true any move is allowed, if false only legal moves
    color: 'white',
    showDests: true,
    events: {},
    rookCastle: true,
  },
});

let board = ref()

function moved(){
  let  ans = 'r1b1k2r/ppppqppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 1 6'
  // console.log(board.value.getFen().split('-')[0])
  // console.log(ans.split('-')[0])
  if(board.value.getFen() == ans){
    alert("correct  move")
  }else{
    console.log("try again")
    // Immediate update
    boardConfig.fen = 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq - 0 5'
    console.log(board.value.board.redrawAll())
    // boardKey.value += 1

    setTimeout(()=>{
      boardKey.value += 1
    },2000)
    // Optional: Try resetting the entire config if needed
    // boardConfig.coordinates = true;
    // boardConfig.viewOnly = false;
    // ... reset other properties if necessary
  }
}

onMounted(()=>{
  // console.log(board.resetBoard())
})
</script>
