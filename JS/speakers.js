const DATA_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/public/data.json";
const BASE_ASSETS_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/src";

async function loadSpeakers() {
    const container = document.getElementById("products-container");

    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data: " + response.status);
        }

        const products = await response.json();

        const zx9 = products.find(p => p.slug === "zx9-speaker");
        const zx7 = products.find(p => p.slug === "zx7-speaker");

        if (zx9) {
            container.appendChild(buildRow(zx9, false));
        }

        if (zx7) {
            container.appendChild(buildRow(zx7, true));
        }

    } catch (error) {
        console.error("Error loading speakers:", error);
    }
}

function buildRow(product, reversed) {
    const row = document.createElement("div");
    row.className = reversed ? "product-row reverse" : "product-row";

    const imagePath = BASE_ASSETS_URL + product.categoryImage.desktop.substring(1);

    row.dataset.slug = product.slug;
    row.dataset.price = product.price;
    row.dataset.name = product.name;
    row.dataset.image = imagePath;

    let newTag = "";
    if (product.new) {
        newTag = '<span class="new-product-tag">New Product</span>';
    }

    row.innerHTML = `
        <div class="product-image-box">
            <img src="${imagePath}" alt="${product.name}">
        </div>
        <div class="product-content-box">
            ${newTag}
            <h2>${product.name.toUpperCase()}</h2>
            <p>${product.description}</p>
            <a href="${product.slug}.html" class="see-product-btn">SEE PRODUCT</a>
        </div>
    `;

    return row;
}

document.addEventListener("DOMContentLoaded", loadSpeakers);