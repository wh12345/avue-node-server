'use strict';

var connection = require('./sql')

let sendSuccess = {
    code:200,
    success:true,
    msg:"操作成功",
    data:{}
}

module.exports.getList = (req,res)=> {
    console.log('get maplist...')

    // let countQuery = 'select COUNT(*) from blade_visual_map'
    let mapListQuery = 'select id,name from blade_visual_map'
    connection.query({
            sql:  mapListQuery,
            timeout: 1000, // 1s
        },
        function (error, results, fields) {
            // if (error) throw error;
            console.log(results)
            //向前台反馈信息
            let total = parseInt(results.length)
            res.status(200).send(
                {
                    code:200,
                        success:true,
                    data:{
                    records:results,
                        total : parseInt(total),
                        size:100,
                        current:1,
                        orders:[],
                        hitCount:false,
                        searchCount:true,
                        pages:1
                    },
                    msg:"操作成功",
                }
            );
        }
    );

}
module.exports.updateList = (req,res)=>{
    console.log('update')

    let data = req.body.data
    let id = req.body.id
    let name = req.body.name

    let mapUpdateQuery = 'update blade_visual_map set name = ?,data = ? where id=?'

    connection.query({
            sql:mapUpdateQuery
        },
        [name,data,id],
        function (error ,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send(sendSuccess)
        })
}
module.exports.saveList = (req,res)=>{
    console.log('saving map ...')

    let data = req.body.data
    let name = req.body.name

    var timestamp = (new Date()).valueOf();
    // console.log(key,value)

    let mapSaveQuery = 'insert into blade_visual_map values(?,?,?)'

    connection.query({
            sql:mapSaveQuery,
            timeout:1000
        },
        [timestamp,name,data],
        function (error ,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send(sendSuccess)

        })
}

module.exports.removeList = (req,res)=>{
    console.log('deleting map...')
    let ids = req.query.ids

    let mapRemoveQuery = 'delete from blade_visual_map where id=?'

    connection.query({
            sql:mapRemoveQuery,
            timeout:1000
        },
        [ids],
        function (error,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send(sendSuccess)
        })

    // res.status(200).send("OK")
}

module.exports.detailList = (req,res)=>{
    console.log('detail')

    let ids = req.query.id

    console.log(ids)

    let mapDetailQuery = 'select * from blade_visual_map where id = ?'

    connection.query({
            sql:mapDetailQuery,
            timeout:1000
        },
        [ids],
        function (error,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send({
                code:200,
                success:true,
                data:results[0],
                msg:'操作成功'
            })
        })
}




