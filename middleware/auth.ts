const {initUser,user} = useAuth()

export default defineNuxtRouteMiddleware(async (to, from) => {
  await initUser()
  if(!user){
    return navigateTo("/login")
  }
})