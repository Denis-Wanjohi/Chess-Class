<script setup>
import BaseNavigation from '@/components/BaseNavigation.vue';
</script>

<template>
    <div class="flex w-screen h-screen">
        <BaseNavigation></BaseNavigation>
        <slot></slot>
    </div>
</template>