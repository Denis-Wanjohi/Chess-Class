<script setup>
import DefaultLayout from '@/layouts/default.vue';
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
import { onMounted } from 'vue';
import { usePuzzleStore } from '@/stores/puzzle';
import { watch } from 'vue';
import axiosClient from '@/axios/axios';
const puzzles = ref()
const puzzleStore = ref(usePuzzleStore())
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
// onMounted(()=>{
//         if(usePuzzleStore().board != null){
//                 playersTurn.value = usePuzzleStore().player
//                 pieces.value = usePuzzleStore().board

//                 watch(pieces.value,()=>{
//                         checkSolution()
//                 })
//         }
// })

const selectedPiece = ref(null)
const selectedPiecePos = ref()
const playersTurn = ref('White')
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

function movePiece(piece,rank,file){
   
    if (piece == 'Pawn') {
    // Pawn Movement and Capture
        if (playersTurn.value == 'White') {
            if (selectedPiecePos.value[0] == 1 && rank - selectedPiecePos.value[0] <= 2 && file == selectedPiecePos.value[1]) {
                // Initial two-step move for White
                if (pieces.value[rank][file] == null) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            } else if (rank - selectedPiecePos.value[0] == 1 && file == selectedPiecePos.value[1]) {
                // Single step forward
                if (pieces.value[rank][file] == null) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            } else if (rank - selectedPiecePos.value[0] == 1 && Math.abs(file - selectedPiecePos.value[1]) == 1) {
                // Diagonal capture
                if (pieces.value[rank][file]?.includes('Black')) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            }
        } else if (playersTurn.value == 'Black') {
            if (selectedPiecePos.value[0] == 6 && selectedPiecePos.value[0] - rank <= 2 && file == selectedPiecePos.value[1]) {
                // Initial two-step move for Black
                if (pieces.value[rank][file] == null) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            } else if (selectedPiecePos.value[0] - rank == 1 && file == selectedPiecePos.value[1]) {
                // Single step forward
                if (pieces.value[rank][file] == null) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            } else if (selectedPiecePos.value[0] - rank == 1 && Math.abs(file - selectedPiecePos.value[1]) == 1) {
                // Diagonal capture
                if (pieces.value[rank][file]?.includes('White')) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            }
        }
    }else if(piece == 'Rook'){
        if (rank == selectedPiecePos.value[0] || file == selectedPiecePos.value[1]) {
        if (!isPathBlocked(selectedPiecePos.value, [rank, file])) {
            if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }
            
    }else if(piece == 'Knight'){
        const validMoves = [
        [selectedPiecePos.value[0] + 2, selectedPiecePos.value[1] + 1],
        [selectedPiecePos.value[0] + 2, selectedPiecePos.value[1] - 1],
        [selectedPiecePos.value[0] - 2, selectedPiecePos.value[1] + 1],
        [selectedPiecePos.value[0] - 2, selectedPiecePos.value[1] - 1],
        [selectedPiecePos.value[0] + 1, selectedPiecePos.value[1] + 2],
        [selectedPiecePos.value[0] + 1, selectedPiecePos.value[1] - 2],
        [selectedPiecePos.value[0] - 1, selectedPiecePos.value[1] + 2],
        [selectedPiecePos.value[0] - 1, selectedPiecePos.value[1] - 2]
    ];
        if (validMoves.some(([r, f]) => r == rank && f == file)) {
            if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }else if (piece == 'Bishop') {
        // Bishop Movement and Capture
        if (Math.abs(rank - selectedPiecePos.value[0]) == Math.abs(file - selectedPiecePos.value[1])) {
            if (!isPathBlocked(selectedPiecePos.value, [rank, file])) {
                if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            }
        }
    }else if (piece == 'Queen') {
        // Queen Movement and Capture (combination of Rook and Bishop)
        if (
            rank == selectedPiecePos.value[0] ||
            file == selectedPiecePos.value[1] ||
            Math.abs(rank - selectedPiecePos.value[0]) == Math.abs(file - selectedPiecePos.value[1])
        ) {
            if (!isPathBlocked(selectedPiecePos.value, [rank, file])) {
                if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                    pieces.value[rank][file] = selectedPiece.value;
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                    changePlayer();
                    return;
                }
            }
        }
    } else if (piece == 'King') {
        // King Movement and Capture
        if (Math.abs(rank - selectedPiecePos.value[0]) <= 1 && Math.abs(file - selectedPiecePos.value[1]) <= 1) {
            if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }
}

function changePlayer(){
    selectedPiece.value =  null
    selectedPiecePos.value =  null
    playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
}


function isPathBlocked(start, end) {
    const [startRank, startFile] = start;
    const [endRank, endFile] = end;
    const rankStep = Math.sign(endRank - startRank);
    const fileStep = Math.sign(endFile - startFile);
    
    let currentRank = startRank + rankStep;
    let currentFile = startFile + fileStep;

    while (currentRank !== endRank || currentFile !== endFile) {
        if (pieces.value[currentRank][currentFile] != null) {
            return true;
        }
        currentRank += rankStep;
        currentFile += fileStep;
    }
    return false;
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
function checkSolution(){
        if(JSON.stringify(pieces.value) === JSON.stringify(usePuzzleStore().solution)){
                alert("good")
        }else{
                alert("bad")
                pieces.value  = usePuzzleStore().board
                
        }
}

onMounted(()=>{
    puzzleStore.value.puzzles = []
    axiosClient.get('/puzzles')
    .then((res)=>{
        // console.log(res)
        res.data.forEach(element => {
            puzzleStore.value.puzzles.push(JSON.parse(element.puzzle))
        });
    })
    .catch((err)=>{
        alert("eror getting puzzles")
        console.log(err)
    })
})

const selectPuzzle =(index)=>{
    console.log(puzzleStore.value.puzzles[index])
}
</script>
<template>
        <div class="grid grid-cols-3">
            <p v-for="(puzzle,index) in puzzleStore.puzzles"  class="bg-blue-400 hover:bg-blue-600 rounded p-5  mx-3 text-center font-bold text-xl cursor-pointer" @click="selectPuzzle(index)">
                {{ index + 1 }}
            </p>
        </div>
            <div>
                <!-- turn management -->
                <p>Players to play :{{ playersTurn }}</p>
                <div v-for="row,r in pieces" class="flex">
                    <p v-for="file,f in row" 
                    @click.prevent="handlePieceMovement(f,r)"
                    class="h-16 w-16 border"
                    :class="[ (r + 1) % 2 == 0 
                                ? (Math.floor(f / 8) + f % 8) % 2 === 1 ? 'bg-green-600' : 'bg-slate-400'
                                : (Math.floor(f / 8) + f % 8) % 2 === 0 ? 'bg-green-600' : 'bg-slate-400'
                            ]"
                    >
                    <span class="flex h-full "  v-if="f == 0">
                        {{r + 1 }}
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
    </template>