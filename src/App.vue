<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from './stores/user';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
import { useToast } from "primevue/usetoast";
import Button  from 'primevue/button';
import Toast from 'primevue/toast';
import echo from './echo';
import { watch } from 'vue';
import { ref } from 'vue';
import router from './router';
import axiosClient from './axios/axios';
const userStore = useUserStore()
const toast = useToast();
const challanger_name = ref() 
const challanger_id = ref()
const code = ref(null)
const show = () => {
    toast.add({ 
      severity: 'info', 
      summary: 'NEW CHALLANGE', 
      detail: 'Click to view the challange', 
      life: 7000 });
};
onMounted(() => {
    echo.channel(`challange-request.${useUserStore().id}`).listen('ChallangeRequest', (event) => {
      console.log(event)
      code.value  = event.code.code
    });

    echo.channel(`challange-acceppted.${useUserStore().id}`).listen('ChallangeAccept',(event)=>{
      router.push(`/play/${event.code}`)
    });
  watch(userStore,()=>{
      echo.channel(`challange-request.${useUserStore().id}`).listen('ChallangeRequest', (event) => {
            console.log(event)
            code.value  = event.code.code
            challanger_name.value = event.challenger.username
            challanger_id.value = event.challenger.id
            show()
      });
      echo.channel(`challange-accepted.${useUserStore().id}`).listen('ChallangeAccept',(event)=>{
        
        router.push(`/play/${event.code}`)
      });
    });
});


onBeforeUnmount(() => {
  // Leave the channel when the component is destroyed
//   echo.leave('online-users');
});

const onAccept = ()=>{
  axiosClient.post(`/challenge-accepted/${code.value}`,{'user':challanger_id.value})
  .then(()=>{
    router.push(`/play/${code.value}`)
  })
  .catch(err=>console.error(err))
  
}
</script>

<template>
    <Toast>
      <template #message="slotProps">
          <div class="flex flex-col items-start flex-auto">
              <div class="flex items-center gap-2">
                  <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
                  <span class="font-bold">NEW CHALLANGE</span>
              </div>
              <div class="font-medium text-lg my-4">Play against {{ challanger_name }}</div>
              <div class="flex justify-around">
                <Button size="small" class="mx-5" label="A C C E P T" severity="sucess" @click="onAccept()"></Button>
                <Button size="small" class="mx-5" label="D E C L I N E" severity="danger" @click="onDecline()"></Button>
              </div>
          </div>
      </template>
    </Toast>
  <!-- <Button @click="show"></Button>pla -->
    <div>
      <RouterView />
    </div>
  
</template>
