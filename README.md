# @uummxx/element-theme-extended

> Element Plus 主题扩展包，提供可定制的 SCSS 变量、暗黑/亮色模式支持，以及额外的 mixin，方便快速定制 Element Plus 组件库主题。

---

## 🔹 功能特性

- 完全兼容 **Element Plus** 的 `theme-chalk` 主题  
- 提供 **暗黑/亮色模式**支持  
- 可自定义 SCSS 变量，轻松修改主色、成功色、警告色、危险色等  
- 内置 **主题 mixin**，方便快速生成组件样式  
- 支持 **TypeScript/JavaScript** 和 **Sass** 引入  

---

## 🔹 安装

使用 `pnpm`：

```bash
pnpm add @uummxx/element-theme-extended
````

使用 `npm`：

```bash
npm install @uummxx/element-theme-extended
```

使用 `yarn`：

```bash
yarn add @uummxx/element-theme-extended
```

---

## 🔹 使用方法

### 1.  新建一个样式文件，例如 styles/element/index.scss

```scss
// styles/element/index.scss
@forward '@uummxx/element-theme-extended/themes' with (
    $themes:(
        theme-1:(
            primary:red,
            success:green
        ),
        theme-2:(
            primary:#ccc
        )
    )
);
// 如果你想导入element-plus所有样式:
// @use "element-plus/theme-chalk/src/index.scss" as *;

// 同时使用亮色和暗色主题
@use '@uummxx/element-theme-extended/index.scss'; 

// 只是用亮色
// @use '@uummxx/element-theme-extended/light.scss';

// 只使用暗色
// @use '@uummxx/element-theme-extended/dark.scss'

```
### 2. 在 TypeScript / JavaScript 中引入

```ts
import { createApp } from 'vue'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)

// 这里可以执行你的主题相关逻辑，或者直接使用 Element Plus
```
### 3.  主题切换
```ts
function toggleTheme(theme:string){
    document.documentElement.classList.add(theme)
}

toggleTheme('theme-1') // 亮色
toggleTheme('theme-1 dark') // 暗色
```

## 🔹 目录结构

```
@uummxx/element-theme-extended/
├─ src/
│  ├─ index.scss      # SCSS 入口文件
│  ├─ themes.scss     # 主题变量
│  ├─ mixins.scss     # 主题 mixin
│  ├─ var.scss        # 亮色模式变量
│  └─ dark/
│     ├─ var.scss     # 暗色主题变量
│     └─ css_var.scss # 暗黑模式变量
├─ src/main.ts        # TS/JS 入口
├─ package.json
└─ README.md
```

---

## 🔹 贡献与反馈

如果你发现任何问题或者有功能建议，请提交 [Issues](https://github.com/BF-zh/element-theme-extended/issues) 或 Pull Request。

---

## 🔹 授权协议

MIT License © 2025 [BF-zh](https://github.com/BF-zh/element-theme-extended)

