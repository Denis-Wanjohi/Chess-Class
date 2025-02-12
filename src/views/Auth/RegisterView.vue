<script setup>
import axiosClient from '@/axios/axios';
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import {useUserStore} from '@/stores/user'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router/index'
import NavBar from '@/components/NavBar.vue'
const userStore = useUserStore()
const isLoggingIn = ref(false)
const user = ref({
    'fname':null,
    'lname':null,
    'username':null,
    'email':null,
    'country':null,
    'password':null,
    'password_confirmation':null
})

const userRegister = ()=>{
    isLoggingIn.value = true
    if (user.value.password !== user.value.password_confirmation) {
        alert('Passwords do not match');
        return;
    }
    axiosClient.post('/register',user.value)
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
        console.error(err)
        isLoggingIn.value = false
    })
}
</script>

<template>
    <NavBar/>
    <div class="text-center ">
        <h2 class="font-bold text-3xl">Register</h2>
        <p class="mt-4">
            Already have an account? 
            <router-link to="/login" class="text-blue-500 underline">Login </router-link>
        </p>
    </div>
    <div class="w-full h-[60vh] sm:mt-5 m-auto flex align-middle">
        <form class="m-auto  border bg-blue-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="userRegister">
            <FloatLabel variant="on">
                <InputText required="true" class="w-full" id="fname" v-model="user.fname" />
                <label for="fname">Firstname</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText required="true" class="w-full" id="lname" v-model="user.lname" />
                <label for="lname">Lastname</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText required="true" type="email" class="w-full" id="email" v-model="user.email" />
                <label for="email">Email</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText required="true" class="w-full" id="username" v-model="user.username" />
                <label for="username">Username</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText required="true" class="w-full" id="country" v-model="user.country" />
                <label for="country">Country</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText required="true" type="password" class="w-full" id="password" v-model="user.password" />
                <label for="password">Password</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <InputText required="true" type="password" class="w-full" id="password_confirmation" v-model="user.password_confirmation" />
                <label for="password_confirmation">Confirm Password</label>
            </FloatLabel>
            <div class="md:col-span-2 flex justify-center">
                <Button v-if="!isLoggingIn"  type="submit" class="mx-auto" severity="success">R E G I S T E R</Button>
                <Button v-else type="button" class="mx-auto" severity="success">
                    R E G I S T E R
                <ProgressSpinner style="width: 20px; height: 20px" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </Button>
            </div>
        </form>
    </div>
</template>