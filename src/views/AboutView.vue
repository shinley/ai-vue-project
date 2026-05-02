<template>
  <div class="about-container">
    <div class="container">
      <el-page-header @back="goBack" content="关于我们" class="page-header" />
      <h1>关于我们</h1>

      <div class="about-content">
        <div class="about-text">
          <p>百战程序员成立于2015年，是一家专业的IT培训机构。我们致力于培养高质量的软件工程师，帮助学员掌握最前沿的技术技能。</p>
          <p>我们的教学团队由来自知名互联网公司的资深工程师组成，拥有丰富的实战经验。通过系统化的课程设计和项目实战，让每一位学员都能真正掌握编程精髓。</p>

          <h2>我们的使命</h2>
          <p>培养具有实战能力的高质量软件工程师，推动中国IT教育的发展，为企业输送优秀人才。</p>

          <h2>我们的愿景</h2>
          <p>成为最受尊敬的IT培训机构，引领行业标准，打造终身学习的教育生态。</p>
        </div>

        <div class="about-stats">
          <el-row :gutter="20">
            <el-col :span="12" v-for="stat in stats" :key="stat.label">
              <div class="stat-item">
                <el-statistic :value="stat.number" :title="stat.label" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="team-section">
        <h2>核心团队</h2>
        <el-row :gutter="30">
          <el-col :span="8" v-for="member in team" :key="member.name">
            <div class="team-member">
              <el-avatar :size="100" :src="member.avatar" />
              <h3>{{ member.name }}</h3>
              <p class="position">{{ member.position }}</p>
              <p class="bio">{{ member.bio }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const stats = [
  { number: 10000, label: '毕业学员' },
  { number: 95, label: '就业率%' },
  { number: 50, label: '合作企业' },
  { number: 10, label: '年经验' }
]

const team = [
  {
    name: '张老师',
    position: '创始人 & CEO',
    bio: '前阿里巴巴高级技术专家，10年互联网从业经验',
    avatar: ''
  },
  {
    name: '李老师',
    position: '教学总监',
    bio: '前腾讯技术专家，专注于前端技术与教学研究',
    avatar: ''
  },
  {
    name: '王老师',
    position: '就业总监',
    bio: '拥有丰富的HR经验，帮助数千名学员成功就业',
    avatar: ''
  }
]
</script>

<style scoped>
.about-container {
  margin-top: 100px;
  padding: 20px;
  min-height: calc(100vh - 170px);
}

.page-header {
  margin-bottom: 30px;
}

.about-container h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.about-content {
  display: flex;
  gap: 4rem;
  margin-bottom: 50px;
}

.about-text {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.8;
}

.about-text h2 {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #1e293b;
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
}

.team-section {
  margin-top: 50px;
}

.team-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #1e293b;
}

.team-member {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.team-member h3 {
  margin: 15px 0 5px;
  color: #1e293b;
}

.position {
  color: #409eff;
  font-weight: bold;
  margin-bottom: 10px;
}

.bio {
  color: #64748b;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .el-col {
    margin-bottom: 20px;
  }
}
</style>