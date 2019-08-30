

let email = require("emailjs");

let fromEmail = "1577362666@qq.com";
let toEmail = "cute_xyq@outlook.com";
// qq
// let server = email.server.connect({
//     user: "575960273@qq.com",      // 你的QQ用户
//     password: "ffxugyoquvxtbdhj",           // 注意，不是QQ密码，而是刚才生成的授权码
//     host: "smtp.qq.com",         // 主机，不改
//     ssl: true                   // 使用ssl
// });

// outlook 伪装
let server = email.server.connect({
    user: fromEmail,      // 你的QQ用户
    password: "cpuxjopialjofedj",           // 注意，不是QQ密码，而是刚才生成的授权码
    host: "smtp.qq.com",         // 主机，不改
    ssl: true                   // 使用ssl
});

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