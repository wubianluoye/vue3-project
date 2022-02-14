<template>
  <List class="mo">
    <Tabs
      v-model:active="active"
      @change="changeTab"
      sticky
      color="#1989fa"
      title-active-color="#1989fa"
    >
      <Grid :column-num="2" center class="grid" sticky>
        <GridItem>
          <template #default>
            <span class="num">{{ total }}个</span>
            <span class="title">账号数量</span>
          </template>
        </GridItem>
        <GridItem>
          <template #default>
            <span class="num">{{ genTotal }}个</span>
            <span class="title">加密账号</span>
          </template>
        </GridItem>
      </Grid>
      <Tab title="全部" name="all"></Tab>
      <Tab title="重要" name="imp"></Tab>
      <Tab title="游戏" name="game"></Tab>
      <Tab title="加密" name="gen"></Tab>
    </Tabs>
    <div class="list">
      <CellGroup>
        <Cell
          v-for="item in list"
          :key="item.id"
          :label="`id：${item.password}`"
          :title="item.title"
          center
          inset
          border
        >
        </Cell>
      </CellGroup>
    </div>
  </List>
</template>
<script lang="ts" setup>
import { computed, ref, watch, reactive, Ref } from "vue";
import {
  Tab,
  Tabs,
  List,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  TabsInstance,
} from "vant";
import { getList } from "./index";

let list = ref([]);
let total = ref(0);
let genTotal = ref(0);

const active = ref<TabsInstance>();
const changeTab = function (tab: string) {
  glist(tab);
};

function glist(type: string) {
  getList(type).then((res: any) => {
    const { list: l, total: t, gen_total: gt } = res;
    list.value = l;
    total.value = t;
    genTotal.value = gt;
  });
}
</script>
<style scoped lang="scss">
.mo {
  span {
    color: red;
  }
  .grid {
    .num {
      font-size: 20px;
      color: #1989fa;
    }
    .title {
      color: #999;
      font-size: 12px;
    }
  }
  .list {
    height: calc(100vh - 120px);
    padding-bottom: 54px;
    overflow-y: auto;
  }
}
</style>
