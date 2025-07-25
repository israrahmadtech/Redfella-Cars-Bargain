// .............................  Product Data Initialization ..................
// Check if products exist in localStorage, if not initialize them
if (!localStorage.getItem("products")) {
    const productsArr = [
        { id: 1, image: "product1.webp", title: "Toyota Corolla 2020", model: "GLi 1.3L", price: 2500000, quantity: 1 },
        { id: 2, image: "product2.jpg", title: "Honda Civic 2022", model: "Oriel 1.8L", price: 4300000, quantity: 1 },
        { id: 3, image: "product3.avif", title: "Suzuki Alto 2023", model: "VXL AGS", price: 2200000, quantity: 1 },
        { id: 4, image: "product4.avif", title: "KIA Sportage 2021", model: "AWD 2.0L", price: 5900000, quantity: 1 },
        { id: 5, image: "product5.avif", title: "Hyundai Tucson 2022", model: "FWD 2.0L", price: 6100000, quantity: 1 },
        { id: 6, image: "product6.avif", title: "Toyota Yaris 2023", model: "ATIV X 1.5L", price: 3450000, quantity: 1 },
    ];
    localStorage.setItem("products", JSON.stringify(productsArr));
}

// Get products from localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// Initialize cart data if it doesn't exist
if (!localStorage.getItem("cartData")) {
    localStorage.setItem("cartData", "[]");
}
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

// ........  Total Price Logic:
let totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
let total_price = document.getElementById("total-price") || 0
total_price.innerText = totalPrice

// ........ Count of items in cart
let cartProductsCount = document.getElementById('cart-products-count') || undefined
if (cartProductsCount) cartProductsCount.innerHTML = cartData.length

// .......... create notification
function createNotification() {
    let notification = document.createElement('p')
    notification.setAttribute('class', 'bg-success py-2 px-3 text-white rounded-3 position-fixed mx-auto')
    notification.style.width = "fix-content"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.fontSize = "14px"
    return notification
}
// .............................  Product Page Code  ..................
const productCards = document.getElementById('product-cards');
if (productCards) {
    productCards.innerHTML = '';
    products.forEach(({ id, image, title, model, price }) => {
        productCards.innerHTML += `<div id="${id}" class="product-card card-shadow p-2 rounded-5" style="width: 300px;">
                                    <div class="product-img w-100">
                                        <img class="w-100 rounded-5" src="./assets/${image}" alt="${title}">
                                    </div>
                                    <div class="product-content mt-2 ps-2">
                                        <h5 class="title">${title}</h5>
                                        <p class="my-2 text-gray">${model}</p>
                                        <div class="d-flex justify-content-between align-items-center mb-3 pe-2">
                                            <p class="s-gray mb-0">$ <span class="product-price">${price}</span></p>
                                            <button class="add-to-cart bg-orange border-0 px-3 py-1 rounded-2 text-white position-relative"
                                            style="font-size: 15px;">Add to cart</button>
                                        </div>
                                    </div>
                                </div>`;
    });

    // Add event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const productCard = button.closest('.product-card');

            if (productCard) {
                const productId = Number(productCard.id);
                const filteredProduct = products.find(product => product.id === productId);

                if (filteredProduct) {
                    const productInCart = cartData.find(item => item.id === filteredProduct.id);

                    let notification = createNotification()
                    if (!productInCart) {
                        cartData.push(filteredProduct);
                        notification.innerText = `Added to cart`
                        document.body.appendChild(notification)

                        setTimeout(() => notification.remove(), 2000)
                    } else {
                        productInCart.quantity += 1;

                        notification.innerText = "Already in cart | Quantity increased"
                        document.body.appendChild(notification)
                        setTimeout(() => notification.remove(), 2000)
                    }
                    cartProductsCount = document.getElementById('cart-products-count') || undefined
                    if (cartProductsCount) cartProductsCount.innerHTML = cartData.length
                    localStorage.setItem("cartData", JSON.stringify(cartData))
                }
            }
        });
    });
}

// cartData = JSON.parse(localStorage.getItem("cartData")) || []

const cartCards = document.getElementById('cart-cards') || undefined

if (cartCards) {
    cartCards.innerHTML = ""

    cartData.forEach(({ id, image, title, price, quantity }) => {
        cartCards.innerHTML += `<div id="${id}" class="cart-card card-shadow rounded-4" style="width: 285px; display: flex;">
                        <div class="product-img w-50 h-100">
                            <img class="w-100 rounded-4 h-100" src="../assets/${image}" alt="${title}"
                                style="object-fit: cover;">
                        </div>
                        <div class="product-content me-3 p-2 d-flex flex-column gap-2 w-50">
                            <h6 class="title mb-0">Hellow World</h5>
                                <p class="s-gray mb-0" style="font-size: 15px;">$ <span
                                        class="product-price">${price}</span></p>
                                <div class="d-flex justify-content-between align-items-center w-100">
                                    <div class="quantity-container d-flex">
                                        <button class="increment">
                                            <i class="fa-solid fa-plus"></i>
                                        </button>
                                        <input type="number" value="${quantity}" style="outline: 0;" class="quantity text-center" readonly>
                                        <button class="decrement">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                    <button class="remove-btn bg-danger border-0 rounded-2 text-left text-white"
                                        style="font-size: 14px; width: 27px; height: 27px;"><i class="fas fa-trash"></i>
                                    </button>
                                </div>
                        </div>
                    </div>`
    })
}

// ................  Increment --- Decrement --- Remove Logic
const incrementBtn = document.querySelectorAll('.increment') || undefined
if (incrementBtn) {
    incrementBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            let btn = event.currentTarget
            const input = btn.nextElementSibling

            if (input && input.classList.contains("quantity")) input.value = parseInt(input.value) + 1;
            const currentCartCard = btn.closest('.cart-card')

            cartData = JSON.parse(localStorage.getItem('cartData'))
            const productInCart = cartData.find(item => item.id === Number(currentCartCard.id))
            productInCart.quantity += 1

            totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
            total_price = document.getElementById("total-price") || 0
            total_price.innerText = totalPrice

            localStorage.setItem("cartData", JSON.stringify(cartData))
        })
    })
}

const decrementBtn = document.querySelectorAll('.decrement') || undefined
if (decrementBtn) {
    decrementBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            let btn = event.currentTarget
            const input = btn.previousElementSibling

            cartData = JSON.parse(localStorage.getItem('cartData'))

            const currentCartCard = btn.closest('.cart-card')
            const productInCart = cartData.find(item => item.id === Number(currentCartCard.id))
            let currentValue = parseInt(input.value)

            if (input && input.classList.contains("quantity")) {
                if (currentValue <= 1) {
                    cartData = cartData.filter(item => item.id !== productInCart.id)
                    currentCartCard.style.display = "none"
                }
                else input.value = currentValue - 1
            };

            if (productInCart) productInCart.quantity = productInCart.quantity - 1
            localStorage.setItem("cartData", JSON.stringify(cartData))

            // Modify total price
            totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
            total_price = document.getElementById("total-price") || 0
            total_price.innerText = totalPrice
        })
    })
}

const removeBtn = document.querySelectorAll('.remove-btn')
if (removeBtn) {
    removeBtn.forEach(btn => {
        btn.addEventListener('click', event => {
            const button = event.currentTarget

            const card = button.closest(".cart-card")
            const id = Number(card.id)
            cartData = JSON.parse(localStorage.getItem("cartData"))
            const productInCart = cartData.find(item => id === item.id)
            cartData = cartData.filter(item => item.id !== id)
            localStorage.setItem("cartData", JSON.stringify(cartData))
            console.log(cartData);

            // ........  Total Price
            let totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
            let total_price = document.getElementById("total-price") || 0
            total_price.innerText = totalPrice

            card.style.display = 'none'
        })
    })
}


// ............   Navbar Links  ..................
const headerLinks = document.querySelectorAll('.header-link')
headerLinks.forEach(link => {
    link.addEventListener('click', e => {
        headerLinks.forEach(link => link.classList.remove('active'))
        e.target.classList.add('active')
        console.log('link');
        
    })
})