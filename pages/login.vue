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

  try{

    await login(payload)
  
  }catch(error){
    if(error instanceof AxiosError && error.response?.status===422){ 
      node?.setErrors([],error.response.data.errors)
    }
  }

  
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="handleSubmit">
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
