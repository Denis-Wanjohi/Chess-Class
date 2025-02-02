<script setup>
import SetPuzzle from '@/components/puzzles/SetPuzzle.vue'
</script>

<template>
    <!-- STEP 1 -->
    <div class="w-3/4 border mx-auto text-center py-4">
        <p>SET PUZZLES</p>
        <p>Set a puzzle with :</p>
        <div class="flex justify-around py-2">
            <div class="border cursor-pointer font-bold px-3 py-2 rounded-md ">1 solution</div>
            <div class="border cursor-pointer font-bold px-3 py-2 rounded-md ">2 solution</div>
            <div class="border cursor-pointer font-bold px-3 py-2 rounded-md ">3 solution</div>
        </div>
    </div>
    <!-- STEP 2 -->
    <SetPuzzle/>

    <!-- STEP 3 -->
</template>