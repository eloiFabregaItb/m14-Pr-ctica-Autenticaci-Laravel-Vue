<template>
  <h1>Update Link</h1>
  <GoBack>or go back to links</GoBack>
  <FormKit type="form" submit-label="Update Link">
    <FormKit type="text" name="short_url" label="Short Link"/>
    <FormKit type="url" name="full_link" label="Full Link"/>
  </FormKit>
</template>

<script setup>
definePageMeta({
  middleware:["auth"]
})
</script>