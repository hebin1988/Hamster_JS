// name: 新闻.js
// date: 2024-11-04
// author: 叙白

async function output() {
	let url = "http://api.suxun.site/api/sixs?type=json";
	return await getData(url);
	
}

async function getData(url) {
	const { data } = await $http({url: url});
	const jsonData = JSON.parse(data);
	let news = jsonData.news;
	return news;
}
