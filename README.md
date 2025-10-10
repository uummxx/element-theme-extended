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
  $themes: (
    theme-1: (
      primary: red,
      success: green,
    ),
    theme-2: (
      primary: #ccc,
    ),
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
// src/main.ts
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import './styles/element/index.scss'

const app = createApp(App)
app.use(ElementPlus)

// 这里可以执行你的主题相关逻辑，或者直接使用 Element Plus
```
### 3.  主题切换
```ts
import { useThemes } from '@uummxx/element-theme-extended/utils'

const { toggleTheme, toggleDark } = useThemes({ themes: ['theme-1', 'theme-2'] })

toggleTheme('theme-1') // 主题1
toggleTheme('theme-2') // 主题2
toggleTheme('other-theme') // '切换失败' 主题不存在
toggleDark() // 亮色/暗色切换
toggleDark(true) // 暗色主题
toggleDark(false) // 亮色主题
```

### 4. 修改element-plus 其他样式(除主题外的样式)
```scss
// styles/element/element-plus.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $button-border-radius: (
    'large': 30px,
    'default': 20px,
    'small': 10px,
  )
);
```

## ⚠️ 注意事项

**不要在同一个 SCSS 文件中同时 `@forward` 官方 Element Plus 样式和 `@uummxx/element-theme-extended/utils` 的主题工具。**

否则可能会出现 Sass 错误：
### ✅ 正确示例

```scss
// a.scss
@forward '@uummxx/element-theme-extended/themes' with (
  $themes: (
    theme-1: (
      primary: red,
      success: green,
    ),
    theme-2: (
      primary: skyblue,
    ),
  )
);

@use '@uummxx/element-theme-extended/index'; // use dark theme and light theme
// // @use '@uummxx/element-theme-extended/dark'; //use dark theme  but need add .dark to html
// // @use '@uummxx/element-theme-extended/light'; // use light theme
```
``` scss
// b.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $button-border-radius: (
    'large': 30px,
    'default': 20px,
    'small': 10px,
  )
);
```
### ❌ 错误示例
```scss
// c.scss
@forward '@uummxx/element-theme-extended/themes' with (
  $themes: (
    theme-1: (
      primary: red,
      success: green,
    ),
    theme-2: (
      primary: skyblue,
    ),
  )
);

@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $button-border-radius: (
    'large': 30px,
    'default': 20px,
    'small': 10px,
  )
);
@use '@uummxx/element-theme-extended/index'; // use dark theme and light theme
// // @use '@uummxx/element-theme-extended/dark'; //use dark theme  but need add .dark to html
// // @use '@uummxx/element-theme-extended/light'; // use light theme
```
## 按需引入
```ts
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [vue(), AutoImport({
    include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    imports: [
      'vue'
    ],
    dts: 'types/auto-imports.d.ts',
    dirs: [
      'src/composables',
      'src/stores',
    ],
    resolvers: [ElementPlusResolver()],
    vueTemplate: true,
  }),

  // https://github.com/antfu/unplugin-vue-components
  Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue', 'md'],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    dts: 'types/components.d.ts',
    resolvers: [ElementPlusResolver({
      importStyle: 'sass',
    })],
  }),],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;@use "@/styles/element/element-plus.scss" as *;`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
```

## 🔹 目录结构

``` bash
@uummxx/element-theme-extended/
├─ src/
│  ├─ index.scss      # SCSS 入口文件
│  ├─ themes.scss     # 主题变量
│  ├─ mixins.scss     # 主题 mixin
│  ├─ var.scss        # 亮色模式变量
│  ├─ function.scss   # 生成主题函数
│  ├─ main.ts         # TS/JS 入口
│  ├─ utils.ts        # TS/JS 工具函数
│  └─ dark/
│     ├─ var.scss     # 暗色主题变量
│     └─ css_var.scss # 暗黑模式变量
├─ eslint.config.mjs  # eslint 配置
├─ package.json
└─ README.md
```

---

## 🔹 贡献与反馈

如果你发现任何问题或者有功能建议，请提交 [Issues](https://github.com/uummxx/element-theme-extended/issues) 或 Pull Request。

---

## 🔹 授权协议

MIT License © 2025 [uummxx](https://github.com/uummxx/element-theme-extended)
