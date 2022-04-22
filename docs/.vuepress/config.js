const {
    getSideBars
} = require("./sidebar/index");

module.exports = {
    title: 'Code Today',
    description: 'Just Coding!',
    themeConfig: {

        sidebar: getSideBars(),

        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: '刷题',
                link: '/leetcode/821'
            },
            {
                text: '基础相关',
                ariaLabel: '其他笔记📒',
                items: [{
                    text: ' JS相关',
                    link: '/javascript/00_promiseTask'
                }]
            },
            {
                text: '面试',
                link: '/interview/ChinaUnion'
            },
        ]
    },

    extraWatchFiles: [
        '.vuepress/config.js',
        '**/*.md'
    ]
}