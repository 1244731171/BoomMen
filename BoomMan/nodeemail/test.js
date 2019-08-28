

var email   = require("emailjs");
var server  = email.server.connect({
    user:    "575960273@qq.com",      // 你的QQ用户
    password:"ffxugyoquvxtbdhj",           // 注意，不是QQ密码，而是刚才生成的授权码
    host:    "smtp.qq.com",         // 主机，不改
    ssl:     true                   // 使用ssl
});

//开始发送邮件
server.send({
    text:    "邮件内容",       //邮件内容
    from:    "575960273@qq.com",        //谁发送的
    to:      "575960273@qq.com",       //发送给谁的
    subject: "邮件主题"          //邮件主题
}, function(err, message) {
    //回调函数
    console.log(`===> ${err || JSON.stringify(message)}`);
});