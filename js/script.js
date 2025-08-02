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

// .......... create notification
function createNotification(popupMsg, bgColor, textColor) {
    let notification = document.createElement('p')
    notification.setAttribute('class', `bg-${bgColor} py-2 px-3 text-${textColor} rounded-3 position-fixed mx-auto`)
    notification.style.width = "fit-content"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.fontSize = "14px"
    notification.innerText = popupMsg
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 2000)
}

// ............  Usefull Functions
let allUsers;
function getAllUsersData() {
    return JSON.parse(localStorage.getItem('allUsers')) || []
}
getAllUsersData()
function isUserAvailableInAllUsers(person) {
    return getAllUsersData().find(user =>
        user.email === person.email && user.password === person.password
    )
}
function saveNewUserToLS(person) {
    const allUsers = getAllUsersData()

    allUsers.push(person)
    localStorage.setItem('allUsers', JSON.stringify(allUsers))
}

function returnCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || { userData: [], cartData: [] }
}
let currentUser = returnCurrentUser()
function saveCurrentUser(currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
}


// ........  Total Price Logic:
let totalContainer = document.querySelector('.total-container') || undefined
let totalPrice = currentUser.cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
let total_price = document.getElementById("total-price") || 0

if (totalContainer && total_price) {
    if (totalPrice === 0) {
        totalContainer.style.boxShadow = 'none'
        totalContainer.innerHTML = `<p class="mx-auto mb-0">Your cart is empty | Please shop first</p>`
    }
    else {
        totalContainer.style.boxShadow = '0 0 2px gray;'
        totalContainer.innerHTML = `<h3 class="m-0">Total Price: <span id="total-price">$${totalPrice}</span></h3>
                    <button id="order-now" class="border-0 text-bold py-3 px-3 rounded-2 bg-orange text-white"
                        style="width: fit-content; font-size: 14px;">ORDER NOW</button>`
    }
}
// .....................................


if (window.location.href.includes("register.html") || window.location.href.includes("login.html")) {
    if (currentUser.userData.length !== 0) {
        window.location.href = "/index.html"
    }
}

// header-buttons logic
let headerButtons = document.querySelector('.header-buttons') || undefined
if (headerButtons) {
    if (currentUser.userData.length === 0) {
        headerButtons.innerHTML = `<a class="nav-link rounded-3 text-white px-3 py-2 bg-orange" aria-current="page"
                                    href="./pages/register.html">Register</a>
                                <a class="nav-link rounded-3 text-white px-3 py-2 bg-orange" aria-current="page"
                                    href="./pages/login.html">Login</a>`
    } else {
        headerButtons.innerHTML = `<button id="logout" class="rounded-3 text-white px-3 py-2 bg-orange text-decoration-none border-0" aria-current="page">Logout</button>
                                <a class="nav-link rounded-3 text-white px-3 py-2 bg-orange" aria-current="page"
                                    href="./pages/cart.html">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span id="cart-products-count" style="color: #09ff00;">0</span>
                                    </a>`
    }
}

// .............................  Register Page Code  ..................

function registerForm(event) {
    event.preventDefault();
    const form = event.target
    const fullname = form.fullname.value || undefined
    const email = form.email.value
    const password = form.password.value
    // newUserData
    const userData = { fullname, email, password, cartData: [] }

    const findedUser = isUserAvailableInAllUsers(userData)
    if (findedUser) window.location.href = "/pages/login.html"
    else {
        saveNewUserToLS(userData)
        window.location.href = "/pages/login.html"
    }
}
// .............................  Login Page Code  ..................
function loginForm(event) {
    event.preventDefault();
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    const user = { email, password }
    const findUser = isUserAvailableInAllUsers(user)


    if (findUser) {
        const findedUserData = { fullname: findUser.fullname, email: findUser.email, password: findUser.password }
        currentUser.userData.push(findedUserData)
        currentUser.cartData = [...findUser.cartData]

        saveCurrentUser(currentUser)
        createNotification(`Login successfully`, "success", "white")
        setTimeout(() => window.location.href = "/index.html", 2000)
    } else {
        createNotification(`Invalid email or password!`, "danger", "white")
    }
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
            currentUser = returnCurrentUser()

            if (currentUser.userData.length === 0) {
                window.location.href = '/pages/register.html'
            } else {
                const button = e.currentTarget;
                const productCard = button.closest('.product-card');

                if (productCard) {
                    const productId = Number(productCard.id);
                    const filteredProduct = products.find(product => product.id === productId);

                    if (filteredProduct) {
                        const productInCart = currentUser.cartData.find(item => item.id === filteredProduct.id);

                        if (!productInCart) {
                            currentUser.cartData.push(filteredProduct)
                            createNotification(`Added to cart`, "success", "white")
                        } else {
                            productInCart.quantity += 1;
                            createNotification("Already in cart | Quantity increased", "success", "white")
                        }
                        cartProductsCount = document.getElementById('cart-products-count') || undefined
                        if (cartProductsCount) cartProductsCount.innerHTML = currentUser.cartData.length
                        localStorage.setItem("currentUser", JSON.stringify(currentUser))
                    }
                }
            }
        });
    });
}


// ........ Count of items in cart
let cartProductsCount = document.getElementById('cart-products-count') || undefined
if (cartProductsCount) cartProductsCount.innerHTML = currentUser.cartData.length

// ........................... Cart page Login  ................
const cartCards = document.getElementById('cart-cards') || undefined

if (cartCards) {
    cartCards.innerHTML = ""

    currentUser.cartData.forEach(({ id, image, title, price, quantity }) => {
        cartCards.innerHTML += `<div id="${id}" class="cart-card card-shadow rounded-4" style="width: 285px; display: flex;">
                        <div class="product-img w-50 h-100">
                            <img class="w-100 rounded-4 h-100" src="../assets/${image}" alt="${title}"
                                style="object-fit: cover;">
                        </div>
                        <div class="product-content me-3 p-2 d-flex flex-column gap-2 w-50">
                            <h6 class="title mb-0">${title}</h6>
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

            currentUser = returnCurrentUser()
            const productInCart = currentUser.cartData.find(item => item.id === Number(currentCartCard.id))
            productInCart.quantity += 1

            totalContainer = document.querySelector('.total-container') || undefined
            totalPrice = currentUser.cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
            total_price = document.getElementById("total-price") || 0

            if (totalContainer && total_price) {
                if (totalPrice === 0) {
                    totalContainer.style.boxShadow = 'none'
                    totalContainer.innerHTML = `<p class="mx-auto mb-0">Your cart is empty | Please shop first</p>`
                }
                else {
                    totalContainer.style.boxShadow = '0 0 2px gray;'
                    totalContainer.innerHTML = `<h3 class="m-0">Total Price: <span id="total-price">$${totalPrice}</span></h3>
                    <button id="order-now" class="border-0 text-bold py-3 px-3 rounded-2 bg-orange text-white"
                        style="width: fit-content; font-size: 14px;">ORDER NOW</button>`
                }
            }


            saveCurrentUser(currentUser)
        })
    })
}

const decrementBtn = document.querySelectorAll('.decrement') || undefined
if (decrementBtn) {
    decrementBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            let btn = event.currentTarget
            const input = btn.previousElementSibling

            currentUser = returnCurrentUser()

            const currentCartCard = btn.closest('.cart-card')
            const productInCart = currentUser.cartData.find(item => item.id === Number(currentCartCard.id))
            let currentValue = parseInt(input.value)

            if (input && input.classList.contains("quantity")) {
                if (currentValue <= 1) {
                    currentUser.cartData = currentUser.cartData.filter(item => item.id !== productInCart.id)
                    currentCartCard.style.display = "none"
                    createNotification(`Product removed`, "warning", "black")
                }
                else input.value = currentValue - 1
            };

            if (productInCart) productInCart.quantity = productInCart.quantity - 1
            saveCurrentUser(currentUser)

            // Modify total price
            totalContainer = document.querySelector('.total-container') || undefined
            totalPrice = currentUser.cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
            total_price = document.getElementById("total-price") || 0

            if (totalContainer && total_price) {
                if (totalPrice === 0) {
                    totalContainer.style.boxShadow = 'none'
                    totalContainer.innerHTML = `<p class="mx-auto mb-0">Your cart is empty | Please shop first</p>`
                }
                else {
                    totalContainer.style.boxShadow = '0 0 2px gray;'
                    totalContainer.innerHTML = `<h3 class="m-0">Total Price: <span id="total-price">$${totalPrice}</span></h3>
                    <button id="order-now" class="border-0 text-bold py-3 px-3 rounded-2 bg-orange text-white"
                        style="width: fit-content; font-size: 14px;">ORDER NOW</button>`
                }
            }
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

            currentUser = returnCurrentUser()

            const productInCart = currentUser.cartData.find(item => id === item.id)
            currentUser.cartData = currentUser.cartData.filter(item => item.id !== id)

            saveCurrentUser(currentUser)

            // ........  Total Price
            totalContainer = document.querySelector('.total-container') || undefined
            totalPrice = currentUser.cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
            total_price = document.getElementById("total-price") || 0

            if (totalContainer && total_price) {
                if (totalPrice === 0) {
                    totalContainer.style.boxShadow = 'none'
                    totalContainer.innerHTML = `<p class="mx-auto mb-0">Your cart is empty | Please shop first</p>`
                }
                else {
                    totalContainer.style.boxShadow = '0 0 2px gray;'
                    totalContainer.innerHTML = `<h3 class="m-0">Total Price: <span id="total-price">$${totalPrice}</span></h3>
                    <button id="order-now" class="border-0 text-bold py-3 px-3 rounded-2 bg-orange text-white"
                        style="width: fit-content; font-size: 14px;">ORDER NOW</button>`
                }
            }

            card.style.display = 'none'
            createNotification(`Product removed`, "warning", "black")
        })
    })
}


// ............   Navbar Links  ..................
const headerLinks = document.querySelectorAll('.header-link')
if (headerLinks) {
    headerLinks.forEach(link => {
        link.addEventListener('click', e => {
            headerLinks.forEach(link => link.classList.remove('active'))
            e.target.classList.add('active')
        })
    })
}


// ...........  Banner Carousel  ................
const bannerImages = document.querySelector('.banner-images') || undefined;

let position = 0;
let direction = 'forward';

// Previous btn
const previousBtn = document.getElementById('previous-btn');
if (previousBtn && bannerImages) {
    previousBtn.addEventListener('click', () => {
        if (position > 0) {
            position -= 100;
            direction = 'backward';
            bannerImages.style.left = `-${position}%`;
        }
        else {
            position = 600
            bannerImages.style.left = `-${position}%`;
        }
    });
}
// Next btn
const nextBtn = document.getElementById('next-btn');
if (nextBtn && bannerImages) {
    nextBtn.addEventListener('click', () => {
        if (position < 600) {
            position += 100;
            direction = 'forward';
            bannerImages.style.left = `-${position}%`;
        }
        else {
            position = 0
            bannerImages.style.left = `-${position}%`;
        }
    });
}

// Auto Slide
// start or stop slider
const pagination = document.querySelector('.pagination');
let pause = false;
if (pagination) {
    pagination.addEventListener('mouseenter', () => {
        pause = true;
    });
    pagination.addEventListener('mouseleave', () => {
        pause = false;
        setTimeout(autoSlide, 3000);
    });
}

function autoSlide() {
    if (!pause && bannerImages) {
        if (direction === 'forward') {
            if (position < 600) {
                position += 100;
            } else {
                direction = 'backward';
                position -= 100;
            }
        } else {
            if (position > 0) {
                position -= 100;
            } else {
                direction = 'forward';
                position += 100;
            }
        }

        bannerImages.style.left = `-${position}%`;
        setTimeout(autoSlide, 3500);
    }
}
setTimeout(autoSlide, 3000);


// ...........   FAQ Section Logics  ...................
const questionBtn = document.querySelectorAll('.question-btn')
if (questionBtn) {
    questionBtn.forEach(button => {
        button.addEventListener("click", (event) => {
            const btn = event.currentTarget
            const icon = btn.firstElementChild

            btn.closest('.question').classList.toggle('show-question')
            if (icon.classList.contains("fa-plus")) icon.classList.replace('fa-plus', 'fa-minus')
            else icon.classList.replace('fa-minus', 'fa-plus')
        })
    })
}

const faqCatagory = document.getElementById('faq-catagory')
const supportTeamCatagory = document.getElementById('support-team-catagory')
if (faqCatagory) {
    faqCatagory.addEventListener('click', (e) => {
        e.currentTarget.style.backgroundColor = "#fff"
        e.currentTarget.style.color = "#212121"
        e.currentTarget.lastElementChild.style.backgroundColor = "#212121"
        e.currentTarget.lastElementChild.style.color = "#fff"

        supportTeamCatagory.style.backgroundColor = "#333333"
        supportTeamCatagory.style.color = "#fff"

        const faqQuestions = document.getElementById('faq-questions')
        const supportTeam = document.getElementById('support-team')

        faqQuestions.style.display = 'block'
        supportTeam.style.display = 'none'
    })
}
if (supportTeamCatagory) {
    supportTeamCatagory.addEventListener('click', (e) => {
        e.currentTarget.style.backgroundColor = "#fff"
        e.currentTarget.style.color = "#212121"
        e.currentTarget.lastElementChild.style.backgroundColor = "#333333"
        e.currentTarget.lastElementChild.style.color = "#fff"

        faqCatagory.style.backgroundColor = "#212121"
        faqCatagory.style.color = "#fff"

        const faqQuestions = document.getElementById('faq-questions')
        const supportTeam = document.getElementById('support-team')

        faqQuestions.style.display = 'none'
        supportTeam.style.display = 'flex'
    })
}

const logout = document.getElementById('logout') || undefined;
if (logout) {
    logout.addEventListener('click', () => {
        let currentUser = returnCurrentUser();
        let allUsers = getAllUsersData();

        const findedUser = isUserAvailableInAllUsers(currentUser.userData[0]);
        findedUser.cartData = []
        if (findedUser) {
            findedUser.cartData = [...findedUser.cartData, ...currentUser.cartData];

            // Replace old user
            const updatedUsers = allUsers.map(user => {
                if (user.email === findedUser.email) {
                    return findedUser;
                }
                return user;
            });

            localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
            localStorage.removeItem("currentUser");
            window.location.href = "/pages/login.html";
        }
    });
}

const orderBtn = document.getElementById('order-now') || undefined
if(orderBtn){
    orderBtn.addEventListener('click', () => {
        const deliveryFormContainer = document.querySelector('.delivery-form-container')
        deliveryFormContainer.style.display = "block"
        console.log("delivery-form-container");
})
}

function handleDelivery(event){
    event.preventDefault()
    const form = event.target
    const fullname = form.fullname.value
    const phoneNumber = form.phoneNumber.value
    const email = form.email.value
    const city = form.city.value
    const message = form.message.value
    const buyerData = {fullname, phoneNumber, email, city, message}
    createNotification('We will reach you ASAP!', "success", "white")

    const deliveryFormContainer = document.querySelector('.delivery-form-container') || undefined
    if(deliveryFormContainer){
        setTimeout(() => deliveryFormContainer.style.display = "none", 1500)
    }
}

function newsLetterForm(event){
    event.preventDefault()
    const email = event.target.email.value
    createNotification("Thank for subscription", "success", "white")
    event.target.reset()
}