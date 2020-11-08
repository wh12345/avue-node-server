var OSS = require('ali-oss')


const client = new OSS({
    bucket: 'yangsj-first-bucket',
    // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
    region: 'oss-cn-guangzhou',
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
    accessKeyId: 'LTAI4GFDfw2fvuG2Kg24QMMR',
    accessKeySecret: 'Akp3wddgDuf1GrOeVrxBhVtxrx12R6',
});

// 上传本地文件到阿里云
async function put (path) {
    try {
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let args = path.split('\\')
        let filename = args[args.length - 1];
        if(filename === 'undefined')
            return
        let result = await client.put('avue/' + filename, path);
        return result.url
    } catch (e) {
        console.log(e);
    }
}
module.exports.put = put

