/*
* @Author: sumh
* @Date:   2018-07-13 03:20:00
* @Last Modified by:   sumh@herin.ai
* @Last Modified time: 2018-07-13 09:15:12
*/
const shell = require('shelljs');
const pip = require('public-ip');


// Promise计时器函数
let wait = (n)=>{
    return new Promise((resolve)=>{

        setTimeout(()=>{
            resolve();
        },n);
    });
};

const redial = async(n=1)=>{

    if(n>5) return Promise.resolve();

    // let oip = await pip.v4();
    // console.log(oip);

    // 关闭所有pppoe连接
    shell.exec('poff -a');

    // 等待1s
    await wait(1000);

    // 执行重拨号
    if(shell.exec('pon dsl-provider').code === 0){

        // 等待2s
        await wait(2000);

        // 获取新的ip地址
        let nip = await pip.v4();
        // console.log(nip);

        return Promise.resolve(nip);

    }else{
        return redial(n+1);
    }

};


module.exports = redial;