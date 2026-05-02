<template>
  <div class="contact-container">
    <div class="container">
      <el-page-header @back="goBack" content="联系我们" class="page-header" />
      <h1>联系我们</h1>

      <el-row :gutter="30">
        <el-col :span="12">
          <div class="contact-info">
            <h3>报名咨询</h3>
            <p><el-icon><Phone /></el-icon> 电话: 400-123-4567</p>
            <p><el-icon><Message /></el-icon> 邮箱: info@baizhan.com</p>
            <p><el-icon><Location /></el-icon> 地址: 北京市海淀区中关村大街1号</p>
            <p><el-icon><Clock /></el-icon> 时间: 周一至周五 9:00-18:00</p>

            <el-form
              ref="formRef"
              :model="formData"
              :rules="formRules"
              label-width="100px"
              class="enrollment-form"
              @submit.prevent="handleSubmit"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item label="意向课程" prop="course">
                <el-select v-model="formData.course" placeholder="请选择意向课程" style="width: 100%">
                  <el-option label="全栈开发工程师" value="fullstack" />
                  <el-option label="Python人工智能" value="python" />
                  <el-option label="Java企业级开发" value="java" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="formData.remarks" type="textarea" :rows="4" placeholder="请输入备注信息" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="submitting">提交报名信息</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="map-placeholder">
            <h3>校区地图</h3>
            <div class="map">在这里展示地图</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Phone, Message, Location, Clock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const formRef = ref<FormInstance>()
const submitting = ref(false)

const formData = reactive({
  name: '',
  phone: '',
  email: '',
  course: '',
  remarks: ''
})

const phoneRegex = /^1[3-9]\d{9}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validatePhone = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (!phoneRegex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

const validateEmail = (_rule: any, value: string, callback: any) => {
  if (value && !emailRegex.test(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}

const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  course: [{ required: true, message: '请选择意向课程', trigger: 'change' }]
})

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
      // 模拟提交
      setTimeout(() => {
        ElMessage.success('报名信息已提交，我们会尽快联系您！')
        formData.name = ''
        formData.phone = ''
        formData.email = ''
        formData.course = ''
        formData.remarks = ''
        submitting.value = false
      }, 1000)
    }
  })
}
</script>

<script lang="ts">
export default {
  name: 'ContactView'
}
</script>

<style scoped>
.contact-container {
  margin-top: 100px;
  padding: 20px;
  min-height: calc(100vh - 170px);
}

.page-header {
  margin-bottom: 30px;
}

.contact-container h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.contact-info p {
  margin: 0.8rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.enrollment-form {
  margin-top: 2rem;
}

.map-placeholder {
  margin-top: 2rem;
}

.map-placeholder h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.map {
  height: 300px;
  background-color: #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

@media (max-width: 768px) {
  .el-col {
    margin-bottom: 20px;
  }
}
</style>
