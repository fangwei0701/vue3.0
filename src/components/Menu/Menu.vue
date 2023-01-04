<template>
  <el-aside class="aside">
    <div class="d-flex items-center justify-between aside-header">
      <div class="d-flex items-center justify-between px-md">
        <span class="logo-title">花点系统</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="pr-sm">
      <div class="menu scroll-y">
        <el-menu
          text-color="#fff"
          background-color="#222832"
          :router="true"
          :unique-opened="true"
          :default-openeds="menuState.defaultOpen"
          :default-active="menuState.currentPath"
        >
          <div v-for="item in menus" :key="item.url" class="submenu">
            <el-submenu :index="item.url" v-if="item.children">
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group
                v-for="subItem in item.children"
                :key="subItem.url"
              >
                <el-menu-item :index="subItem.url">
                  {{ subItem.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.url" v-if="!item.children">
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </div>
  </el-aside>
  <el-container class="left-content">
    <Header></Header>
    <div class="main"><router-view></router-view></div>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { menus } from "@/assets/menu";
import Header from "@com/Header/Header.vue";
// 非菜单路由
const noMenusRouter = ref<string[]>(["/login"]);
// 路由信息
const router = useRouter();
// 菜单状态
const menuState = reactive({
  showMenu: true,
  defaultOpen: ["/dashboard"],
  currentPath: "/dashboard",
});
// 是否存在token
const isToken = true;

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path == "/login") {
    next(); // 如果路径是/login 则正常执行
  } else {
    if (!isToken) {
      next({ path: "/login" }); // 如果没有TOKEN，则跳至登录页面
    } else {
      next(); // 否则继续执行
    }
  }
  menuState.showMenu = !noMenusRouter.value.includes(to.path);
  menuState.currentPath = to.path;
  document.title = "";
});
</script>

<style scoped lang="scss">
.aside {
  width: 220px !important;
  height: 100vh;
  background-color: #222832;
  .line {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .aside-header {
    height: 60px;
    .logo-title {
      font-size: 18px;
      color: #ffffff;
    }
  }
  .menu {
    height: calc(100vh - 62px);
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
  .submenu {
    @extend .line;
    &:first-child {
      border-top: none;
    }
  }
}
.left-content {
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .main {
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 24px;
  }
}
</style>
<style lang="scss">
// 菜单样式覆盖
.el-menu-item-group__title {
  display: none;
}
.el-menu {
  border-right: none !important;
}
</style>
