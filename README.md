<a href="https://extension.js.org" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Powered%20by%20%7C%20Extension.js-0971fe" alt="Powered by Extension.js" align="right" /></a>

# cocos-forum-dark-theme

> 为 Cocos 论坛 (forum.cocos.org) 一键切换暗色主题。

## 项目介绍

为 [Cocos 论坛](https://forum.cocos.org/) 一键切换暗色主题的浏览器扩展，支持 Chrome / Edge / Firefox。

论坛使用的是旧版 Discourse，样式表里全是编译后的固定色值，没有可覆盖的 CSS 变量，因此扩展采用整页反色（`invert(1) hue-rotate(180deg)`）实现暗色模式，并对图片、视频等媒体做二次反色以还原真实颜色。

特性：

- 点击浏览器工具栏图标即可在明 / 暗主题间切换
- 状态持久保存，重新打开页面仍保持上次的主题
- 多个标签页实时同步切换

## 使用说明

1. 构建插件（命令见下方 [Commands](#commands)），或从 [Releases](https://github.com/CosmoLau/cocos-forum-dark-theme/releases) 下载对应浏览器的 zip 并解压
2. 打开浏览器的扩展管理页，开启「开发者模式」
3. 选择「加载已解压的扩展程序」，指向构建产物目录（如 `dist/chrome`；Firefox 用 `dist/firefox`）
4. 打开 [forum.cocos.org](https://forum.cocos.org/)，点击工具栏图标即可切换暗色主题

## Commands

### dev

Run the extension in development mode. Target a browser with `--browser`:

```bash
bun run dev
bun run dev -- --browser=firefox
bun run dev -- --browser=edge
```

### build

Build for production. Convenience scripts target each browser:

```bash
bun run build           # Chromium (default)
bun run build:firefox
bun run build:edge
```

### preview

Preview the production build in the browser:

```bash
bun run preview
```

## Learn more

[Extension.js docs](https://extension.js.org).
