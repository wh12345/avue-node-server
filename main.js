let express             = require('express');
let app                 = express();
let bodyParse           = require('body-parser')


var categoryHandle = require('./categoryHandle')
var mapHandle = require('./mapHandle')
var visualHandle = require('./visualHandle')


//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");//允许源访问，本利前端访问路径为“http://localhost:8080”
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许源访问，本利前端访问路径为“http://localhost:8080”
    // res.header("Access-Control-Allow-Origin", "http://localhost:8082");//允许源访问，本利前端访问路径为“http://localhost:8080”
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

//使用bodyParse解释前端提交数据
let s = function sum(a,b){
    return a+b;
}(1,33)
console.log(s)


app.use(bodyParse.urlencoded({
    extended:false,
    // type: 'application/x-www-form-urlencoded'
})) ;
// app.use(bodyParse.urlencoded())
app.use(bodyParse.json({limit:'10mb'}));



const preUrl = '/avue/api'
/**********************大屏管理接口***********************************/
//获取所有大屏
app.get(preUrl + '/visual/list',function(req,res){
    visualHandle.getList(req,res)
});

//保存一个新建的大屏
app.post(preUrl + '/visual/save',function(req,res){
    visualHandle.saveList(req,res)
});

//获取一个大屏
app.get(preUrl + '/visual/detail',function(req,res){
    visualHandle.detailList(req,res)
});

//接收前端图片(大屏预览)
app.post(preUrl + '/visual/put-file',function(req,res){
    visualHandle.putFile(req,res)
});

//保存大屏设置
app.post(preUrl + '/visual/update',function(req,res){
    visualHandle.update(req,res)
});

/**********************分类管理接口***********************************/
//获取所有分类
app.get(preUrl + '/category/list',function(req,res){
    categoryHandle.getList(req,res)
});
//增加一个分类
app.post(preUrl + '/category/save',function(req,res){
    categoryHandle.saveList(req,res)
});

//删除一个分类
app.post(preUrl + '/category/remove',function(req,res){
   categoryHandle.removeList(req,res)

});

//获取一个分类
app.get(preUrl + '/category/detail',function(req,res){
    categoryHandle.detailList(req,res)

});
//编辑一个分类
app.post(preUrl + '/category/update',function(req,res){
    categoryHandle.updateList(req,res)

});

/**********************地图编辑接口***********************************/
//获取所有地图
app.get(preUrl + '/map/list',function(req,res){
    mapHandle.getList(req,res)
});
//增加一个地图
app.post(preUrl + '/map/save',function(req,res){
    mapHandle.saveList(req,res)
});

//删除一个地图
app.post(preUrl + '/map/remove',function(req,res){
    mapHandle.removeList(req,res)
});

//获取一个地图
app.get(preUrl + '/map/detail',function(req,res){
    mapHandle.detailList(req,res)
});
//编辑一个地图
app.post(preUrl + '/map/update',function(req,res){
    mapHandle.updateList(req,res)
});




// 监听3000端口
app.listen(3000);

console.log("监听网址为:http://127.0.0.1:3000/");
