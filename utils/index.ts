import {FormKitNode} from "@formkit/core"

import {AxiosError} from "axios"



export function handleInvalidFormSubmit<T>(call:Function){

  return async function(payload:T,node:FormKitNode){
    try{
      await call(payload)
    }catch(err){
      if(err instanceof AxiosError && err.response?.status === 422){
        node?.setErrors([],err.response.data?.errors || {})
      }    
    }
  } 
  
}




export async function handleInvalidRequest(call: Function, node?: FormKitNode) {

  try{
    await call()
  }catch(err){
    handleInvalidForm(err,node)
  }

}

export function handleInvalidForm(err:any,node?:FormKitNode){
  if(err instanceof AxiosError && err.response?.status === 422){
      node?.setErrors([],err.response.data?.errors || {})
  }
}