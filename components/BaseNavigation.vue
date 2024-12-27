<script setup>
import WhiteKnight from './WhiteKnight.vue';

const Navigations  = ref([
    {
        name:'H O M E',
        link:'/',
    },
    {
        name:'P U Z Z L E S',
        link:'/puzzles'
    }
])
</script>
<template>
    <div class="w-1/4 bg-blue-400 pt-10">
        <div class="flex w-3/4 mx-auto">
            <WhiteKnight/>
            <p class="font-bold font sans text-3xl">CHESS</p>
            <WhiteKnight/>
        </div>
        <div class="text-center font-mono text-sm">Level up your skills....</div>
    
        <div>
            <div class="w-3/4 mx-auto ">
                <div class="font-bold text-center cursor-pointer hover:bg-blue-800 text-lg rounded  py-3"  v-for="nav in Navigations">
                    <Router-link :to=nav.link class="">{{nav.name}}</Router-link>
                </div>
            </div>
        </div>
    </div>
</template>