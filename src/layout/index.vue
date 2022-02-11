<template>
  <div class="content">
    <router-view />
    <Tabbar v-model="active">
      <TabbarItem 
      v-for="item in tabs" 
      :key="item.path" 
      :to="item.path" 
      :name="item.name"
      >
        {{item.meta.title}}
      </TabbarItem>
    </Tabbar>
  </div>
</template>
<script setup>
  import { computed, ref } from 'vue';
  import { Tabbar, TabbarItem } from 'vant';
  import { useRoute,useRouter } from "vue-router";


  const router = useRouter()
  const route = useRoute()

  // 下方tab数组
  let tabs = computed(()=>router.getRoutes().filter(item=> item.meta.isTabBar))

  // 高亮tab
  const active = ref(route.name)
  
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    height: 100%;
  }
</style>