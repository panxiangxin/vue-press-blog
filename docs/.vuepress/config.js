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
                }, {
                    text: ' 计算机网络',
                    link: '/internet/00_https'
                }, {
                    text: ' CSS',
                    link: '/CSS/01_Typing动画实现'
                }, {
                    text: ' TS类型挑战',
                    link: '/typeChallenge/00_start'
                }, ]
            },
            {
                text: 'Vue',
                ariaLabel: 'Vue相关',
                items: [{
                    text: ' Vue2',
                    link: '/vue2/00_start'
                }, {
                    text: ' Vue3',
                    link: '/vue3/00_start'
                }, ]
            },
            {
                text: '个人相关',
                ariaLabel: '关于',
                items: [{
                        text: 'leetcode',
                        link: 'https://leetcode-cn.com/u/panxiangxin/'
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/panxiangxin'
                    }
                ]
            }

            // {
            //     text: '面试',
            //     link: '/interview/ChinaUnion'
            // },
        ],

        lastUpdated: '上次更新'
    },

    plugins: [
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功"
            }
        }],
        [
            'vuepress-plugin-mathjax',
            {
                target: 'svg',
                macros: {
                    '*': '\\times',
                },
            },
        ],
    ],

    extraWatchFiles: [
        '.vuepress/config.js',
        '**/*.md'
    ],
}