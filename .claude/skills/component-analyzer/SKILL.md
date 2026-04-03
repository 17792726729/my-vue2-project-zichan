---
name: component-analyzer
description: 分析前端项目中组件之间的数据通信关系。当用户需要了解组件间的 props 传递链、emit 事件触发链、以及每个环节的具体代码位置时使用此技能。
---

# Component Data Flow Analyzer

分析 Vue 组件之间的**完整数据通信链路**，追踪：
1. **Props 最终发挥作用的位置**（不只是透传，要找到真正使用的地方）
2. **Emit 事件从最初触发到父组件处理的完整链路**（可能跨多层组件）

---

## 核心分析维度

### 维度一：Props 完整链路追踪

Props 追踪必须回答：**这个 prop 最终在哪个组件的哪个位置发挥作用？**

```
父组件
  └── :config="configState" ─────────────────────────┐
       ↓                                           │
     子组件A                                        │ 透传（子组件A未使用）
       └── :config="config" ──────────────────────┤
            ↓                                      │
          子组件B (folder-detail.vue:238)            │
               ↓                                   │
          computed: isHideSave() { ─────────────────┘  ← 真正使用 config
            return this.config?.param?.isHideSave
          }
```

**追踪规则**：
1. 从父组件 template 提取 `:propName="value"`
2. 在子组件中搜索 `props` 定义
3. 追踪该 prop 在子组件中的使用位置（template / methods / computed / watch）
4. 如果子组件又向下传递，记录下一个链路

---

### 维度二：Emit 完整链路追踪

Emit 追踪必须回答：**这个事件最初是在哪个组件的哪个位置触发的？触发条件是什么？**

```
用户点击"保存"按钮
       ↓
folder-detail.vue:870 - handleSave()
       ↓ emit('handle-save', false)
       ↓
file-management.vue:822 - handleSave()
       ↓ emit('save-content', false)
       ↓
datamodel-settings.vue:267 - handleSave(closeable, callBack)
       ↓
执行保存逻辑...
```

**追踪规则**：
1. 从父组件 template 提取 `@event="handler"`
2. 在父组件 methods 中找到 handler 实现
3. 分析 handler 中是否有 `$emit` 调用
4. 如果有，追踪到下一个子组件
5. 在子组件中搜索对应的事件监听和处理

---

## 分析框架

### 第一步：组件拓扑构建

**输出**：树状组件关系图

```
ComponentA (父)
├── 子组件B (静态/动态组件)
│   ├── props: [x, y, z]
│   ├── emits: ['event1', 'event2']
│   └── 内部子组件C
│       └── props: [x]
└── slot 插槽
    └── 组件D
```

### 第二步：Props 链路追踪表

**输入**：父组件传递给子组件的所有 props

**输出**：

| # | Prop名 | 父组件值 | 子组件A | 子组件B | 最终作用位置 | 代码位置 |
|---|--------|---------|---------|---------|------------|---------|
| 1 | config | configState | 透传 | `isHideSave` | computed | folder-detail.vue:472 |
| 2 | context | gmsContext | 使用 | 使用 | 元数据操作 | multiple |
| 3 | editorName | editorName | 透传 | 使用 | 编辑器切换 | folder-detail.vue:430 |

### 第三步：Emit 链路追踪表

**输入**：子组件 emit 的所有事件

**输出**：

| # | Emit事件 | 触发位置 | 触发条件 | 中间链路 | 最终Handler | 父组件影响 |
|---|---------|---------|---------|---------|------------|-----------|
| 1 | handle-save | folder-detail.vue:870 | 点击保存按钮 | file-management.vue:822 | handleSave | 修改状态、持久化 |
| 2 | design-item | folder-detail.vue:790 | 点击"设计"按钮 | file-management.vue:614 | getCurrentMetadata | 加载模型数据 |

---

## 输出格式

### 完整分析报告模板

```markdown
## 组件 [X] 通信深度分析报告

### 一、组件拓扑

```
ComponentA (父组件)
├── FileManagement (动态组件, Collector)
│   ├── folder-detail (子组件)
│   │   ├── file-tree (孙组件)
│   │   └── file-header (孙组件)
│   └── slot → DatamodelEditContainer
└── ref 调用: $refs.fileManagement, $refs.editContainerRef
```

### 二、Props 完整链路

#### Props: config

| 层级 | 组件 | 接收 | 传递 | 使用位置 | 代码位置 |
|------|------|------|------|---------|---------|
| L1 | datamodel-settings.vue | configState | → FileManagement | 初始化 | datamodel-settings.vue:142 |
| L2 | FileManagement | config | → folder-detail | 透传 | file-management.vue:14 |
| L3 | folder-detail | config | — | isHideSave computed | folder-detail.vue:472 |

**最终作用**: `folder-detail.vue:472`
```javascript
isHideSave(){
    return this.config && this.config.param && this.config.param.isHideSave ? this.config.param.isHideSave : false
}
```

---

#### Props: editorName

| 层级 | 组件 | 接收 | 传递 | 使用位置 | 代码位置 |
|------|------|------|------|---------|---------|
| L1 | datamodel-settings.vue | editorName | → FileManagement | 透传 | datamodel-settings.vue:21 |
| L2 | FileManagement | editorName | → folder-detail | 透传 | file-management.vue:22 |
| L3 | folder-detail | editorName | — | buttonDisable computed | folder-detail.vue:430 |

**最终作用**: `folder-detail.vue:430`
```javascript
editorName(newEditorName) {
    if(newEditorName === 'codeEditor' && ...){
        this.buttonDisable = { saveButton: true, ... }
    }
}
```

---

### 三、Emit 完整链路

#### Emit: save-content

**触发链**:
```
用户点击"保存"按钮
    ↓
folder-detail.vue:870 - handleSave()
    ↓ emit('handle-save', false)
file-management.vue:822 - handleSave()
    ↓ emit('save-content', false)
datamodel-settings.vue:267 - handleSave(closeable, callBack)
    ↓
执行 doSave() → DatamodelUtil.saveDataModel()
```

**触发位置**: `folder-detail.vue:140`
```vue
@click="handleSave"
```

**完整链路代码**:
```javascript
// folder-detail.vue:870
handleSave() {
    this.$emit("handle-save", false);
}

// file-management.vue:822
handleSave() {
    this.$emit("save-content", false);
}

// datamodel-settings.vue:267
handleSave(closeable = false, callBack) {
    this.$refs.editContainerRef.update(this.defineData);
    // ... 校验和保存逻辑
}
```

---

#### Emit: get-current-metadata

**触发链**:
```
用户点击树节点
    ↓
file-tree.vue - onSelectItem()
    ↓ emit('onSelectItem')
file-management.vue - onSelectItem()
    ↓ emit('selectItem')
datamodel-settings.vue - (内部处理)

用户点击"设计"按钮
    ↓
folder-detail.vue:790 - designItem(row)
    ↓ emit('design-item', medata, item)
file-management.vue:614 - getCurrentMetadata(medata, item)
    ↓ emit('get-current-metadata', medata, item)
datamodel-settings.vue:240 - getCurrentMetadata(metadata, file)
    ↓
加载模型 defineData
```

---

### 四、具体例子：新建模型流程

**场景**: 用户在数据建模页面新建一个数据模型

**完整链路**:
```
1. 用户点击"新增"按钮
   └── folder-detail.vue:15 - handleAdd()
       └── 打开 CreateFile 弹窗

2. 用户填写信息并确认
   └── CreateFile.vue - add()
       └── this.$emit('add-file', fileInfo)

3. FileManagement 接收事件
   └── file-management.vue:530 - addFile(fileInfo)
       └── this.$emit('create-metadata', fileInfo, parentMetadata, callback)

4. datamodel-settings.vue 处理
   └── datamodel-settings.vue:185 - createMetadata(value, parentMetadata, callback)
       ├── DatamodelUtil.generateDefaultDefine()
       ├── DatamodelUtil.saveDataModel()
       └── callback?.(metadata, result)
           └── folder-detail.getTableData()  ← 刷新列表
```

---

## 分析方法

### 1. Props 追踪步骤

```javascript
// Step 1: 提取父组件 template 中的 prop 绑定
// <FileManagement :config="configState" />

// Step 2: 在子组件中找到 props 定义
// props: { config: { type: Object } }

// Step 3: 搜索 props 在子组件中的使用
// grep "this.config" child-component.vue
// grep "config." child-component.vue

// Step 4: 如果向下传递，继续追踪
// <folder-detail :config="config" />
```

### 2. Emit 追踪步骤

```javascript
// Step 1: 在父组件 template 中找到事件绑定
// @save-content="handleSave"

// Step 2: 在父组件 methods 中找到 handler
// handleSave() { ... }

// Step 3: 分析 handler 中是否有 $emit
// handleSave() { this.$emit('save-content', false) }

// Step 4: 在子组件中搜索 $emit 调用
// grep "$emit.*save-content" child-component.vue

// Step 5: 继续追踪子组件的 emit 源
// 找到触发 emit 的具体方法
```

### 3. 代码位置标注规则

使用 `文件名:行号` 格式标注具体位置：
- `folder-detail.vue:870` - 表示 folder-detail.vue 文件第 870 行
- `file-management.vue:14` - 表示透传的位置
- `datamodel-settings.vue:185` - 表示最终处理逻辑

---

## 特殊情况

### 动态组件追踪

动态组件通过 Collector 机制加载：

```javascript
// 1. 定位组件来源
GMS.DefineCollector.EditorDefineManager.getEditorDefinesByEditorName("datamodelEditor")
this.GMSGBCComponents = components.gbComponents

// 2. 在 mcon.js 中找到组件路径
// gbcDefaultComponents: { FileManagement: () => import("./file-management.vue") }

// 3. 读取实际组件文件进行追踪
```

### ref 调用（逆向控制）

ref 调用是父→子的逆向控制，需要单独标注：

```javascript
// 父组件
this.$refs.fileManagement.closeDesignModal()

// 标注为：
// FileManagement.closeDesignModal() ← ref 调用
// file-management.vue:1071
```

### mixin 中的 emit

mixin 中定义的 methods 触发 emit 时，需要追踪到使用 mixin 的组件：

```javascript
// publishMixin 中
autoSave() {
    this.$emit("save-content", false);  // 实际在 file-management.vue 中触发
}

// file-management.vue 使用了该 mixin
// 所以触发位置是 file-management.vue
```

---

## 分析规则

1. **Props 必须追踪到最终作用位置**：不只是找到透传，要找到真正使用的地方
2. **Emit 必须追溯到最初触发点**：从父组件 handler 一直追踪到最底层的事件源
3. **标注具体代码位置**：使用 `文件名:行号` 格式
4. **识别透传 vs 使用**：如果 prop 只是传递给下一个组件而自身未使用，标记为透传
5. **标注触发条件**：说明在什么用户操作或系统事件下会触发
6. **描述中间链路**：记录 emit 经过的每个组件和方法
