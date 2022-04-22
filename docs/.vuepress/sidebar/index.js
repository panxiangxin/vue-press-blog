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
        }
    }
}