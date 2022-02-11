<template>
  <List>
    <CellGroup>
      <Cell clickable>修改账号</Cell>
      <Cell clickable>关于</Cell>
      <Cell clickable @click="logout">退出登录</Cell>
    </CellGroup>
  </List>
</template>
<script lang="ts" setup>
import { computed, ref, watch,Ref, reactive } from 'vue'
import { List, Cell, CellGroup, Toast } from 'vant'
import { useRouter } from "vue-router";
const router = useRouter()

const logout = function() {
  localStorage.removeItem('token')
  Toast.success('退出成功')
  router.push('/login')
}
</script>
<style scoped lang="scss">
  .mo{
    width: 100px;
    font-size: 14px;
    span{
      color: red;
    }
  }
</style>