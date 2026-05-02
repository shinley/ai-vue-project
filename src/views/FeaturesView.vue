<template>
  <div class="features-container">
    <div class="container">
      <el-page-header @back="goBack" content="特色优势" class="page-header" />
      <h1>我们的特色优势</h1>

      <el-row :gutter="30">
        <el-col :span="6" v-for="feature in features" :key="feature.title">
          <el-card class="feature-card" shadow="hover">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <ul class="feature-details">
              <li v-for="(detail, index) in feature.details" :key="index">{{ detail }}</li>
            </ul>
          </el-card>
        </el-col>
      </el-row>

      <section class="why-choose">
        <h2>为什么选择百战程序员</h2>
        <el-row :gutter="30">
          <el-col :span="8" v-for="reason in reasons" :key="reason.title">
            <div class="reason-item">
              <el-statistic :value="reason.number" :suffix="reason.suffix">
                <template #title>{{ reason.title }}</template>
              </el-statistic>
              <p>{{ reason.description }}</p>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const features = [
  {
    icon: '👨‍💻',
    title: '实战项目驱动',
    description: '真实商业项目实战，积累丰富开发经验',
    details: ['企业级项目案例', '完整开发流程训练', '代码审查与优化', '团队协作模拟']
  },
  {
    icon: '🎓',
    title: '大厂导师',
    description: '一线互联网公司导师亲自授课',
    details: ['BAT级别导师团队', '丰富的实战经验', '前沿技术分享', '职业规划指导']
  },
  {
    icon: '💼',
    title: '就业保障',
    description: '专业就业指导，推荐优质就业岗位',
    details: ['简历优化服务', '模拟面试训练', '企业内推渠道', '薪资谈判指导']
  },
  {
    icon: '🔄',
    title: '终身学习',
    description: '持续更新课程内容，跟踪技术发展',
    details: ['免费课程升级', '技术社区交流', '定期技术分享', '校友资源网络']
  }
]

const reasons = [
  { title: '平均薪资涨幅', number: 85, suffix: '%', description: '学员毕业后平均薪资提升85%' },
  { title: '课程更新频率', number: 12, suffix: '次/年', description: '每年12次课程内容迭代升级' },
  { title: '学员满意度', number: 98, suffix: '%', description: '超过98%的学员对我们的教学表示满意' }
]
</script>

<style scoped>
.features-container {
  margin-top: 100px;
  padding: 20px;
  min-height: calc(100vh - 170px);
}

.page-header {
  margin-bottom: 30px;
}

.features-container h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.feature-card {
  text-align: center;
  height: 100%;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  margin-bottom: 1rem;
}

.feature-details {
  list-style: none;
  padding: 0;
  text-align: left;
}

.feature-details li {
  padding: 0.3rem 0 0.3rem 1.5rem;
  position: relative;
  color: #64748b;
}

.feature-details li::before {
  content: '✓';
  color: #10b981;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.why-choose {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #e2e8f0;
}

.why-choose h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.reason-item {
  text-align: center;
  padding: 2rem;
}

.reason-item p {
  color: #64748b;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .el-col {
    margin-bottom: 20px;
  }
}
</style>
