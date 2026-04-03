# 编码规范

本项目的编码规范，定义通用编程约束和最佳实践。

## 命名规范

### 通用规则

1. **变量和函数**：使用 camelCase
   ```javascript
   const userName = '张三'
   function getUserInfo() {}
   ```

2. **类和组件**：使用 PascalCase
   ```javascript
   class UserService {}
   export default {
     name: 'BatchEditModal'
   }
   ```

3. **常量**：使用 UPPER_SNAKE_CASE
   ```javascript
   const API_BASE_URL = '/api/v1'
   const MAX_RETRY_COUNT = 3
   ```

4. **私有变量**：以 `_` 开头
   ```javascript
   data() {
     return {
       _internalState: null
     }
   }
   ```

### 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| Vue 组件 | PascalCase.vue | `BatchEditModal.vue` |
| JS 模块 | camelCase.js | `apiClient.js` |
| 工具函数 | camelCase.js | `formatDate.js` |
| 常量配置 | camelCase.js | `constants.js` |

## 函数设计

### 单一职责

每个函数只做一件事，函数名应清晰表达其功能。

```javascript
// 错误
function processData(data) {
  this.format = data.format
  this.send(data)
  this.notify()
}

// 正确
function formatData(data) {}
async function sendData(data) {}
function notifyUsers() {}
```

### 函数长度

- **推荐**：单个函数不超过 50 行
- **最大容忍**：单个函数不超过 100 行
- 超出时考虑拆分

### 异步处理

```javascript
// 使用 async/await
async function fetchUser(id) {
  try {
    const response = await api.getUser(id)
    return response.data
  } catch (error) {
    console.error('获取用户失败', error)
    throw error
  }
}
```

## 错误处理

### 必须遵守

1. **所有 async 函数必须有 try-catch**
2. **API 错误必须有用户可理解的提示**
3. **不要吞掉错误**（catch 后至少要记录或提示用户）

### 错误提示规范

```javascript
// 错误
catch (e) {}

// 正确
catch (error) {
  this.$Message.error('操作失败，请稍后重试')
  console.error('deleteAsset error:', error)
}
```

## 注释规范

### 需要注释的场景

1. 业务逻辑复杂的代码块
2.非常规的算法实现
3. 临时代码（标注 TODO 并说明原因）
4. 外部依赖的使用方式

### 注释风格

```javascript
/**
 * 根据资产ID获取资产信息
 * @param {string} assetId - 资产ID
 * @returns {Promise<Asset>} 资产信息
 */
async function getAssetInfo(assetId) {}
```

## 代码格式

1. **缩进**：2 空格
2. **语句末尾**：不加强制要求（ESLint 会处理）
3. **引号**：单引号优先
4. **分号**：不加强制要求

## 禁止模式

```javascript
// 1. 禁止 with 语句
with (obj) { /* ... */ }

// 2. 禁止 eval
eval(userInput)

// 3. 禁止修改函数参数
function processData(data) {
  data = {} // 禁止
}

// 4. 禁止隐藏参数
function demo(a, a) {} // 重复参数

// 5. 禁止使用 arguments
function() {
  const args = Array.from(arguments) // 改用 rest 参数
}
```
