<script setup>
import {reactive,ref,onMounted} from 'vue'
import { TheChessboard } from 'vue3-chessboard';
import NavBar from '@/components/NavBar.vue';
import 'vue3-chessboard/style.css';
import axiosClient from '@/axios/axios.js'
import echo from '@/echo.js'
import {Toast,Dialog} from 'primevue'
import { useUserStore } from '@/stores/user';
import { useChallengeStore } from '@/stores/challange';
import { useCurrentGameStore } from '@/stores/currentGame';
import { useRouter,useRoute } from 'vue-router';
import { useToast } from 'primevue';
import Button from 'primevue/button'
import { getBlackPiece, getWhitePiece } from '@/Utils/utils';
import router from '@/router';
const userStore = useUserStore()
const toast = useToast()
const isWinner = ref(null)
const route = useRoute()
const challangeStore = useChallengeStore()
const currentGameStore = useCurrentGameStore()
const playerColor = ref('white');
const playerPieces = ref('...')
const board = ref(null)
const boardKey = ref(0)
const code = ref(null)
const isCheckmated = ref(false)
const capturedPiece = ref({
  'black':[],
  'white':[],
})
const boardConfig = reactive({
  coordinates: true,
  viewOnly: false,
  animation: { enabled: false },
  draggable: { enabled: true },
  selectable: { enabled: true },
//   challanger to play white
  orientation: playerPieces,
});
const peiceMoved = ()=>{
  console.log(board.value)
  let captPieces = board.value.getCapturedPieces()
  if(captPieces.black.length != 0){
    capturedPiece.value.black.push(captPieces.black[0])
  }3
  if(captPieces.white.length != 0){
    capturedPiece.value.white.push(captPieces.white[0])
  }
  axiosClient.post(`/move/${code.value}`,{
    'code':code.value,
    'challanger':2,
    'receiver':1,
    'status':0,
    'color':playerColor.value,
    'board' : board.value.getFen(),
    'capturedPieces': capturedPiece.value,
  })
  .then((res)=>{
        // playerColor.value = playerColor.value == 'white' ? 'black' : 'white'
  })
  .catch((err)=>{
    console.error(err)
  })
}
onMounted(() => {
  echo.channel('playGame').listen('PlayGame', (event) => {
      boardConfig.fen = event.board
      boardKey.value += 1
      playerColor.value = event.color 
      boardConfig.viewOnly = event.color == 'white' && userStore.id == currentGameStore.challenger.id ? 
                            false 
                          :event.color == 'black' && userStore.id == currentGameStore.receiver.id ? false : true
      // playerColor.value = playerColor.value == 'white' ? 'black' : 'white'
      capturedPiece.value.black = JSON.parse(event.game.captured).black
      capturedPiece.value.white = JSON.parse(event.game.captured).white
      // console.log(event)
  });
  getBoard()
});

const getBoard = ()=>{
    code.value = useRoute().path.replace('/play/','')
    axiosClient.post(`/play/${useRoute().path.replace('/play/','')}`,{
      'code' : useRoute().path.replace('/play/',''),
      'challanger':2,
      'receiver':1,
      'status':0,
      'color':playerColor.value,
      'board' : board.value.getFen()
    })
  .then((res)=>{
    currentGameStore.setChallenger(res.data.challanger[0])
    currentGameStore.setReceiver(res.data.receiver[0])
    currentGameStore.setBoard(res.data.board);
    currentGameStore.setIsDone(res.data.isDone);
    currentGameStore.setColor(res.data.color == 'white' ? 'black' : 'white');
    boardConfig.fen = res.data.board
    boardKey.value += 1 
    playerColor.value = res.data.color 
    playerPieces.value = currentGameStore.challenger == null ? '--' : currentGameStore.challenger.id == userStore.id ? 'white':'black'
    boardConfig.viewOnly = res.data.color == 'white' && userStore.id == currentGameStore.challenger.id ? 
                            false 
                          :res.data.color == 'black' && userStore.id == currentGameStore.receiver.id ? false : true
    capturedPiece.value.black = JSON.parse(res.data.captured).black
    capturedPiece.value.white = JSON.parse(res.data.captured).white
    console.log(board.value)
  })
  .catch((err)=>{
    console.error(err)
  })
}
function handleCheckmate(isMated) {
  isCheckmated.value = true
  isWinner.value = isMated == 'white' ? 'Black' : 'White'
  endGame()
}
function newGame(){
  router.push('/community')
}
function rematch(){
  if(currentGameStore.challenger.id == userStore.id){
      challange(currentGameStore.receiver.id)
  }else{
    challange(currentGameStore.challenger.id)
  }
}
function endGame(){
  // console.log(route.params.id)
  axiosClient.post('/end-game',route.params.id)

}

const challange = (value)=>{
  axiosClient.post('/challange',{'id':value})
}
</script>

<template>
    <NavBar/>
    <div>
        <div class="lg:flex flex-none h-screen bg-slate-200">
            <div class="w-1/3 flex justify-center align-middle  hidden lg:block m-auto">
                <div class="w-3/4 text-center h-fit  mx-auto rounded border shadow-lg bg-blue-400" v-if="currentGameStore.challenger != null && currentGameStore.receiver != null  ">
                   <div>
                    <div class="font-bold text-xl"
                    :class="[userStore.username == currentGameStore.challenger.username && playerColor == 'black' ? 
                          'bg-white' 
                          : userStore.username == currentGameStore.receiver.username && playerColor == 'white' ? 'bg-white' : ''
                            ]"
                    >
                    {{ playerPieces =='...' ? '': 
                        playerPieces == 'white' ? currentGameStore.receiver.username:currentGameStore.challenger.username
                    }}
                    </div>
                    <div class="flex">
                      <p v-if="useCurrentGameStore().challenger.username == userStore.username " v-for="p in capturedPiece.black">
                        <p class="box" :class="[getWhitePiece(p)]"></p>
                      </p>
                      <p v-else v-for="p in capturedPiece.white">
                        <p class="box" :class="[getBlackPiece(p)]"></p>
                      </p>
                    </div>
                   </div> 
                    <div class="mx-auto flex justify-center my-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.839 20.696l-3.06-3.054l-2.2 2.2l-.277-.276q-.46-.46-.46-1.137t.46-1.137l4.09-4.09q.46-.46 1.137-.46t1.137.46l.276.277l-2.2 2.2l3.054 3.06q.243.242.243.565t-.243.565l-.827.827q-.242.242-.565.242t-.565-.242M21 5.477L9.958 16.538l.74.735q.46.46.46 1.137t-.46 1.136l-.277.277l-2.2-2.2l-3.06 3.054q-.242.242-.565.242t-.565-.242l-.827-.827q-.242-.242-.242-.565t.242-.566l3.054-3.06l-2.2-2.2l.277-.276q.46-.46 1.136-.46q.677 0 1.137.46l.754.76L18.423 2.9H21zM8.35 9.425l.58-.594l.576-.6l-.575.6zm-.708.714L3 5.477V2.9h2.577L10.2 7.542l-.694.689L5.175 3.9H4v1.175l4.35 4.35zm1.608 5.686L20 5.075V3.9h-1.175L8.075 14.65zm0 0l-.58-.594l-.595-.581l.594.58z"/></svg>
                    </div>
                    <div class="flex">
                      <p v-if="useCurrentGameStore().challenger.username != userStore.username " v-for="p in capturedPiece.black">
                        <p class="box" :class="[getWhitePiece(p)]"></p>
                      </p>
                      <p v-else v-for="p in capturedPiece.white">
                        <p class="box" :class="[getBlackPiece(p)]"></p>
                      </p>
                    </div>
                    <div class="font-bold text-xl"
                        :class="[userStore.username == currentGameStore.challenger.username && playerColor == 'white' ? 
                          'bg-white' 
                          : userStore.username == currentGameStore.receiver.username && playerColor == 'black' ? 'bg-white' : ''
                            ]"
                    >{{userStore.username}}</div>
                </div>
            </div>
            <div class="lg:w-2/3 p-10   my-auto mx-auto" >
                <div v-if="currentGameStore.challenger != null && currentGameStore.receiver != null  " class="lg:hidden block" >
                  <div class="font-bold text-xl flex"
                    :class="[userStore.username == currentGameStore.challenger.username && playerColor == 'black' ? 
                          'bg-white' 
                          : userStore.username == currentGameStore.receiver.username && playerColor == 'white' ? 'bg-white' : ''
                            ]"
                    >
                    {{ playerPieces =='...' ? '': 
                        playerPieces == 'white' ? currentGameStore.receiver.username:currentGameStore.challenger.username
                    }}
                    <div class="flex align-baseline   items-baseline  pt-1">
                      <p v-if="useCurrentGameStore().challenger.username == userStore.username " v-for="p in capturedPiece.black">
                        <p class="box" :class="[getWhitePiece(p)]"></p>
                      </p>
                      <p v-else v-for="p in capturedPiece.white">
                        <p class="box" :class="[getBlackPiece(p)]"></p>
                      </p>
                    </div>
                    
                    </div>
                </div>
                <TheChessboard 
                class="lg:w-[60%] md:w-[40%] sm:w-[70%] w-full"
                :player-color="playerColor"
                :key="boardKey"
                :board-config="boardConfig" 
                @board-created="(api)=> board = api"
                @checkmate="handleCheckmate"
                v-on:move="peiceMoved"
                reactive-config  />
                <div v-if="currentGameStore.challenger != null && currentGameStore.receiver != null" class="lg:hidden block" >
                  <div class="font-bold align-baseline items-baseline text-xl flex "
                        :class="[userStore.username == currentGameStore.challenger.username && playerColor == 'white' ? 
                          'bg-white' 
                          : userStore.username == currentGameStore.receiver.username && playerColor == 'black' ? 'bg-white' : ''
                            ]"
                    >
                    {{userStore.username}}
                    <div class="flex align-baseline   items-baseline  pt-1">
                      <div v-if="useCurrentGameStore().challenger.username != userStore.username " v-for="p in capturedPiece.black">
                        <p class="box" :class="[getWhitePiece(p)]"></p>
                      </div>
                      <div v-else v-for="p in capturedPiece.white">
                        <p class="box" :class="[getBlackPiece(p)]"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="flex justify-around my-5 font-bold">
                  <Button severity="warn">Draw</Button>
                  <Button severity="danger">Resign</Button>
                </div> -->
            </div>
        </div>
        <Dialog v-model:visible="isCheckmated" modal header=" " :style="{ width: '25rem' }" class="bg-blue-400">
          <div class="w-3/4 text-center mx-auto">
            <p class="font-bold text-xl space-x-2 pt-5">GAME OVER</p>
            <p  class="py-5">{{ isWinner }} won. </p>
            <div class="grid grid-cols-2 gap-2 font-bold">
              <Button @click="newGame" outlined class="text-nowrap"> <i class="pi pi-plus"></i> NEW GAME</Button>
              <Button @click="rematch" outlined> <i class="pi pi-refresh"></i>  REMATCH</Button>
            </div>
          </div>
        </Dialog>
    </div>
</template>
