function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartDropdown();
}

function addToCart(product, qty) {
    const cart = getCart();
    const existing = cart.find(item => item.slug === product.slug);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }

    saveCart(cart);
}

function removeFromCart(slug) {
    let cart = getCart();
    cart = cart.filter(item => item.slug !== slug);
    saveCart(cart);
}

function changeQuantity(slug, amount) {
    const cart = getCart();
    const item = cart.find(item => item.slug === slug);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity < 1) {
        removeFromCart(slug);
        return;
    }
    saveCart(cart);
}

function clearCart() {
    saveCart([]);
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector(".cart-count");
    if (badge) {
        badge.textContent = totalItems;
    }
}

function buildCartDropdown() {
    const dropdown = document.createElement("div");
    dropdown.className = "cart-dropdown";
    dropdown.id = "cart-dropdown";
    document.body.appendChild(dropdown);
}

function renderCartDropdown() {
    const dropdown = document.getElementById("cart-dropdown");
    if (!dropdown) return;

    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        dropdown.innerHTML = `
            <div class="cart-header">
                <span>CART (0)</span>
            </div>
            <p class="cart-empty">Your cart is empty.</p>
        `;
        return;
    }

    const itemsHtml = cart.map(item => `
        <div class="cart-item" data-slug="${item.slug}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$ ${item.price.toLocaleString()}</p>
            </div>
            <div class="cart-item-qty">
                <button class="qty-decrease" data-slug="${item.slug}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-increase" data-slug="${item.slug}">+</button>
            </div>
        </div>
    `).join("");

    dropdown.innerHTML = `
        <div class="cart-header">
            <span>CART (${totalItems})</span>
            <button id="remove-all-btn">Remove all</button>
        </div>
        <div class="cart-items">${itemsHtml}</div>
        <div class="cart-total-row">
            <span>TOTAL</span>
            <span>$ ${totalPrice.toLocaleString()}</span>
        </div>
        <a href="checkout.html" class="checkout-btn">Checkout</a>
    `;
}

function toggleCartDropdown() {
    const dropdown = document.getElementById("cart-dropdown");
    if (dropdown) {
        dropdown.classList.toggle("open");
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const qty = Number(e.target.dataset.quantity) || 1;
        const img = document.querySelector(".product-image-box img");

        addToCart({
            slug: e.target.dataset.slug,
            name: e.target.dataset.name,
            price: Number(e.target.dataset.price),
            image: img ? img.src : ""
        }, qty);
        return;
    }

    if (e.target.closest(".cart-btn")) {
        toggleCartDropdown();
        return;
    }

    if (e.target.id === "remove-all-btn") {
        clearCart();
        return;
    }

    if (e.target.classList.contains("qty-increase")) {
        changeQuantity(e.target.dataset.slug, 1);
        return;
    }

    if (e.target.classList.contains("qty-decrease")) {
        changeQuantity(e.target.dataset.slug, -1);
        return;
    }

    if (!e.target.closest(".cart-dropdown") && !e.target.closest(".cart-btn")) {
        const dropdown = document.getElementById("cart-dropdown");
        if (dropdown) dropdown.classList.remove("open");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    buildCartDropdown();
    updateCartCount();
    renderCartDropdown();
});