// 注意：请在脚本中的变量功能中添加 glm_key 变量，值为智谱 glm 的 API Key
// Densuke修改自ChatGPT脚本
// date:2024-10-01
// name:glm.js
async function glmDemo(){
  // pasteboardContent 为内置变量,读取当前剪贴板字符内容
 const question = $searchText || $pasteboardContent || "你好";
  let prompt = "你是一位AI助手,能够回答的专业以及准确";
  // 结尾加个-,返回简短的回答
  if (question.slice(-1)==='-')
    prompt+=",现在请尽量用一句话回答我的问题";
  // const model "glm-4-plus";
  const model = "glm-4-flash";//免费大模型

const url ="https://open.bigmodel.cn/api/paas/v4/chat/completions";
try {
  const {data }=await $http({
    url,
    method:"post",
    header:{
      "Content-Type":"application/json",
      Authorization:`Bearer $($glm_key)`,
    },
    body:{
      messages:[
        {
