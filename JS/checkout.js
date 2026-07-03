function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderSummary() {
    const cart = getCart();
    const summaryContainer = document.getElementById("summary-items");

    if (cart.length === 0) {
        summaryContainer.innerHTML = `<p class="summary-empty">Your cart is empty.</p>`;
    } else {
        summaryContainer.innerHTML = cart.map(item => `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="summary-item-info">
                    <p class="summary-item-name">${item.name}</p>
                    <p class="summary-item-price">$ ${item.price.toLocaleString()}</p>
                </div>
                <span class="summary-item-qty">x${item.quantity}</span>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 50 : 0;
    const vat = Math.round(total * 0.2);
    const grandTotal = total + shipping;

    document.getElementById("summary-total").textContent = "$ " + total.toLocaleString();
    document.getElementById("summary-shipping").textContent = "$ " + shipping.toLocaleString();
    document.getElementById("summary-vat").textContent = "$ " + vat.toLocaleString();
    document.getElementById("summary-grand-total").textContent = "$ " + grandTotal.toLocaleString();
}

function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = "";
    if (inputEl) inputEl.classList.remove("input-error");
}

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.add("input-error");
}

function validateForm() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    ["name", "email", "phone", "address", "zip", "city", "country", "emoney-number", "emoney-pin"].forEach(clearError);

    if (name === "") {
        showError("name", "This field is required");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        showError("email", "This field is required");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("email", "Please enter a valid email");
        isValid = false;
    }

    const phonePattern = /^[\d\s+\-()]{7,}$/;
    if (phone === "") {
        showError("phone", "This field is required");
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        showError("phone", "Please enter a valid phone number");
        isValid = false;
    }

    if (address === "") {
        showError("address", "This field is required");
        isValid = false;
    }

    if (zip === "") {
        showError("zip", "This field is required");
        isValid = false;
    }

    if (city === "") {
        showError("city", "This field is required");
        isValid = false;
    }

    if (country === "") {
        showError("country", "This field is required");
        isValid = false;
    }

    if (paymentMethod === "emoney") {
        const emoneyNumber = document.getElementById("emoney-number").value.trim();
        const emoneyPin = document.getElementById("emoney-pin").value.trim();

        if (emoneyNumber === "") {
            showError("emoney-number", "This field is required");
            isValid = false;
        } else if (!/^\d{9}$/.test(emoneyNumber)) {
            showError("emoney-number", "Must be 9 digits");
            isValid = false;
        }

        if (emoneyPin === "") {
            showError("emoney-pin", "This field is required");
            isValid = false;
        } else if (!/^\d{4}$/.test(emoneyPin)) {
            showError("emoney-pin", "Must be 4 digits");
            isValid = false;
        }
    }

    return isValid;
}

function handleSubmit(e) {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty. Add a product before checking out.");
        return;
    }

    if (!validateForm()) {
        return;
    }

    localStorage.removeItem("cart");
    alert("Thank you! Your order has been placed.");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    renderSummary();
    document.getElementById("checkout-form").addEventListener("submit", handleSubmit);
});