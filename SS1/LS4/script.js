let nameOfBook = prompt("Nhap ten sach:");
let yearOfPublication = Number(prompt("Nhap nam xuat ban"));
const currentYear = 2025;
let ageOfBook = currentYear - yearOfPublication;
console.log("Sach: " + nameOfBook);
console.log("Nam xuat ban: " + yearOfPublication);
console.log("Tuoi cua sach " + ageOfBook + " " + "nam");