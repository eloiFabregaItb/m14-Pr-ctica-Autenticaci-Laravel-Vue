import { useAuth } from "~~/composables/useAuth"

const {initUser,user} = useAuth()

export default defineNuxtRouteMiddleware(async (to, from) => {
  await initUser()
  if(!user.value){
    return navigateTo("/login")
  }
})