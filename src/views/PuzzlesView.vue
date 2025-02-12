<template>
    <NavBar/>
    <div>
        <div class="text-center">
            <h2 class="font-extrabold text-center text-4xl">P U Z Z E L S</h2>
            <i class="text-center text-sm underline">"A puzzle a day keeps the blunder away"</i>
        </div>
        <div class="w-screen flex">
            <div class="w-1/3 flex justify-center items-center">
                <div class="text-center  text-xl">
                    
                    <div v-if="Math.ceil(solveMoves/2) == Math.ceil(steps/2) && steps != 0">
                        <p>Points: {{Number(player.points) + 5}}</p>
                    </div>
                    <p v-else>Points: {{player.points}}</p>
                    <p>Solve move in :{{Math.ceil(solveMoves/2)}} steps</p>
                    <p v-if="steps > 0">Moves solved :{{Math.ceil(steps/2)}}</p>
                    <div v-if="Math.ceil(solveMoves/2) == Math.ceil(steps/2) && steps != 0">
                        <p class="font-bold text-xl">You are done 👍✨</p>
                        <Button severity="success" @click="nextPuzzle">Next Puzzle</Button>
                    </div>
                    <div  v-if="isFailed">
                        <p>Oops! You failed that one.</p>
                        <Button severity="danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m12.395 18.218l-.23 2.369c-.091.952-.98 1.598-1.878 1.366c-1.351-.35-2.3-1.605-2.3-3.044v-3.035c0-.675 0-1.013-.146-1.26a1 1 0 0 0-.333-.345c-.24-.151-.567-.151-1.22-.151h-.396c-1.703 0-2.554 0-3.078-.39a2.07 2.07 0 0 1-.78-1.208c-.146-.65.181-1.463.836-3.087l.327-.81c.188-.468.265-.975.225-1.48c-.232-2.874 2.047-5.295 4.833-5.135l10.424.598c1.139.065 1.708.098 2.222.553c.515.455.612.924.805 1.861a14.3 14.3 0 0 1-.055 6.037c-.283 1.249-1.475 1.92-2.706 1.76c-3.264-.42-6.223 2.019-6.55 5.4"/><path d="m17 12.5l.137-.457c.887-2.956.84-6.115-.137-9.043"/></g></svg>
                        </Button>
                    </div>
                </div>
            </div>
            <div class="w-2/3">
                <TheChessboard 
                    class="w-[50%]"
                    :key="boardKey"
                    :board-config="boardConfig" 
                    @board-created="(api)=> board = api"
                    v-on:move="peiceMoved"
                    reactive-config
                ></TheChessboard>
            </div>

        </div>
    </div>



</template>

<script setup>
import axiosClient2 from '@/axios/axios copy.js';

import { ref,reactive, watch } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { onMounted } from 'vue';
import {TheChessboard} from 'vue3-chessboard'
import  Button  from 'primevue/button';
import axiosClient from '@/axios/axios';
const initialPuzzle = ref()
const puzzle = ref()
const puzzleSol = ref()
const boardKey =ref(0)
const solveMoves = ref(0)
const solvedMoves = ref(0)
const isFailed = ref(false)
const steps = ref(0)
const player = ref({
    'count':null,
    'points':null,
    'played':[]
})
const boardConfig = reactive({
  coordinates: true,
  viewOnly: false,
  animation: { enabled: false },
  draggable: { enabled: true },
  selectable: { enabled: true },
//   challanger to play white
  orientation: 'white',
});
const board = ref()
const peiceMoved = ()=>{
    switch (solvedMoves.value) {
    case 0:
        if(puzzleSol.value[0] == board.value.getLastMove().lan ){
           solvedMoves.value ++ 
           steps.value ++
           setTimeout(() => {
            board.value.move(puzzleSol.value[1])
           }, 2000);
           
        }else{
            wrongMoveHandler();
        }
        break;
    case 1:
        if(puzzleSol.value[1] == board.value.getLastMove().lan ){
           solvedMoves.value ++ 
           steps.value ++
        }else{
            wrongMoveHandler();
        }
        break;
    case 2:
        if(puzzleSol.value[2] == board.value.getLastMove().lan ){
           solvedMoves.value ++ 
           steps.value ++
           setTimeout(()=>{
            board.value.move(puzzleSol.value[3])
           },2000)
           
        }else{
            wrongMoveHandler();
        }
        break;
    case 3:
        if(puzzleSol.value[3] == board.value.getLastMove().lan ){
           solvedMoves.value ++ 
           steps.value ++
        }else{
            wrongMoveHandler();
        }
        break;
    case 4:
        if(puzzleSol.value[4] == board.value.getLastMove().lan ){
           solvedMoves.value ++ 
           steps.value ++
           setTimeout(() => {
            board.value.move(puzzleSol.value[5])
           }, 2000);
           
        }else{
            wrongMoveHandler();
        }
        break;
    case 5:
        if(puzzleSol.value[5] == board.value.getLastMove().lan ){
           solvedMoves.value ++ 
           steps.value ++
        }else{
            wrongMoveHandler();
        }
        break;

    default:
        console.log('oeoe')
        break;
}

function wrongMoveHandler() {
    isFailed.value = true
    setTimeout(() => {
        isFailed.value = false
        solvedMoves.value = 0;
        steps.value = 0;
        board.value.loadPgn(initialPuzzle.value);
        boardKey++;
    }, 3000);

}
}
// lip_pAHaT4fUAyoVJf3bXYKq
onMounted( async ()=>{
    getUser()
    
})
const puzzleData = [
    "0000D", "0008Q", "0009B", "000VW", "000Vc", "000Zo", "000aY", "000hf", "000lC", "000mr", "000qP", "000rO", "000tp", "0017R", "0018S", "001Hi", "001Wz", "001XA", "001aK", "001cr", "001gi", "001h8", "001m3", "001om", "001u3", "001uD", "001w5", "001wR", "001wb", "001wr", "001xO", "001xl", "002CP", "002Cw", "002GQ", "002IE", "002KJ", "002LF", "002LW", "002O7", "002Tf", "002Ua", "002Uy", "002VP", "002Z9", "002bK", "002rd", "002uV", "002vV", "002xh", "0039T", "003AX", "003IX", "003Jb", "003S3", "003Tx", "003UW", "003YF", "003YT", "003eP", "003jH", "003jb", "003jv", "003md", "003mh", "003nQ", "003o0", "003r5", "003wQ", "0042j", "0045Q", "0047P", "0048h", "004Ao", "004Ax", "004BW", "004JD", "004LZ", "004Op", "004RF", "004Ud", "004WZ", "004X6", "004Ys", "004b0", "004d8", "004iZ", "004kB", "004mT", "004nd", "004sY", "004sg", "004u0", "004zI", "0050w", "0054a", "0055Y", "005Bm", "005HF", "005N7", "005YM", "005YX", "005f3", "005jJ", "005nD", "005qG", "005ws", "005wy", "005xu", "005yO", "0061g", "0066C", "0068B", "0068D", "006GK", "006HV", "006NL", "006OI", "006RM", "006XF", "006cZ", "006eO", "006fF", "006ia", "006of", "006om", "006pe", "006wz", "006x0", "006yP", "0070J", "0071K", "0072T", "0078T", "007AS", "007HB", "007Rn", "007XE", "007c6", "007eS", "007en", "007fJ", "007gO", "007ku", "007tv", "0088O", "008D5", "008EC", "008GK", "008LD", "008LT", "008Nz", "008P4", "008Sk", "008Y3", "008lc", "008nF", "008o6", "008oX", "008tL", "0091A", "0092V", "0092z", "0095W", "009BH", "009De", "009FS", "009IO", "009L0", "009Os", "009Wc", "009XT", "009bR", "009f8", "009lk", "009oc", "009tE", "009uB", "009zR", "00A1H", "00A5m", "00A5v", "00AB1", "00AGs", "00AHY", "00AOH", "00AVR", "00AXb", "00Aae", "00Aas", "00AbP", "00Ac7", "00AcQ", "00AdI", "00Af3", "00AfZ", "00AhO", "00Ahb", "00Al5", "00AoZ", "00Aok", "00Aq4", "00AuR", "00B2k", "00B3B", "00B5A", "00B7G", "00BKa", "00BM8", "00BQD", "00BSo", "00Bex", "00Bg4", "00Bm8", "00Bn0", "00Bn4", "00Bp0", "00BrZ", "00Bse", "00Bul", "00C3O", "00C7m", "00C8e", "00CBU", "00CFp", "00CMj", "00CNA", "00CWE", "00CXr", "00CbV", "00CcK", "00CiZ", "00CpR", "00Cs4", "00CtS", "00Cwz", "00D12", "00D77", "00D7x", "00DEc", "00DII", "00DPI", "00DPQ", "00DTg", "00DU5", "00DWo", "00DYf", "00DZe", "00DdW", "00DkJ", "00Dt6", "00Dw8", "00Dxh", "00DzI", "00E4Z", "00EBZ", "00EDN", "00EEp", "00EJb", "00EUu", "00EWi", "00EXS", "00Ea3", "00EbJ", "00Ec4", "00EgR", "00EoE", "00Er4", "00Erm", "00Evs", "00Ezc", "00F1l", "00F2o", "00F3S", "00F5G", "00F6y", "00FAe", "00FF5", "00FHO", "00FHX", "00FOM", "00FON", "00FPo", "00FaB", "00FjB", "00Fyu", "00G0z", "00G1l", "00G7g", "00G81", "00GAf", "00GBV", "00GBX", "00GHw", "00GRa", "00GVf", "00GWg", "00GY4", "00GYk", "00GcF", "00GoO", "00Gt0", "00GuD", "00GuG", "00Gvr", "00Gz6", "00H1C", "00H2I", "00H2L", "00H5n", "00H87", "00H8a", "00H9n", "00HEh", "00HEx", "00HGG", "00HHN", "00HIV", "00HJd", "00HPz", "00HSV", "00HVU", "00HZC", "00HZa", "00HeG", "00Hk4", "00HnR", "00HoG", "00Htd", "00Hut", "00Hxb", "00HzH", "00HzX", "00ICz", "00IDw", "00IF1", "00IF7", "00IFk", "00IHi", "00IPp", "00ISm", "00ITc", "00IUT", "00IYH", "00IaZ", "00IiM", "00In2", "00IpT", "00Ivf", "00J1Y", "00J1t", "00J5r", "00J7i", "00JET", "00JFF", "00JO7", "00JQS", "00JS1", "00JYV", "00JZk", "00JaW", "00JtR", "00JzT", "00K0G", "00K48", "00K8j", "00KHR", "00KMV", "00KNB", "00KNK", "00KO5", "00KOz", "00KSB", "00KUa", "00KVF", "00KVO", "00KVb", "00KYC", "00KYE", "00Kbj", "00Kd8", "00Keu", "00KgR", "00KhM", "00Kia", "00Knu", "00Kq4", "00Kyy", "00L1Y", "00L4x", "00L84", "00LBF", "00LG5", "00LH7", "00LI0", "00LII", "00LMb", "00LNB", "00LO6", "00LOy", "00LRq", "00LRv", "00LSv", "00LWX", "00LXD", "00LZf", "00LZl", "00LdT", "00Lhb", "00Lo9", "00LoE", "00Lqo", "00Lt1", "00Lyc", "00M1q", "00M6i", "00M7w", "00MBF", "00ME0", "00MFe", "00MGA", "00MHi", "00MIY", "00MNf", "00MS3", "00MTG", "00MWz", "00MYL", "00MZr", "00Mbv", "00Mca", "00MeO", "00Mei", "00Mf0", "00Msq", "00MyT", "00N3B", "00NAM", "00NBR", "00NGM", "00NHK", "00NOI", "00NUS", "00NUc", "00NVe", "00NaX", "00Nay", "00Nej", "00Nf5", "00Nhl", "00Nih", "00Ns0", "00Nte", "00Nua", "00O14", "00O2z", "00O37", "00O3h", "00O8m", "00O9Z", "00O9a", "00OCQ", "00OKo", "00OOp", "00OPi", "00OPk", "00OQt", "00OR6", "00OXc", "00Ocp", "00Oft", "00Ohu", "00Oim", "00OmS", "00Oo2", "00Oqz", "00Or5", "00Oyf", "00Ozz", "00P6j", "00P7n", "00P81", "00PF3", "00PGi", "00PHg", "00PIO", "00Pbs", "00Pgk", "00Pms", "00Pr6", "00PrK", "00PvX", "00Pw1"
];
function getUser(){
    axiosClient.get('/puzzles')
    .then((res)=>{
        player.value.count = res.data[0].count
        player.value.points = res.data[0].points
    })
    .catch(err=>{
        console.error(err)
    })
}
watch(player.value,()=>{
    getPuzzle()
})
function getPuzzle(){
    axiosClient2.get(`https://lichess.org/api/puzzle/${puzzleData[player.value.count]}`)
    .then(res=>{
        puzzle.value =  res.data.puzzle.solution
        puzzleSol.value =  res.data.puzzle.solution
        solveMoves.value = res.data.puzzle.solution.length
        // res.data.puzzle.solution.forEach(element => {
        //     puzzleSol.value = res.data.game.pgn+" " + element
        // });
        initialPuzzle.value = res.data.game.pgn
        board.value.loadPgn(res.data.game.pgn)
        boardKey++
    })
    .catch(err=>{
        console.error('error in getting the puzzle')
        // alert("reload page please")
    })
}
function nextPuzzle(){
    solveMoves.value = 0
    solveMoves.value = 0 
    player.value.points  =  Number(player.value.points) + 5
    player.value.played.push(puzzleData[player.value.count])
    // console.log
    axiosClient.post('/puzzle-update',{'player':player.value})
    .then((res)=>{
        player.value.count = res.data[0].count
        player.value.points = res.data[0].points
    })
    .catch(err=>{
        console.error(err)
    })
}

</script>