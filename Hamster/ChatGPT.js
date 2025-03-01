// ChatGPT Integration
async function chatgptDemo() {
  const question = $searchText || $pasteboardContent || "这一个测试";
  // const model = "gpt-4o";
  // const model = "gpt-3.5-turbo";
  const model = "gpt-4o-mini";

  // 我这里使用的 chatGPT 的转发服务，如果你用官网的 api
  // 落格转发服务器: "https://api.chatai.beauty/v1/chat/completions"
  // chatGPT服务: "https://api.openai.com/v1/chat/completions"
  // GPT_APL_free服务："https:/api.chatanywhere.tech/v1/chat/completions"
  const url = "https://api.openai.com/v1/chat/completions";
  try {
    const { data } = await $http({
      url,
      method: "post",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$token}`,
      },
      body: {
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
      },
    });
    return data;
  } catch (error) {
    $log(error);
    return error;
  }
}
