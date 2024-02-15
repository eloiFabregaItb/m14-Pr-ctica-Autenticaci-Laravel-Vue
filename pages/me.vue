<template>
  <p><strong>User Name:</strong> {{user.name}}</p>
  <p><strong>User Email:</strong> {{user.email}}</p>
</template>


<script setup>


import { useAuth } from '~~/composables/useAuth'

definePageMeta({
  middleware:["auth"]
})

const {initUser,user} = useAuth()
await initUser()


</script>