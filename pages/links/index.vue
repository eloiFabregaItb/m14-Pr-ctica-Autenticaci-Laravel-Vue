<script setup lang="ts">
import axios from 'axios';
import {TailwindPagination} from "laravel-vue-pagination";

definePageMeta({
  nuddleware:["auth"]
})

const route = useRoute()

const links = ref([]) // enllaços acortados
const paginationData = ref({})
const isLoading = ref(false)

//filters
const queries = ref({
  page:route.query.page ? Number(route.query.page) : 1,
  full:route.query["filter[full_link]"] as string || "",
  short:route.query["filter[short_link]"] as string || "",
  sort:route.query.sort || "",
})
  

function setParams(){
  const params = new URLSearchParams()
  //amacena las variables de filtro en el
  if(queries.value.page > 1){
    params.set("page",queries.value.page.toString())
  }
  if(queries.value.full !== ""){
    params.set("filter[full_link]",queries.value.full )
  } 

  if(queries.value.short !== ""){
    params.set("filter[short_link]",queries.value.short )
  }

  if(queries.value.sort !== ""){
    params.set("sort",queries.value.sort)
  }


  const paramsStr = params.toString()
  const newURL = window.location.origin + window.location.pathname +(paramsStr ? "?"+ paramsStr:"")
  window.history.pushState({  }, '', newURL);

  return params
}


async function getLinks(){

  const params = setParams()

  try{

    const apiURL = "/links?"+params.toString()
    isLoading.value=true
    const response = await axios.get(apiURL)
    isLoading.value=false

    const data = response.data

    //si el usuario está en una página más adelantada que la nueva última página
    if(data.last_page < queries.value.page){
      queries.value.page = 1
    }

    links.value = data.data
    paginationData.value = data

  }catch(err){
    console.error(err.response.data)
  }
}

watch(queries,getLinks,{deep:true})

getLinks()




</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">


<div v-if="isLoading" role="status" class="mr-5">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>


        <SearchInput v-model="queries.full" />
        <NuxtLink to="/links/create" class="ml-4">
          <IconPlusCircle class="inline" /> Create New
        </NuxtLink>
      </div>
    </nav>

    <div v-if="true">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <TableTh v-model="queries.sort" name="full_link" class="w-[29%]">Full link</TableTh>
            <TableTh v-model="queries.sort" name="short_link" class="w-[29%]">Short link</TableTh>
            <TableTh v-model="queries.sort" name="views" class="w-[16%]">Views</TableTh>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button @click="getLinks" ><IconRefresh /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links">
            <td>
              <a :href="link.full_link" target="_blank">
                {{ link.full_link.replace(/^http(s?):\/\//, "") }}</a
              >
            </td>
            <td>
              <a
                :href="`${useRuntimeConfig().public.appURL}/${link.short_link}`"
                target="_blank"
              >
                {{
                  useRuntimeConfig().public.appURL.replace(
                    /^http(s?):\/\//,
                    ""
                  )
                }}/{{ link.short_link }}
              </a>
            </td>
            <td>{{ link.views }}</td>
            <td>
              <NuxtLink class="no-underline" :to="`/links/${link.id}`"  
                ><iconEdit
              /></NuxtLink>
            </td>
            <td>
              <button><IconTrash /></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="mt-5 flex justify-center">
      
      <TailwindPagination :data="paginationData" @pagination-change-page="queries.page=$event"/>

      </div>
    </div>

    <!-- No links message for when table is empty -->
    <div
      v-else
      class="border-dashed border-gray-500 p-3 border-[1px] text-center"
    >
      <div class="flex justify-center">
        <IconLink />
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No links matching links found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No links created yet
          <NuxtLink to="/links/create" class="text-green-600"
            >Go create your first link!</NuxtLink
          >
        </span>
      </p>
    </div>
  </div>
</template>


