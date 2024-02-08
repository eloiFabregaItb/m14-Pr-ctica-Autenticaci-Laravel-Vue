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

}

export async function getUser(): Promise<User | null>{
  try{
    const res = await axios.get("/user")
    const user = res.data

    return {
      ...user,
      created_at:new Date(user.created_at),
      updated_at:new Date(user.updated_at),
      email_verified_at: user.email_verified_at
        ? new Date(user.email_verified_at) : null
      ,
      two_factor_confirmed_at: user.two_factor_confirmed_at
        ? new Date(user.two_factor_confirmed_at) : null
      ,
    }
  }catch(err){
    return null
  }
}

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
      await axios.post("/logout")
    } catch {

    } finally {
      router.replace("/login")
    }
  }

  return { login, register, logout }
}