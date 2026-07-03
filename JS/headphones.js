const DATA_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/public/data.json";
const BASE_ASSETS_URL = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/src";
const imgElements = {
    "xx99-mark-two": document.getElementById("img-xx99-mark-two"),
    "xx99-mark-one": document.getElementById("img-xx99-mark-one"),
    "xx59": document.getElementById("img-xx59")
};

function formatImagePath(relativePath) {
    if (!relativePath) return "";
    const cleanPath = relativePath.startsWith('.') ? relativePath.substring(1) : relativePath;
    return `${BASE_ASSETS_URL}${cleanPath}`;
}

async function fetchProductImages() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();

        products.forEach(product => {
            if (product.slug === "xx99-mark-two-headphones" && imgElements["xx99-mark-two"]) {
                imgElements["xx99-mark-two"].src = formatImagePath(product.categoryImage.desktop);
            } 
            else if (product.slug === "xx99-mark-one-headphones" && imgElements["xx99-mark-one"]) {
                imgElements["xx99-mark-one"].src = formatImagePath(product.categoryImage.desktop);
            } 
            else if (product.slug === "xx59-headphones" && imgElements["xx59"]) {
                imgElements["xx59"].src = formatImagePath(product.categoryImage.desktop);
            }
        });

    } catch (error) {
        console.error("Failed to load product images from API:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchProductImages);