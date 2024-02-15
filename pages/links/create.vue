<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>
  <FormKit type="form" submit-label="Create Link">
    <FormKit type="url" label="Link" name="full_link" />

  </FormKit>
  <form>
    <label>
      <div>Link</div>
      <input type="text" name="full_link" />
    </label>
    <button class="btn">Create Link</button>
  </form>
</template>

<script setup>
definePageMeta({
  middleware:["auth"]
})

</script>