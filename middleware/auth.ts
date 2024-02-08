import axios, { AxiosError } from "axios"
import {reactive} from "vue"

export default defineNuxtRouteMiddleware(async (to, from) => {


  const user = reactive({})

  try{
    await axios.get("/user")
  } catch(error){
    if(error instanceof AxiosError && error.response?.status === 401){
      return navigateTo("/login")
    }
  }


})
  