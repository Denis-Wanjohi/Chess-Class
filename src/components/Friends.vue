<template>
    <Toast>
      <template #message="slotProps">
          <div class="flex flex-col items-start flex-auto">
              <div class="flex items-center gap-2">
                  <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
                  <span class="font-bold">NEW CHALLANGE ERROR</span>
              </div>
              <div class="font-medium text-lg my-4">You are ftoly playing someone else</div>
              <div class="flex justify-around">
                <Button size="small" class="mx-5" label="Go to game" severity="sucess" @click="onAccept()"></Button>
                <Button size="small" class="mx-5" label="Cancel all games" severity="danger" @click="onDecline()"></Button>
              </div>
          </div>
      </template>
    </Toast>
    <div class="text-center">
        <p class="font-bold text-6xl">Friends</p>
        <p class="my-5">Meet fellow players in the road of unleashing their GM power.</p>
    </div>
    <div class="card w-3/4 mx-auto" >
        <DataTable :value="customers" tableStyle="min-width: 50rem">
            <!-- <Column field="code" header="Code"></Column> -->
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="country" header="Country"></Column>
            <Column field="id" header="Challange">
                <template #body="slotProps">
                    <Button severity="info" class="font-bold" @click.prevent="challange( slotProps.data.id )">Challange</Button>
                </template>
            </Column>
            <!-- <Column field="quantity" header="Quantity"></Column> -->
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column'
import Button from 'primevue/button';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { useFriendsStore } from '@/stores/friends';
import { watch } from 'vue';
import { onBeforeUnmount } from 'vue';
import echo from '@/echo';
import axiosClient from '@/axios/axios';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { useChallengeStore } from '@/stores/challange';
const customers = ref([])
const filters = ref();
const loading = ref(true);
const friendsStore = useFriendsStore()
const gameCode = ref(null)
const toast = useToast();

import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
watch(friendsStore,()=>{
    customers.value = []
    friendsStore.friends.forEach(element => {
        customers.value.push(element)
    });

})  
const CustomerService = {
    getCustomersMedium() {
        let customersData = [
            {
                id: '1000',
                name: 'Bamboo Watch',
                email:'tom@gmail.com',
                country:'Kenya'
            }
        ];
        friendsStore.friends.forEach(element => {
            // console.log(element)
            // customersData.push(element )
        });
        // console.log(customersData)
        // let customerObject = {}
        // if(store.state.admin.rides != null){
        //     store.state.admin.rides.forEach((element)=>{
        //        customerObject = {
        //             id: element.id,
        //             name: element.client.name,
        //             rider: element.rider,
        //             location: element.location,
        //             destination: element.destination,
        //             date: element.date,
        //             time: element.time,
        //         }
        //         customersData.push(customerObject)
        //         customerObject = {}
        //     })
        // }

        return new Promise((resolve) => {
            setTimeout(() => resolve(customersData), 1000);
        });
    }
};

const challange = (value)=>{
    axiosClient.post('/challange',{'id':value}).
    then((res)=>{
        console.log(res.data.message)
        if(res.data.message == 'onPlay'){
            gameCode.value = res.data.game.code
            show()
        }else{
            useChallengeStore().setReceiver({
                'username' : res.data.username,
                'email' : res.data.email,
                'id' : res.data.id,
                'name' : res.data.name,
                'country' : res.data.country,
            })
            useChallengeStore().setCreator({
                'username' : useUserStore().username,
                'email' : useUserStore().email,
                'id' : useUserStore().id,
                'name' :useUserStore().fullName,
                'country' : useUserStore().country,
            })
            useChallengeStore().setCode()
            router.push('/challanges')
        }
    }).catch(err=>{
        alert('error in creating challange')
        console.error(err)
    })
}

const show = () => {
    toast.add({ 
      severity: 'warn', 
    //   summary: 'NEW CHALLANGE', 
    //   detail: 'Click to view the challange', 
      life: 4000 });
};
const onAccept = ()=>{
    router.push(`/play/${gameCode.value}`)
}
const onDecline = ()=>{
    axiosClient.post('/cancel-allgames')
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.error(err)
    })
}
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        rider:{operator:FilterOperator .AND, constraints: [{value:null, matchMode:  FilterMatchMode.STARTS_WITH}]},
        location:{operator:FilterOperator .AND, constraints: [{value:null, matchMode:  FilterMatchMode.STARTS_WITH}]},
        destination:{operator:FilterOperator .AND, constraints:[{value:null, matchMedia: FilterMatchMode.STARTS_WITH}]},
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS}] },
    };
};

initFilters();

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};
const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};

const products = ref({
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    });
    const onlineUsers = ref([]);

// Lifecycle hooks
onMounted(() => {
    console.log(`challange-request.${useUserStore().id}`)
    echo.channel(`challange-request.${useUserStore().id}`).listen('ChallangeRequest', (event) => {
    

  });
});


onBeforeUnmount(() => {
  // Leave the channel when the component is destroyed
//   echo.leave('online-users');
});
</script>