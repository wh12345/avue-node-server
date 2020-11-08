'use strict';

var connection = require('./sql')

let sendSuccess = {
    code:200,
    success:true,
    msg:"操作成功",
}

module.exports.getList = (req,res)=> {
    console.log('get categorylist...')

    let categoryListQuery = 'select * from blade_visual_category'
    connection.query({
            sql: categoryListQuery,
            timeout: 1000, // 1s
        },
        function (error, results, fields) {
            // if (error) throw error;
            console.log(results)
            //向前台反馈信息
            res.status(200).send(
                {
                    code:200,
                    success:true,
                    data:results
                }
            );
        }
    );

}
module.exports.updateList = (req,res)=>{
    console.log('update')

    let key = req.body.categoryKey
    let value = req.body.categoryValue
    let ids = parseInt( req.body.id)

    let categoryUpdateQuery = 'update blade_visual_category set categoryKey = ?,categoryValue = ? where id=?'

    connection.query({
        sql:categoryUpdateQuery
    },
        [key,value,ids],
        function (error ,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send(sendSuccess)
        })
}
module.exports.saveList = (req,res)=>{
    console.log('saving category ...')

    let key = req.body.categoryKey
    let value = req.body.categoryValue

    var timestamp = (new Date()).valueOf();
    // console.log(key,value)

    let categorySaveQuery = 'insert into blade_visual_category values(?,?,?,?)'

    connection.query({
            sql:categorySaveQuery,
            timeout:1000
        },
        [timestamp ,key,value,1],
        function (error ,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send(sendSuccess)

        })
}

module.exports.removeList = (req,res)=>{
    console.log('deleting category...')
    let ids = req.query.ids

    let categoryRemoveQuery = 'delete from blade_visual_category where id=?'

    connection.query({
        sql:categoryRemoveQuery,
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

    let ids = req.query.ids

    let categoryDetailQuery = 'select * from blade_visual_category where id = ?'

    connection.query({
        sql:categoryDetailQuery,
        timeout:1000
    },
        [ids],
        function (error,results,fields) {
            if(error) throw error
            // console.log(results)
            res.status(200).send({
                code:200,
                success:true,
                data:results,
                msg:'操作成功'
            })
        })
}




