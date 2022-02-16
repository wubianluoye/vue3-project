<template>
  <div class="mo">
    <div class="tab van-hairline--bottom">
      <Tabs
        v-model:active="active"
        @change="changeTab"
        shrink
        color="#1989fa"
        title-active-color="#1989fa"
        :sticky="false"
      >
        <Grid :column-num="2" center class="grid">
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
        <Tab title="全部" name="all">
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
        </Tab>
        <Tab title="重要" name="imp"></Tab>
        <Tab title="游戏" name="game"></Tab>
        <Tab title="加密" name="gen"></Tab>
      </Tabs>
    </div>
    <List class="list">
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
    </List>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
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

interface Item {
  title: string
  id: number
  password: string
}

let list = ref<Item[]>([]);
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
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 50px;
  padding-top: 112px;
  .tab {
    position: fixed;
    top: 0;
    left: 0;
    height: 110px;
    width: 100%;
    z-index: 1;
    overflow: hidden;
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
}
</style>
