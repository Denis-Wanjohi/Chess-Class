<script setup>
import BlackPawn from '~/components/BlackPawn.vue';
import WhitePawn from '~/components/WhitePawn.vue';
import WhiteRook from '~/components/WhiteRook.vue';
import BlackRook from '~/components/BlackRook.vue';
import WhiteKnight from '~/components/WhiteKnight.vue';
import BlackKnight from '~/components/BlackKnight.vue';
import WhiteBishop from '~/components/WhiteBishop.vue';
import BlackBishop from '~/components/BlackBishop.vue';
import WhiteQueen from '~/components/WhiteQueen.vue';
import BlackQueen from '~/components/BlackQueen.vue';
import WhiteKing from '~/components/WhiteKing.vue';
import BlackKing from '~/components/BlackKing.vue';
useSeoMeta({
  title:'Puzzles',
  description:'This page is for creating puzzles'
})
const selectedPiece = ref(null)
const selectedPiecePos = ref()
const rrow = [1,2,3,4,5,6,7,8]
const ffile = [1,2,3,4,5,6,7,8]
const pieces = ref([
  // ['WhiteRook', 'WhiteKnight', 'WhiteBishop', 'WhiteQueen', 'WhiteKing', 'WhiteBishop', 'WhiteKnight', 'WhiteRook'], // Row 1
  // ['WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn'],         // Row 2
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 4
  [null, null, null, null, null, null, null, null],                        // Row 5
  [null, null, null, null, null, null, null, null],                        // Row 6
  // ['BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn'],         // Row 7
  // ['BlackRook', 'BlackKnight', 'BlackBishop', 'BlackQueen', 'BlackKing', 'BlackBishop', 'BlackKnight', 'BlackRook'] // Row 8
]);
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
  pieces.value[rank][file] = null
}
</script>

<template>
  <!-- {{ pieces[selectedPiecePos[0]][selectedPiecePos[1]] }} -->
    <div>
      <p>To set the pieces first select the position then click on the piece</p>
      <p>To remove the piece double click on it</p>
    </div>
    <div class="flex">
      <div class="bg-slate-600 h-fit">
        <BlackKing @click="select('BlackKing')" class="my-1"/>
        <BlackQueen @click="select('BlackQueen')" class="my-1"/>
        <BlackBishop @click="select('BlackBishop')" class="my-1"/>
        <BlackKnight @click="select('BlackKnight')" class="my-1"/>
        <BlackRook @click="select('BlackRook')" class="my-1"/>
        <BlackPawn @click="select('BlackPawn')" class="my-1"/>

        <WhiteKing @click="select('WhiteKing')" class="my-1"/>
        <WhiteQueen @click="select('WhiteQueen')" class="my-1"/>
        <WhiteBishop @click="select('WhiteBishop')" class="my-1"/>
        <WhiteKnight @click="select('WhiteKnight')" class="my-1"/>
        <WhiteRook @click="select('WhiteRook')" class="my-1"/>
        <WhitePawn @click="select('WhitePawn')" class="my-1"/>
      </div> 
      <div> 
        <div v-for="row,r in pieces"  class="flex">
          {{ r }}
          <p v-for="file,f in row" 
          @click.prevent="handlePieceMovement(f,r)"
          @dblclick="remove(r,f)"
          class="h-16 w-16 border"

          :class="[ (r + 1) % 2 == 0 
                      ? (Math.floor(f / 8) + f % 8) % 2 === 1 ? 'bg-green-600' : 'bg-slate-400'
                      : (Math.floor(f / 8) + f % 8) % 2 === 0 ? 'bg-green-600' : 'bg-slate-400'
                  ]"
          >
          <p class="relative -top-2 h-[0px] text-[10px]">{{ letters(rrow[f]  )}}</p>
          <component :is="resolveComponent(file)" class="w-fit h-[90%] pt-1" :class="[selectedPiecePos != null ? selectedPiecePos[0]==r && selectedPiecePos[1] == f ?'border rounded-full bg-orange-600 px-1':'' : '']"></component>
          <!-- <div class="flex justify-between text-sm relative ">
            <span v-if="f ===  0">{{r + 1}}</span>
            <span v-if="r ===  0">{{letters(f + 1)}}</span>
          </div> -->
          </p>
        </div>
        <!-- {{selectedPiece}} -->
        <br/>
        <!-- {{selectedPiecePos}} -->
        <div class="flex justify-around  py-4 font-semibold w-1/4">
          <div class="bg-red-500 px-5 rounded  cu" @click="remove()">REMOVE</div>
          <div class="bg-green-500 px-5 rounded" @click="move()">MOVE</div>
        </div>
    </div>
  </div>
</template>