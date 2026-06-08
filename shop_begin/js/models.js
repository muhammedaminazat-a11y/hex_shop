class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class Product {
  constructor(id, title, price, description, image, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
  }
}

class CartItem {
  constructor(productId, quantity = 1) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

class Cart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(productId) {
    const item = this.items.find(i => i.productId == productId);

    if (item) {
      item.quantity++;
    } else {
      this.items.push(new CartItem(productId, 1));
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.productId != productId);
  }

  getTotal(products) {
    let total = 0;

    this.items.forEach(item => {
      const product = products.find(p => p.id == item.productId);

      if (product) {
        total += product.price * item.quantity;
      }
    });

    return total;
  }
}