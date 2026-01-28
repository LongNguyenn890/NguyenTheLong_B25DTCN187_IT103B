let book = prompt("Ten sach");
book = book.toUpperCase();
book = book.trim();
let author = prompt("Ten tac gia");
author = author.toUpperCase();
let yearOfPubblish = Number(prompt("Nam xuat ban"));
let price = Number(prompt("Gia tien mot cuon"));
let quantity = Number(prompt("So luong nhap kho"));
let Id = Math.floor(Math.random() * 1000) + 1;
let order = Math.floor(Math.random() * 10) + 1;
let bookId = author.slice(0,3) + yearOfPubblish + "-" + Id;
const currentYear = 2026;
let age = currentYear - yearOfPubblish;
let total = price * quantity;
console.log("---PHIEU NHAP KHO---");
console.log(`
Ma sach: ${bookId}
Ten sach: ${book}
Tac gia: ${author}
Nam xuat ban: ${yearOfPubblish}
Tuoi sach: ${age}
Tong gia tri: ${price} VND
Ngan ke goi y: Ke so ${order}
    `);