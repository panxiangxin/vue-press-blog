// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [{
  type: 'input',
  name: 'company',
  message: "面试公司名称?",
  validate(value) {
    if (!value.length) {
      return '公司名称不能为空！'
    }
    return true
  }
}]