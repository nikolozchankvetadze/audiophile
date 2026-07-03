const DATA_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/public/data.json";
const BASE_ASSETS_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/src";
const SLUG = "xx99-mark-two-headphones";

let quantity = 1;

function imgPath(relativePath) {
    return BASE_ASSETS_URL + relativePath.substring(1);
}

function renderIncludes(includes) {
    return includes.map(item => `
        <li><span class="qty">${item.quantity}x</span> ${item.item}</li>
    `).join("");
}

function renderFeatures(features) {
    return features.split("\n\n").map(p => `<p>${p}</p>`).join("");
}

function render(product) {
    const container = document.getElementById("product-container");

    const newTag = product.new ? '<span class="new-product-tag">New Product</span>' : "";

    container.innerHTML = `
        <div class="product-overview">
            <div class="product-image-box">
                <img src="${imgPath(product.image.desktop)}" alt="${product.name}">
            </div>
            <div class="product-content-box">
                ${newTag}
                <h1>${product.name.toUpperCase()}</h1>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$ ${product.price.toLocaleString()}</p>
                <div class="purchase-row">
                    <div class="quantity-selector">
                        <button id="decrease-btn">-</button>
                        <span id="quantity-value">1</span>
                        <button id="increase-btn">+</button>
                    </div>
                    <button class="add-to-cart-btn" data-slug="${product.slug}" data-price="${product.price}" data-name="${product.name}">Add to Cart</button>
                </div>
            </div>
        </div>

        <div class="features-section">
            <div class="features-text">
                <h2>Features</h2>
                ${renderFeatures(product.features)}
            </div>
            <div class="in-the-box">
                <h2>In the Box</h2>
                <ul>${renderIncludes(product.includes)}</ul>
            </div>
        </div>

        <div class="gallery-grid">
            <div class="gallery-col">
                <div class="gallery-item small">
                    <img src="${imgPath(product.gallery.first.desktop)}" alt="Gallery image 1">
                </div>
                <div class="gallery-item small">
                    <img src="${imgPath(product.gallery.second.desktop)}" alt="Gallery image 2">
                </div>
            </div>
            <div class="gallery-item large">
                <img src="${imgPath(product.gallery.third.desktop)}" alt="Gallery image 3">
            </div>
        </div>
    `;

    setupQuantitySelector();
}

function setupQuantitySelector() {
    const valueEl = document.getElementById("quantity-value");
    const decreaseBtn = document.getElementById("decrease-btn");
    const increaseBtn = document.getElementById("increase-btn");
    const addToCartBtn = document.querySelector(".add-to-cart-btn");

    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity -= 1;
            valueEl.textContent = quantity;
        }
    });

    increaseBtn.addEventListener("click", () => {
        quantity += 1;
        valueEl.textContent = quantity;
    });

    addToCartBtn.dataset.quantity = quantity;
    addToCartBtn.addEventListener("click", () => {
        addToCartBtn.dataset.quantity = quantity;
    });
}

async function loadProduct() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data: " + response.status);
        }

        const products = await response.json();
        const product = products.find(p => p.slug === SLUG);

        if (product) {
            render(product);
        }

    } catch (error) {
        console.error("Error loading product:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadProduct);