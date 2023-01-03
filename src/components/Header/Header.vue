<template>
  <div class="header d-flex items-center justify-between">
    <div class="h-left">页面title</div>
    <div class="h-right">
      <fa-icon :icon="['fas', 'fa-circle-user']"></fa-icon>
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">
          <span class="mx-sm">ADMIN</span>
          <fa-icon :icon="['fas', 'fa-angle-down']"></fa-icon>
        </span>
        <el-dropdown-menu>
          <div class="avatar py-md">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <div class="avatar-name mt-sm">ADMIN</div>
          </div>
          <el-dropdown-item>
            <fa-icon :icon="['fas', 'fa-arrow-right-from-bracket']"></fa-icon>
            <span class="ml-sm">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 头像图片地址
const circleUrl = ref<string>(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
)
</script>

<style scopedc lang="scss">
.header {
  height: 60px;
  padding: 0 24px;
  border-bottom: 1px solid #e9e9e9;
}
.avatar {
  width: 160px;
  text-align: center;
}
.avatar-name {
  font-size: 12px;
}
</style>
