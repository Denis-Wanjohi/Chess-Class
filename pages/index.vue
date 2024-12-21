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

const pieces =  ref([
        [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook], // Row 1
        [WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],         // Row 2
        ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'],                        // Row 3
        ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'],                        // Row 4
        ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'],                        // Row 5
        ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'],                        // Row 6
        [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],         // Row 7
        [BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook] // Row 8
      ])
const selectedPiece = ref(null)
const selectedPiecePos = ref()
const playersTurn = ref('White')
function handlePieceMovement(f,r){
    console.log("moving pieces :" + f,r)
    // console.log(pieces.value[r][f])
    // console.log(selectedPiece.value)
    // console.log(selectedPiece.value)

    if(pieces.value[r][f] == null  && selectedPiece.value == 'null' ){
        // console.log(pieces.value[r][f])
    // console.log(selectedPiece.value)
    // console.log(selectedPiece.value == null)
        return; 
    }
    if(selectedPiece.value){
        if(selectedPiece.value == 'null'){
            return;
        }
        console.log(selectedPiece.value)
        if( 
            selectedPiece.value.__file && 
            selectedPiece.value.__file.split('/').pop().replace('.vue', '').includes(playersTurn.value)
        ){
            // return;
        }else{
            selectedPiece.value = null
            return;
        }
    }
    
    if(selectedPiece.value != null){
        // console.log(selectedPiece.value)
        let  file = selectedPiece.value.__file
        let piece = file.split('/').pop().replace('.vue', '').replace(/(White|Black)/, '')

        movePiece(piece,r,f)
        
    }else{
        if(pieces.value[r][f] == 'null'){
            return;
        }
        selectedPiece.value = pieces.value[r][f]
        selectedPiecePos.value = [r,f]   

        // selectedPiece.value = pieces.value[r][f].__file.split('/').pop().replace('.vue', '');
    }
    
}

function movePiece(piece,rank,file){
    // console.log(piece)
    // console.log(playersTurn.value)
    if(piece == 'Pawn'){
        //one step
        if(playersTurn.value == 'White'){
            //check for initial position to allow two steps
            if(selectedPiecePos.value[0] == 1){
                if( (rank - selectedPiecePos.value[0]) == 2){
                    pieces.value[rank][file] = selectedPiece.value
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = 'null'
                    selectedPiece.value = null
                    selectedPiecePos.value = null
                    playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
                    return;
                }else if( (rank - selectedPiecePos.value[0]) == 1){
                    pieces.value[rank][file] = selectedPiece.value
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = 'null'
                    selectedPiece.value = null
                    selectedPiecePos.value = null
                    playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
                    return;
                }else{
                    selectedPiece.value = null
                    return
                }
            }
            // move one step
            if( (rank - selectedPiecePos.value[0]) == 1){
                pieces.value[rank][file] = selectedPiece.value
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = 'null'
                selectedPiece.value = null
                selectedPiecePos.value = null
                playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
                return;
            }else{
                selectedPiece.value = null
                return
            }
        }else if(playersTurn.value == 'Black'){
            //check for initial position to allow two steps
            if(selectedPiecePos.value[0] == 6){
                if( (selectedPiecePos.value[0] - rank) == 2){
                    pieces.value[rank][file] = selectedPiece.value
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = 'null'
                    selectedPiece.value = null
                    selectedPiecePos.value = null
                    playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
                    return;
                }else if( (selectedPiecePos.value[0] - rank) == 1){
                    pieces.value[rank][file] = selectedPiece.value
                    pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = 'null'
                    selectedPiece.value = null
                    selectedPiecePos.value = null
                    playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
                    return;
                }else{
                    selectedPiece.value = null
                    return
                }
            }
            
            //move one step
            if( (selectedPiecePos.value[0] - rank) == 1){
                pieces.value[rank][file] = selectedPiece.value
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = 'null'
                selectedPiece.value = null
                selectedPiecePos.value = null
                playersTurn.value = playersTurn.value == 'White' ? 'Black' :  'White'
                return;
            }else{
                selectedPiece.value = null
                console.log('one move  only')
                return
            }
        }
    }else if(piece == 'Rook'){
        console.log(piece)
        selectedPiece.value = null
        selectedPiecePos.value = null
    }else if(piece == 'Knight'){
        console.log(piece)
        selectedPiece.value = null
        selectedPiecePos.value = null
    }
}


</script>


<template>

    <!-- turn management -->
    <p>Players to play :{{ playersTurn }}</p>
    <div v-for="row,r in pieces" class="flex">

        <p v-for="file,f in row" 
        @click.prevent="handlePieceMovement(f,r)"
        class="h-6 w-6 border"
        :class="[ (r + 1) % 2 == 0 
                    ? (Math.floor(f / 8) + f % 8) % 2 === 1 ? 'bg-green-600' : 'bg-slate-400'
                    : (Math.floor(f / 8) + f % 8) % 2 === 0 ? 'bg-green-600' : 'bg-slate-400'
                ]"
        >
        <component :is=file class="w-fit h-[90%]"></component>
        </p>
    </div>

    <p v-for="x in pieces">
        {{x}}
    </p>
</template>