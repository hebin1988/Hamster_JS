// ChatGPT Integration
async function chatgptDemo() {
  // 确保有默认值，防止变量未定义
  const question = $searchText || $pasteboardContent || "这一个测试";
  const model = "gpt-4o-mini";
  const url = "https://api.openai.com/v1/chat/completions";
  
  try {
    // 检查$http是否定义
    if (!$http) {
      throw new Error("$http is not defined");
    }
    
    // 检查$token是否定义
    if (!$token) {
      throw new Error("API token is not defined");
    }
    
    const response = await $http({
      url,
      method: "post",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$token}`,
      },
      body: JSON.stringify({
        model: model,  // 添加model参数
        messages: [
          {
            role: "system",
            content: "",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });
    
    // 确保response和data存在
    if (!response || !response.data) {
      throw new Error("Invalid response from API");
    }
    
    // 正确处理响应
    if (typeof $output === 'function') {
      $output(response.data);
    }
    
    return response.data;
  } catch (error) {
    // 确保$log存在
    if (typeof $log === 'function') {
      $log("Error in chatgptDemo:", error);
    } else {
      console.error("Error in chatgptDemo:", error);
    }
    return { error: error.message || "Unknown error occurred" };
  }
}

// 确保函数被正确导出或调用
try {
  module.exports = chatgptDemo;
} catch (e) {
  // 如果不是在Node环境中，忽略这个错误
}
