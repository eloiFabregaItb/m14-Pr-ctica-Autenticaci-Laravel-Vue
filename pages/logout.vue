<template>
  <div>Logging Out...</div>
</template>


<script setup>
import axios from 'axios';

const router = useRouter()

try{
  await axios.get("/logout")
}catch{

}finally{
  router.replace("/login")
}
</script>
