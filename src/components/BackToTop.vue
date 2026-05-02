<template>
  <el-backtop :right="40" :bottom="40">
    <el-icon :size="24">
      <ArrowUp />
    </el-icon>
  </el-backtop>
</template>

<script setup lang="ts">
import { ArrowUp } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-backtop {
  background-color: #409eff;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>