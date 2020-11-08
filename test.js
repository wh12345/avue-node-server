'use strict';




// function printMsgAfterOne(msg) {
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log(msg)
//             resolve()
//         },1000)
//     })
// }
//
//
// var p = printMsgAfterOne("Hello world")
//     console.log('after promise')
//     p.then(function () {
//         console.log("promise finish")
//
//     })


async function printMsgAfterOne(msg) {
        console.log(msg)
}
printMsgAfterOne('hello world').then(()=>{
    console.log('finish')
})

console.log('first')
