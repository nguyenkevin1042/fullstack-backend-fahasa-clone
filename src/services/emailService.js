"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

//1. SIGN UP EMAIL MESSAGE
let sendSignupEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Tien Nguyen 👻" <nguyenkevin1042@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<p>Nhấn vào link dưới đề hoàn thành đăng ký.</p>" +
            dataSend.redirectLink // html body
    });
}

let getBodyHtmlEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = "<h3> Xin chào " + dataSend.patientName + "</h3>" +
            "<p>- Bạn nhận được email này vì đã đặt lịch hẹn thành công.</p>" +
            "<p>- Thông tin lịch hẹn:</p>" +
            "<ul>" +
            "<li>Thời gian: " + dataSend.time + "</li>" +
            "<li>Bác sĩ: " + dataSend.doctorName + "</li>" +
            "<li>Lý do khám: " + dataSend.reason + " </li>" +
            "</ul>" +
            "<p>- Nhấn vao:</p>" +
            dataSend.redirectLink;

    }
    if (dataSend.language === 'en') {
        result = "<h3> Dear " + dataSend.patientName + "</h3>" +
            "<p> - Bạn nhận được email này vì đã đặt lịch hẹn thành công.</p>" +
            "<p>- Thông tin lịch hẹn:</p>" +
            "<ul>" +
            "<li>Time: " + dataSend.time + "</li>" +
            "<li>Doctor: " + dataSend.doctorName + "</li>" +
            "<li>Reason: " + dataSend.reason + " </li>" +
            "</ul>" +
            "<p>- Nếu những thông tin trên là chính xác. Vui lòng nhấn vào đường link sau để xác nhận lịch hẹn:</p>" +
            dataSend.redirectLink;
    }
    return result;
}


module.exports = {
    sendSignupEmail: sendSignupEmail
}