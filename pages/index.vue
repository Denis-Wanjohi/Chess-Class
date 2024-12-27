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

const pieces = ref([
  ['WhiteRook', 'WhiteKnight', 'WhiteBishop', 'WhiteQueen', 'WhiteKing', 'WhiteBishop', 'WhiteKnight', 'WhiteRook'], // Row 1
  ['WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn'],         // Row 2
  [null, null, null, null, null, null, null, null],                        // Row 3
  [null, null, null, null, null, null, null, null],                        // Row 4
  [null, null, null, null, null, null, null, null],                        // Row 5
  [null, null, null, null, null, null, null, null],                        // Row 6
  ['BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn'],         // Row 7
  ['BlackRook', 'BlackKnight', 'BlackBishop', 'BlackQueen', 'BlackKing', 'BlackBishop', 'BlackKnight', 'BlackRook'] // Row 8
]);

const selectedPiece = ref(null)
const selectedPiecePos = ref()
const playersTurn = ref('White')
function handlePieceMovement(f,r){
    console.log(selectedPiece.value)
    console.log(selectedPiecePos.value)
    console.log(f,r)
    if(selectedPiece.value != null && (selectedPiecePos.value[0] == r && selectedPiecePos.value[1] == f) ){
        // console.log(pieces.value[r][f])
    // console.log(selectedPiece.value)
    // console.log(selectedPiece.value == null)
    selectedPiecePos.value = null
    selectedPiece.value = null
        return; 
    }
    if(selectedPiece.value){
        if(selectedPiece.value == null){
            return;
        }

       
        // console.log(selectedPiece.value)
        // if( 
        //     selectedPiece.value.__file && 
        //     selectedPiece.value.__file.split('/').pop().replace('.vue', '').includes(playersTurn.value)
        // ){
        //     // return;
        // }else{
        //     selectedPiece.value = null
        //     return;
        // }
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
        // console.log(rank - selectedPiecePos.value[0] )
       
        // if(rank - selectedPiecePos.value[0] != 0 ){
           
        //     let f = []
        //     for(let i = 0; i < 8; i++){
        //         f.push(pieces.value[i][file])
        //     }
        //     console.log(f)
        //     for(let x = 0; x < rank + 1; x ++){
        //         if(f[x] == 'WhiteRook'){
        //             continue;
        //         }else if( f[x] != null){
        //             console.log(x)
        //             console.log(f[x])
        //             console.log(rank)
        //             if(f[x].includes('White') && f[x] != 'WhiteRook'){
        //                 continue;
                        
        //             }
        //             if(f[x].includes('Black') && (rank == x)){
        //                 pieces.value[rank][file] = selectedPiece.value
        //                 pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null
        //                 selectedPiece.value = null
        //                 selectedPiecePos.value = null
        //                 changePlayer()
        //                 return;
        //             }
        //             selectedPiece.value = null
        //             selectedPiecePos.value = null
                    
        //             return;
        //         }
        //         // console.log(f[x])
        //     }
        // }

        // if(file - selectedPiecePos.value[1]  != 0){
            
        //     let r = []
        //     for(let i = 0; i < 8; i++){
        //         r.push(pieces.value[rank][i])
        //     }
        //     console.log(r)
        //     for(let x = 0; x < file + 1; x ++){
        //         if(r[x] == 'WhiteRook'){
        //             continue;
        //         }else if( r[x] != null){
        //             console.log(x)
        //             console.log(file)
        //             if(r[x].includes('Black') && (file == x)){
        //                 pieces.value[rank][file] = selectedPiece.value
        //                 pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null
        //                 return;
        //             }
        //             selectedPiece.value = null
        //             selectedPiecePos.value = null
        //             changePlayer()
        //             return;
        //         }
        //     }
        // }

        // pieces.value[rank][file] = selectedPiece.value
        // pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null
        
        // selectedPiece.value = null
        // selectedPiecePos.value = null
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
        
        // playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
        
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

</script>


<template>

    <div class="w-[100%] bg-blue-300">
        <!-- turn management -->
        <p>Players to play :{{ playersTurn }}</p>
        <!-- {{pie}} -->
        <div v-for="row,r in pieces" class="flex">

            <p v-for="file,f in row" 
            @click.prevent="handlePieceMovement(f,r)"
            class="h-6 w-6 border"
            
            :class="[ (r + 1) % 2 == 0 
                        ? (Math.floor(f / 8) + f % 8) % 2 === 1 ? 'bg-green-600' : 'bg-slate-400'
                        : (Math.floor(f / 8) + f % 8) % 2 === 0 ? 'bg-green-600' : 'bg-slate-400'
                    ]"
            >
            <component :is="resolveComponent(file)" class="w-fit h-[90%]" :class="[selectedPiecePos != null ? selectedPiecePos[0]==r && selectedPiecePos[1] == f ?'bg-blue-600 px-1':'' : '']"></component>
            </p>
        </div>
    </div>



</template>