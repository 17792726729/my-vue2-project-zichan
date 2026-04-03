# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 2 项目，使用 Vue CLI 构建，集成了 View UI (iView) 组件库和 VxeTable 表格组件。项目主要实现资产新功能demo。

## 常用命令

```bash
# 安装依赖
npm install

# 开发环境启动
npm run serve

# 生产构建
npm run build

# ESLint 检查并自动修复
npm run lint
```

## 技术栈

- **Vue 2.6** - 核心框架
- **Vue CLI 4.5** - 构建工具
- **View UI 4.7.1** - UI 组件库
- **VxeTable 3.7.10** - 表格组件（配合 vxe-table-plugin-iview 使用）
- **Less** - 样式预处理器
- **Axios** - HTTP 请求库

## 代码架构

### 组件导出约定

组件使用 `index.js` 作为 barrel export 入口，如 [index.js](src/components/plbj/views/batchEdit/index.js) 导出 BatchEditModal。

### 样式规范

- 使用 Less 预处理器，组件内使用 `<style lang="less" scoped>` 局部样式
- 全局 reset 样式在 [App.vue](src/App.vue) 中定义

## 关键文件

- [src/main.js](src/main.js) - Vue 应用入口，注册 ViewUI 和 VxeTable 插件
- [src/App.vue](src/App.vue) - 根组件，演示新功能demo使用方式
