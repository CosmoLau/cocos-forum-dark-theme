const STORAGE_KEY = 'darkMode'
const DARK_CLASS = 'cocos-dark'

// forum.cocos.org 是旧版 Discourse，样式表里全是编译后的固定色值，
// 没有 CSS 变量可覆盖，所以用整页反色实现暗色。
// filter 按规范放在根元素上不会影响 position: fixed 的定位，弹层不受影响。
const DARK_THEME_CSS = `
html.${DARK_CLASS} {
  background-color: #fff !important;
  filter: invert(1) hue-rotate(180deg) !important;
}

/* 图片、视频等媒体做二次反色，还原真实颜色 */
html.${DARK_CLASS} :is(img, video, canvas, iframe, embed, object) {
  filter: invert(1) hue-rotate(180deg) !important;
}

/* 全屏纯黑遮罩会被反成刺眼的白色，同样二次反色还原 */
html.${DARK_CLASS} :is(.mfp-bg, .emoji-picker-modal.fadeIn) {
  filter: invert(1) hue-rotate(180deg) !important;
}
`

/**
 * Extension.js content_script entrypoint. The framework calls this on
 * injection and calls the returned function on HMR/teardown to clean up.
 * Do not invoke it yourself.
 */
export default function initial() {
  // 暗色样式常驻注入，规则都限定在 html.cocos-dark 下，
  // 切换主题只需给 <html> 增删 class，无需反复注入/移除样式。
  const styleElement = document.createElement('style')
  styleElement.textContent = DARK_THEME_CSS
  document.documentElement.appendChild(styleElement)

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle(DARK_CLASS, dark)
  }

  // 打开页面时按存储的状态决定明暗。
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    apply(Boolean(result[STORAGE_KEY]))
  })

  // 工具栏图标改的是 storage，各标签页监听变更即可实时同步。
  const onStorageChanged = (
    changes: {[key: string]: chrome.storage.StorageChange},
    areaName: string
  ) => {
    if (areaName === 'local' && changes[STORAGE_KEY]) {
      apply(Boolean(changes[STORAGE_KEY].newValue))
    }
  }
  chrome.storage.onChanged.addListener(onStorageChanged)

  return () => {
    chrome.storage.onChanged.removeListener(onStorageChanged)
    document.documentElement.classList.remove(DARK_CLASS)
    styleElement.remove()
  }
}
