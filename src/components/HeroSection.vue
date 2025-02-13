<script setup>
import { TheChessboard } from 'vue3-chessboard';
import Button from 'primevue/button';
</script>



<template>
    <div>
        <div class="md:flex">
            <div class="md:w-1/2 w-full py-5 flex align-middle my-auto px-5 ">
                <div>
                    <p class="md:text-8xl text-4xl font-serif">Unleash the Ultimate GM in you</p>
                    <p class="font-sans text-xl my-10">Master your chess skills with our advanced programs and training</p>
                    <div class="flex w-fit md:m-0 mx-auto">
                        <router-link to="/challanges">
                          <Button severity="info" class="font-bold mx-2">Start Playing</Button>  
                        </router-link>
                        <router-link to="/puzzles">
                            <Button severity="secondary" class="font-bold mx-2">Learn More</Button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2 w-full m-auto  flex  ">
                <!-- <TheChessboard class="md:w-[80%] w-[60%] mx-auto"/> -->
                 <!-- <div class="bg-red-400 w-20 h-20 m-auto"> -->
                    <TheChessboard class="md:w-3/4 w-1/2 m-auto"></TheChessboard>
                 <!-- </div> -->
            </div>
        </div>
    </div>
</template>