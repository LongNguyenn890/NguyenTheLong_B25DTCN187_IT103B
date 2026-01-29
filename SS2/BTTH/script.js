let userName = prompt("Nhap ten nguoi dung").trim().toUpperCase();
let role = prompt("Nhap vai tro (admin / student / guest)").toLowerCase();
let accountBalance = Number(prompt("Nhap so du tai khoan"));
let cardStatus = prompt("Trang thai hoat dong (true neu dang hoat dong)").toLowerCase() == "true";
let dayOverdue = Number(prompt("So ngay qua han tra sach"));

let roleNotification = "";

switch (role) {
    case "admin":
        roleNotification = "Chào Admin, bạn có toàn quyền hệ thống";
        break;
    case "student":
        roleNotification = "Chào sinh viên, bạn có thể mượn sách";
        break;
    case "guest":
        roleNotification = "Chào khách, bạn chỉ có thể đọc tại chỗ";
        break;
    default:
        roleNotification = "Lỗi: Vai trò không hợp lệ!";
        break;
}

let borrowResult = "";

if (!userName || role == "guest" || accountBalance <= 0 || cardStatus != "true") {
    borrowResult = "YÊU CẦU BỊ TỪ CHỐI";
} else {
    borrowResult = "ĐƯỢC PHÉP MƯỢN SÁCH";
}



let bookReturnStatus = "";
let fine = 0;

if (dayOverdue <= 0) {
    bookReturnStatus = "Cảm ơn bạn đã trả đúng hạn";
} else if (dayOverdue <= 5) {
    bookReturnStatus = `Quá hạn ${dayOverdue} ngày`;
    fine = dayOverdue * 5000;
} else if (dayOverdue <= 10){
    bookReturnStatus = `Quá hạn ${dayOverdue} ngày`;
    fine = dayOverdue * 10000;
} else {
    bookReturnStatus = `Quá hạn ${dayOverdue} ngày / TÀI KHOẢN BỊ KHÓA`;
    fine = 200000;
}

let extraInfor = "";
if (borrowResult == "ĐƯỢC PHÉP MƯỢN SÁCH" && role != "guest") {
    extraInfor = `
    Tình trạng trả sách: ${bookReturnStatus}
    Tiền phạt: ${fine}  
    `
}

console.log(`
    --- HỆ THỐNG MƯỢN TRẢ ---
    Người dùng: ${userName}
    Quyền hạn: ${roleNotification}
    Kết quả mượn: ${borrowResult}
    ${extraInfor}
    `);


