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
  page: 1,
  "filter[full_link]": "",
  sort: "",
  ...route.query
})
  
const {data,index:getLinks} = useLinks({queries})

console.log("DATA",data.value)



// watch(queries,getLinks,{deep:true})
watch(queries,
()=>useRouter().push({query:queries.value}),
{deep:true})






</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center"> 
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
            <td :title="`created ${useTimeAgo(link.created_at)}`">
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


