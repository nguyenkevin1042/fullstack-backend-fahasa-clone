"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

//1. SIGN UP EMAIL MESSAGE
let sendSignupEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: '"Tien Nguyen 👻" <nguyenkevin1042@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<p>Nhấn vào link dưới đề hoàn thành đăng ký.</p>" +
            dataSend.redirectLink
    });
}


//2. ORDERING SUCCESS
let sendOrderingSuccessEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: '"Tien Nguyen 👻" <nguyenkevin1042@gmail.com>', // sender address
        to: dataSend.receiverEmail,
        subject: "New order #" + dataSend.orderId,
        text: "Ordering success!",
        html: getBodyHtmlForOrderingSuccessEmail(dataSend)
    });
}

let getBodyHtmlForOrderingSuccessEmail = (dataSend) => {
    let result = "<div><h2>Kính gửi</h2></div>" +
        "<h4>Cảm ơn quý khách đã mua hàng!</h4>" +
        "<h4>Dưới đây là thông tin đơn hàng của quý khách</h4></div>" +
        "<p><b>Mã đơn hàng: </b>" + dataSend.orderId + "</p>" +
        "<p><b>Ngày đặt: </b>" + dataSend.orderedDate + "</p>" +
        "<p><b>Tổng đơn hàng: </b>" + dataSend.totalPrice + "</p>" +
        "<p><b>Số lượng sản phẩm: </b>" + dataSend.orderedProductLength + "</p><br/>" +
        "<p>Quý khách vui lòng kiểm tra email thường xuyên để cập nhật về tình trạng đơn hàng</p>"

    return result;
}

//2. ORDER STATUS CHANGE
let sendEmailWhenOrderStatusChange = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: '"Tien Nguyen" <nguyenkevin1042@gmail.com>', // sender address
        to: dataSend.receiverEmail,
        subject: "Order #" + dataSend.orderId,
        text: "Ordering success!",
        html: getBodyHtmlForOrderStatusChange(dataSend)
    });
}

let getBodyHtmlForOrderStatusChange = (dataSend) => {
    let result = "<div><h2>Kính gửi</h2></div>" +
        "<p>Đơn hàng <b>#" + dataSend.orderId + "</b> của quý khách " +
        getStatusString(dataSend.billStatus) + "</p>"

    return result;
}

let getStatusString = (status) => {
    let result = ''
    switch (status) {
        case 'S2':
            result = "đã được bàn giao cho bên vận chuyển."
            break;
        case 'S3':
            result = "đang trên đường giao."
            break;
        case 'S4':
            result = "đã được đối tác vận chuyển xác nhận giao thành công."
            break;

        default:
            break;
    }

    return result;
}


// let getBodyHtmlEmail = (dataSend) => {
//     let result = '';
//     if (dataSend.language === 'vi') {
//         result = "<h3> Xin chào " + dataSend.patientName + "</h3>" +
//             "<p>- Bạn nhận được email này vì đã đặt lịch hẹn thành công.</p>" +
//             "<p>- Thông tin lịch hẹn:</p>" +
//             "<ul>" +
//             "<li>Thời gian: " + dataSend.time + "</li>" +
//             "<li>Bác sĩ: " + dataSend.doctorName + "</li>" +
//             "<li>Lý do khám: " + dataSend.reason + " </li>" +
//             "</ul>" +
//             "<p>- Nhấn vao:</p>" +
//             dataSend.redirectLink;

//     }
//     if (dataSend.language === 'en') {
//         result = "<h3> Dear " + dataSend.patientName + "</h3>" +
//             "<p> - Bạn nhận được email này vì đã đặt lịch hẹn thành công.</p>" +
//             "<p>- Thông tin lịch hẹn:</p>" +
//             "<ul>" +
//             "<li>Time: " + dataSend.time + "</li>" +
//             "<li>Doctor: " + dataSend.doctorName + "</li>" +
//             "<li>Reason: " + dataSend.reason + " </li>" +
//             "</ul>" +
//             "<p>- Nếu những thông tin trên là chính xác. Vui lòng nhấn vào đường link sau để xác nhận lịch hẹn:</p>" +
//             dataSend.redirectLink;
//     }
//     return result;
// }


module.exports = {
    sendSignupEmail: sendSignupEmail,
    sendOrderingSuccessEmail: sendOrderingSuccessEmail,
    sendEmailWhenOrderStatusChange: sendEmailWhenOrderStatusChange
}