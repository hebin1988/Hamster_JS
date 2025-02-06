// author: 叙白
// date: 2024-09-28
// name: Deeplx中外互译.js
// 注意: 需添加变量deeplx_key
// 使用：输入中文自动翻译成英文，输入非中文自动翻译成中文

async function output() {
  const text = $searchText || $pasteboardContent || "测试文本";
  if (!text) return "请输入要翻译的文本"; // 检查输入是否为空


  let target = await detectLang(text); // 自动检测语言并翻译
  let translatedText = await translate(text, target); // 翻译文本
  return translatedText;
  
}

async function detectLang(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=auto&dt=t&q=${encodeURIComponent(text)}`;
		// 第一次调用 googleTranslate 函数，检测并翻译文本
    const resp = await $http({
      url,
      header: {"Content-Type": "application/json"}
      });

    if (resp.response.statusCode !== 200) {
      return "翻译失败";
    }

    const jsonDict = JSON.parse(resp.data);
    const detectedLang = jsonDict[2]; // 这个字段包含检测到的源语言

    // 根据检测到的源语言决定目标语言
    let targetLang = detectedLang === "zh-CN" ? "EN" : "ZH";
    return targetLang;
  } catch (error) {
    throw new Error(error);
  }
}

async function translate(text, target) {
  const payload = {
    text: text,
    source_lang: "auto",
    target_lang: target
  };

  try {
    const response = await $http({
      url: `https://api.deeplx.org/${$deeplx_key}/translate`,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: payload,
    });

    if (response.response.statusCode !== 200) {
      return "请求失败";
    }
    $log(response.data);
    return JSON.parse(response.data).data;
  } catch (error) {
    $log(error);
    return null;
  }
}
