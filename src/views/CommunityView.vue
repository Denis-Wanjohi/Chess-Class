<script setup>
import NavBar from '@/components/NavBar.vue';
import Friends from '@/components/Friends.vue'
import axiosClient from '@/axios/axios.js'
import { onMounted } from 'vue';
import { useFriendsStore } from '@/stores/friends';
import { useUserStore } from '@/stores/user';
onMounted(()=>{
    useFriendsStore().friends = []
    axiosClient.get('/players')
    .then((res)=>{       
        res.data.forEach(element => {
            useFriendsStore().addFriend(element)
        });
    })
    .catch(err=>{
        console.error(err)
        alert("reload page")
    })
})
</script>


<template>
    <NavBar/>
    <Friends/>
</template>