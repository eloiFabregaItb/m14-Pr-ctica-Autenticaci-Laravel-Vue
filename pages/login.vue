<script setup lang="ts">
import axios from 'axios';

const router = useRouter()
const {login} = useAuth()

definePageMeta({
  layout: "centered",
  middleware:["guest"]
});

interface formData {
  email: string;
  password: string;
}

const form = ref<formData>({
  email:"",
  password:"",
})

const errors = ref<formData>({
  email:"",
  password:"",
})

watch(form.value,()=>{
  errors.value.email=""
  errors.value.password=""
})

async function handleSubmit(){
  let someErr = false
  if(form.value.email.length<=0){
    errors.value.email = "Campo obligatorio"
    someErr = true
  }
  if(form.value.password.length<=0){
    errors.value.password = "Campo obligatorio"
    someErr = true
  }
  if(someErr) return


  const payload = {
    email:form.value.email,
    password:form.value.password,
  }
  try{

    await login(payload)
    // await axios.post("/login",payload)
    // router.push('/me')

  
  }catch(error){
    errors.value.password = error?.response?.message || "Contraseña incorrecta"
  }

  
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        <div>Email</div>
        <input v-model="form.email" type="text" />
        <span class="error" v-if="errors.email">{{ errors.email  }}</span>
      </label>

      <label>
        <div>Password</div>
        <input v-model="form.password" type="password" />
        <span class="error" v-if="errors.password">{{ errors.password}}</span>
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
