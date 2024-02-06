import axios from "axios";

export default defineNuxtPlugin(async (nuxtApp) => {
    //l'URL base
    const config = useRuntimeConfig()
 axios.defaults.baseURL = config.public.appURL+"/api";
 axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
 axios.defaults.headers.common["Content-Type"] = "application/json";
 axios.defaults.headers.common["Accept"] = "application/json";
 //enviem les cookies amb la petició
 axios.defaults.withCredentials = true;
 axios.defaults.withXSRFToken = true;

 await axios.get("/sanctum/csrf-cookie", {
    baseURL:config.public.appURL
  });
 });
