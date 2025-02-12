<script setup>
import axiosClient from '@/axios/axios';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import ProgressSpinner from 'primevue/progressspinner';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const visible = ref(false)
const userStore = useUserStore();
const isLoggingOut = ref(false)
const logout = ()=>{
    isLoggingOut.value = true
    axiosClient.post('/logout')
    .then(()=>{
        isLoggingOut.value = false
    
        userStore.logout();             
        router.push('/login');
    }).catch(err=>{
        isLoggingOut.value = false
        console.err(err)
        alert("error in logging out...")
    })
}
</script>



<template>
    <nav class="bg-gray-800 p-4 flex  justify-between items-center">
        <RouterLink to="/" class="text-white md:text-4xl text-2xl">Ultimate Chess</RouterLink>
        <div v-if="useRoute().name == 'login' || useRoute().name == 'register'">
            <!-- {{useRoute().name}} -->
        </div>
        <div v-else class="flex justify-around items-center">
            <div class="hidden lg:block">
                <ul class="flex space-x-4 text-md  mr-40">
                    <li><router-link to="/play" class="px-5 py-2 hover:bg-slate-700 rounded  text-white">Play</router-link></li>
                    <li><router-link to="/learn" class="px-5 py-2 rounded hover:bg-slate-700   text-white">Learn</router-link></li>
                    <li><router-link to="/community" class="px-5 py-2 rounded hover:bg-slate-700   text-white">Community</router-link></li>
                    <li><router-link to="/challanges" class="px-5 py-2 rounded hover:bg-slate-700   text-white">Challenges</router-link></li>
                    <li><router-link to="/puzzles" class="px-5 py-2 rounded hover:bg-slate-700   text-white">Puzzles</router-link></li>
                    <li><router-link to="/chess" class="px-5 py-2 rounded hover:bg-slate-700   text-white">Chess</router-link></li>
                </ul>
            </div>
            <div v-if="!useUserStore().loggedIn">
                <div class="flex w-fit hidden md:block" >
                    <Button severity="info" @click="()=>{router.push('/login')}" class="font-bold mx-2">L O G I N</Button>
                    <Button severity="secondary"  @click="()=>{router.push('/register')}" class="font-bold mx-2">R E G I S T E R</Button>
                </div>
                <div class="flex w-fit md:hidden" v-if="!useUserStore().loggedIn">
                    <Button severity="info" @click="()=>{router.push('/login')}" class="font-bold mx-2">L O G I N</Button>
                    <!-- <Button severity="secondary"  @click="()=>{router.push('/register')}" class="font-bold mx-2">R E G I S T E R</Button> -->
                </div>
            </div>
            
            <!-- <div>
                <Button severity="secondary" class="font-bold mx-5">{{ useUserStore().username }}</Button>
                <Button severity="secondary" class="font-bold mx-5">{{ useUserStore().username }}</Button>
            </div> -->
            <div class="block md:hidden"  v-else >
                <Button severity="secondary" @click="visible = true"  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="18" height="2" x="3" y="11" fill="currentColor" rx=".95" ry=".95"/><rect width="18" height="2" x="3" y="16" fill="currentColor" rx=".95" ry=".95"/><rect width="18" height="2" x="3" y="6" fill="currentColor" rx=".95" ry=".95"/></svg>
                </Button> 
            </div>
            

            <!-- <Button severity="secondary" v-else class="font-bold mx-5" @click="logout">Logout</Button> -->
        </div>
        
    </nav>
    <Drawer v-model:visible="visible">
        <template #header>
            <div class="flex items-center gap-2">
                <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
                <span class="font-bold">{{userStore.fullName}}</span>
            </div>
        </template>
        <div class="my-4 ">
            <router-link to="/play" class="font-bold hover:bg-slate-300 px-10 py-2 rounded  text-xl">Play</router-link>
        </div>
        <div class="my-4 ">
            <router-link to="/learn" class="font-bold hover:bg-slate-300 px-10 py-2 rounded  text-xl">Learn</router-link>
        </div>
        <div class="my-4 ">
            <router-link to="/community" class="font-bold hover:bg-slate-300 px-10 py-2 rounded  text-xl">Community</router-link>
        </div>
        <div class="my-4 ">
            <router-link to="/challanges" class="font-bold hover:bg-slate-300 px-10 py-2 rounded  text-xl">Challenges</router-link>
        </div>
        <div class="my-4 ">
            <router-link to="/puzzles" class="font-bold hover:bg-slate-300 px-10 py-2 rounded  text-xl">Puzzles</router-link>
        </div>
        
        <template #footer>
            <div class="flex items-center gap-2">
                <Button label="Account" icon="pi pi-user" class="flex-auto" outlined></Button>
                <Button v-if="!isLoggingOut" label="Logout" icon="pi pi-sign-out" class="flex-auto" outlined severity="danger" @click="logout" text></Button>
                <Button v-else class="flex-auto font-bold" severity="danger" outlined>
                    Logout
                    <ProgressSpinner style="width: 20px; height: 20px" strokeWidth="8" fill="transparent"
                    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                
                </Button>
            </div>
        </template>
    </Drawer>
</template>