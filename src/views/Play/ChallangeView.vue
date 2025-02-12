<script setup>
import NavBar from '@/components/NavBar.vue';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button'
import { useChallengeStore } from '@/stores/challange';
import { onMounted,ref } from 'vue';
import axiosClient from '@/axios/axios';
import router from '@/router';
const challangeStore = useChallengeStore()
const IncomingChallanges = ref([])
const OutgoingChallanges = ref([])

onMounted(()=>{
    axiosClient.post('/active-challanges')
    .then((res)=>{
        console.log(res.data.incoming_challange)
        console.log(res.data.outgoing_challange)

        res.data.incoming_challange.forEach(element=>{
            IncomingChallanges.value.push(element)
        })
        res.data.outgoing_challange.forEach(element=>{
            OutgoingChallanges.value.push(element)
        })
    })
    .catch(err=>{
        console.error(err)
    })
})

const onAccept = (code,challanger_id)=>{
    axiosClient.post(`/challenge-accepted/${code}`,{'user':challanger_id})
    .then(()=>{
        router.push(`/play/${code}`)
    })
  .catch(err=>console.error(err))
    // router.push(`/play/${code}`)
}
const onDecline = (code)=>{
    // router.push(`/play/${code}`)
    axiosClient.post(`/cancel-challenge/${code}`)
    .then((res)=>{
        console.log(res.data)
        alert("success")
        router.push('/')
    })
    .catch(err=>{
        console.error(err)
        alert('error in canceling the challenge')
    })
}
</script>

<template>

    <NavBar/>
    <div class="w-screen flex justify-center py-10">
        <Fieldset legend="Outgoing Challange" class="w-3/4 my-10 mx-auto" style="background-color: #48A6A7;"
        v-if="challangeStore.creator != null"
        >
            <div class="flex justify-evenly font-sans font-bol">
                <div class="text-lg font-bold">{{challangeStore.creator.username}}</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.839 20.696l-3.06-3.054l-2.2 2.2l-.277-.276q-.46-.46-.46-1.137t.46-1.137l4.09-4.09q.46-.46 1.137-.46t1.137.46l.276.277l-2.2 2.2l3.054 3.06q.243.242.243.565t-.243.565l-.827.827q-.242.242-.565.242t-.565-.242M21 5.477L9.958 16.538l.74.735q.46.46.46 1.137t-.46 1.136l-.277.277l-2.2-2.2l-3.06 3.054q-.242.242-.565.242t-.565-.242l-.827-.827q-.242-.242-.242-.565t.242-.566l3.054-3.06l-2.2-2.2l.277-.276q.46-.46 1.136-.46q.677 0 1.137.46l.754.76L18.423 2.9H21zM8.35 9.425l.58-.594l.576-.6l-.575.6zm-.708.714L3 5.477V2.9h2.577L10.2 7.542l-.694.689L5.175 3.9H4v1.175l4.35 4.35zm1.608 5.686L20 5.075V3.9h-1.175L8.075 14.65zm0 0l-.58-.594l-.595-.581l.594.58z"/></svg>
                </div>
                <div class="text-lg font-bold">{{challangeStore.receiver.username}}</div>
            </div>
            <div class="text-sm text-center my-5">waiting for player to respond. . .</div>
            <div class="flex  justify-center">
                <Button severity="danger" >C A N C E L</Button>
            </div>
            
        </Fieldset>
    </div>
    <div class="w-screen flex justify-center py-10"
        v-for="challange in IncomingChallanges"
    >
        <Fieldset legend="Incoming Challange" class="w-3/4 my-10 mx-auto" style="background-color: #48A6A7;">
            <div class="flex justify-evenly font-sans font-bold">
                <div>{{challange.challanger_username}}</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.839 20.696l-3.06-3.054l-2.2 2.2l-.277-.276q-.46-.46-.46-1.137t.46-1.137l4.09-4.09q.46-.46 1.137-.46t1.137.46l.276.277l-2.2 2.2l3.054 3.06q.243.242.243.565t-.243.565l-.827.827q-.242.242-.565.242t-.565-.242M21 5.477L9.958 16.538l.74.735q.46.46.46 1.137t-.46 1.136l-.277.277l-2.2-2.2l-3.06 3.054q-.242.242-.565.242t-.565-.242l-.827-.827q-.242-.242-.242-.565t.242-.566l3.054-3.06l-2.2-2.2l.277-.276q.46-.46 1.136-.46q.677 0 1.137.46l.754.76L18.423 2.9H21zM8.35 9.425l.58-.594l.576-.6l-.575.6zm-.708.714L3 5.477V2.9h2.577L10.2 7.542l-.694.689L5.175 3.9H4v1.175l4.35 4.35zm1.608 5.686L20 5.075V3.9h-1.175L8.075 14.65zm0 0l-.58-.594l-.595-.581l.594.58z"/></svg>
                </div>
                <div>{{challange.receiver_username}}</div>
            </div>
            {{challange.code}}
            <div class="flex  justify-center my-5">
                <Button severity="success" class="mx-5 font-bold" @click="onAccept(challange.code,challange.challanger_id)" >A C C E P T</Button>
                <Button severity="danger"class="mx-5 font-bold" @click="onDecline(challange.code)" >C A N C E L</Button>
            </div>
            
        </Fieldset>
    </div>

    <div class="w-screen flex justify-center py-10"
        v-for="challange in OutgoingChallanges"
    >
        <Fieldset legend="Outgoing Challange" class="w-3/4 my-10 mx-auto" style="background-color: #48A6A7;">
            <div class="flex justify-evenly font-sans font-bold">
                <div>{{challange.challanger_username}}</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18.839 20.696l-3.06-3.054l-2.2 2.2l-.277-.276q-.46-.46-.46-1.137t.46-1.137l4.09-4.09q.46-.46 1.137-.46t1.137.46l.276.277l-2.2 2.2l3.054 3.06q.243.242.243.565t-.243.565l-.827.827q-.242.242-.565.242t-.565-.242M21 5.477L9.958 16.538l.74.735q.46.46.46 1.137t-.46 1.136l-.277.277l-2.2-2.2l-3.06 3.054q-.242.242-.565.242t-.565-.242l-.827-.827q-.242-.242-.242-.565t.242-.566l3.054-3.06l-2.2-2.2l.277-.276q.46-.46 1.136-.46q.677 0 1.137.46l.754.76L18.423 2.9H21zM8.35 9.425l.58-.594l.576-.6l-.575.6zm-.708.714L3 5.477V2.9h2.577L10.2 7.542l-.694.689L5.175 3.9H4v1.175l4.35 4.35zm1.608 5.686L20 5.075V3.9h-1.175L8.075 14.65zm0 0l-.58-.594l-.595-.581l.594.58z"/></svg>
                </div>
                <div>{{challange.receiver_username}}</div>
            </div>
            <!-- {{ challange }} -->
            <div class="flex  justify-center my-5">
                <Button severity="success" class="mx-5 font-bold" @click="onAccept(challange.code)" >P L A Y</Button>
                <Button severity="danger"class="mx-5 font-bold" @click="onDecline(challange.code)">C A N C E L</Button>
            </div>
            
        </Fieldset>
    </div>

    <div class="bg-slate-200 rounded-xl w-1/2 h-fit py-10 mx-auto text-center" v-if="OutgoingChallanges.length == 0 && IncomingChallanges.length == 0">
        <p class="font-bold ">NO ACTIVE CHALLANGE</p>
        <p class="font-mono">go to <router-link to="/community" class="text-blue-400">community</router-link> page to create a challange</p>
    </div>

</template>