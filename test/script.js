const list = [];
const email = document.getElementById("email");
const password = document.getElementById("password");
const reEnterPassword = document.getElementById("reEnterPassword");

function createUser() {
    const inputEmail = email.value.trim();
    const inputPassWord = password.value.trim();
    const inputReEnterPassword = reEnterPassword.value.trim();

    if (inputPassWord !== inputReEnterPassword) {
        alert("Mật khẩu nhập lại không trùng khớp");
        return;
    }

    let newUser = {
        email: inputEmail,
        password: inputPassWord,
        rePassword: inputReEnterPassword,
    }

    list.push(newUser);

    console.log(list);
}

const btn = document.getElementById("btn");
btn.addEventListener("click", () => createUser());



