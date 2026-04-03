# 代码风格规范

本项目的代码风格规范，定义代码格式和样式约定。

## Vue 组件结构

### 文件结构顺序

```vue
<template>
  <!-- 模板内容 -->
</template>

<script>
export default {
  name: 'ComponentName',
  components: {},
  props: {},
  data() { return {} },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
/* 样式内容 */
</style>
```

### 组件命名

- **PascalCase**：`BatchEditModal.vue`、`AssetInfoCard.vue`
- **组件名多个单词**：`GlobalSettings.vue`（不推荐 `GlobalSettingsPanel.vue`）
- **目录结构**：目录用 camelCase，入口文件用 `index.js`

## Props 定义

### 必须使用对象语法

```javascript
props: {
  // 基础类型
  title: String,

  // 带默认值
  loading: {
    type: Boolean,
    default: false
  },

  // 带验证
  status: {
    type: String,
    required: true,
    validator: value => ['pending', 'approved', 'rejected'].includes(value)
  },

  // 对象/数组默认值
  columns: {
    type: Array,
    default: () => []
  }
}
```

## Data 函数

```javascript
data() {
  return {
    // 初始化所有响应式数据
    tableData: [],
    loading: false,
    selectedIds: [],

    // 对象类型要使用函数返回
    formData: {
      name: '',
      status: ''
    }
  }
}
```

## Computed 属性

```javascript
computed: {
  // 只读的 computed
  totalCount() {
    return this.tableData.length
  },

  // 可读的可写 computed
  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(value) {
      const [first, last] = value.split(' ')
      this.firstName = first
      this.lastName = last
    }
  }
}
```

## Watch

```javascript
watch: {
  // 基础监听
  searchKeyword(newValue, oldValue) {
    this.fetchData()
  },

  // 深度监听对象
  formData: {
    handler(newVal) {
      this.validateForm()
    },
    deep: true
  },

  // 立即执行
  filterOptions: {
    handler() {
      this.applyFilters()
    },
    immediate: true
  }
}
```

## Methods 方法顺序

```javascript
methods: {
  // 1. 事件处理方法
  handleConfirm() {},
  handleCancel() {},
  handleClick() {},

  // 2. 数据获取方法
  fetchTableData() {},
  fetchDetail() {},

  // 3. 数据处理方法
  processTableData() {},
  formatDate() {},

  // 4. 业务逻辑方法
  saveData() {},
  validateForm() {},

  // 5. 辅助/工具方法（私有方法）
  _generateUUID() {}
}
```

## 样式规范

### Less 使用规范

```less
// 1. 嵌套不超过 4 层
.component {
  .header {
    .title {
      // 最多 4 层
    }
  }
}

// 2. 变量命名
@component-prefix: ~'batch-edit';
@primary-color: #1890ff;

// 3. 避免使用 !important
```

## 列表渲染

```vue
<!-- 始终使用 :key -->
<TableColumn
  v-for="column in columns"
  :key="column.prop"
  :prop="column.prop"
/>

<!-- 避免使用 index 作为 key（仅限临时列表） -->
<tr v-for="(item, index) in tempList" :key="index">
```