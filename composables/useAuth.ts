import axios, { AxiosError } from "axios"

import { LoginPayload, RegisterPayload, User } from "~~/types";


const user = ref<null | User>(null)

export const useAuth = () => {
  const router = useRouter()


  async function login(payload: LoginPayload) {
    await axios.post("/login", payload)
    router.push("/me")
  }

  async function register(payload: RegisterPayload) {
    await axios.post("/register", payload)
    router.push("/me")   
  }

  async function logout() {
    try {
      user.value = null  
      await axios.post("/logout")
    } catch {

    } finally {
      router.replace("/login")
    }
  }

  async function getUser(): Promise<User | null>{
    if(user.value) return user.value
    try{
      const res = await axios.get("/user")
      console.log("NEW USER",res.data)
      const u = res.data
      user.value = u
  
      const result:User ={
        id: u.id,
        name: u.name,
        email: u.email,
        email_verified_at: u.email_verified_at ? new Date(u.email_verified_at) : null,
        two_factor_secret: u.two_factor_secret || null,
        two_factor_recovery_codes: u.two_factor_secret || null,
        created_at: new Date(u.created_at),
        updated_at: new Date(u.updated_at),
      }

      return result

    }catch(err){
      return null
    }
  }

  async function initUser(){
    const userApi = await getUser()
    user.value = userApi // reactive
    return userApi
  }

  return { login, register, logout, initUser, getUser, user }
}