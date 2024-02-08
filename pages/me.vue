<template>
  <p><strong>User Name:</strong> {{name}}</p>
  <p><strong>User Email:</strong> {{email}}</p>
</template>


<script setup>

import axios from "axios"
definePageMeta({
  middleware:["auth"]
})

const email = ref("")
const name = ref("")
async function fetchData(){
  const response = await axios.get("/user")
  email.value = response.data.email
  name.value = response.data.name


}

fetchData()


</script>