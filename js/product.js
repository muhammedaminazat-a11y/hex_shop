document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const container = document.getElementById("product-details");

  if (!id) {
    container.innerHTML = "<p>Товар не найден</p>";
    return;
  }

  const product = await getProductById(id);

  container.innerHTML = `
    <div class="card">
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <h3>${product.price} $</h3>
      <button id="add-to-cart">Добавить в корзину</button>
    </div>
  `;

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    const cart = new Cart(items);

    cart.addItem(product.id);

    localStorage.setItem("cart", JSON.stringify(cart.items));

    alert("Товар добавлен в корзину!");
  });

  document.getElementById("to-catalog").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.getElementById("to-cart").addEventListener("click", () => {
    window.location.href = "cart.html";
  });
});