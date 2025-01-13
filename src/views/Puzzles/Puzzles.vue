<script setup>
import DefaultLayout from '@/layouts/default.vue';
</script>

<template>
    <DefaultLayout>
        <div class="w-full bg-slate-300">
            <div class="flex w-full font-bold" >
                <RouterLink to="/set-puzzle" class="py-5 h-fit mx-auto px-3 rounded border">set puzzle</RouterLink >
                <RouterLink to="/play-puzzles" class="py-5 px-3 h-fit mx-auto rounded border">play puzzle</RouterLink>
            </div>
            <RouterView  v-if="$route.path != 'puzzles'"></RouterView>
        </div>
    </DefaultLayout>

</template>