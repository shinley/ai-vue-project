<template>
  <div class="courses-container">
    <div class="container">
      <el-page-header @back="goBack" content="课程介绍" class="page-header" />
      <h1>热门课程</h1>

      <div class="filter-section">
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
          <el-tab-pane label="全部课程" name="all"></el-tab-pane>
          <el-tab-pane label="前端开发" name="frontend"></el-tab-pane>
          <el-tab-pane label="后端开发" name="backend"></el-tab-pane>
          <el-tab-pane label="移动开发" name="mobile"></el-tab-pane>
          <el-tab-pane label="人工智能" name="ai"></el-tab-pane>
        </el-tabs>
      </div>

      <el-row :gutter="30">
        <el-col :span="8" v-for="course in filteredCourses" :key="course.id">
          <el-card class="course-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <h3>{{ course.title }}</h3>
              </div>
            </template>
            <div class="course-content">
              <p>{{ course.description }}</p>
              <div class="course-details">
                <el-tag v-for="tag in course.tags" :key="tag" type="info" class="tag">{{ tag }}</el-tag>
              </div>
              <div class="course-meta">
                <span class="duration"><i class="el-icon-time"></i> {{ course.duration }}</span>
                <span class="level"><i class="el-icon-medal"></i> {{ course.level }}</span>
              </div>
              <div class="price">¥{{ course.price.toLocaleString() }}</div>
            </div>
            <div class="card-footer">
              <el-button type="primary" @click="enrollCourse(course)">立即报名</el-button>
              <el-button @click="viewDetails(course)">查看详情</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <div class="pagination-section">
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalCourses"
          layout="prev, pager, next"
          background
        />
      </div>
    </div>

    <!-- 课程详情对话框 -->
    <el-dialog v-model="dialogVisible" :title="selectedCourse?.title" width="60%">
      <div v-if="selectedCourse" class="course-detail">
        <h3>课程概述</h3>
        <p>{{ selectedCourse.description }}</p>

        <h3>课程大纲</h3>
        <el-collapse v-model="activeCollapse">
          <el-collapse-item
            v-for="(module, index) in selectedCourse.modules"
            :key="index"
            :title="module.title"
            :name="index"
          >
            <ul>
              <li v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex">
                {{ lesson }}
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>

        <h3>适合人群</h3>
        <p>{{ selectedCourse.audience }}</p>

        <h3>就业方向</h3>
        <p>{{ selectedCourse.career }}</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="enrollFromDialog">立即报名</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

// 课程数据
const courses = ref([
  {
    id: 1,
    title: '全栈开发工程师',
    description: '从前端到后端，掌握完整开发流程，成为全能型开发人才',
    tags: ['Vue.js', 'React', 'Node.js', 'MongoDB'],
    duration: '6个月',
    level: '中级',
    price: 12999,
    category: 'frontend',
    audience: '有一定编程基础，希望成为全栈工程师的开发者',
    career: '全栈工程师、技术负责人、创业CTO等',
    modules: [
      {
        title: '前端基础',
        lessons: ['HTML/CSS基础', 'JavaScript核心', 'ES6+新特性', '响应式设计']
      },
      {
        title: '前端框架',
        lessons: ['Vue.js深入', 'React实战', '状态管理', '组件库应用']
      },
      {
        title: '后端开发',
        lessons: ['Node.js基础', 'Express/Koa框架', '数据库设计', 'RESTful API']
      },
      {
        title: '项目实战',
        lessons: ['电商网站开发', '博客系统', '后台管理系统', '部署上线']
      }
    ]
  },
  {
    id: 2,
    title: 'Python人工智能',
    description: 'AI时代的核心技能训练，从基础到实战全面掌握',
    tags: ['Python', '机器学习', '深度学习', '数据分析'],
    duration: '8个月',
    level: '中级',
    price: 14999,
    category: 'ai',
    audience: '对人工智能感兴趣，希望转型AI领域的开发者',
    career: '算法工程师、数据科学家、AI研究员等',
    modules: [
      {
        title: 'Python基础',
        lessons: ['语法基础', '面向对象编程', '常用库使用', '项目实践']
      },
      {
        title: '数据分析',
        lessons: ['NumPy/Pandas', '数据可视化', '统计分析', '数据清洗']
      },
      {
        title: '机器学习',
        lessons: ['监督学习', '无监督学习', '模型评估', '特征工程']
      },
      {
        title: '深度学习',
        lessons: ['神经网络基础', 'TensorFlow/PyTorch', '图像识别', '自然语言处理']
      }
    ]
  },
  {
    id: 3,
    title: 'Java企业级开发',
    description: '打造大型系统必备技能，掌握主流企业级开发技术',
    tags: ['Java', 'Spring Boot', '微服务', '分布式'],
    duration: '7个月',
    level: '中级',
    price: 13999,
    category: 'backend',
    audience: '具备Java基础，希望提升到企业级开发水平的工程师',
    career: 'Java工程师、架构师、技术专家等',
    modules: [
      {
        title: 'Java进阶',
        lessons: ['多线程编程', 'JVM原理', '性能优化', '设计模式']
      },
      {
        title: 'Spring生态',
        lessons: ['Spring Boot', 'Spring Cloud', 'Spring Security', '事务管理']
      },
      {
        title: '微服务架构',
        lessons: ['服务拆分', '服务治理', '配置中心', '熔断限流']
      },
      {
        title: '分布式系统',
        lessons: ['分布式缓存', '消息队列', '数据库分库分表', '分布式事务']
      }
    ]
  },
  {
    id: 4,
    title: 'React前端工程师',
    description: '深入掌握React生态系统，成为高级前端开发工程师',
    tags: ['React', 'Redux', 'Hooks', 'TypeScript'],
    duration: '5个月',
    level: '中级',
    price: 11999,
    category: 'frontend',
    audience: '希望专精React技术栈的前端开发者',
    career: '前端工程师、React专家、前端架构师等',
    modules: [
      {
        title: 'React基础',
        lessons: ['JSX语法', '组件化开发', '生命周期', '状态管理']
      },
      {
        title: 'Hooks进阶',
        lessons: ['useState/useEffect', '自定义Hooks', 'Context API', '性能优化']
      },
      {
        title: '状态管理',
        lessons: ['Redux基础', 'Redux Toolkit', 'MobX', 'Zustand']
      },
      {
        title: '工程化实践',
        lessons: ['Webpack配置', '测试策略', 'TypeScript集成', '性能监控']
      }
    ]
  },
  {
    id: 5,
    title: 'Android移动开发',
    description: '掌握Android开发核心技术，打造优秀的移动应用',
    tags: ['Android', 'Kotlin', 'Jetpack', 'MVVM'],
    duration: '6个月',
    level: '中级',
    price: 12999,
    category: 'mobile',
    audience: '希望从事Android开发或转职移动开发的工程师',
    career: 'Android工程师、移动架构师、独立开发者等',
    modules: [
      {
        title: 'Android基础',
        lessons: ['四大组件', 'UI开发', '数据存储', '网络通信']
      },
      {
        title: 'Kotlin语言',
        lessons: ['语法基础', '协程', '函数式编程', 'DSL构建']
      },
      {
        title: 'Jetpack组件',
        lessons: ['Navigation', 'LiveData', 'ViewModel', 'Room数据库']
      },
      {
        title: '高级主题',
        lessons: ['性能优化', '安全防护', '发布上线', '插件化']
      }
    ]
  },
  {
    id: 6,
    title: 'iOS开发工程师',
    description: '掌握Swift语言和iOS开发技术，开发高质量移动应用',
    tags: ['iOS', 'Swift', 'UIKit', 'SwiftUI'],
    duration: '6个月',
    level: '中级',
    price: 12999,
    category: 'mobile',
    audience: '希望从事iOS开发或转职移动开发的工程师',
    career: 'iOS工程师、移动架构师、独立开发者等',
    modules: [
      {
        title: 'Swift语言',
        lessons: ['基础语法', '面向对象', '协议扩展', '函数式编程']
      },
      {
        title: 'UIKit框架',
        lessons: ['界面布局', '事件处理', '动画效果', '自定义控件']
      },
      {
        title: 'SwiftUI',
        lessons: ['声明式UI', '状态管理', '动画过渡', '复杂布局']
      },
      {
        title: '项目实战',
        lessons: ['网络请求', '数据持久化', '第三方SDK', '上架发布']
      }
    ]
  }
])

const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = ref(6)
const totalCourses = computed(() => courses.value.length)
const dialogVisible = ref(false)
const selectedCourse = ref(null)
const activeCollapse = ref([0])

const filteredCourses = computed(() => {
  let filtered = courses.value
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(course => course.category === activeTab.value)
  }

  // 分页处理
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const enrollCourse = (course: any) => {
  // 这里可以跳转到报名页面或者弹出报名对话框
  router.push('/contact')
}

const viewDetails = (course: any) => {
  selectedCourse.value = course
  dialogVisible.value = true
}

const enrollFromDialog = () => {
  dialogVisible.value = false
  router.push('/contact')
}
</script>

<style scoped>
.courses-container {
  margin-top: 100px;
  padding: 20px;
  min-height: calc(100vh - 170px);
}

.page-header {
  margin-bottom: 30px;
}

.courses-container h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.filter-section {
  margin-bottom: 30px;
}

.course-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #1e293b;
}

.course-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-details {
  margin: 15px 0;
}

.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 0.9rem;
  color: #64748b;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef4444;
  text-align: center;
  margin: 10px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.pagination-section {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.course-detail h3 {
  margin: 20px 0 10px;
  color: #1e293b;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>