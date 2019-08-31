

let email = require("emailjs");

let fromEmail = "1577362666@qq.com";
// let toEmail = "cutexqy@yandex.com";
// let toEmail = "cute_xyq@protonmail.com";
// let toEmail = "cute_xyq@outlook.com"; // 需要实名20190831
let toEmail = "shinichi0817@outlook.com";

// let fromEmail = "shinichi0817@outlook.com";
// let frompassword = "shinichi14";
// let toEmail = "cute_xyq@outlook.com";

// let fromEmail = "cute_xyq@outlook.com";
// let frompassword = "shinichi14";
// let toEmail = "shinichi0817@outlook.com";
// qq
// let server = email.server.connect({
//     user: "575960273@qq.com",      // 你的QQ用户
//     password: "ffxugyoquvxtbdhj",           // 注意，不是QQ密码，而是刚才生成的授权码
//     host: "smtp.qq.com",         // 主机，不改
//     ssl: true                   // 使用ssl
// });

// 1577qq
let server = email.server.connect({
    user: fromEmail,      // 你的QQ用户
    password: "cpuxjopialjofedj",           // 注意，不是QQ密码，而是刚才生成的授权码
    host: "smtp.qq.com",         // 主机，不改
    ssl: true                   // 使用ssl
});

// outlook 伪装 需要验证手机以后才行
// let server = email.server.connect({
//     user: fromEmail,      // 你的QQ用户
//     password: frompassword,           // 注意，不是QQ密码，而是刚才生成的授权码
//     host: "smtp.office365.com",         // 主机，不改
//     post: 587,
//     // ssl:true,
//     tls: true                   // STARTTLS
// });

module.exports = {
    send: (title = 'test', content = "test", from, to, cal = () => { }) => {
        //开始发送邮件
        title = 'dHlwZSUzRGlucH==>' + title;
        server.send({
            subject: title,          //邮件主题
            text: content,       //邮件内容
            from: from || fromEmail,        //谁发送的
            to: to || toEmail     //发送给谁的
        }, function (err, message) {
            //回调函数
            let str = err || JSON.stringify(message);
            console.log(`===> ${str}`);
            cal(str);
        });
    }
};

// 下一个吧 功能比较全的 nodeemail给加进来
// 免费邮箱
// outlook 不用实名
// yahoo 需要手机号
// AOL Mail
// yandex Mail
// ProtonMail