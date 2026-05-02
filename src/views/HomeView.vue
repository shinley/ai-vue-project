<template>
  <div class="home-container">
    <!-- 主页横幅 -->
    <section class="hero">
      <div class="hero-content">
        <h1>成为卓越程序员的第一步</h1>
        <p>百战程序员，专注高质量编程教育，助您在代码世界中百战百胜！</p>
        <el-button type="primary" size="large" @click="scrollToContact">立即报名</el-button>
      </div>
    </section>

    <!-- 关于我们 -->
    <section class="about">
      <div class="container">
        <h2>关于我们</h2>
        <div class="about-content">
          <div class="about-text">
            <p>百战程序员成立于2015年，是一家专业的IT培训机构。我们致力于培养高质量的软件工程师，帮助学员掌握最前沿的技术技能。</p>
            <p>我们的教学团队由来自知名互联网公司的资深工程师组成，拥有丰富的实战经验。通过系统化的课程设计和项目实战，让每一位学员都能真正掌握编程精髓。</p>
          </div>
          <div class="about-stats">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="stat-item">
                  <span class="stat-number">10000+</span>
                  <span class="stat-label">毕业学员</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="stat-item">
                  <span class="stat-number">95%</span>
                  <span class="stat-label">就业率</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="stat-item">
                  <span class="stat-number">50+</span>
                  <span class="stat-label">合作企业</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="stat-item">
                  <span class="stat-number">10+</span>
                  <span class="stat-label">年经验</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </section>

    <!-- 课程介绍 -->
    <section class="courses">
      <div class="container">
        <h2>热门课程</h2>
        <el-row :gutter="30">
          <el-col :span="8">
            <div class="course-card">
              <h3>全栈开发工程师</h3>
              <p>从前端到后端，掌握完整开发流程</p>
              <ul>
                <li>HTML/CSS/JavaScript</li>
                <li>React/Vue.js 框架</li>
                <li>Node.js 后端开发</li>
                <li>MongoDB/MySQL 数据库</li>
              </ul>
              <div class="price">¥12,999</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="course-card">
              <h3>Python人工智能</h3>
              <p>AI时代的核心技能训练</p>
              <ul>
                <li>Python基础与进阶</li>
                <li>机器学习算法</li>
                <li>深度学习框架</li>
                <li>数据分析与可视化</li>
              </ul>
              <div class="price">¥14,999</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="course-card">
              <h3>Java企业级开发</h3>
              <p>打造大型系统必备技能</p>
              <ul>
                <li>Java核心语法</li>
                <li>Spring Boot框架</li>
                <li>微服务架构</li>
                <li>分布式系统</li>
              </ul>
              <div class="price">¥13,999</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 特色优势 -->
    <section class="features">
      <div class="container">
        <h2>我们的特色优势</h2>
        <el-row :gutter="30">
          <el-col :span="6">
            <div class="feature-item">
              <div class="feature-icon">&#x1f468;&#x200d;&#x1f4bb;</div>
              <h3>实战项目驱动</h3>
              <p>真实商业项目实战，积累丰富开发经验</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="feature-item">
              <div class="feature-icon">&#x1f393;</div>
              <h3>大厂导师</h3>
              <p>一线互联网公司导师亲自授课</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="feature-item">
              <div class="feature-icon">&#x1f4bc;</div>
              <h3>就业保障</h3>
              <p>专业就业指导，推荐优质就业岗位</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="feature-item">
              <div class="feature-icon">&#x1f504;</div>
              <h3>终身学习</h3>
              <p>持续更新课程内容，跟踪技术发展</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 联系我们 -->
    <section id="contact-section" class="contact" ref="contactSection">
      <div class="container">
        <h2>联系我们</h2>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="contact-info">
              <h3>报名咨询</h3>
              <p>&#x1f4de; 电话: 400-123-4567</p>
              <p>&#x1f4e7; 邮箱: info@baizhan.com</p>
              <p>&#x1f3e2; 地址: 北京市海淀区中关村大街1号</p>
              <p>&#x1f552; 时间: 周一至周五 9:00-18:00</p>

              <el-form
                ref="formRef"
                :model="formData"
                :rules="formRules"
                label-width="80px"
                class="enrollment-form"
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
                <el-form-item label="课程" prop="course">
                  <el-select v-model="formData.course" placeholder="选择意向课程" style="width: 100%">
                    <el-option label="全栈开发工程师" value="fullstack" />
                    <el-option label="Python人工智能" value="python" />
                    <el-option label="Java企业级开发" value="java" />
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                  <el-input v-model="formData.remarks" type="textarea" :rows="3" placeholder="请输入备注" />
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
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 百战程序员. 保留所有权利. 京ICP备12345678号</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const contactSection = ref<HTMLElement | null>(null)
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

const scrollToContact = () => {
  contactSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
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

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.stat-item, .course-card, .feature-item')
  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3
    if (elementPosition < screenPosition) {
      element.classList.add('animated')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', animateOnScroll)
  animateOnScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', animateOnScroll)
})
</script>

<style scoped>
.home-container {
  margin-top: 70px;
}

.hero {
  background: linear-gradient(135deg, #409eff, #3b82f6);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease 0.2s both;
}

.about {
  padding: 80px 0;
  background-color: #f8fafc;
}

.about h2, .courses h2, .features h2, .contact h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1e293b;
}

.about-content {
  display: flex;
  gap: 4rem;
  align-items: center;
}

.about-text {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.8;
}

.about-stats {
  flex: 1;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.stat-item.animated {
  opacity: 1;
  transform: translateY(0);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
}

.courses {
  padding: 80px 0;
  background-color: white;
}

.course-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  opacity: 0;
  transform: translateY(20px);
}

.course-card.animated {
  opacity: 1;
  transform: translateY(0);
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.course-card h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.course-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.course-card ul {
  list-style: none;
  margin-bottom: 1.5rem;
  padding-left: 0;
}

.course-card li {
  padding: 0.3rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.course-card li:before {
  content: '\2713';
  color: #10b981;
  position: absolute;
  left: 0;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef4444;
  text-align: center;
}

.features {
  padding: 80px 0;
  background-color: #f8fafc;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.feature-item.animated {
  opacity: 1;
  transform: translateY(0);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.feature-item p {
  color: #64748b;
}

.contact {
  padding: 80px 0;
  background-color: white;
}

.contact-info h3,
.map-placeholder h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.contact-info p {
  margin: 0.8rem 0;
  font-size: 1.1rem;
}

.enrollment-form {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 10px;
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

.footer {
  background-color: #1e293b;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .el-col {
    margin-bottom: 20px;
  }
}
</style>
