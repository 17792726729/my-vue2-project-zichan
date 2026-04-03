# GMS 项目组件收集机制详解

## 一、整体架构

GMS 采用 **Collector 模式**实现模块化的组件收集与注册，核心思想是：

> **通过 `require.context` 自动扫描所有模块的配置文件，将分散的定义集中收集到全局容器中**

```
┌─────────────────────────────────────────────────────────────────┐
│                         main.js 入口                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   require.context('./code/', true, /^\.\/.*\/mcon\.js$/)        │
│   require.context('./code/', true, /^\.\/.*\/emcon\.js$/)      │
│                                                                 │
│           ↓                         ↓                           │
│   ┌─────────────────┐      ┌─────────────────┐                 │
│   │  mcon.js 文件   │      │  emcon.js 文件  │                 │
│   │  (普通组件)     │      │  (扩展组件)     │                 │
│   └─────────────────┘      └─────────────────┘                 │
│           ↓                         ↓                           │
│   ┌─────────────────────────────────────────────────┐          │
│   │           GMS.getContext()                      │          │
│   │  ┌──────────────┐  ┌──────────────────────┐  │          │
│   │  │  Collector   │  │  EmconCollector       │  │          │
│   │  │  (mcon)      │  │  (emcon)             │  │          │
│   │  └──────────────┘  └──────────────────────┘  │          │
│   └─────────────────────────────────────────────────┘          │
│                              ↓                                  │
│   ┌─────────────────────────────────────────────────┐          │
│   │     DefineCollector.EditorDefineManager         │          │
│   │     DefineCollector.FunctionDefineManager       │          │
│   └─────────────────────────────────────────────────┘          │
│                              ↓                                  │
│   ┌─────────────────────────────────────────────────┐          │
│   │         业务组件通过动态组件方式使用             │          │
│   └─────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、核心文件

| 文件 | 用途 |
|------|------|
| `src/main.js` | 应用入口，初始化 Collector 并收集所有配置 |
| `src/collect.js` | 旧版 Collector 实现（用于 `$collector`） |
| `gms-gbc-commonext/src/gms-init/collector.js` | Collector 基类，核心收集逻辑 |
| `gms-gbc-commonext/src/gms-init/context.js` | GMSContext 上下文，管理多个 Collector |
| `gms-gbc-commonext/src/gms-init/define-collector.js` | Editor/Function 管理器 |

---

## 三、Collector 核心类

### 1.Collector 基类
**文件**：`src/code/gms-gbc-commonext/src/gms-init/collector.js`

```javascript
let collector = function (type) {
    let elements = {};           // 存储收集的元素
    let extendElements = {};     // 扩展元素（emcon专用）

    // 根据 type 决定合并策略
    // type == "mcon" → 直接覆盖 (addMcon)
    // type == "emcon" → 智能合并 (mergeEmcon)
    this.addElements = function(egs) {
        type == "mcon" ? addMcon(egs) : mergeEmcon(egs);
    };

    // 收集元素
    this.updateElements = function(contexts) {
        contexts.keys().forEach(key => {
            let elements = contexts(key).default;
            this.addElements(elements);
        });
    };

    // 获取单个元素
    this.getElement = function(type, name) { ... };

    // 获取某类型所有元素
    this.getElements = function(type) { ... };
}
```

### 2.GMSContext 上下文
**文件**：`src/code/gms-gbc-commonext/src/gms-init/context.js`

```javascript
let context = function () {
    let collector = new Collector("mcon");        // 普通组件收集器
    let gbcCollector = new Collector("mcon");    // GBC专用收集器
    let emconCollector = new Collector("emcon");  // 扩展组件收集器

    this.getCollector = () => collector;
    this.getEmconCollector = () => emconCollector;
};
```

### 3.DefineCollector 管理器
**文件**：`src/code/gms-gbc-commonext/src/gms-init/define-collector.js`

```javascript
class editorDefineManager {
    // 初始化编辑器定义，建立 emcon 和 mcon 的对应关系
    init() { ... }

    // 通过编辑器名称获取所有相关组件
    getEditorDefinesByEditorName(editorName) {
        return {
            editor_components,        // 编辑器组件
            editor_extends_tabs,     // 扩展标签页
            editor_extends_control,  // 扩展控件
            gbcDefaultComponents,    // 全局默认组件
            gbComponents             // 合并后的组件集合
        };
    }
}

class functionDefineManager {
    // 初始化功能树配置
    init() { ... }
}
```

---

## 四、mcon.js 与 emcon.js 的区别

| 特性 | mcon.js | emcon.js |
|------|---------|----------|
| **全称** | Module Configuration | Extend Module Configuration |
| **用途** | 普通功能/组件注册 | 扩展功能/组件注册 |
| **收集器** | `collector` (mcon) | `emconCollector` |
| **合并策略** | 直接覆盖 | 智能合并（相同 value 合并 extends.config） |
| **典型内容** | 组件懒加载、编辑器、路由 | 组件库定义、业务扩展配置 |
| **示例** | `gbcDefaultComponents` | `gbcEditors`、`billEditor_extends_control_group` |

### mcon.js 示例
**文件**：`src/code/gms-gbc-uicontrol/src/mcon.js`

```javascript
export default {
    // 全局默认组件（会被注册为 zDataModelSelect 等）
    gbcDefaultComponents: {
        DataModelSelect: () => import("./data-model-select"),
        AttributeSelect: () => import("./attribute-select"),
        ...
    },

    // 编辑器组件
    billEditor_components: {
        BussinessSettingBaseInfo,
        BussinessSettingDataModel,
        ...
    },

    // 编辑器定义
    gbcEditors: {
        BillEditor
    }
};
```

### emcon.js 示例
**文件**：`src/code/gms-gbc-designcomponent/src/emcon.js`

```javascript
export default {
    // 扩展控件组（页面设计器的组件面板）
    billEditor_extends_control_group: [
        {
            title: '容器',
            value: 'Container',
            controls: [
                { path: '容器', name: 'CardContainer', title: '卡片容器', ... },
                { path: '容器', name: 'GridLayout', title: '网格容器', ... },
                ...
            ]
        },
        ...
    ]
};
```

---

## 五、组件注册流程

### 1. 入口初始化（main.js）

```javascript
// main.js 第 85-86 行

// 收集所有 emcon.js（扩展配置）
GMS.getContext().getEmconCollector().updateElements(
    require.context('./code/', true, /^\.\/.*\/emcon\.js$/)
);

// 收集所有 mcon.js（普通配置）
GMS.getContext().getCollector().updateElements(
    require.context('./code/', true, /^\.\/.*\/mcon\.js$/)
);
```

### 2. 全局组件注册（mcon.js 导出组件）

**文件**：`src/code/gms-gbc-uicontrol/src/index.js`

```javascript
const zc = {
    DataModelSelect,
    AttributeSelect,
    ...
};

// 注册为全局组件：z + 组件名 → zDataModelSelect
const install = function (Vue, opts = {}) {
    Object.keys(zc).forEach((key) => {
        Vue.component("z" + key, zc[key]);
    });
};

Vue.use(install);
```

---

## 六、组件使用方式

### 1. 动态组件方式（推荐）

```javascript
// 通过 DefineCollector 获取组件
let components = GMS.DefineCollector.EditorDefineManager.getEditorDefinesByEditorName();
this.GMSGBCComponents = components.gbComponents;

// 模板中使用
<component :is="GMSGBCComponents.DataModelSelect" v-model="param.entity" />
```

### 2. 全局组件方式

```vue
<!-- 直接使用 z + 组件名 -->
<z-data-model-select v-model="value" />
```

### 3. 按名称获取

```javascript
// 获取单个组件定义
let component = GMS.getContext().getCollector().getElement("gbcDefaultComponents", "DataModelSelect");

// 获取某类型所有组件
let allEditors = GMS.getContext().getCollector().getElements("gbcEditors");
```

---

## 七、数据结构图解

```
GMS.getContext() ─────────────────────────────────────────┐
                                                           │
  ┌─────────────────────────────────────────────────────┐  │
  │                 elements{}                           │  │
  │                                                      │  │
  │   ┌─────────────────┐    ┌──────────────────────┐  │  │
  │   │  Collector(mcon)│    │ EmconCollector(emcon)│  │  │
  │   └─────────────────┘    └──────────────────────┘  │  │
  │                                                      │  │
  │   elements = {                    elements = {      │  │
  │     gbcDefaultComponents: {        gbcEditors: {   │  │
  │       DataModelSelect: ...,         BillEditor: ... │  │
  │       AttributeSelect: ...,       },                │  │
  │       ...                         billEditor_extends_ │  │
  │     },                              control_group: [  │  │
  │     billEditor_components: {           {...},       │  │
  │       ...                             {...}         │  │
  │     },                               ]             │  │
  │     gbcEditors: {                  },              │  │
  │       ...                           billEditor_extends_ │  │
  │     }                                 tab: [...],  │  │
  │   }                                   ...           │  │
  │                                       }            │  │
  └─────────────────────────────────────────────────────┘  │
                                                           │
  ┌─────────────────────────────────────────────────────┐  │
  │           DefineCollector                           │  │
  │   ┌─────────────────┐    ┌──────────────────────┐  │  │
  │   │EditorDefineManager│    │FunctionDefineManager│  │  │
  │   │  .init()         │    │  .init()            │  │  │
  │   │  .getEditorDef.. │    │                     │  │  │
  │   └─────────────────┘    └──────────────────────┘  │  │
  └─────────────────────────────────────────────────────┘  │
                                                           │
  ┌─────────────────────────────────────────────────────┐  │
  │         EditorDefineManager.getEditorDefinesBy...    │  │
  │                                                      │  │
  │   returns {                                         │  │
  │     editor_components,    ← billEditor_components   │  │
  │     editor_extends_tabs,  ← billEditor_extends_tab │  │
  │     editor_extends_control,← billEditor_extends_...│  │
  │     gbcDefaultComponents,  ← 全局默认组件            │  │
  │     gbComponents          ← 合并后的组件集合        │  │
  │   }                                                 │  │
  └─────────────────────────────────────────────────────┘  │
                                                           │
  ┌─────────────────────────────────────────────────────┐  │
  │         业务组件使用 gbComponents                    │  │
  │   <component :is="GMSGBCComponents.DataModelSelect"> │  │
  └─────────────────────────────────────────────────────┘  │
```

---

## 八、emcon 智能合并机制

当多个 emcon 文件中有相同 `value` 的配置时，会智能合并 `extends.config`：

```javascript
// emcon A
{
    billEditor_extends_tab: {
        "tab1": {
            value: "tab1",
            extends: {
                config: [{ key: "field1", ... }]
            }
        }
    }
}

// emcon B
{
    billEditor_extends_tab: {
        "tab1": {
            value: "tab1",
            extends: {
                config: [{ key: "field2", ... }]
            }
        }
    }
}

// 合并结果：field1 + field2 都会保留
{
    billEditor_extends_tab: {
        "tab1": {
            value: "tab1",
            extends: {
                config: [{ key: "field1", ... }, { key: "field2", ... }]
            }
        }
    }
}
```

---

## 九、总结

| 概念 | 说明 |
|------|------|
| **Collector** | 核心收集器类，负责收集、存储、合并组件定义 |
| **mcon** | 普通模块配置，直接覆盖式合并 |
| **emcon** | 扩展模块配置，智能合并相同 value 的配置 |
| **gbcDefaultComponents** | 全局默认组件，注册为 `z${Name}` 全局组件 |
| **gbComponents** | 合并后的完整组件集合，供业务组件使用 |
| **require.context** | Webpack 的 API，用于自动扫描匹配的文件 |
