

let email = require("emailjs");
let server = email.server.connect({
    user: "575960273@qq.com",      // 你的QQ用户
    password: "ffxugyoquvxtbdhj",           // 注意，不是QQ密码，而是刚才生成的授权码
    host: "smtp.qq.com",         // 主机，不改
    ssl: true                   // 使用ssl
});

module.exports = (title = 'test', content = "test", from = "575960273@qq.com", to = "575960273@qq.com", cal = () =>{}) => {
    //开始发送邮件
    server.send({
        subject: title,          //邮件主题
        text: content,       //邮件内容
        from: from,        //谁发送的
        to: to      //发送给谁的
    }, function (err, message) {
        //回调函数
        let str = err || JSON.stringify(message);
        console.log(`===> ${str}`);
        cal(str);
    });
}