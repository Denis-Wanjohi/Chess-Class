<script setup>
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
import { ref } from 'vue';
import {usePuzzleStore} from '@/stores/puzzle.js'

const pieces = ref([
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 4
  [null, null, null, null, null, null, null, null],                        // Row 5
  [null, null, null, null, null, null, null, null],                        // Row 6
]);
const selectedPiece = ref(null)
const selectedPiecePos = ref()
const rrow = [1,2,3,4,5,6,7,8]
// const rrow = [8,7,6,5,4,3,2,1]
const ffile = [1,2,3,4,5,6,7,8]
const components = {
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
  WhitePawn,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing,
  BlackPawn
};
function resolveComponent(name) {
  return components[name] || null;
}

function handlePieceMovement(f,r){
    if(selectedPiece.value != null && (selectedPiecePos.value[0] == r && selectedPiecePos.value[1] == f) ){
    selectedPiecePos.value = null
    selectedPiece.value = null
        return; 
    }
    if(selectedPiece.value){
        if(selectedPiece.value == null){
            return;
        }
    }
    
    if(selectedPiece.value != null){
        
        if(selectedPiece.value.includes(playersTurn.value) == false){
            selectedPiece.value = null
            selectedPiecePos.value = null
            return;
        }
        if(selectedPiecePos.value[0]  == r && selectedPiecePos.value[1]  == f){
            return;
        }
        let piece = selectedPiece.value.split('/').pop().replace('.vue', '').replace(/(White|Black)/, '')

        movePiece(piece,r,f)
        
    }else{
        if(pieces.value[r][f] == 'null'){
            return;
        }
        selectedPiece.value = pieces.value[r][f]
        selectedPiecePos.value = [r,f]   
    }
    
}
function letters(num){
  switch(num){
    case 1:
      return 'a'
    case 2:
      return 'b'
    case 3:
      return 'c'
    case 4:
      return 'd'
    case 5:
      return 'e'
    case 6:
      return 'f'
    case 7:
      return 'g'
    case 8:
      return 'h'
  }
}
function select(piece){
  if(selectedPiecePos.value != null){
    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = piece;
    selectedPiecePos.value= null
  }
}
function remove(rank,file){
  console.log(pieces.value[rank][file] )
  pieces.value[rank][file] = null
}
function clearBoard(){
   pieces.value = [
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 4
  [null, null, null, null, null, null, null, null],                        // Row 5
  [null, null, null, null, null, null, null, null],                        // Row 6
]
}
function setPuzzle(){
  usePuzzleStore().board = pieces.value
  clearBoard()
}
function setSolution(){
  usePuzzleStore().solution = pieces.value
  clearBoard()
}

const uploadPuzzle = ()=>{
  axiosClient('/upload-puzzle')
}
</script>

<template>
    <div class="w-full">
      <div class="mx-auto w-3/4 font-bold font-sans">
        <p>-To set the pieces first select the position then click on the piece</p>
        <p>-To remove the piece double click on it</p>
        <!-- <p v-if="selectedPiecePos != null">Position : {{ letters(selectedPiecePos[1] + 1) }}{{selectedPiecePos[0] + 1}} </p> -->
      </div>
      <div class="flex">
        <div class="flex mx-auto w-1/2">
            <div class="bg-slate-600 h-fit">
              <WhiteKing @click="select('WhiteKing')" class="my-1"/>
              <WhiteQueen @click="select('WhiteQueen')" class="my-1"/>
              <WhiteBishop @click="select('WhiteBishop')" class="my-1"/>
              <WhiteKnight @click="select('WhiteKnight')" class="my-1"/>
              <WhiteRook @click="select('WhiteRook')" class="my-1"/>
              <WhitePawn @click="select('WhitePawn')" class="my-1"/>
              
              <BlackKing @click="select('BlackKing')" class="my-1"/>
              <BlackQueen @click="select('BlackQueen')" class="my-1"/>
              <BlackBishop @click="select('BlackBishop')" class="my-1"/>
              <BlackKnight @click="select('BlackKnight')" class="my-1"/>
              <BlackRook @click="select('BlackRook')" class="my-1"/>
              <BlackPawn @click="select('BlackPawn')" class="my-1"/>

            </div> 
            <div> 
              <div v-for="row,r in pieces"  class="flex">
                <p v-for="file,f in row" 
                @click.prevent="handlePieceMovement(f,r)"
                @dblclick="remove(r,f)"
                class="h-16 w-16 border"

                :class="[ (r + 1) % 2 == 0 
                            ? (Math.floor(f / 8) + f % 8) % 2 === 1 ? 'bg-green-600' : 'bg-slate-400'
                            : (Math.floor(f / 8) + f % 8) % 2 === 0 ? 'bg-green-600' : 'bg-slate-400'
                        ]"
                >
                <span class="flex h-full "  v-if="f == 0">
                  {{rrow[r] }}
                  <component :is="resolveComponent(file)" class="w-fit h-[90%] pt-1" :class="[selectedPiecePos != null ? selectedPiecePos[0]==r && selectedPiecePos[1] == f ?'border rounded-full bg-orange-600 px-1':'' : '']"></component>
                </span>
                <span v-else>
                  <span class="flex h-full "  v-if="r == 0" >
                      {{letters(f+1)}}
                      <component :is="resolveComponent(file)" class="w-fit h-[90%] pt-1" :class="[selectedPiecePos != null ? selectedPiecePos[0]==r && selectedPiecePos[1] == f ?'border rounded-full bg-orange-600 px-1':'' : '']"></component>
                    </span>
                    <component v-else :is="resolveComponent(file)" class="w-fit h-[90%] pt-1" :class="[selectedPiecePos != null ? selectedPiecePos[0]==r && selectedPiecePos[1] == f ?'border rounded-full bg-orange-600 px-1':'' : '']"></component> 
                </span>
                </p>
              </div>
          </div>
        </div>

        <div class="m-auto">
          <p class="text-center">Who to play?</p>
          <div class="flex px-5 py-2">
            <div class="bg-black text-white font-bold px-3 py-1 rounded m-1 cursor-pointer" @click="usePuzzleStore().player = 'black'">BLACK</div>
            <div class="bg-white text-black font-bold px-3 py-1 rounded m-1 cursor-pointer" @click="usePuzzleStore().player = 'white'">WHITE</div>
          </div>

          <div class="bg-white text-center text-black font-bold px-3 py-1 rounded cursor-pointer m-1" @click="setPuzzle">set the puzzle</div>
          <div class="bg-white text-center text-black font-bold px-3 py-1 rounded cursor-pointer m-1" @click="setSolution" v-if="usePuzzleStore().board !== null">set the solution</div>

        </div>
      </div>

    </div>
</template>