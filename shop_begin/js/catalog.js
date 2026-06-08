document.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  const container = document.getElementById("catalog");

  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">

      <h3>${p.title}</h3>

      <p>${Math.round(p.price * 500)} ₸</p>

      <div class="card-buttons">
        <a class="details-btn" href="product.html?id=${p.id}">
          Подробнее
        </a>

        <button class="cart-btn" data-id="${p.id}">
          🛒
        </button>
      </div>
    `;

    container.appendChild(card);

    card.querySelector(".cart-btn").addEventListener("click", () => {
      const items = JSON.parse(localStorage.getItem("cart")) || [];
      const cart = new Cart(items);

      cart.addItem(p.id);

      localStorage.setItem(
        "cart",
        JSON.stringify(cart.items)
      );

      if (typeof renderHeader === "function") {
        renderHeader();
      }

      alert("Товар добавлен в корзину!");
    });
  });
});