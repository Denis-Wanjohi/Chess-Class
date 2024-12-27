<script setup>
import SetPuzzle from '~/components/SetPuzzle.vue';

const  puzzle = ref(0)
</script>

<template>
    <div class="w-full  text-xl">
        <div class="flex font-bold justify-around border">
            <div @click="puzzle = 0">set puzzle</div>
            <div @click="puzzle = 1">play puzzle</div>
        </div>
        <div v-if="puzzle === 0">
            <div class="text-center">SET PUZZLE</div>
            <SetPuzzle/>
        </div>
        <div v-if="puzzle === 1">

        </div>
    </div>
</template>