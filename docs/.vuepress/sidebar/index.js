const {
    getChildren
} = require("vuepress-sidebar-atuo")

module.exports = {
    getSideBars: function () {
        return {
            '/leetcode/': [{
                title: '刷题记录',
                collapsable: true,
                children: getChildren('./docs/leetcode')
            }],
            '/interview/': [{
                title: '面试记录',
                collapsable: true,
                children: getChildren('./docs/interview')
            }, ],
            '/javascript/': [{
                title: 'JS相关',
                collapsable: true,
                children: getChildren('./docs/javascript')
            }],
            '/internet/': [{
                title: '计算机网络',
                collapsable: true,
                children: getChildren('./docs/internet')
            }],
            '/CSS/': [{
                title: 'CSS相关',
                collapsable: true,
                children: getChildren('./docs/CSS')
            }],
            '/typeChallenge/': [{
                title: 'TS类型挑战',
                collapsable: true,
                children: getChildren('./docs/typeChallenge')
            }],
            '/vue2/': [{
                title: 'Vue2相关',
                collapsable: true,
                children: getChildren('./docs/vue2')
            }],
            '/vue3/': [{
                title: 'Vue3相关',
                collapsable: true,
                children: getChildren('./docs/vue3')
            }],
        }
    }
}