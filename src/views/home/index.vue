<template>
  <List>
    <CellGroup>
      <Cell class="avat-cell">
        <template #value>
          <VantImage width="60" height="60" round :src="avat" />
          <p class="title">{{ username }}</p>
        </template>
      </Cell>
      <Cell clickable>修改账号</Cell>
      <Cell clickable>关于</Cell>
      <Cell clickable @click="logout">退出登录</Cell>
    </CellGroup>
  </List>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import {
  List,
  Cell,
  CellGroup,
  Toast,
  Image as VantImage,
  Lazyload,
} from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const avat = computed(() => store.state.avat);
const username = computed(() => store.state.user);

const logout = function () {
  store.commit("LOGOUT_STORE");
  Toast.success("退出成功");
  router.push("/login");
};
</script>
<style scoped lang="scss">
.avat-cell {
  :deep(.van-cell__value) {
    text-align: center;
  }
  .title {
    margin-top: 0;
    font-size: 16px;
  }
}
</style>
