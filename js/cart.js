document.addEventListener("DOMContentLoaded", async () => {
  renderCart();
});

async function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const cart = new Cart(items);

  cartItemsContainer.innerHTML = "";

  if (cart.items.length === 0) {
    cartItemsContainer.innerHTML = "<p>Корзина пустая</p>";
    cartTotal.textContent = "0 $";
    return;
  }

  const products = [];

  for (const item of cart.items) {
    const product = await getProductById(item.productId);
    products.push(product);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Цена: ${Math.round(product.price * 500)} ₸</p>
      <p>Количество: ${item.quantity}</p>
      <button class="delete-btn" data-id="${item.productId}">Удалить</button>
    `;

    cartItemsContainer.appendChild(div);
  }

  const total = products.reduce((sum, product) => {
  const item = cart.items.find(i => i.productId == product.id);
  return sum + Math.round(product.price * 500) * item.quantity;
  }, 0);

  cartTotal.textContent = total + " ₸";

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const items = JSON.parse(localStorage.getItem("cart")) || [];
      const cart = new Cart(items);

      cart.removeItem(id);

      localStorage.setItem("cart", JSON.stringify(cart.items));
      renderCart();
    });
  });
}
