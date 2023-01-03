<template>
  <el-container v-if="showMenu" class="container">
    <Menu></Menu>
  </el-container>
  <el-container v-else class="container">
    <router-view></router-view>
  </el-container>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Menu from '@com/Menu/Menu.vue'

// 非菜单路由
const noMenusRouter = ref<string[]>(['/login'])
// 路由信息
const router = useRouter()
// 是否显示菜单
const showMenu = ref<boolean>(false)

router.beforeEach((to, from, next) => {
  next()
  showMenu.value = !noMenusRouter.value.includes(to.path)
})
</script>
