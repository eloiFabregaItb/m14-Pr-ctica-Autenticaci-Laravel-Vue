<script setup lang="ts">
import axios from 'axios';
import {TailwindPagination} from "laravel-vue-pagination";

definePageMeta({
  nuddleware:["auth"]
})

const route = useRoute()

const links = ref([]) // enllaços acortados
const paginationData = ref({})

//filters
const queries = ref({
  page:route.query.page ? Number(route.query.page) : 1,
  full:route.query["filter[full_link]"] as string || "",
  short:route.query["filter[short_link]"] as string || "",
  sort:route.query.sort || ""
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
    const response = await axios.get(apiURL)

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
        <SearchInput v-model="queries.filter" />
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


