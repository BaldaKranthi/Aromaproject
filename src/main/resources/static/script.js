let cart = [];

function increaseQty(itemName, price, image) {
    const existingItem = cart.find(item => item.itemName === itemName);
    if (existingItem) {
        existingItem.quantity++;
        existingItem.price = existingItem.quantity * price;
    } else {
        cart.push({ itemName, quantity: 1, price: price, image: image });
    }
    document.getElementById('qty-' + itemName).textContent = getItemQuantity(itemName);
    updateCartUI();
}

function decreaseQty(itemName, price) {
    const existingItem = cart.find(item => item.itemName === itemName);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.itemName !== itemName);
        } else {
            existingItem.price = existingItem.quantity * price;
        }
    }
    document.getElementById('qty-' + itemName).textContent = getItemQuantity(itemName);
    updateCartUI();
}

function getItemQuantity(itemName) {
    const item = cart.find(item => item.itemName === itemName);
    return item ? item.quantity : 0;
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartItemsElement || !cartTotalElement) return;

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.itemName}" width="50px" height="50px" style="margin-right:10px; vertical-align: middle;"/>
            ${item.itemName} x ${item.quantity} - ₹${item.price}
        `;
        cartItemsElement.appendChild(itemElement);
        total += item.price;
    });

    cartTotalElement.textContent = `Total: ₹${total}`;
}

function placeOrder() {
    const customerName = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (cart.length === 0) {
        alert('❌ Your cart is empty!');
        return;
    }

    if (!customerName || !phone || !email) {
        alert('❌ Please fill all customer details.');
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    fetch('http://localhost:8080/api/saveOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customerName: customerName,
            phone: phone,
            email: email,
            cartItems: cart,
            totalPrice: totalPrice
        })
    })
    .then(response => response.text())
    .then(data => {
        alert('✅ Order Saved: ' + data);
        cart = [];
        resetQuantities();
        updateCartUI();
        document.getElementById('customerName').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    })
    .catch(error => {
        alert('❌ Failed to save order.');
        console.error('Error:', error);
    });
}

function resetQuantities() {
    cart.forEach(item => {
        const qtySpan = document.getElementById('qty-' + item.itemName);
        if (qtySpan) qtySpan.textContent = '0';
    });
}
