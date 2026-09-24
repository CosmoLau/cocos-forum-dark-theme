const isFirefoxLike =
  import.meta.env.EXTENSION_PUBLIC_BROWSER === 'firefox' ||
  import.meta.env.EXTENSION_PUBLIC_BROWSER === 'gecko-based'

const STORAGE_KEY = 'darkMode'

// 点击工具栏图标翻转暗色状态。状态只存在 chrome.storage.local，
// 页面侧的 content script 监听 storage 变更来同步，无需消息通道。
function toggleDarkMode() {
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    chrome.storage.local.set({[STORAGE_KEY]: !result[STORAGE_KEY]})
  })
}

if (isFirefoxLike) {
  // Firefox (MV2) 的工具栏按钮是 browserAction。
  browser.browserAction.onClicked.addListener(toggleDarkMode)
} else {
  chrome.action.onClicked.addListener(toggleDarkMode)
}
