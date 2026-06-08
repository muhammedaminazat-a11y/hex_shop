function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const user = getCurrentUser();
  const cartCount = getCartCount();

  header.innerHTML = `
    <h1><a href="index.html">HEXMAG</a></h1>
    <nav>
      <a href="index.html">Главная</a>
      <a href="cart.html">Корзина (${cartCount})</a>
      ${
        user
          ? `<span>Привет, ${user.name}</span> <button id="logout-btn">Выйти</button>`
          : `<a href="auth.html">Вход / Регистрация</a>`
      }
    </nav>
  `;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logoutUser();
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", renderHeader);