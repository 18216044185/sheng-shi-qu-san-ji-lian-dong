const express = require('express');
const path = require('path');
const app = express();

app.get("/",(req,res) => {
	res.sendFile(path.join(__dirname,'4.省市区三级联动之browser.html'));
});

//载入省市区数据
const data = require('./cityData.min.json');

//处理/province的请求
app.get("/province",(req,res) => {
	let provinces = [];
	data.forEach( item => {
		provinces.push(item.n);
	});
	res.json(provinces);
});


//处理city的请求
app.get("/city",(req,res) => {
	let cities = [];
	//获取省份
	let province = req.query.province;
	data.forEach(item => {
		if(item.n == province){
			//对item.s进行遍历
			item.s.forEach(item1 => {
				//需要获取item1.n
				cities.push(item1.n);
			});
		}
	});
	res.json(cities);
});


//处理/country的请求
app.get('/country',(req,res) => {
	let countries = [];
	let city = req.query.city;
	data.forEach(item1 => {
		//需要对item1中s进行遍历
		item1.s.forEach(item2 => {
			//item2就是二级市区，需要对item2.n进行判断，和city是否相等
			if(item2.n == city){
				//就是这个市区，需要对item2.s进行遍历
				//由于直辖市没有三级，所以需要判断一下
				item2.s && item2.s.forEach(item3 => {
					//取出item3.n即可
					countries.push(item3.n);
				});
			}
		});
	});
	res.json(countries);
}); 

app.listen(3000,() => {
	console.log('3000 ok...');
});