'use strict';

var connection = require('./sql')
var multiparty = require('multiparty');


let sendSuccess = {
    code:200,
    success:true,
    msg:"操作成功",
    data:{}
}


//添加一个项到blade_visual_config
function addConfig(id,config){
    return new Promise((resolve,reject)=>{

        let detail = config.detail
        let compoent = config.compoent
        let visualConfigAdd = 'insert into blade_visual_config values(?,?,?,?)'

        connection.query({
                sql:visualConfigAdd,
                timeout:1000,
            },
            [id,id,detail,compoent],
            function (error,results,fields) {
                if(error)
                    reject(error)
                else
                    resolve(results)

            })
    })
}
//添加一个项到blade_visual
function addVisual(id,visual){
    return new Promise((resolve,reject)=>{

        let category = Number.parseInt(visual.category)
        let password = visual.password
        let status = 1
        // let status = visual.status
        let title = visual.title
        let visualAdd = 'insert into blade_visual (id,category,password,status,title,isDeleted,createTime) values(?,?,?,?,?,0,CURRENT_TIME())'

        connection.query({
                sql:visualAdd,
                timeout:1000,
            },
            [id,category,password,status,title],
            function (error,results,fields) {
                if(error) reject(error)
                resolve(results)
            })
    })
}
//修改blade_visual_config中的一个项的detail和component
function updateConfig(config) {
    return new Promise((resolve,reject)=>{
        const visualConfigUpdate = 'update blade_visual_config set detail=?,component=? where id=?'
        connection.query({
            sql:visualConfigUpdate,
            timeout:1000
        },
        [config.detail,config.component,config.id],
        function (error,results,fields) {
            if(error)
                reject(error)
            else
                resolve(results)
        })
    })

}
//修改blade_visual中的一个项的backgroundUrl
function updateVisual(visual) {
    return new Promise((resolve,reject)=>{
        const visualUpdate = 'update blade_visual set backgroundUrl=? where id=?'
        connection.query({
                sql:visualUpdate,
                timeout:1000
            },
            [visual.backgroundUrl,visual.id],
            function (error,results,fields) {
                if(error)
                    reject(error)
                else
                    resolve(results)
            })
    })

}

module.exports.update = (req,res)=>{
    console.log('visual updating')
    console.log(req.body)

    //这里使用promise的链式写法
    updateConfig(req.body.config)
    .then(()=>{
        return updateVisual(req.body.visual)
    })
    .then(()=>{
        res.status(200).send(sendSuccess)
    })
    .catch((err)=>{
        console.log(err,'err while updating visual')
    })

}

async function saveList(req,res){
    console.log('visual saving list...')
    console.log(req.body)

    let timestamp = (new Date()).valueOf();

    let results =  await addConfig(timestamp,req.body.config).catch(err=>{
        console.log(err)
    })

    console.log(results)

    results =  await addVisual(timestamp,req.body.visual).catch(err=>{
        console.log(err)
    })

    // console.log()
    res.status(200).send({
        code:200,
        success:true,
        msg:"操作成功",
        data:{
            id:String(timestamp)
        }
    })
}

const aliOss = require('./oss')

// async function imageHandle(req){
//
// }

function parseForm(data){
    return new Promise((resolve,reject)=>{
        const form = new multiparty.Form();
        form.parse(data,function (err,field,files) {
            if(err){
                reject(err)
            }
            else{
                resolve(files)
            }
        })
    })
}


//接收前端图片(大屏预览）
module.exports.putFile = (req,res)=>{
    console.log('putting file')

    parseForm(req)
    .then((files)=>{
        console.log( files.file[0].path,'image path')

        //要返回promise才能接着then
        return aliOss.put(files.file[0].path)
    }).then((ossUrl)=>{
        console.log(ossUrl,'ossUrl')
        console.log('finished')
        res.status(200).send({
            code:200,
            success:true,
            data:{
                domain:"http://yangsj-first-bucket.oss-cn-guangzhou.aliyuncs.com",
                link:ossUrl,
                name:"",
                originalName:""
            },
            msg:"操作成功"
        })
    })

}
module.exports.saveList = saveList



module.exports.detailList = (req,res)=>{
    console.log('visual detail....')

    let ids = req.query.id

    let visualQuery = 'select * from blade_visual where id=?;'
    let visualConfigQuery = 'select * from blade_visual_config where id=?;'

    connection.query({
        sql:visualConfigQuery + visualQuery,
        timeout:1000
    },[ids,ids],
        function (error,results,fields) {
            if(error) throw error

            res.status(200).send({
                code:200,
                success:true,
                data:{
                    config:results[0][0],
                    visual:results[1][0]
                },
                msg:"操作成功",
            })

        })
}

module.exports.getList = (req,res)=>{
    console.log('visual getting list...')


    let category = parseInt(req.query.category)
    let pageSize = parseInt( req.query.size )
    let current = parseInt( req.query.current )
    let offset = parseInt( (current - 1) * pageSize)


    let countQuery = 'select COUNT(*) as count from blade_visual where category=? ;'
    let visualListQuery = 'select * from blade_visual where category=? limit ? offset ? '
    connection.query({
            sql: countQuery + visualListQuery ,
            timeout: 1000, // 1s
        },
        [category,category,pageSize,offset],
        function (error, results, fields) {

            let total = parseInt(results[0][0].count)
            let pages = parseInt(total/10)
            res.status(200).send(
                {
                    code:200,
                    success:true,
                    data:{
                        records:results[1],
                        total : parseInt(total),
                        size:results[1].size,
                        current:current,
                        orders:[],
                        hitCount:false,
                        searchCount:true,
                        pages:pages
                    },
                    msg:"操作成功",
                }
            );
        }
    );
}
