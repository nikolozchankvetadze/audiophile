const DATA_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/public/data.json";
const BASE_ASSETS_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/src";

let quantity = 1;

function formatImagePath(relativePath) {
    if (!relativePath) return "";
    const cleanPath = relativePath.startsWith('.') ? relativePath.substring(1) : relativePath;
    return `${BASE_ASSETS_URL}${cleanPath}`;
}

async function loadProduct() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        const product = products.find(p => p.slug === "zx9-speaker");

        if (!product) {
            console.error("Product not found in API data");
            return;
        }

        fillProductInfo(product);
        fillFeatures(product);
        fillIncludes(product);
        fillGallery(product);
        setupQuantityButtons(product);

    } catch (error) {
        console.error("Failed to load product:", error);
    }
}

function fillProductInfo(product) {
    document.getElementById("product-img").src = formatImagePath(product.image.desktop);
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = "$ " + product.price.toLocaleString();
}

function fillFeatures(product) {
    const featuresContainer = document.getElementById("features-text");
    const paragraphs = product.features.split("\n\n");

    paragraphs.forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        featuresContainer.appendChild(p);
    });
}

function fillIncludes(product) {
    const list = document.getElementById("includes-list");

    product.includes.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="qty">${entry.quantity}x</span> ${entry.item}`;
        list.appendChild(li);
    });
}

function fillGallery(product) {
    document.getElementById("gallery-1").src = formatImagePath(product.gallery.first.desktop);
    document.getElementById("gallery-2").src = formatImagePath(product.gallery.second.desktop);
    document.getElementById("gallery-3").src = formatImagePath(product.gallery.third.desktop);
}

function setupQuantityButtons(product) {
    const quantityValue = document.getElementById("quantity-value");
    const decreaseBtn = document.getElementById("decrease-btn");
    const increaseBtn = document.getElementById("increase-btn");
    const addToCartBtn = document.getElementById("add-to-cart-btn");

    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }
    });

    increaseBtn.addEventListener("click", () => {
        quantity++;
        quantityValue.textContent = quantity;
    });

    addToCartBtn.addEventListener("click", () => {
        addToCartBtn.dataset.slug = product.slug;
        addToCartBtn.dataset.name = product.name;
        addToCartBtn.dataset.price = product.price;
        addToCartBtn.dataset.quantity = quantity;
    });
}

document.addEventListener("DOMContentLoaded", loadProduct);