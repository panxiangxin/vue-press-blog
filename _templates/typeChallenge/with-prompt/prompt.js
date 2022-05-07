// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [{
  type: 'input',
  name: 'no',
  message: "type-chanllenge 编号？",
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
  message: "type-chanllenge 题目名称？",
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
  message: "type-chanllenge 题目难度？",
  choices: [{
      message: '🌟',
      value: 'easy!'
    },
    {
      message: '🌟🌟',
      value: 'medium?!'
    },
    {
      message: '🌟🌟🌟',
      value: 'hard!!!'
    }
  ]
}
]
