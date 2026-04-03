# 安全规范

本项目前端代码的安全规范，用于指导安全编码实践。

## XSS 防护

### 必须遵守

1. **永远不要将用户输入直接插入 HTML**
   - 禁止：`element.innerHTML = userInput`
   - 使用：`element.textContent = userInput` 或 `element.innerText = userInput`

2. **Vue 模板中避免使用 v-html 绑定用户输入**
   - 如果必须使用，确保内容经过严格消毒处理
   - 优先使用文本插值 `{{ }}` 而非 `v-html`

3. **URL 参数必须编码**
   - 使用 `encodeURIComponent()` 处理用户输入的 URL 参数

### 示例

```javascript
// 错误
this.content = `<div>${userInput}</div>`

// 正确
this.content = userInput // Vue 会自动转义
```

## 敏感信息处理

### 禁止事项

1. **禁止在前端代码中硬编码**
   - 密码、私钥、Token、API Secret
   - 数据库连接字符串
   - 认证凭据

2. **禁止在 localStorage/sessionStorage 中存储**
   - 敏感的用户信息
   - 未经加密的个人数据

### 推荐做法

1. Token 存储在内存中或使用 HttpOnly Cookie
2. 敏感配置通过环境变量注入
3. API 请求通过 HTTPS 进行

## 权限控制

1. **前端不存储权限状态**，仅做展示
2. **所有权限验证必须在后端完成**
3. **前端隐藏/禁用功能不等于安全**

## 第三方资源

1. **CDN 资源必须使用 HTTPS**
2. **谨慎使用第三方脚本**，尤其是嵌入的第三方 SDK
3. **图片/媒体资源不要从不可信来源加载**

## 常见漏洞预防

| 漏洞类型 | 预防措施 |
|---------|---------|
| XSS | 转义用户输入、使用 CSP |
| CSRF | 使用 SameSite Cookie、验证请求来源 |
| 注入 | 参数化查询、不拼接用户输入到命令 |
