// .............................  Product Page Code  ..................
type product = {
    id: number; image: string; title: string; model: string; price: number
}

// Gatting available products
let products: product[] = JSON.parse(localStorage.getItem("products") || "[]");

// Products Data
const productsArr = [
    { id: 1, image: "./assets/product1.webp", title: "Toyota Corolla 2020", model: "GLi 1.3L", price: 2500000 },
    { id: 2, image: "./assets/product2.jpg", title: "Honda Civic 2022", model: "Oriel 1.8L", price: 4300000 },
    { id: 3, image: "./assets/product3.avif", title: "Suzuki Alto 2023", model: "VXL AGS", price: 2200000 },
    { id: 4, image: "./assets/product4.avif", title: "KIA Sportage 2021", model: "AWD 2.0L", price: 5900000 },
    { id: 5, image: "./assets/product5.avif", title: "Hyundai Tucson 2022", model: "FWD 2.0L", price: 6100000 },
    { id: 6, image: "./assets/product6.avif", title: "Toyota Yaris 2023", model: "ATIV X 1.5L", price: 3450000 },
];

// saving products data to local storage
localStorage.setItem("products", JSON.stringify(productsArr))

// getting new data from local storage
products = JSON.parse(localStorage.getItem("products") || "[]");

// Rendering to UI
let productCards = document.getElementById('product-cards') as HTMLElement
productCards.innerHTML = ''
products.forEach(({ id, image, title, model, price }) => {
    productCards.innerHTML += `<div id="${id}" class="product-card card-shadow p-2 rounded-5" style="width: 300px;">
                                    <div class="product-img w-100">
                                        <img class="w-100 rounded-5" src="${image}" alt="${title}">
                                    </div>
                                    <div class="product-content mt-2 ps-2">
                                        <h5 class="title">${title}</h5>
                                        <p class="my-2 text-gray">${model}</p>
                                        <div class="d-flex justify-content-between align-items-center mb-3 pe-2">
                                            <p class="s-gray mb-0">$ <span class="product-price">${price}</span></p>
                                            <button class="add-to-cart bg-primary-blue border-0 px-3 py-1 rounded-2 text-white"
                                            style="font-size: 15px;">Add to cart</button>
                                        </div>
                                    </div>
                                </div>`
})


// .............................  Cart Page Code  ..................
let cartData: product[] = JSON.parse(localStorage.getItem("cartData") || "[]");

// add-to-cart button and storing that specific object to local storage
const addToCart = document.querySelectorAll('.add-to-cart') as NodeList

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const button = e.currentTarget as HTMLElement;
        const productCard = button.closest('.product-card');

        if (productCard) {
            const productId = Number(productCard.id);
            const filteredProduct = products.find(product => product.id === productId);

            if (filteredProduct) {
                const alreadyInCart = cartData.some(item => item.id === filteredProduct.id);

                if (!alreadyInCart) {
                    cartData.push(filteredProduct);
                    localStorage.setItem("cartData", JSON.stringify(cartData));
                }
            }
        }
    });
});


cartData = JSON.parse(localStorage.getItem("cartData") || "[]")

const cartCards = document.getElementById('cart-cards') as HTMLElement || undefined
cartCards.innerHTML = ""

cartData.forEach(({ id, image, title, model, price }) => {
    cartCards.innerHTML += `<div id="${id}" class="product-card card-shadow p-2 rounded-5" style="width: 300px;">
                                    <div class="product-img w-100">
                                        <img class="w-100 rounded-5" src="${image}" alt="${title}">
                                    </div>
                                    <div class="product-content mt-2 ps-2">
                                        <h5 class="title">${title}</h5>
                                        <p class="my-2 text-gray">${model}</p>
                                        <div class="d-flex justify-content-between align-items-center mb-3 pe-2">
                                            <p class="s-gray mb-0">$ <span class="product-price">${price}</span></p>
                                            <button class="add-to-cart bg-primary-blue border-0 px-3 py-1 rounded-2 text-white"
                                            style="font-size: 15px;">Add to cart</button>
                                        </div>
                                    </div>
                                </div>`
})

