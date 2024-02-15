<template>
  <div>Logging Out...</div>
</template>


<script setup>

import { useAuth } from '~~/composables/useAuth';
const {logout} = useAuth()

logout()

</script>
