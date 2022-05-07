// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [{
  type: 'select',
  name: 'category',
  message: "博文分类？",
  choices: [{
      message: 'CSS相关？',
      value: 'CSS'
    },
    {
      message: 'javascript相关？',
      value: 'javascript'
    },
    {
      message: '计算机网络相关？',
      value: 'internet'
    },
    {
      message: 'TS类型挑战？',
      value: 'typeChallenge'
    }
  ]
}, {
  type: 'input',
  name: 'title',
  message: "博文名称？",
  validate(value) {
    if (!value.length) {
      return '博文名称不能为空！'
    }
    return true
  }
}]