// Search Box
let search = document.querySelector('.search-box');
let menu = document.querySelector('.navbar');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
};

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
};

// Ẩn menu và hộp tìm kiếm khi cuộn trang
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
};

// Header Shadow
let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// DOM Elements cho giỏ hàng
const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const minimizeCartButton = document.getElementById('minimize-cart');

// Biến quản lý giỏ hàng
let cart = [];
let total = 0;

// Hàm định dạng giá
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Load sản phẩm từ product.json
document.addEventListener("DOMContentLoaded", () => {
    const toursContainer = document.querySelector(".tours-container");
    const foreignToursContainer = document.querySelector(".foreigntours-container");

    fetch("product.json")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(products => {
            // Render sản phẩm trong nước
            const domesticTours = products.filter(product => product.category === "domestic");
            toursContainer.innerHTML = ""; 
            domesticTours.forEach(product => renderProduct(product, toursContainer));

            // Render sản phẩm nước ngoài
            const foreignTours = products.filter(product => product.category === "foreign");
            foreignToursContainer.innerHTML = "";
            foreignTours.forEach(product => renderProduct(product, foreignToursContainer));

            // Gắn sự kiện cho nút "Mua Ngay"
            attachBuyButtonEvents();
        })
        .catch(error => console.error("Error loading products:", error));
});

function renderProduct(product) {
    // Tạo box cho sản phẩm
    const productBox = document.createElement('div');
    productBox.className = `box ${product.category}`;

    // Tạo nội dung box dựa trên loại sản phẩm
    let productHTML = '';

    if (product.category === 'foreign') {
        productHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <span>${product.price.toLocaleString()} VNĐ</span>
            <a href="#"><i class='bx bxs-star' >(${product.reviews || 0} Reviews)</i></a>
            <button class="btn buy-btn" data-name="${product.name}" data-price="${product.price}">Mua Ngay</button>
            <a href="/chitietsp.html" class="details">Xem Chi Tiết</a>
        `;
    } else if (product.category === 'domestic') {
        productHTML = `
            <img src="${product.image}" alt="">
            <h3>Giá: ${product.price.toLocaleString()} VNĐ</h3>
            <button class="btn buy-btn" data-name="${product.name}" data-price="${product.price}">
                <i class='bx bxs-cart-add'></i>
            </button>
            <h2>${product.name}</h2>
        `;
    }

    // Thêm nội dung vào box
    productBox.innerHTML = productHTML;

    // Chọn đúng container để thêm box vào
    if (product.category === 'foreign') {
        document.querySelector('.foreigntours-container').appendChild(productBox);
    } else if (product.category === 'domestic') {
        document.querySelector('.tours-container').appendChild(productBox);
    }
}



// Gắn sự kiện cho nút "Mua Ngay"
function attachBuyButtonEvents() {
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            const image = button.parentElement.querySelector('img').src;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            cartContainer.style.display = 'block';
            updateCartDisplay();
        });
    });
}

// Cập nhật giỏ hàng
function updateCartDisplay() {
    cartItems.innerHTML = '';
    total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Giỏ hàng trống.</p>';
        cartTotal.textContent = 'Tổng cộng: 0 VND';
        return;
    }

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span>${item.name}</span>
                    <span>${formatPrice(item.price)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="decrease-qty" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-qty" data-index="${index}">+</button>
            </div>`;
        cartItems.appendChild(listItem);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Tổng cộng: ${formatPrice(total)}`;

    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', e => {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', e => {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCartDisplay();
        });
    });
}

// Nút thu nhỏ giỏ hàng
minimizeCartButton.addEventListener('click', () => {
    cartContainer.style.display = 'none';
});

// Tìm kiếm sản phẩm
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const productBoxes = document.querySelectorAll('.tours-container .box');

    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.toLowerCase();
        productBoxes.forEach(box => {
            const productName = box.querySelector('h2').textContent.toLowerCase();
            box.style.display = productName.includes(keyword) ? 'block' : 'none';
        });
    });
});

// Popup tài khoản
document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('user-icon');
    const accountPopup = document.getElementById('account-popup');
    const closePopup = document.getElementById('close-popup');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    userIcon.addEventListener('click', () => {
        accountPopup.classList.add('active');
    });

    closePopup.addEventListener('click', () => {
        accountPopup.classList.remove('active');
    });

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });
});

// Xử lý form đăng ký và đăng nhập
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        const result = await response.text();
        alert(result);
        if (response.ok) e.target.reset();
    } catch (error) {
        alert('Không thể kết nối đến server!');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('Không thể kết nối đến server!');
    }
});
