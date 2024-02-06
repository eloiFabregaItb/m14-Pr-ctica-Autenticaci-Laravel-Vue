<script setup lang="ts">
import {watch,ref} from "vue"
import axios from "axios"

interface formData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const form = ref<formData>({
  name:"",
  email:"",
  password:"",
  password2:"",
})

const errors = ref<formData>({
  name:"",
  email:"",
  password:"",
  password2:"",
})

definePageMeta({
  layout: "centered",
});

watch(form.value,()=>{
  errors.value.name=""
  errors.value.email=""
  errors.value.password=""
  errors.value.password2=""
})


async function handleSubmit(){
  let someErr = false
  if(form.value.name.length<=0){
    errors.value.name = "Campo obligatorio"
    someErr = true
  }
  if(form.value.email.length<=0){
    errors.value.email = "Campo obligatorio"
    someErr = true
  }
  if(form.value.password.length<=0){
    errors.value.password = "Campo obligatorio"
    someErr = true
  }
  
  if(form.value.password !== form.value.password2){
    errors.value.password2 = "No coinciden"
    someErr = true
  }
  if(someErr) return


  const payload = {
    email:form.value.email,
    name:form.value.name,
    password:form.value.password,
    password_confirmation:form.value.password,
  }
  try{

    const response = await axios.post("/register",payload)
    console.log(response.data)
  }catch(err){
    const data = err.response.data
    if(data.message){
      alert(data.message)
    }
  }
  
}

</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        <div >Name</div>
        <input v-model="form.name" type="text" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
        
      </label>

      <label>
        <div>Email</div>
        <input v-model="form.email" type="email" />
        <span class="error" v-if="errors.email">{{ errors.email  }}</span>
        
        
      </label>

      <label>
        <div>Password</div>
        <input v-model="form.password" type="password" />
        <span class="error" v-if="errors.password">{{ errors.password}}</span>
        
        
      </label>

      <label>
        <div>Confirm Password</div>
        <input v-model="form.password2" type="password" />
        <span class="error" v-if="errors.password2">{{ errors.password2}}</span>
        
        
      </label>

      <button class="btn">Register</button>
    </form>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>


<style>
  .error{
    color: #a00;
  }
</style>