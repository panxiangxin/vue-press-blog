// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [{
    type: 'input',
    name: 'no',
    message: "leetcode 题目编号？",
    validate(value) {
      if (!value.length) {
        return '题目编号不能为空！'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'name',
    message: "leetcode 题目名称？",
    validate(value) {
      if (!value.length) {
        return '题目名称不能为空！'
      }
      return true
    }
  },
  {
    type: 'select',
    name: 'level',
    message: "leetcode 题目难度？",
    choices: [{
        message: '🌟',
        value: '简单（有手就行）'
      },
      {
        message: '🌟🌟',
        value: '中等（有手不一定行）'
      },
      {
        message: '🌟🌟🌟',
        value: '困难（溜了溜了）'
      }
    ]
  }
]