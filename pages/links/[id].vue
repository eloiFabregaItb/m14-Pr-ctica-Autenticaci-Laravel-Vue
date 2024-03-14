<template>
  <h1>Update Link</h1>
  <GoBack>or go back to links</GoBack>
  <FormKit type="form" submit-label="Update Link" @submit="handleUpdate">
    <FormKit v-model="short" type="text" name="short_link" label="Short Link"/>
    <FormKit v-model="long" type="url" name="full_link" label="Full Link"/>
  </FormKit>
</template>

<script setup lang="ts">


const {find,update} = useLinks()
const data = await find(useRoute().params.id)
console.log(data)

const short = ref(data.short_link)
const long = ref(data.full_link)

definePageMeta({
  middleware:["auth"]
})


async function handleUpdate(payload:Partial<Link>, node?:any){
  try{
    await update(Number(useRoute().params.id),payload)

    useRouter().push("/links")
  }catch(err){
    handleInvalidForm(err,node)
  }
}
</script>