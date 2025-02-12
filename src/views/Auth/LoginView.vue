<script setup>
import axiosClient from '@/axios/axios';
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import {useUserStore} from '@/stores/user'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router/index'
import NavBar from '@/components/NavBar.vue';
import { ProgressSpinner } from 'primevue';
const userStore = useUserStore()
const isLoggingIn = ref(false)
const user = ref({
    'email':null,
    'password':null,
})

const userLogin = ()=>{
   isLoggingIn.value = true
    axiosClient.post('/login',user.value)
    .then((res)=>{
        userStore.setId(res.data.user.id)
        userStore.setFname(res.data.user.fname)
        userStore.setLname(res.data.user.lname)
        userStore.setEmail(res.data.user.email)
        userStore.setCountry(res.data.user.country)
        userStore.setUsername(res.data.user.username)
        userStore.setToken(res.data.token)
        localStorage.setItem('token',res.data.token)
        userStore.setLoggedIn(true)
        sessionStorage.setItem('user',JSON.stringify(userStore.userData))
        sessionStorage.setItem('auth',true)
        router.push('/dashboard')
        isLoggingIn.value = false
    })
    .catch(err=>{
        isLoggingIn.value = false
        console.error(err)
    })
}
</script>

<template>
    <NavBar/>
    <div class="text-center ">
        <h2 class="font-bold text-3xl">Login</h2>
        <p class="mt-4">
            Dont have an account? 
            <router-link to="/register" class="text-blue-500 underline">Register </router-link>
        </p>
    </div>
    <div class="w-full h-screen mx-auto">
        <form class="mx-auto w-fit" @submit.prevent="userLogin">
            <FloatLabel variant="on" class="my-10">
                <InputText required="true" type="email" id="value3" v-model="user.email"  />
                <label for="value3">Email</label>
            </FloatLabel>
            <FloatLabel variant="on" class="my-10">
                <InputText required="true" id="value3" type="password" v-model="user.password"  />
                <label for="value3">Password</label>
            </FloatLabel>
            
            <Button v-if="!isLoggingIn"  type="submit" class="mx-auto" severity="success">L O G I N </Button>
            <Button v-else type="button" class="mx-auto" severity="success">
                L O G I N 
                <ProgressSpinner style="width: 20px; height: 20px" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </Button>
        </form>
    </div>
</template>