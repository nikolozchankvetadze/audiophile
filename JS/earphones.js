const DATA_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/public/data.json";
const BASE_ASSETS_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/src";

async function loadEarphones() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data: " + response.status);
        }

        const products = await response.json();
        const yx1 = products.find(p => p.slug === "yx1-earphones");

        if (!yx1) return;

        const imagePath = BASE_ASSETS_URL + yx1.categoryImage.desktop.substring(1);
        const container = document.getElementById("products-container");

        container.innerHTML = `
            <div class="product-row" data-slug="${yx1.slug}" data-price="${yx1.price}" data-name="${yx1.name}" data-image="${imagePath}">
                <div class="product-image-box">
                    <img src="${imagePath}" alt="${yx1.name}">
                </div>
                <div class="product-content-box">
                    <span class="new-product-tag">New Product</span>
                    <h2>${yx1.name.toUpperCase()}</h2>
                    <p>${yx1.description}</p>
                    <a href="yx1.html" class="see-product-btn">SEE PRODUCT</a>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Error loading earphones:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadEarphones);