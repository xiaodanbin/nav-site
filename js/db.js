/**
 * 数据存储模块 - 完整复刻 adzhp.cc
 */

// 数据键名
const DB_KEYS = {
    USERS: 'nav_users',
    SITES: 'nav_sites',
    CATEGORIES: 'nav_categories',
    FAVORITES: 'nav_favorites',
    NEWS: 'nav_news',
    LOGGED_IN: 'nav_logged_in',
    VISITS: 'nav_visits',
    CLICK_STATS: 'nav_click_stats',
    SETTINGS: 'nav_settings'  // 用户设置
};

// 用户设置
const DEFAULT_SETTINGS = {
    searchEngine: 'baidu',
    theme: 'auto',
    collapsedCategories: []
};

// 完整分类列表
const DEFAULT_CATEGORIES = [
    // 常用站点
    { id: 'term-30', name: '常用站点', icon: '⭐', parent: null },
    { id: 'term-30-32', name: '阅读', icon: '📖', parent: 'term-30' },
    { id: 'term-30-1661', name: 'AI工具', icon: '🤖', parent: 'term-30' },
    { id: 'term-30-31', name: '购物', icon: '🛒', parent: 'term-30' },
    { id: 'term-30-15', name: '直播', icon: '📺', parent: 'term-30' },
    { id: 'term-30-1665', name: '翻译', icon: '🌍', parent: 'term-30' },
    { id: 'term-30-1662', name: '网盘', icon: '💾', parent: 'term-30' },
    { id: 'term-30-1663', name: '邮箱', icon: '📧', parent: 'term-30' },
    { id: 'term-30-33', name: '视频', icon: '🎬', parent: 'term-30' },
    { id: 'term-30-34', name: '搜索', icon: '🔍', parent: 'term-30' },
    { id: 'term-30-1664', name: '游戏', icon: '🎮', parent: 'term-30' },

    // 酷站推荐
    { id: 'term-24', name: '酷站推荐', icon: '🔥', parent: null },
    { id: 'term-24-23', name: '导航', icon: '🧭', parent: 'term-24' },
    { id: 'term-24-101', name: '工具', icon: '🛠️', parent: 'term-24' },
    { id: 'term-24-1073', name: '资源', icon: '📦', parent: 'term-24' },
    { id: 'term-24-65', name: 'PPT', icon: '📊', parent: 'term-24' },
    { id: 'term-24-81', name: '生活', icon: '🏠', parent: 'term-24' },

    // 设计创意
    { id: 'term-16', name: '设计创意', icon: '🎨', parent: null },
    { id: 'term-16-25', name: '素材', icon: '🖼️', parent: 'term-16' },
    { id: 'term-16-1659', name: '工具', icon: '🛠️', parent: 'term-16' },

    // 开发
    { id: 'term-18', name: '开发', icon: '💻', parent: null },
    { id: 'term-18-43', name: '前端', icon: '🌐', parent: 'term-18' },
    { id: 'term-18-87', name: '后端', icon: '⚙️', parent: 'term-18' },
    { id: 'term-18-42', name: '工具', icon: '🔧', parent: 'term-18' },
    { id: 'term-18-147', name: '建站', icon: '🚀', parent: 'term-18' },
    { id: 'term-18-72', name: '主机', icon: '🖥️', parent: 'term-18' },

    // 生活服务
    { id: 'term-19', name: '生活服务', icon: '🏠', parent: null },
    { id: 'term-19-35', name: '出行', icon: '✈️', parent: 'term-19' },
    { id: 'term-19-36', name: '健康', icon: '🏥', parent: 'term-19' },

    // 学术
    { id: 'term-17', name: '学术', icon: '🎓', parent: null },
    { id: 'term-17-54', name: '知识', icon: '💡', parent: 'term-17' },
    { id: 'term-17-56', name: '语言', icon: '📝', parent: 'term-17' },
    { id: 'term-17-74', name: '课程', icon: '📚', parent: 'term-17' },

    // 多媒体
    { id: 'term-40', name: '多媒体', icon: '🎵', parent: null },
    { id: 'term-40-41', name: '音乐', icon: '🎶', parent: 'term-40' },
    { id: 'term-40-73', name: '下载', icon: '⬇️', parent: 'term-40' },

    // 电影
    { id: 'term-21', name: '电影', icon: '🎞️', parent: null },
    { id: 'term-21-52', name: '影视', icon: '🎬', parent: 'term-21' },
    { id: 'term-21-53', name: '直播', icon: '📺', parent: 'term-21' },

    // 游戏
    { id: 'term-22', name: '游戏', icon: '🎮', parent: null },
    { id: 'term-22-27', name: '游戏', icon: '🎯', parent: 'term-22' },
    { id: 'term-22-28', name: '资讯', icon: '📰', parent: 'term-22' },
    { id: 'term-22-45', name: '资源', icon: '📦', parent: 'term-22' },

    // 书籍
    { id: 'term-340', name: '书籍', icon: '📚', parent: null },

    // 热门推荐
    { id: 'term-hot', name: '热门推荐', icon: '🔥', parent: null },
];

// 完整网站数据
const DEFAULT_SITES = [
    // ========== 热门推荐 ==========
    { id: 1, name: '秘塔AI搜索', url: 'https://metaso.cn', desc: '免费AI搜索引擎', icon: '🔍', category: 'term-hot', tags: ['AI', '搜索'], views: 10000, hot: true },
    { id: 2, name: '可可免费影视', url: 'https://vip.kekemv.com', desc: '免费影视', icon: '🎬', category: 'term-hot', tags: ['影视'], views: 8000, hot: true },
    { id: 3, name: '555电影', url: 'https://555dy.fun', desc: '高清电影', icon: '🎞️', category: 'term-hot', tags: ['影视'], views: 7500, hot: true },
    { id: 4, name: 'AI生成PPT', url: 'https://www.aippt.cn', desc: 'AI智能生成PPT', icon: '📊', category: 'term-hot', tags: ['PPT', 'AI'], views: 7000, hot: true },
    { id: 5, name: '大米星球', url: 'https://dmxq.fun', desc: '影视资源', icon: '🌟', category: 'term-hot', tags: ['影视'], views: 6500, hot: true },
    { id: 6, name: '低价流量卡', url: 'https://ka.huojukj.com', desc: '站长自营流量卡', icon: '📱', category: 'term-hot', tags: ['生活'], views: 6000, hot: true },
    { id: 7, name: '聚合云盘搜索', url: 'https://www.juhev.com', desc: '云盘资源搜索', icon: '🔗', category: 'term-hot', tags: ['搜索'], views: 5500, hot: true },
    { id: 8, name: 'PaperFake', url: 'https://paperfake.com', desc: 'AI写论文', icon: '📝', category: 'term-hot', tags: ['AI', '学术'], views: 5000, hot: true },

    // ========== AI工具 ==========
    { id: 10, name: 'ChatGPT', url: 'https://chat.openai.com', desc: 'OpenAI AI对话助手', icon: '🤖', category: 'term-30-1661', tags: ['AI', '对话'], views: 5000 },
    { id: 11, name: 'Claude', url: 'https://claude.ai', desc: 'Anthropic AI助手', icon: '🧠', category: 'term-30-1661', tags: ['AI'], views: 3000 },
    { id: 12, name: 'Kimi', url: 'https://kimi.moonshot.cn', desc: '月之暗面AI助手', icon: '🌙', category: 'term-30-1661', tags: ['AI', '中文'], views: 2500 },
    { id: 13, name: '文心一言', url: 'https://yiyan.baidu.com', desc: '百度AI助手', icon: '🖌️', category: 'term-30-1661', tags: ['AI', '中文'], views: 2000 },
    { id: 14, name: '通义千问', url: 'https://tongyi.aliyun.com', desc: '阿里AI助手', icon: '🐉', category: 'term-30-1661', tags: ['AI'], views: 1800 },
    { id: 15, name: 'Perplexity', url: 'https://www.perplexity.ai', desc: 'AI搜索问答', icon: '🔮', category: 'term-30-1661', tags: ['AI', '搜索'], views: 1500 },
    { id: 16, name: 'Midjourney', url: 'https://www.midjourney.com', desc: 'AI绘画工具', icon: '🎨', category: 'term-30-1661', tags: ['AI', '绘画'], views: 2000 },
    { id: 17, name: 'Stable Diffusion', url: 'https://stablec Diffusion.com', desc: 'AI图像生成', icon: '🖼️', category: 'term-30-1661', tags: ['AI', '绘画'], views: 1800 },
    { id: 18, name: 'Copilot', url: 'https://copilot.microsoft.com', desc: '微软AI助手', icon: '💬', category: 'term-30-1661', tags: ['AI'], views: 1500 },

    // ========== 搜索引擎 ==========
    { id: 20, name: '百度', url: 'https://www.baidu.com', desc: '百度搜索', icon: '🔎', category: 'term-30-34', tags: ['搜索'], views: 10000 },
    { id: 21, name: 'Google', url: 'https://www.google.com', desc: '谷歌搜索', icon: '🌐', category: 'term-30-34', tags: ['搜索'], views: 8000 },
    { id: 22, name: '必应', url: 'https://www.bing.com', desc: '微软必应搜索', icon: '🔵', category: 'term-30-34', tags: ['搜索'], views: 4000 },
    { id: 23, name: '搜狗', url: 'https://www.sogou.com', desc: '搜狗搜索', icon: '🐶', category: 'term-30-34', tags: ['搜索'], views: 2000 },
    { id: 24, name: '神马搜索', url: 'https://m.sm.cn', desc: '神马搜索', icon: '🗺️', category: 'term-30-34', tags: ['搜索'], views: 1500 },
    { id: 25, name: 'Yandex', url: 'https://yandex.com', desc: '俄罗斯搜索引擎', icon: '🌍', category: 'term-30-34', tags: ['搜索'], views: 1000 },
    { id: 26, name: '秘塔搜索', url: 'https://metaso.cn', desc: 'AI搜索引擎', icon: '🔍', category: 'term-30-34', tags: ['搜索', 'AI'], views: 5000 },

    // ========== 视频 ==========
    { id: 30, name: '哔哩哔哩', url: 'https://www.bilibili.com', desc: '国内知名视频网站', icon: '📺', category: 'term-30-33', tags: ['视频'], views: 15000 },
    { id: 31, name: 'YouTube', url: 'https://www.youtube.com', desc: '全球最大视频网站', icon: '▶️', category: 'term-30-33', tags: ['视频'], views: 12000 },
    { id: 32, name: '抖音', url: 'https://www.douyin.com', desc: '短视频平台', icon: '🎵', category: 'term-30-33', tags: ['视频', '短视频'], views: 10000 },
    { id: 33, name: '爱奇艺', url: 'https://www.iqiyi.com', desc: '在线视频平台', icon: '🎞️', category: 'term-30-33', tags: ['视频'], views: 6000 },
    { id: 34, name: '优酷', url: 'https://www.youku.com', desc: '优酷视频', icon: '▶️', category: 'term-30-33', tags: ['视频'], views: 4000 },
    { id: 35, name: '腾讯视频', url: 'https://v.qq.com', desc: '腾讯视频', icon: '📺', category: 'term-30-33', tags: ['视频'], views: 5000 },

    // ========== 影视 ==========
    { id: 40, name: '可可影视', url: 'https://vip.kekemv.com', desc: '免费影视', icon: '🎬', category: 'term-21-52', tags: ['影视'], views: 8000 },
    { id: 41, name: '555电影', url: 'https://555dy.fun', desc: '高清电影', icon: '🎞️', category: 'term-21-52', tags: ['影视'], views: 7500 },
    { id: 42, name: '大米星球', url: 'https://dmxq.fun', desc: '影视资源', icon: '🌟', category: 'term-21-52', tags: ['影视'], views: 7000 },
    { id: 43, name: '天空影视', url: 'https://tksk.tv', desc: '在线影视', icon: '☁️', category: 'term-21-52', tags: ['影视'], views: 5000 },
    { id: 44, name: '厂长资源', url: 'https://czzy.tv', desc: '影视资源', icon: '🏭', category: 'term-21-52', tags: ['影视'], views: 4500 },
    { id: 45, name: 'Kimivod', url: 'https://www.kimivod.com', desc: '影视平台', icon: '🎥', category: 'term-21-52', tags: ['影视'], views: 4000 },
    { id: 46, name: 'FreeOK', url: 'https://freeok.vip', desc: '免费影视', icon: '✅', category: 'term-21-52', tags: ['影视'], views: 3500 },
    { id: 47, name: '独播库', url: 'https://duboku.tv', desc: '影视聚合', icon: '📦', category: 'term-21-52', tags: ['影视'], views: 3000 },
    { id: 48, name: '修罗影视', url: 'https://xx520.top', desc: '在线影视', icon: '⚔️', category: 'term-21-52', tags: ['影视'], views: 2800 },
    { id: 49, name: '4K影视', url: 'https://4kys.com', desc: '高清影视', icon: '📺', category: 'term-21-52', tags: ['影视'], views: 2500 },
    { id: 50, name: '注视影视', url: 'https://gaze.vip', desc: '影视平台', icon: '👁️', category: 'term-21-52', tags: ['影视'], views: 2200 },
    { id: 51, name: '统一影视', url: 'https://ty.tv', desc: '影视聚合', icon: '🔗', category: 'term-21-52', tags: ['影视'], views: 2000 },

    // ========== 购物 ==========
    { id: 60, name: '淘宝', url: 'https://www.taobao.com', desc: '综合性购物网站', icon: '🛍️', category: 'term-30-31', tags: ['购物'], views: 20000 },
    { id: 61, name: '京东', url: 'https://www.jd.com', desc: '正品购物平台', icon: '📱', category: 'term-30-31', tags: ['购物'], views: 15000 },
    { id: 62, name: '拼多多', url: 'https://www.pinduoduo.com', desc: '社交电商平台', icon: '🛒', category: 'term-30-31', tags: ['购物'], views: 12000 },
    { id: 63, name: '天猫', url: 'https://www.tmall.com', desc: '品牌购物平台', icon: '🏪', category: 'term-30-31', tags: ['购物'], views: 10000 },
    { id: 64, name: '唯品会', url: 'https://www.vip.com', desc: '品牌特卖', icon: '👗', category: 'term-30-31', tags: ['购物'], views: 5000 },

    // ========== 网盘 ==========
    { id: 70, name: '百度网盘', url: 'https://pan.baidu.com', desc: '百度云存储', icon: '💾', category: 'term-30-1662', tags: ['网盘'], views: 15000 },
    { id: 71, name: '阿里云盘', url: 'https://www.aliyundrive.com', desc: '阿里云盘', icon: '☁️', category: 'term-30-1662', tags: ['网盘'], views: 8000 },
    { id: 72, name: '夸克网盘', url: 'https://pan.quark.cn', desc: '夸克网盘', icon: '⚡', category: 'term-30-1662', tags: ['网盘'], views: 5000 },
    { id: 73, name: '迅雷', url: 'https://www.xunlei.com', desc: '下载工具', icon: '⚡', category: 'term-30-1662', tags: ['下载'], views: 6000 },
    { id: 74, name: '蓝奏云', url: 'https://www.lanzou.com', desc: '蓝奏云存储', icon: '☁️', category: 'term-30-1662', tags: ['网盘'], views: 4000 },
    { id: 75, name: '聚合云盘搜索', url: 'https://www.juhev.com', desc: '云盘资源搜索', icon: '🔍', category: 'term-30-1662', tags: ['搜索'], views: 5500 },
    { id: 76, name: '盘了个盘', url: 'https://panlepan.com', desc: '云盘搜索', icon: '📁', category: 'term-30-1662', tags: ['搜索'], views: 3000 },
    { id: 77, name: '大力盘', url: 'https://dalipanquan.com', desc: '网盘搜索', icon: '💪', category: 'term-30-1662', tags: ['搜索'], views: 2500 },
    { id: 78, name: '凌风云搜索', url: 'https://www.linfengyun.com', desc: '资源搜索', icon: '🌬️', category: 'term-30-1662', tags: ['搜索'], views: 2000 },

    // ========== 邮箱 ==========
    { id: 80, name: 'QQ邮箱', url: 'https://mail.qq.com', desc: '腾讯QQ邮箱', icon: '📧', category: 'term-30-1663', tags: ['邮箱'], views: 12000 },
    { id: 81, name: '163邮箱', url: 'https://mail.163.com', desc: '网易邮箱', icon: '📨', category: 'term-30-1663', tags: ['邮箱'], views: 6000 },
    { id: 82, name: 'Gmail', url: 'https://mail.google.com', desc: 'Google邮箱', icon: '✉️', category: 'term-30-1663', tags: ['邮箱'], views: 8000 },
    { id: 83, name: 'Outlook', url: 'https://outlook.live.com', desc: '微软邮箱', icon: '📬', category: 'term-30-1663', tags: ['邮箱'], views: 4000 },

    // ========== 翻译 ==========
    { id: 90, name: 'Google翻译', url: 'https://translate.google.com', desc: 'Google翻译', icon: '🌍', category: 'term-30-1665', tags: ['翻译'], views: 8000 },
    { id: 91, name: 'DeepL', url: 'https://www.deepl.com', desc: 'DeepL翻译', icon: '🌐', category: 'term-30-1665', tags: ['翻译'], views: 5000 },
    { id: 92, name: '有道翻译', url: 'https://fanyi.youdao.com', desc: '网易有道翻译', icon: '📖', category: 'term-30-1665', tags: ['翻译'], views: 4000 },

    // ========== 阅读 ==========
    { id: 100, name: '知乎', url: 'https://www.zhihu.com', desc: '中文问答社区', icon: '❓', category: 'term-30-32', tags: ['问答'], views: 12000 },
    { id: 101, name: '豆瓣', url: 'https://www.douban.com', desc: '豆瓣社区', icon: '📚', category: 'term-30-32', tags: ['社区'], views: 8000 },
    { id: 102, name: '小红书', url: 'https://www.xiaohongshu.com', desc: '生活方式分享', icon: '📕', category: 'term-30-32', tags: ['分享'], views: 10000 },
    { id: 103, name: '微博', url: 'https://weibo.com', desc: '新浪微博', icon: '📱', category: 'term-30-32', tags: ['社交'], views: 12000 },
    { id: 104, name: '简书', url: 'https://www.jianshu.com', desc: '写作社区', icon: '✍️', category: 'term-30-32', tags: ['写作'], views: 4000 },
    { id: 105, name: '虎扑', url: 'https://www.hupu.com', desc: '体育社区', icon: '🏀', category: 'term-30-32', tags: ['体育'], views: 5000 },
    { id: 106, name: '少数派', url: 'https://sspai.com', desc: '数字生活指南', icon: '🔧', category: 'term-30-32', tags: ['科技'], views: 3000 },
    { id: 107, name: '即刻', url: 'https://web.okjike.com', desc: '年轻人社区', icon: '⚡', category: 'term-30-32', tags: ['社区'], views: 2500 },
    { id: 108, name: '36氪', url: 'https://36kr.com', desc: '创业投资资讯', icon: '📰', category: 'term-30-32', tags: ['资讯'], views: 3000 },
    { id: 109, name: '微信读书', url: 'https://weread.qq.com', desc: '微信读书', icon: '📖', category: 'term-30-32', tags: ['阅读'], views: 4000 },
    { id: 110, name: '百度贴吧', url: 'https://tieba.baidu.com', desc: '百度贴吧', icon: '🏳️', category: 'term-30-32', tags: ['社区'], views: 6000 },
    { id: 111, name: '煎蛋', url: 'https://jandan.net', desc: '快乐源泉', icon: '🥚', category: 'term-30-32', tags: ['娱乐'], views: 3000 },
    { id: 112, name: '映像星球', url: 'https://yxq.im', desc: '影像分享', icon: '🌍', category: 'term-30-32', tags: ['分享'], views: 2000 },

    // ========== 酷站 - 导航 ==========
    { id: 120, name: '链接星球', url: 'https://linkqiu.com', desc: '资源网址导航', icon: '🧭', category: 'term-24-23', tags: ['导航'], views: 5000 },
    { id: 121, name: '有趣网址之家', url: 'https://youquhome.com', desc: '收集有趣的网站', icon: '🏠', category: 'term-24-23', tags: ['导航'], views: 3000 },
    { id: 122, name: '熊猫搜索导航', url: 'https://xmsoushu.com', desc: '搜索导航', icon: '🐼', category: 'term-24-23', tags: ['导航'], views: 2000 },

    // ========== 酷站 - 工具 ==========
    { id: 130, name: '123APPs', url: 'https://123apps.com', desc: '在线工具集合', icon: '🛠️', category: 'term-24-101', tags: ['工具'], views: 4000 },
    { id: 131, name: '即时工具', url: 'https://www.jishidashuju.com', desc: '在线工具箱', icon: '🔧', category: 'term-24-101', tags: ['工具'], views: 3000 },
    { id: 132, name: 'MikuTools', url: 'https://miku.tools', desc: 'Miku工具箱', icon: '🛠️', category: 'term-24-101', tags: ['工具'], views: 2500 },
    { id: 133, name: '一个工具箱', url: 'https://www.alternateideashare.com', desc: '工具集合', icon: '🧰', category: 'term-24-101', tags: ['工具'], views: 2000 },
    { id: 134, name: 'PickFrom', url: 'https://pickfrom.net', desc: '在线工具集合', icon: '📦', category: 'term-24-101', tags: ['工具'], views: 1500 },
    { id: 135, name: '老弟工具', url: 'https://www.laoji.org', desc: 'Windows工具', icon: '🖥️', category: 'term-24-101', tags: ['工具', 'Win'], views: 2000 },
    { id: 136, name: '一个木函', url: 'https://web.woobx.cn', desc: '工具箱', icon: '📎', category: 'term-24-101', tags: ['工具'], views: 1800 },
    { id: 137, name: '优工具', url: 'https://www.yougools.com', desc: '在线工具', icon: '🛠️', category: 'term-24-101', tags: ['工具'], views: 1200 },
    { id: 138, name: 'toolfk', url: 'https://www.toolfk.com', desc: '程序员工具', icon: '💻', category: 'term-24-101', tags: ['工具', '程序员'], views: 1500 },
    { id: 139, name: '菜鸟工具', url: 'https://c.runoob.com', desc: '在线编程工具', icon: '📝', category: 'term-24-101', tags: ['工具', '编程'], views: 3000 },
    { id: 140, name: '爱资料工具箱', url: 'https://www.aiziliao.com', desc: '资料工具', icon: '📚', category: 'term-24-101', tags: ['工具'], views: 1500 },
    { id: 141, name: '独特工具箱', url: 'https://www.dute.org', desc: '工具集合', icon: '🔧', category: 'term-24-101', tags: ['工具'], views: 1000 },
    { id: 142, name: '程序员工具箱', url: 'https://www.ttlsa.com', desc: '程序员工具', icon: '💻', category: 'term-24-101', tags: ['工具'], views: 1200 },
    { id: 143, name: '效率提升工具', url: 'https://www.uTools.cn', desc: '效率工具', icon: '⚡', category: 'term-24-101', tags: ['工具'], views: 1800 },

    // ========== PPT ==========
    { id: 150, name: 'AI生成PPT', url: 'https://www.aippt.cn', desc: 'AI智能生成PPT', icon: '📊', category: 'term-24-65', tags: ['PPT', 'AI'], views: 8000 },
    { id: 151, name: 'Gamma', url: 'https://gamma.app', desc: 'AI演示文稿', icon: '📈', category: 'term-24-65', tags: ['PPT', 'AI'], views: 3000 },
    { id: 152, name: 'Canva', url: 'https://www.canva.com', desc: '在线设计', icon: '🎨', category: 'term-24-65', tags: ['设计'], views: 5000 },
    { id: 153, name: '创客贴', url: 'https://www.chuangkit.com', desc: '在线设计工具', icon: '✂️', category: 'term-24-65', tags: ['设计'], views: 4000 },
    { id: 154, name: '51PPT', url: 'https://www.51pptmoban.com', desc: 'PPT模板', icon: '📑', category: 'term-24-65', tags: ['PPT'], views: 3000 },
    { id: 155, name: '第一PPT', url: 'https://www.1ppt.com', desc: 'PPT模板', icon: '📄', category: 'term-24-65', tags: ['PPT'], views: 2500 },
    { id: 156, name: 'PPT超级市场', url: 'https://www.pptsc.com', desc: 'PPT资源', icon: '🛒', category: 'term-24-65', tags: ['PPT'], views: 2000 },
    { id: 157, name: '锐普PPT', url: 'https://www.rapidppt.com', desc: 'PPT模板', icon: '📊', category: 'term-24-65', tags: ['PPT'], views: 1800 },
    { id: 158, name: 'OfficePLUS', url: 'https://www.officeplus.cn', desc: '微软官方模板', icon: '📦', category: 'term-24-65', tags: ['PPT'], views: 2000 },
    { id: 159, name: 'HiPPTER', url: 'https://www.hippter.com', desc: 'PPT资源', icon: '🏃', category: 'term-24-65', tags: ['PPT'], views: 1500 },

    // ========== 开发 - 前端 ==========
    { id: 170, name: 'GitHub', url: 'https://github.com', desc: '代码托管平台', icon: '🐙', category: 'term-18-43', tags: ['代码'], views: 20000 },
    { id: 171, name: 'Gitee', url: 'https://gitee.com', desc: '代码托管平台', icon: '🐱', category: 'term-18-43', tags: ['代码'], views: 8000 },
    { id: 172, name: 'Stack Overflow', url: 'https://stackoverflow.com', desc: '程序员问答社区', icon: '❓', category: 'term-18-43', tags: ['社区'], views: 10000 },
    { id: 173, name: 'MDN', url: 'https://developer.mozilla.org', desc: 'Web开发文档', icon: '🦎', category: 'term-18-43', tags: ['文档'], views: 7000 },
    { id: 174, name: '菜鸟教程', url: 'https://www.runoob.com', desc: '编程学习网站', icon: '📖', category: 'term-18-43', tags: ['学习'], views: 6000 },
    { id: 175, name: 'W3School', url: 'https://www.w3school.com.cn', desc: 'Web技术教程', icon: '🌐', category: 'term-18-43', tags: ['学习'], views: 5000 },
    { id: 176, name: 'CodePen', url: 'https://codepen.io', desc: '在线代码编辑器', icon: '📝', category: 'term-18-43', tags: ['编辑器'], views: 4000 },
    { id: 177, name: 'Vue', url: 'https://vuejs.org', desc: 'Vue.js框架', icon: '💚', category: 'term-18-43', tags: ['框架'], views: 4000 },
    { id: 178, name: 'React', url: 'https://react.dev', desc: 'React框架', icon: '⚛️', category: 'term-18-43', tags: ['框架'], views: 5000 },
    { id: 179, name: 'TypeScript', url: 'https://www.typescriptlang.org', desc: 'TypeScript', icon: '📘', category: 'term-18-43', tags: ['语言'], views: 3000 },

    // ========== 开发 - 工具 ==========
    { id: 180, name: 'VS Code', url: 'https://code.visualstudio.com', desc: '代码编辑器', icon: '💻', category: 'term-18-42', tags: ['编辑器'], views: 10000 },
    { id: 181, name: 'Git', url: 'https://git-scm.com', desc: '版本控制', icon: '📦', category: 'term-18-42', tags: ['工具'], views: 6000 },
    { id: 182, name: 'NPM', url: 'https://www.npmjs.com', desc: 'Node.js包管理器', icon: '📦', category: 'term-18-42', tags: ['包管理'], views: 5000 },
    { id: 183, name: 'Vite', url: 'https://vitejs.dev', desc: '下一代前端工具', icon: '⚡', category: 'term-18-42', tags: ['工具'], views: 3000 },
    { id: 184, name: 'Tailwind CSS', url: 'https://tailwindcss.com', desc: 'CSS框架', icon: '🎨', category: 'term-18-42', tags: ['CSS'], views: 4000 },

    // ========== 开发 - 建站 ==========
    { id: 190, name: 'Vercel', url: 'https://vercel.com', desc: '前端部署平台', icon: '▲', category: 'term-18-147', tags: ['部署'], views: 4000 },
    { id: 191, name: 'Netlify', url: 'https://www.netlify.com', desc: '静态网站托管', icon: '🌐', category: 'term-18-147', tags: ['部署'], views: 3000 },
    { id: 192, name: 'Cloudflare', url: 'https://www.cloudflare.com', desc: 'CDN和DNS', icon: '☁️', category: 'term-18-147', tags: ['CDN'], views: 4000 },

    // ========== 学术 ==========
    { id: 200, name: 'Wikipedia', url: 'https://zh.wikipedia.org', desc: '维基百科', icon: '📚', category: 'term-17-54', tags: ['百科'], views: 10000 },
    { id: 201, name: '百度百科', url: 'https://baike.baidu.com', desc: '百度百科', icon: '📖', category: 'term-17-54', tags: ['百科'], views: 8000 },
    { id: 202, name: '知网', url: 'https://www.cnki.net', desc: '中国知网', icon: '📄', category: 'term-17-54', tags: ['学术'], views: 5000 },
    { id: 203, name: '涨知识', url: 'https://www.zhihu.com', desc: '知识分享', icon: '💡', category: 'term-17-54', tags: ['知识'], views: 4000 },

    // ========== 课程 ==========
    { id: 210, name: 'Coursera', url: 'https://www.coursera.org', desc: '在线课程平台', icon: '🎓', category: 'term-17-74', tags: ['课程'], views: 6000 },
    { id: 211, name: '网易云课堂', url: 'https://study.163.com', desc: '网易云课堂', icon: '☁️', category: 'term-17-74', tags: ['课程'], views: 5000 },
    { id: 212, name: '慕课网', url: 'https://www.imooc.com', desc: 'IT技能学习', icon: '💻', category: 'term-17-74', tags: ['课程'], views: 4000 },
    { id: 213, name: '学堂在线', url: 'https://next.xuetangx.com', desc: '在线学习平台', icon: '🏫', category: 'term-17-74', tags: ['课程'], views: 3000 },
    { id: 214, name: '中国大学MOOC', url: 'https://www.icourse163.org', desc: '优质课程平台', icon: '🎓', category: 'term-17-74', tags: ['课程'], views: 4000 },
    { id: 215, name: '腾讯课堂', url: 'https://ke.qq.com', desc: '在线课堂', icon: '📺', category: 'term-17-74', tags: ['课程'], views: 3500 },
    { id: 216, name: '网易公开课', url: 'https://open.163.com', desc: '公开课', icon: '📖', category: 'term-17-74', tags: ['课程'], views: 3000 },
    { id: 217, name: '我要自学网', url: 'https://www.51zxw.com', desc: '自学网站', icon: '📚', category: 'term-17-74', tags: ['课程'], views: 2500 },
    { id: 218, name: 'edX', url: 'https://www.edx.org', desc: '在线课程', icon: '🎓', category: 'term-17-74', tags: ['课程'], views: 2000 },
    { id: 219, name: 'MOOC中国', url: 'https://www.mooc.cn', desc: '慕课中国', icon: '🇨🇳', category: 'term-17-74', tags: ['课程'], views: 1500 },

    // ========== 书籍 ==========
    { id: 220, name: 'Z-Library', url: 'https://z-lib.is', desc: '电子书籍资源', icon: '📚', category: 'term-340', tags: ['书籍'], views: 8000 },
    { id: 221, name: '鸠摩搜书', url: 'https://www.jiumodiary.com', desc: '电子书搜索引擎', icon: '🦉', category: 'term-340', tags: ['书籍'], views: 5000 },
    { id: 222, name: '苦瓜书盘', url: 'https://www.kgbook.com', desc: '电子书分享', icon: '🎃', category: 'term-340', tags: ['书籍'], views: 3000 },
    { id: 223, name: '书栈网', url: 'https://www.book栈.com', desc: 'IT电子书', icon: '📖', category: 'term-340', tags: ['书籍', 'IT'], views: 2000 },
    { id: 224, name: '知轩藏书', url: 'https://www.zxcs.me', desc: '藏书阁', icon: '📚', category: 'term-340', tags: ['书籍'], views: 2500 },
    { id: 225, name: '书伴', url: 'https://bookfere.com', desc: '电子书伴侣', icon: '📖', category: 'term-340', tags: ['书籍'], views: 1500 },
    { id: 226, name: '偶书', url: 'https://www.obook.cc', desc: '电子书', icon: '📚', category: 'term-340', tags: ['书籍'], views: 1200 },

    // ========== 音乐 ==========
    { id: 230, name: '网易云音乐', url: 'https://music.163.com', desc: '在线音乐平台', icon: '🎵', category: 'term-40-41', tags: ['音乐'], views: 15000 },
    { id: 231, name: 'QQ音乐', url: 'https://y.qq.com', desc: 'QQ音乐', icon: '🎶', category: 'term-40-41', tags: ['音乐'], views: 12000 },
    { id: 232, name: 'Spotify', url: 'https://www.spotify.com', desc: '在线音乐流媒体', icon: '🎧', category: 'term-40-41', tags: ['音乐'], views: 6000 },
    { id: 233, name: 'SoundCloud', url: 'https://soundcloud.com', desc: '音乐分享平台', icon: '☁️', category: 'term-40-41', tags: ['音乐'], views: 4000 },
    { id: 234, name: '喜马拉雅', url: 'https://www.ximalaya.com', desc: '音频分享平台', icon: '🏔️', category: 'term-40-41', tags: ['音频'], views: 10000 },
    { id: 235, name: 'My Free Mp3', url: 'https://myfreemp3music.com', desc: '免费音乐', icon: '🎵', category: 'term-40-41', tags: ['音乐'], views: 3000 },
    { id: 236, name: '音乐魔石', url: 'https://music.ms', desc: '音乐搜索', icon: '💎', category: 'term-40-41', tags: ['音乐'], views: 2000 },
    { id: 237, name: 'ACG漫音社', url: 'https://acgmoyu.com', desc: 'ACG音乐', icon: '🎵', category: 'term-40-41', tags: ['音乐', 'ACG'], views: 1500 },
    { id: 238, name: '昔枫音乐盒', url: 'https://xufengmusic.com', desc: '音乐盒', icon: '🍁', category: 'term-40-41', tags: ['音乐'], views: 1200 },
    { id: 239, name: 'zz123', url: 'https://zz123.com', desc: '音乐', icon: '🎵', category: 'term-40-41', tags: ['音乐'], views: 1500 },

    // ========== 软件下载 ==========
    { id: 240, name: '果核剥壳', url: 'https://www.ghxi.com', desc: '软件分享', icon: '🍑', category: 'term-24-1073', tags: ['软件'], views: 5000 },
    { id: 241, name: '小众软件', url: 'https://www.appcgn.com', desc: '软件推荐', icon: '🔧', category: 'term-24-1073', tags: ['软件'], views: 3000 },
    { id: 242, name: '异星软件空间', url: 'https://www.yxapk.com', desc: '软件资源', icon: '🪐', category: 'term-24-1073', tags: ['软件'], views: 2500 },
    { id: 243, name: '423Down', url: 'https://www.423down.com', desc: '软件站', icon: '⬇️', category: 'term-24-1073', tags: ['软件'], views: 3000 },
    { id: 244, name: 'Windows系统下载', url: 'https://www.windows.com', desc: 'Windows系统', icon: '🪟', category: 'term-24-1073', tags: ['系统'], views: 2000 },
    { id: 245, name: '腾龙工作室', url: 'https://www.tenlon.com', desc: '软件资源', icon: '🐉', category: 'term-24-1073', tags: ['软件'], views: 1500 },
    { id: 246, name: '小刀娱乐网', url: 'https://www.xd不小刀.com', desc: '娱乐资源', icon: '🔪', category: 'term-24-1073', tags: ['软件'], views: 2000 },
    { id: 247, name: 'A姐分享', url: 'https://www.ijijij.com', desc: '资源分享', icon: '👩', category: 'term-24-1073', tags: ['软件'], views: 1800 },
    { id: 248, name: '鸭先知', url: 'https://www.yaxiya.com', desc: '资源站', icon: '🦆', category: 'term-24-1073', tags: ['软件'], views: 1200 },
    { id: 249, name: '懒得勤快', url: 'https://www.lan Dei.com', desc: '资源站', icon: '😴', category: 'term-24-1073', tags: ['软件'], views: 1000 },
    { id: 250, name: '枫音应用', url: 'https://www.appfy.com', desc: '应用推荐', icon: '🍁', category: 'term-24-1073', tags: ['软件'], views: 800 },
    { id: 251, name: 'APP热', url: 'https://www.apprapp.com', desc: 'APP资源', icon: '🔥', category: 'term-24-1073', tags: ['APP'], views: 1500 },
    { id: 252, name: 'GitHub加速', url: 'https://ghproxy.com', desc: 'GitHub加速', icon: '🚀', category: 'term-24-1073', tags: ['工具'], views: 2000 },

    // ========== 设计素材 ==========
    { id: 260, name: 'Figma', url: 'https://www.figma.com', desc: '在线UI设计', icon: '✏️', category: 'term-16-25', tags: ['设计'], views: 6000 },
    { id: 261, name: 'Pexels', url: 'https://www.pexels.com', desc: '免费高清图片', icon: '📷', category: 'term-16-25', tags: ['素材', '图片'], views: 8000 },
    { id: 262, name: 'Unsplash', url: 'https://www.unsplash.com', desc: '免费高清图片', icon: '🌄', category: 'term-16-25', tags: ['素材', '图片'], views: 7000 },
    { id: 263, name: 'Iconify', url: 'https://iconify.design', desc: '开源图标库', icon: '🔣', category: 'term-16-25', tags: ['图标'], views: 4000 },
    { id: 264, name: 'Google Fonts', url: 'https://fonts.google.com', desc: '免费字体库', icon: '🔤', category: 'term-16-25', tags: ['字体'], views: 5000 },
    { id: 265, name: '阿里巴巴图标', url: 'https://www.iconfont.cn', desc: '阿里巴巴矢量图标库', icon: '🏢', category: 'term-16-25', tags: ['图标'], views: 6000 },
    { id: 266, name: '花瓣网', url: 'https://huaban.com', desc: '图片素材', icon: '🌸', category: 'term-16-25', tags: ['素材'], views: 4000 },
    { id: 267, name: 'Dribbble', url: 'https://dribbble.com', desc: '设计师社区', icon: '🏀', category: 'term-16-25', tags: ['社区'], views: 4000 },
    { id: 268, name: 'Behance', url: 'https://www.behance.net', desc: '创意设计平台', icon: '🎨', category: 'term-16-25', tags: ['社区'], views: 5000 },

    // ========== 游戏 ==========
    { id: 280, name: 'Steam', url: 'https://store.steampowered.com', desc: '游戏平台', icon: '🎮', category: 'term-22-27', tags: ['游戏'], views: 15000 },
    { id: 281, name: 'Epic Games', url: 'https://store.epicgames.com', desc: '游戏平台', icon: '🛒', category: 'term-22-27', tags: ['游戏'], views: 8000 },
    { id: 282, name: 'TapTap', url: 'https://www.taptap.com', desc: '游戏社区', icon: '📱', category: 'term-22-27', tags: ['游戏'], views: 6000 },
    { id: 283, name: '3DM游戏网', url: 'https://www.3dmgame.com', desc: '游戏资讯', icon: '🎯', category: 'term-22-28', tags: ['资讯'], views: 4000 },
    { id: 284, name: '游民星空', url: 'https://www.gamersky.com', desc: '游戏门户', icon: '🌌', category: 'term-22-28', tags: ['资讯'], views: 5000 },
    { id: 285, name: 'Steam社区', url: 'https://steamcommunity.com', desc: 'Steam社区', icon: '👥', category: 'term-22-27', tags: ['社区'], views: 3000 },
    { id: 286, name: 'Origin', url: 'https://www.origin.com', desc: 'EA游戏平台', icon: '🚀', category: 'term-22-27', tags: ['游戏'], views: 2000 },
    { id: 287, name: 'GOG', url: 'https://www.gog.com', desc: '游戏平台', icon: '🎮', category: 'term-22-27', tags: ['游戏'], views: 1500 },
    { id: 288, name: '游侠网', url: 'https://www.ali213.net', desc: '游戏资讯', icon: '⚔️', category: 'term-22-28', tags: ['资讯'], views: 2500 },
    { id: 289, name: 'NGA玩家社区', url: 'https://bbs.nga.cn', desc: '玩家社区', icon: '📋', category: 'term-22-27', tags: ['社区'], views: 3000 },
    { id: 290, name: '逍遥网', url: 'https://www.xoyo.com', desc: '游戏社区', icon: '🌟', category: 'term-22-27', tags: ['游戏'], views: 1500 },

    // ========== 直播 ==========
    { id: 300, name: '斗鱼', url: 'https://www.douyu.com', desc: '游戏直播平台', icon: '🐟', category: 'term-30-15', tags: ['直播'], views: 10000 },
    { id: 301, name: '虎牙直播', url: 'https://www.huya.com', desc: '游戏直播', icon: '🐯', category: 'term-30-15', tags: ['直播'], views: 8000 },
    { id: 302, name: '哔哩哔哩直播', url: 'https://live.bilibili.com', desc: 'B站直播', icon: '📺', category: 'term-30-15', tags: ['直播'], views: 6000 },
    { id: 303, name: '抖音直播', url: 'https://live.douyin.com', desc: '抖音直播', icon: '🎵', category: 'term-30-15', tags: ['直播'], views: 5000 },
    { id: 304, name: '快手直播', url: 'https://live.kuaishou.com', desc: '快手直播', icon: '📹', category: 'term-30-15', tags: ['直播'], views: 4000 },
    { id: 305, name: '企鹅电竞', url: 'https://egame.qq.com', desc: '腾讯电竞直播', icon: '🐧', category: 'term-30-15', tags: ['直播'], views: 2000 },

    // ========== 图片工具 ==========
    { id: 310, name: 'TinyPNG', url: 'https://tinypng.com', desc: '图片压缩', icon: '📦', category: 'term-17-74', tags: ['图片', '压缩'], views: 5000 },
    { id: 311, name: '图怪兽', url: 'https://818ps.com', desc: '在线作图', icon: '🎨', category: 'term-17-74', tags: ['图片'], views: 3000 },
    { id: 312, name: '创可贴', url: 'https://www.chuangkit.com', desc: '在线设计', icon: '🩹', category: 'term-17-74', tags: ['设计'], views: 2500 },
    { id: 313, name: 'Photopea', url: 'https://www.photopea.com', desc: '在线PS', icon: '📷', category: 'term-17-74', tags: ['图片'], views: 4000 },
    { id: 314, name: 'RemoveBG', url: 'https://www.remove.bg', desc: 'AI抠图', icon: '✂️', category: 'term-17-74', tags: ['AI', '图片'], views: 3000 },
    { id: 315, name: 'Bigjpg', url: 'https://bigjpg.com', desc: '图片放大', icon: '🔍', category: 'term-17-74', tags: ['图片'], views: 2000 },

    // ========== 更多实用工具 ==========
    { id: 320, name: '奶牛快传', url: 'https://cowtransfer.com', desc: '文件传输', icon: '🐄', category: 'term-17-54', tags: ['工具'], views: 4000 },
    { id: 321, name: '文叔叔', url: 'https://www.wenshushu.cn', desc: '文件传输', icon: '📤', category: 'term-17-54', tags: ['工具'], views: 3000 },
    { id: 322, name: '腾讯文档', url: 'https://docs.qq.com', desc: '在线文档', icon: '📄', category: 'term-17-54', tags: ['工具'], views: 5000 },
    { id: 323, name: '石墨文档', url: 'https://shimo.im', desc: '在线协作文档', icon: '📝', category: 'term-17-54', tags: ['工具'], views: 3000 },
    { id: 324, name: 'Notion', url: 'https://www.notion.so', desc: '笔记工具', icon: '📓', category: 'term-17-54', tags: ['工具'], views: 4000 },
    { id: 325, name: '语雀', url: 'https://www.yuque.com', desc: '知识库', icon: '🦜', category: 'term-17-54', tags: ['工具'], views: 2500 },
    { id: 326, name: '幕布', url: 'https://mubu.com', desc: '思维导图', icon: '🧠', category: 'term-17-54', tags: ['工具'], views: 2000 },
    { id: 327, name: 'ProcessOn', url: 'https://www.processon.com', desc: '在线流程图', icon: '🔄', category: 'term-17-54', tags: ['工具'], views: 1800 },
    { id: 328, name: '草料二维码', url: 'https://cli.im', desc: '二维码生成', icon: '📱', category: 'term-17-54', tags: ['工具'], views: 3000 },
    { id: 329, name: '图床', url: 'https://sm.ms', desc: '图片托管', icon: '☁️', category: 'term-17-54', tags: ['工具'], views: 2000 },

    // ========== 文档学术 ==========
    { id: 330, name: 'Google学术', url: 'https://scholar.google.com', desc: '学术搜索', icon: '🔍', category: 'term-21-53', tags: ['学术'], views: 5000 },
    { id: 331, name: '百度学术', url: 'https://xueshu.baidu.com', desc: '学术搜索', icon: '📚', category: 'term-21-53', tags: ['学术'], views: 4000 },
    { id: 332, name: 'Sci-Hub', url: 'https://sci-hub.se', desc: '学术论文下载', icon: '🔬', category: 'term-21-53', tags: ['学术'], views: 3000 },
    { id: 333, name: '万方数据', url: 'https://www.wanfangdata.com', desc: '学术数据库', icon: '📊', category: 'term-21-53', tags: ['学术'], views: 2000 },
    { id: 334, name: '维普查重', url: 'https://vipv.etest.net', desc: '论文查重', icon: '✅', category: 'term-21-53', tags: ['学术'], views: 2500 },
    { id: 335, name: 'PaperPass', url: 'https://www.paperpass.com', desc: '论文查重', icon: '📝', category: 'term-21-53', tags: ['学术'], views: 2000 },
    { id: 336, name: '学术圈', url: 'https://www.cnki.net', desc: '学术资源', icon: '🎓', category: 'term-21-53', tags: ['学术'], views: 3000 },

    // ========== 无损音乐 ==========
    { id: 340, name: '无损音乐下载', url: 'https://www.liumingmusic.top', desc: '无损音乐', icon: '🎵', category: 'term-40-73', tags: ['音乐'], views: 3000 },
    { id: 341, name: '音乐下载器', url: 'https://y.qqmusic.top', desc: 'QQ音乐下载', icon: '🎶', category: 'term-40-73', tags: ['音乐'], views: 2500 },
    { id: 342, name: '墨灵音乐', url: 'https://music.mli0.com', desc: '无损音乐', icon: '🎧', category: 'term-40-73', tags: ['音乐'], views: 2000 },
    { id: 343, name: '音乐直链', url: 'https://music.laneige.cn', desc: '音乐下载', icon: '⬇️', category: 'term-40-73', tags: ['音乐'], views: 1500 },

    // ========== 更多影视资源 ==========
    { id: 350, name: '低端影视', url: 'https://didinema.vip', desc: '高清影视', icon: '🎬', category: 'term-24-65', tags: ['影视'], views: 4000 },
    { id: 351, name: 'TVbs云影视', url: 'https://www.tvbs.com', desc: '云影视', icon: '📺', category: 'term-24-65', tags: ['影视'], views: 3000 },
    { id: 352, name: 'libvio', url: 'https://www.libvio.pro', desc: '影视聚合', icon: '📺', category: 'term-24-65', tags: ['影视'], views: 3000 },
    { id: 353, name: '小强影视', url: 'https://xqthink.com', desc: '在线影视', icon: '🎞️', category: 'term-24-65', tags: ['影视'], views: 2500 },
    { id: 354, name: '趣享视频', url: 'https://qxsp4.com', desc: '视频解析', icon: '🎥', category: 'term-24-65', tags: ['影视'], views: 3000 },
    { id: 355, name: '六堆', url: 'https://6duicloud.com', desc: '影视云盘', icon: '☁️', category: 'term-24-65', tags: ['影视'], views: 2000 },
    { id: 356, name: '云播', url: 'https://yunbf.com', desc: '云端影视', icon: '☁️', category: 'term-24-65', tags: ['影视'], views: 1800 },

    // ========== 下载工具 ==========
    { id: 360, name: 'IDM下载器', url: 'https://www.internetdownloadmanager.com', desc: '下载工具', icon: '⬇️', category: 'term-24-101', tags: ['下载'], views: 5000 },
    { id: 361, name: 'FDM', url: 'https://www.freedownloadmanager.org', desc: '免费下载', icon: '⬇️', category: 'term-24-101', tags: ['下载'], views: 3000 },
    { id: 362, name: 'Motrix', url: 'https://motrix.app', desc: '下载工具', icon: '⚡', category: 'term-24-101', tags: ['下载'], views: 2500 },
    { id: 363, name: 'ADM', url: 'https://play.google.com/store/apps/details?id=com.dv.adm', desc: '安卓下载', icon: '📥', category: 'term-24-101', tags: ['下载'], views: 2000 },
    { id: 364, name: 'Proxyee-down', url: 'https://github.com/proxyee-down-org/proxyee-down', desc: '百度云下载', icon: '☁️', category: 'term-24-101', tags: ['下载'], views: 1800 },

    // ========== 浏览器扩展 ==========
    { id: 370, name: 'Chrome', url: 'https://www.google.com/chrome', desc: 'Chrome浏览器', icon: '🌐', category: 'term-18-72', tags: ['浏览器'], views: 15000 },
    { id: 371, name: 'Edge', url: 'https://www.microsoft.com/edge', desc: 'Edge浏览器', icon: '🌊', category: 'term-18-72', tags: ['浏览器'], views: 8000 },
    { id: 372, name: 'Firefox', url: 'https://www.mozilla.org/firefox', desc: 'Firefox浏览器', icon: '🦊', category: 'term-18-72', tags: ['浏览器'], views: 5000 },
    { id: 373, name: 'Tampermonkey', url: 'https://www.tampermonkey.net', desc: '油猴脚本', icon: '🐒', category: 'term-18-72', tags: ['扩展'], views: 6000 },
    { id: 374, name: 'Chrome扩展', url: 'https://chrome.google.com/webstore', desc: 'Chrome商店', icon: '🛒', category: 'term-18-72', tags: ['扩展'], views: 4000 },

    // ========== 更多图库壁纸 ==========
    { id: 380, name: 'Wallhaven', url: 'https://wallhaven.cc', desc: '高清壁纸', icon: '🖼️', category: 'term-22-100', tags: ['壁纸'], views: 6000 },
    { id: 381, name: 'Unsplash', url: 'https://unsplash.com', desc: '高清图片', icon: '📷', category: 'term-22-100', tags: ['图片'], views: 5000 },
    { id: 382, name: 'Pixabay', url: 'https://pixabay.com', desc: '免费图片', icon: '🎨', category: 'term-22-100', tags: ['图片'], views: 4000 },
    { id: 383, name: '彼岸图网', url: 'https://pic.netbian.com', desc: '4K壁纸', icon: '🌅', category: 'term-22-100', tags: ['壁纸'], views: 3000 },
    { id: 384, name: '极客壁纸', url: 'https://www.geekewan.com', desc: '壁纸下载', icon: '💻', category: 'term-22-100', tags: ['壁纸'], views: 2000 },
    { id: 385, name: '3G壁纸', url: 'https://www.3gbizhi.com', desc: '壁纸站', icon: '🖼️', category: 'term-22-100', tags: ['壁纸'], views: 1800 },

    // ========== 图标 ==========
    { id: 390, name: 'Remix Icon', url: 'https://remixicon.com', desc: '开源图标库', icon: '🔲', category: 'term-22-46', tags: ['图标'], views: 3000 },
    { id: 391, name: 'Font Awesome', url: 'https://fontawesome.com', desc: '图标字体', icon: '🏠', category: 'term-22-46', tags: ['图标'], views: 4000 },
    { id: 392, name: 'Iconfont', url: 'https://www.iconfont.cn', desc: '阿里巴巴图标', icon: '🏢', category: 'term-22-46', tags: ['图标'], views: 5000 },
    { id: 393, name: 'Flaticon', url: 'https://www.flaticon.com', desc: '免费图标', icon: '📌', category: 'term-22-46', tags: ['图标'], views: 3500 },
    { id: 394, name: 'Tabler Icons', url: 'https://tabler-icons.io', desc: '图标库', icon: '🔷', category: 'term-22-46', tags: ['图标'], views: 2000 },

    // ========== 字体 ==========
    { id: 400, name: '站酷字体', url: 'https://www.zcool.com.cn', desc: '字体下载', icon: '🔤', category: 'term-22-45', tags: ['字体'], views: 3000 },
    { id: 401, name: '字体天下', url: 'https://www.fonts.net.cn', desc: '字体下载', icon: '✍️', category: 'term-22-45', tags: ['字体'], views: 2500 },
    { id: 402, name: '找字网', url: 'https://www.zhaozi.cn', desc: '字体下载', icon: '🔍', category: 'term-22-45', tags: ['字体'], views: 2000 },
    { id: 403, name: '字魂网', url: 'https://www.izihun.com', desc: '字体下载', icon: '👻', category: 'term-22-45', tags: ['字体'], views: 1800 },
    { id: 404, name: 'Adobe字体', url: 'https://fonts.adobe.com', desc: 'Adobe字体', icon: '🔶', category: 'term-22-45', tags: ['字体'], views: 3000 },

    // ========== 配色 ==========
    { id: 410, name: 'Color Hunt', url: 'https://colorhunt.co', desc: '配色方案', icon: '🎨', category: 'term-22-47', tags: ['配色'], views: 4000 },
    { id: 411, name: 'Coolors', url: 'https://coolors.co', desc: '配色工具', icon: '🌈', category: 'term-22-47', tags: ['配色'], views: 3500 },
    { id: 412, name: 'Material Design', url: 'https://material.io/resources/color', desc: '配色方案', icon: '🎨', category: 'term-22-47', tags: ['配色'], views: 3000 },
    { id: 413, name: 'WebGradients', url: 'https://webgradients.com', desc: '渐变配色', icon: '🌅', category: 'term-22-47', tags: ['配色'], views: 2500 },
    { id: 414, name: 'BrandColors', url: 'https://brandcolors.net', desc: '品牌配色', icon: '🏷️', category: 'term-22-47', tags: ['配色'], views: 2000 },

    // ========== 漫画 ==========
    { id: 420, name: '漫画禁漫', url: 'https://18comic.vip', desc: '漫画', icon: '📚', category: 'term-19-36', tags: ['漫画'], views: 8000 },
    { id: 421, name: '漫画人', url: 'https://www.manhuaren.com', desc: '漫画阅读', icon: '📖', category: 'term-19-36', tags: ['漫画'], views: 5000 },
    { id: 422, name: '哔哩哔哩漫画', url: 'https://manga.bilibili.com', desc: 'B站漫画', icon: '📕', category: 'term-19-36', tags: ['漫画'], views: 4000 },
    { id: 423, name: '快看漫画', url: 'https://www.kuaikanmanhua.com', desc: '漫画平台', icon: '⚡', category: 'term-19-36', tags: ['漫画'], views: 3500 },
    { id: 424, name: '咚漫', url: 'https://www.dongmanmanhua.com', desc: '漫画阅读', icon: '🎭', category: 'term-19-36', tags: ['漫画'], views: 3000 },

    // ========== 小说 ==========
    { id: 430, name: '笔趣阁', url: 'https://www.biqust.com', desc: '小说阅读', icon: '📚', category: 'term-19-35', tags: ['小说'], views: 10000 },
    { id: 431, name: '起点中文网', url: 'https://www.qidian.com', desc: '小说平台', icon: '🏰', category: 'term-19-35', tags: ['小说'], views: 8000 },
    { id: 432, name: '晋江文学城', url: 'https://www.jjwxc.net', desc: '女性小说', icon: '🌸', category: 'term-19-35', tags: ['小说'], views: 6000 },
    { id: 433, name: '纵横中文网', url: 'https://www.zongheng.com', desc: '小说平台', icon: '📜', category: 'term-19-35', tags: ['小说'], views: 4000 },
    { id: 434, name: '飞卢小说网', url: 'https://www.faloo.com', desc: '小说阅读', icon: '✈️', category: 'term-19-35', tags: ['小说'], views: 3500 },
    { id: 435, name: '创世中文网', url: 'https://chuangshi.qq.com', desc: '小说阅读', icon: '🌟', category: 'term-19-35', tags: ['小说'], views: 3000 },

    // ========== 实用查询 ==========
    { id: 440, name: '个人所得税', url: 'https://etax.chinatax.gov.cn', desc: '个税查询', icon: '💰', category: 'term-24-81', tags: ['查询'], views: 5000 },
    { id: 441, name: '12306', url: 'https://www.12306.cn', desc: '火车票查询', icon: '🚂', category: 'term-24-81', tags: ['出行'], views: 10000 },
    { id: 442, name: '快递100', url: 'https://www.kuaidi100.com', desc: '快递查询', icon: '📦', category: 'term-24-81', tags: ['查询'], views: 4000 },
    { id: 443, name: '天气网', url: 'https://www.tianqi.com', desc: '天气预报', icon: '🌤️', category: 'term-24-81', tags: ['天气'], views: 3000 },
    { id: 444, name: '油价查询', url: 'https://www.oilprice.com', desc: '油价查询', icon: '⛽', category: 'term-24-81', tags: ['查询'], views: 2000 },
    { id: 445, name: '汇率换算', url: 'https://www.xe.com', desc: '汇率转换', icon: '💱', category: 'term-24-81', tags: ['工具'], views: 2500 },

    // ========== 在线工具 ==========
    { id: 450, name: 'PDF工具', url: 'https://pdf2png.com', desc: 'PDF转换', icon: '📄', category: 'term-17-56', tags: ['工具'], views: 4000 },
    { id: 451, name: 'iLovePDF', url: 'https://www.ilovepdf.com', desc: 'PDF工具', icon: '📑', category: 'term-17-56', tags: ['工具'], views: 5000 },
    { id: 452, name: 'SmallPDF', url: 'https://smallpdf.com', desc: 'PDF工具', icon: '🔒', category: 'term-17-56', tags: ['工具'], views: 4500 },
    { id: 453, name: 'Convertio', url: 'https://convertio.co', desc: '格式转换', icon: '🔄', category: 'term-17-56', tags: ['工具'], views: 3500 },
    { id: 454, name: 'CloudConvert', url: 'https://cloudconvert.com', desc: '格式转换', icon: '☁️', category: 'term-17-56', tags: ['工具'], views: 3000 },
    { id: 455, name: 'Office Converter', url: 'https://www.office-converter.com', desc: '格式转换', icon: '🏢', category: 'term-17-56', tags: ['工具'], views: 2500 },

    // ========== 更多综合 ==========
    { id: 460, name: '聚合导航', url: 'https://www.123nav.com', desc: '网址导航', icon: '🧭', category: 'term-24-23', tags: ['导航'], views: 3000 },
    { id: 461, name: '搜图导航', url: 'https://www.ishots.net', desc: '图片导航', icon: '🖼️', category: 'term-24-23', tags: ['导航'], views: 2500 },
    { id: 462, name: '设计导航', url: 'https://www.shejidaren.com', desc: '设计资源', icon: '🎨', category: 'term-24-23', tags: ['导航'], views: 2000 },
    { id: 463, name: '产品导航', url: 'https://www.pm265.com', desc: '产品经理导航', icon: '💼', category: 'term-24-23', tags: ['导航'], views: 1800 },
    { id: 464, name: '大数据导航', url: 'https://www.haidata.com', desc: '数据资源', icon: '📊', category: 'term-24-23', tags: ['导航'], views: 1500 },
    { id: 465, name: '学术导航', url: 'https://www.xueshunketi.cn', desc: '学术资源', icon: '🎓', category: 'term-24-23', tags: ['导航'], views: 1500 },
];

// 每日话术
const DAILY_SLOGANS = [
    "🌟 每天进步一点点，坚持带来大改变",
    "📚 学无止境，探索无限",
    "🚀 效率是成功的加速器",
    "💡 创新思维，引领未来",
    "🎯 专注目标，勇往直前",
    "🌈 生活不止眼前的苟且，还有诗和远方",
    "⚡ 把握当下，创造未来",
    "🎨 用心生活，美好自来",
    "📱 连接世界，从这里开始",
    "🔍 发现精彩，探索未知",
    "💪 努力不一定成功，但放弃一定失败",
    "🌟 最好的风景，在前行的路上",
    "🚀 敢想敢做，梦想才会成真",
    "📖 读万卷书，行万里路",
    "⚡ 时间就是金钱，效率就是生命",
    "🎯 目标明确，行动果断",
    "🌈 保持热爱，奔赴山海",
    "💡 思路决定出路，格局决定结局",
    "📱 科技改变生活，创新引领未来",
];

// 默认公告
const DEFAULT_NEWS = [
    { id: 1, title: '🔥 欢迎使用导航站', content: '收录各类实用网站资源，持续更新中...', date: '2024-01-01', important: true },
    { id: 2, title: '✨ 新增AI工具分类', content: '收录了多个实用的AI工具网站', date: '2024-01-15', important: false },
];

// 初始化数据库
function initDB() {
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const users = [{
            id: 1,
            username: 'admin',
            password: 'admin123',
            email: 'admin@example.com',
            role: 'admin',
            avatar: '',
            created_at: new Date().toISOString()
        }];
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    }

    if (!localStorage.getItem(DB_KEYS.SITES)) {
        localStorage.setItem(DB_KEYS.SITES, JSON.stringify(DEFAULT_SITES));
    }

    if (!localStorage.getItem(DB_KEYS.CATEGORIES)) {
        localStorage.setItem(DB_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }

    if (!localStorage.getItem(DB_KEYS.NEWS)) {
        localStorage.setItem(DB_KEYS.NEWS, JSON.stringify(DEFAULT_NEWS));
    }

    if (!localStorage.getItem(DB_KEYS.FAVORITES)) {
        localStorage.setItem(DB_KEYS.FAVORITES, JSON.stringify([]));
    }

    if (!localStorage.getItem(DB_KEYS.VISITS)) {
        localStorage.setItem(DB_KEYS.VISITS, JSON.stringify({ total: 0, today: 0, date: new Date().toDateString() }));
    }

    if (!localStorage.getItem(DB_KEYS.CLICK_STATS)) {
        localStorage.setItem(DB_KEYS.CLICK_STATS, JSON.stringify({}));
    }

    // 初始化用户设置
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
        localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
}

// 获取数据
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// 保存数据
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 用户设置
const SettingsDB = {
    get() {
        return getData(DB_KEYS.SETTINGS) || DEFAULT_SETTINGS;
    },

    update(updates) {
        const settings = this.get();
        const newSettings = { ...settings, ...updates };
        saveData(DB_KEYS.SETTINGS, newSettings);
        return newSettings;
    },

    getSearchEngine() {
        return this.get().searchEngine || 'baidu';
    },

    setSearchEngine(engine) {
        this.update({ searchEngine: engine });
    },

    getDailySlogan() {
        const dayIndex = new Date().getDate() % DAILY_SLOGANS.length;
        return DAILY_SLOGANS[dayIndex];
    }
};

// 用户相关
const UserDB = {
    getCurrentUser() {
        const userId = localStorage.getItem(DB_KEYS.LOGGED_IN);
        if (!userId) return null;
        const users = getData(DB_KEYS.USERS);
        return users.find(u => u.id === parseInt(userId));
    },

    login(username, password) {
        const users = getData(DB_KEYS.USERS);
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem(DB_KEYS.LOGGED_IN, user.id.toString());
            return { success: true, user };
        }
        return { success: false, message: '用户名或密码错误' };
    },

    register(username, password, email) {
        const users = getData(DB_KEYS.USERS);
        if (users.find(u => u.username === username)) {
            return { success: false, message: '用户名已存在' };
        }
        const newUser = {
            id: Date.now(),
            username,
            password,
            email,
            role: 'user',
            avatar: '',
            created_at: new Date().toISOString()
        };
        users.push(newUser);
        saveData(DB_KEYS.USERS, users);
        localStorage.setItem(DB_KEYS.LOGGED_IN, newUser.id.toString());
        return { success: true, user: newUser };
    },

    logout() {
        localStorage.removeItem(DB_KEYS.LOGGED_IN);
    },

    isLoggedIn() {
        return !!localStorage.getItem(DB_KEYS.LOGGED_IN);
    },

    // 只有管理员才能编辑
    canEdit() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
};

// 网站相关
const SiteDB = {
    getAll() {
        return getData(DB_KEYS.SITES) || [];
    },

    getByCategory(categoryId) {
        const sites = this.getAll();
        return sites.filter(s => s.category === categoryId);
    },

    getHotSites(limit = 10) {
        const sites = this.getAll();
        return sites.filter(s => s.hot || s.views > 3000).sort((a, b) => b.views - a.views).slice(0, limit);
    },

    getById(id) {
        const sites = this.getAll();
        return sites.find(s => s.id === parseInt(id));
    },

    add(site) {
        const sites = this.getAll();
        const newSite = {
            id: Date.now(),
            ...site,
            views: 0,
            hot: false,
            created_at: new Date().toISOString()
        };
        sites.push(newSite);
        saveData(DB_KEYS.SITES, sites);
        return newSite;
    },

    update(id, data) {
        const sites = this.getAll();
        const index = sites.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            sites[index] = { ...sites[index], ...data };
            saveData(DB_KEYS.SITES, sites);
            return sites[index];
        }
        return null;
    },

    delete(id) {
        const sites = this.getAll();
        const filtered = sites.filter(s => s.id !== parseInt(id));
        saveData(DB_KEYS.SITES, filtered);
    },

    recordVisit() {
        let stats = getData(DB_KEYS.VISITS) || { total: 0, today: 0, date: '' };
        const today = new Date().toDateString();

        if (stats.date !== today) {
            stats.today = 0;
            stats.date = today;
        }

        stats.total++;
        stats.today++;
        saveData(DB_KEYS.VISITS, stats);
        return stats;
    },

    recordClick(siteId) {
        let stats = getData(DB_KEYS.CLICK_STATS) || {};
        stats[siteId] = (stats[siteId] || 0) + 1;
        saveData(DB_KEYS.CLICK_STATS, stats);

        const sites = this.getAll();
        const site = sites.find(s => s.id === parseInt(siteId));
        if (site) {
            site.views = (site.views || 0) + 1;
            saveData(DB_KEYS.SITES, sites);
        }
    }
};

// 分类相关
const CategoryDB = {
    getAll() {
        return getData(DB_KEYS.CATEGORIES) || [];
    },

    getTopLevel() {
        const categories = this.getAll();
        return categories.filter(c => !c.parent);
    },

    getById(id) {
        const categories = this.getAll();
        return categories.find(c => c.id === id);
    },

    add(category) {
        const categories = this.getAll();
        const newCategory = {
            id: 'term-' + Date.now(),
            ...category
        };
        categories.push(newCategory);
        saveData(DB_KEYS.CATEGORIES, categories);
        return newCategory;
    },

    update(id, data) {
        const categories = this.getAll();
        const index = categories.findIndex(c => c.id === id);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...data };
            saveData(DB_KEYS.CATEGORIES, categories);
            return categories[index];
        }
        return null;
    },

    delete(id) {
        let categories = this.getAll();
        categories = categories.filter(c => c.id !== id && c.parent !== id);
        saveData(DB_KEYS.CATEGORIES, categories);
        let sites = SiteDB.getAll();
        sites = sites.filter(s => s.category !== id);
        saveData(DB_KEYS.SITES, sites);
    }
};

// 收藏相关
const FavoriteDB = {
    getAll() {
        return getData(DB_KEYS.FAVORITES) || [];
    },

    add(siteId) {
        const favorites = this.getAll();
        const userId = UserDB.getCurrentUser()?.id;
        if (!userId) return false;

        if (!favorites.find(f => f.siteId === parseInt(siteId) && f.userId === userId)) {
            favorites.push({
                id: Date.now(),
                siteId: parseInt(siteId),
                userId,
                created_at: new Date().toISOString()
            });
            saveData(DB_KEYS.FAVORITES, favorites);
            return true;
        }
        return false;
    },

    remove(siteId) {
        const userId = UserDB.getCurrentUser()?.id;
        if (!userId) return;

        let favorites = this.getAll();
        favorites = favorites.filter(f => !(f.siteId === parseInt(siteId) && f.userId === userId));
        saveData(DB_KEYS.FAVORITES, favorites);
    },

    isFavorited(siteId) {
        const userId = UserDB.getCurrentUser()?.id;
        if (!userId) return false;
        const favorites = this.getAll();
        return favorites.some(f => f.siteId === parseInt(siteId) && f.userId === userId);
    }
};

// 公告相关
const NewsDB = {
    getAll() {
        return getData(DB_KEYS.NEWS) || [];
    },

    add(news) {
        const allNews = this.getAll();
        const newItem = {
            id: Date.now(),
            ...news,
            date: new Date().toISOString().split('T')[0]
        };
        allNews.unshift(newItem);
        saveData(DB_KEYS.NEWS, allNews);
        return newItem;
    },

    delete(id) {
        let news = this.getAll();
        news = news.filter(n => n.id !== parseInt(id));
        saveData(DB_KEYS.NEWS, news);
    }
};

// 初始化
initDB();

// 导出
window.DB = {
    User: UserDB,
    Site: SiteDB,
    Category: CategoryDB,
    Favorite: FavoriteDB,
    News: NewsDB,
    Settings: SettingsDB,
    getData,
    saveData,
    DB_KEYS
};
