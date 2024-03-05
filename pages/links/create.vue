<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>
  <FormKit type="form" submit-label="Create Link" @submit="createLink">
    <FormKit type="url" label="Link" name="full_link" />

  </FormKit>

</template>


<script setup lang="ts">
import {FormKitNode} from "@formkit/core"
import { nanoid } from 'nanoid'
import axios from "axios"
import {handleInvalidForm} from "../../utils/index"
import { LoginPayload } from "~~/types"

definePageMeta({
  middleware:["auth"]
})



async function createLink(payload: LoginPayload, node?:FormKitNode){
  console.log("create")
  try{
    await axios.post("/links",{
      ...payload,
      short_link: nanoid(8) 
    })
    useRouter().push("/links")
  }catch(err){
    console.error(err)
    handleInvalidForm(err,node)
  }
  
}


</script>