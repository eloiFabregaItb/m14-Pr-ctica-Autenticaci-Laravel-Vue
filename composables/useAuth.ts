import axios from "axios"
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}


export interface User {
  id:number;
  name:string;
  email:string;
  email_verified_at:Date | null;
  two_factor_secret:string | null;
  two_factor_recovery_codes: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}


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
      const user = res.data
  
      const result:User ={
        id: user.id,
        name: user.name,
        email: user.email,
        email_verified_at: user.email_verified_at ? new Date(user.email_verified_at) : null,
        two_factor_secret: user.two_factor_secret || null,
        two_factor_recovery_codes: user.two_factor_secret || null,
        created_at: new Date(user.created_at),
        updated_at: new Date(user.updated_at),
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