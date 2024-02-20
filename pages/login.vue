<script setup lang="ts">
import { AxiosError } from 'axios';
import { useAuth } from '~~/composables/useAuth';
import { LoginPayload } from '~~/types';
const {login} = useAuth()

definePageMeta({
  layout: "centered",
  middleware:["guest"]
});

async function handleSubmit(payload:LoginPayload,node?:any){

  handleInvalidRequest(async ()=> await login(payload) , node)

  
}


const a = handleInvalidFormSubmit<LoginPayload>(login)


</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="a">
      <FormKit label="Email" name="email" type="email"/>
      <FormKit label="Password" name="password" type="password"/>
    </FormKit>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
