document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    const viewCartButton = document.getElementById('view-cart');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout');

    function setupAddToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const product = event.target.parentElement;
                const productName = product.querySelector('h3').textContent;
                const productPrice = parseFloat(product.querySelector('p').textContent.replace('&#8369;', '').replace(',', ''));

                const existingItem = cart.find(item => item.name === productName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ name: productName, price: productPrice, quantity: 1 });
                }

                updateCart();
                alert(`${productName} added to cart!`);
            });
        });
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} x ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalPriceSpan.innerHTML = `&#8369;${total.toFixed(2)}`;
        viewCartButton.textContent = `View Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
    }

    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    viewCartButton.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    checkoutButton.addEventListener('click', () => {
        alert('Checkout successful!');
        cart.length = 0;
        updateCart();
        cartModal.classList.add('hidden');
    });

    setupAddToCartListeners();
});
