document.addEventListener("DOMContentLoaded", () => {
  const showLogin = document.getElementById("show-login");
  const showRegister = document.getElementById("show-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  showLogin.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });

  showRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  document.getElementById("register-btn").addEventListener("click", () => {
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!name || !email || !password) {
      alert("Заполните все поля!");
      return;
    }

    if (!email.includes("@")) {
      alert("Введите правильный email!");
      return;
    }

    if (password.length < 4) {
      alert("Пароль должен быть минимум 4 символа!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
      alert("Пользователь уже существует!");
      return;
    }

    const user = new User(name, email, password);
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Регистрация успешна! Теперь войдите.");

    loginForm.style.display = "block";
    registerForm.style.display = "none";

    document.getElementById("login-email").value = email;
    document.getElementById("login-password").value = "";
  });

  document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Введите email и пароль!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Неверный email или пароль!");
      return;
    }

    setCurrentUser(user);
    window.location.href = "index.html";
  });
});