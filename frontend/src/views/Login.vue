<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const email = ref('');
const password = ref('');
</script>

<template>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div class="w-full bg-surface-0 dark:bg-surface-900 py-12 px-8 sm:px-12 rounded-3xl">
                <div class="text-center mb-8">
                    <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to DeskNode!</div>
                    <span class="text-muted-color font-medium">Sign in to continue</span>
                </div>
                <div>
                    <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                    <InputText id="email" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-6" v-model="email" />

                    <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                    <Password id="password" v-model="password" placeholder="Password" :toggleMask="true" class="mb-8" fluid :feedback="false"></Password>

                    <Button label="Sign In" class="w-full" as="router-link" to="/"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
