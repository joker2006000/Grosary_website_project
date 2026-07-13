let cart = [];
let orders = [];

/* LOAD PAGE */
function loadPage(page, filter = null) {

    window.scrollTo(0, 0);
    let html = "";
    let backButton = `<button class="back-btn" onclick="loadPage('category')">←</button>`;

    if (page === "shop") {
        const products = getProducts();
        html = `<div class="grid">`;
        products.forEach(p => {
            if (filter && p.category !== filter) return;
            html += `<div class="card" onclick="openProduct('${p.name}')">
                        <div class="img-box"><img src="${p.image}"></div>
                        <h3>${p.name}</h3>
                        <p>₹ ${p.price}</p>
                       <button class="add-cart-btn"onclick="event.stopPropagation(); addToCart('${p.name}')">Add to Cart</button>
                    </div>`;
        });
        html += `</div>`;
        content.innerHTML = backButton + html;
    }
    else if (page === "product") {
        let p = filter;

        quantity = 1; // reset when page opens

        html = `
    <div class="product-page">

        <button class="back-btn2" onclick="loadPage('shop')">← Back</button>

        <div class="product-left">
            <img src="${p.image}" class="product-img">
        </div>

        <div class="product-right">
            <h2>${p.name}</h2>
            <p class="price">₹ ${p.price}</p>
            <p class="desc">Fresh and high quality ${p.name}</p>

            <div class="qty-box">
                <button onclick="changeQty(-1)">-</button>
                <span id="qty">1</span>
                <button onclick="changeQty(1)">+</button>
            </div>

            <button class="add-btn" onclick="addToCartWithQty('${p.name}')">
                Add to Cart
            </button>
        </div>

    </div>

    <!-- RELATED PRODUCTS -->
    <h2 style="padding:20px;">Related Products</h2>
    <div class="grid">
        ${getProducts().slice(0, 4).map(r => `
            <div class="card" onclick="openProduct('${r.name}')">
                <div class="img-box"><img src="${r.image}"></div>
                <h3>${r.name}</h3>
                <p>₹ ${r.price}</p>
            </div>
        `).join("")}
    </div>
    `;

        content.innerHTML = html;
    }



    else if (page === "category") {

        // Sample slider products (you can pick top products or featured)
        const sliderProducts = [
            { name: "Apple", image: "https://www.healthygreenkitchen.com/wp-content/uploads/2023/08/apples-basket-1200x800.jpg", discount: 25 },
            { name: "Dry-fruits", image: "https://images.healthshots.com/healthshots/en/uploads/2025/01/06115936/Dry-fruits-1.jpg", discount: 20 },
            { name: "Mango", image: "https://cdn.pixabay.com/photo/2023/09/29/07/58/mango-8283268_1280.jpg", discount: 30 },
            { name: "Choclet", image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/1f9108be-1736-45f0-b370-6ec94c6e11ee.__CR0,0,970,600_PT0_SX970_V1___.jpg", discount: 15 },
            { name: "Rice", image: "https://foodiosity.com/wp-content/uploads/2020/09/jasmine-rice.jpg.webp", discount: 10 }
        ];

        // Slider HTML
        let sliderHTML = `<div class="slider-container">
        <div class="slider-track">`;
        sliderProducts.forEach(p => {
            sliderHTML += `
            <div class="slide">
                <img src="${p.image}" alt="${p.name}">
                <div class="slide-info">
                    <h3>${p.name}</h3>
                    <p>${p.discount}% OFF</p>
                    <button onclick="loadPage('shop')">Buy Now</button>
                </div>
            </div>
        `;
        });
        sliderHTML += `</div></div>`;

        // Category boxes HTML
        let categoriesHTML = `
    <div class="grid">
        <div class="category-box" onclick="loadPage('shop','fruits')"><div class="img-box"><img src="pics/fruits/fruits.png"></div><h3>Fruits</h3></div>
        <div class="category-box" onclick="loadPage('shop','vegetables')"><div class="img-box"><img src="pics/veg/veg.png"></div><h3>Vegetables</h3></div>
        <div class="category-box" onclick="loadPage('shop','house')"><div class="img-box"><img src="pics/house/house.png"></div><h3>Household Goods</h3></div>
        <div class="category-box" onclick="loadPage('shop','oil')"><div class="img-box"><img src="pics/oil/oil.png"></div><h3>Oil</h3></div>
        <div class="category-box" onclick="loadPage('shop','grocery')"><div class="img-box"><img src="pics/grocery/grosary.png"></div><h3>Grocery</h3></div>
        <div class="category-box" onclick="loadPage('shop','snacks')"><div class="img-box"><img src="pics/snacks/snack.png"></div><h3>Snacks & Cookies</h3></div>
        <div class="category-box" onclick="loadPage('shop','dryfruits')"><div class="img-box"><img src="pics/dryfruit/dryfruit.png"></div><h3>Dry Fruits</h3></div>
        <div class="category-box" onclick="loadPage('shop','chocolates')"><div class="img-box"><img src="pics/chocolet/chocolet.png"></div><h3>Chocolates</h3></div>
    </div>`;

        let contact = `
        <div class="carousel">  
          <img id="bgPic" class="bg-pic">
          
          <div id="c1" class="card2 hidden-left"><img></div>
          <div id="c2" class="card2 left"><img></div>
          <div id="c3" class="card2 center"><img></div>
          <div id="c4" class="card2 right"><img></div>
          <div id="c5" class="card2 hidden-right"><img></div>
         </div>

<div class="footer">



    <div class="footer-container">

        <!-- Quick Links -->
        <div class="footer-box">
            <h3>Quick Links</h3>
            <p>➤ Home : Rampura vila india </p>
            <p>➤ Shop : Grosary store</p>
            <p>➤ About : A beakry owner</p>
            <p>➤ Review : 10/10</p>
            <p>➤ Blog : 76bbf89-0</p>
            <p>➤ Contact : 7628366617</p>
        </div>

        <!-- Follow Us -->
        <div class="footer-box">
            <h3>Follow Us</h3>
            <p><i class="fab fa-facebook"></i> Facebook</p>
            <p><i class="fab fa-twitter"></i> Twitter</p>
            <p><i class="fab fa-instagram"></i> Instagram</p>
            <p><i class="fab fa-linkedin"></i> LinkedIn</p>
            <p><i class="fab fa-pinterest"></i> Pinterest</p>
        </div>

        <!-- Newsletter -->
        <div class="footer-box">
            <h3>Newsletter</h3>
            <p>Don't miss any offers</p>
            <input type="email" placeholder="Enter your email">
            <button>Subscribe</button>
        </div>

    </div>
                        
    <!-- Bottom -->
    <div class="footer-bottom">
        <p>Created by  <a href="https://instagram.com/__vinay_96k" target="_blank" class="insta-link"><i class="fa-brands fa-instagram"></i> __vinay_96k </a> | © 2026</p>
    </div>

</div>
`;
        let info = `
<div class="info-section">

    <div class="info-card">
        <div class="icon">🔒</div>
        <h3>Secure Payments</h3>
        <p>Your transactions are 100% safe with encrypted payment system.</p>
    </div>

    <div class="info-card">
        <div class="icon">🚚</div>
        <h3>Fast Delivery</h3>
        <p>We deliver your products quickly and safely to your doorstep.</p>
    </div>

    <div class="info-card">
        <div class="icon">⭐</div>
        <h3>Best Quality</h3>
        <p>We provide fresh and high-quality products at the best price.</p>
    </div>


</div>
`;
        html += `
<div class="category-header">
    <h1>Shop by Category</h1>
    <p>Explore all products easily from different categories</p>
    <div class="line"></div>
</div>
`;

        content.innerHTML = sliderHTML + info + html + categoriesHTML + contact;

        initCarousel();

        // Slider functionality
        const track = document.querySelector('.slider-track');
        let index = 0;

        function showSlide(i) {
            track.style.transform = `translateX(-${i * 100}%)`;
        }

        let slideInterval = setInterval(() => {
            index = (index + 1) % sliderProducts.length;
            showSlide(index);
        }, 2500); // change every 3s

        // Pause on hover
        track.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
        track.parentElement.addEventListener('mouseleave', () => slideInterval = setInterval(() => {
            index = (index + 1) % sliderProducts.length;
            showSlide(index);
        }, 1500));



    }
    else if (page === "cart") {
        let total = 0;
        html = backButton + `<h1> </h1>`;
        if (cart.length === 0) {
            html += `<div class="empty"><img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png">
                     <h2>Your Cart is Empty</h2>
                     <p>Add some products</p>
                     <button class="empty-btn" onclick="loadPage('category')">Go to Shop</button>
                     </div>`;
        } else {
            html += `<div class="grid">`;
            cart.forEach((item, i) => {
                total += item.price * item.qty;
                html += `<div class="card">
                            <div class="img-box"><img src="${item.image}"></div>
                            <h3>${item.name}</h3>
                            <p>₹ ${item.price} x ${item.qty} = ₹ ${item.price * item.qty}</p>
                            <button class="cancel-btn" onclick="removeFromCart(${i})">Cancel</button>
                         </div>`;
            });
            html += `</div><div class="bill"><h2>Total: ₹ ${total}</h2>
                     <button class="order-btn" onclick="placeOrder(${total})">Order Now</button></div>`;
        }
        content.innerHTML = html;
    }
    else if (page === "orders") {
        html = backButton + `<h1> </h1>`;
        if (orders.length === 0) html += `<div class="empty"><img src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"><h2>No Orders Yet</h2><p>Your orders will appear here</p><button class="empty-btn" onclick="loadPage('category')">Start Shopping</button></div>`;
        else {
            orders.forEach((order, i) => {
                html += `<div class="bill"><h3>Order ${i + 1} - ${order.date}</h3><div class="order-items">`;
                order.items.forEach(item => html += `<p>${item.name} - ₹ ${item.price} x ${item.qty} = ₹ ${item.price * item.qty}</p>`);
                html += `</div><h2>Total: ₹ ${order.total}</h2></div>`;
            });
        }
        content.innerHTML = html;
    }
    else if (page === "about") {
        // 👈 This forces scroll to top
        const aboutHTML = `
    <div class="about-container">
         <div class="about-right">
            <h1 class="about-heading">About</h1>
            <div class="about-text">
                <p>I created this program to build a simple grocery shopping web app using vanilla JavaScript.</p>
                <p>The steps I followed:</p>
                <ol>
                    <li>Planned the structure: categories, products, cart, and orders.</li>
                    <li>Created the products data and categorization.</li>
                    <li>Designed a home page with a slider for featured products.</li>
                    <li>Built the shop page with filterable categories.</li>
                    <li>Implemented the cart functionality to add/remove products.</li>
                    <li>Added order placement and order history.</li>
                    <li>Styled the page with CSS to make it responsive and visually appealing.</li>
                </ol>

                <p>This app demonstrates basic DOM manipulation, event handling, and dynamic content rendering using JavaScript.</p>

                <p>Future improvements could include user authentication, database integration, and payment handling.</p>

                <p>Additional enhancements I implemented:</p>
                <ul>
                    <li>Responsive design to work on both mobile and desktop screens.</li>
                    <li>Interactive product sliders with automatic and hover pause transitions.</li>
                    <li>Dynamic filtering of products by categories without reloading the page.</li>
                    <li>Cart and order management with quantity updates and order history tracking.</li>
                    <li>Use of alert messages for user feedback on actions like adding to cart or placing orders.</li>
                    <li>Well-organized folder structure for images and product categories for easy scalability.</li>
                    <li>CSS styling for a modern and user-friendly interface, including hover effects and grid layouts.</li>
                </ul>

                <p>This project helped me practice structuring a web app from scratch.</p>


            </div>


        </div>
    </div>
    `;

        // intro box html
        let fff = ` <div class="intro-box">
                    <h2>Introduction</h2>
                    <p><strong>Name:</strong> Vinay More</p>
                    <p><strong>College:</strong> Yogaswari Mahavidhyalaya</p>
                    <p><strong>Course:</strong> BCA 1st Year</p>
                   
                </div>`
        content.innerHTML = backButton + aboutHTML ;
    }
}

/* CART FUNCTIONS */
function addToCart(name) {
    const product = getProducts().find(p => p.name === name);
    const existing = cart.find(item => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    alert(" Added to cart 🎉");
}

function removeFromCart(i) {
    if (cart[i].qty > 1) cart[i].qty--;
    else cart.splice(i, 1);
    loadPage("cart");
}

function placeOrder(total) {
    orders.push({ items: [...cart], total, date: new Date().toLocaleString() });
    cart = [];
    alert(" 🌟 We’ve successfully 🎉 received your order !! ");
    loadPage("orders");
}

/* PRODUCTS */
function getProducts() {
    return [
        // 🍎 FRUITS
        { name: "Apple", price: 120, category: "fruits", image: "pics/fruits/1.png" },
        { name: "Banana", price: 40, category: "fruits", image: "pics/fruits/2.png" },
        { name: "Mango", price: 150, category: "fruits", image: "pics/fruits/3.png" },
        { name: "Orange", price: 80, category: "fruits", image: "pics/fruits/4.png" },
        { name: "Grapes", price: 90, category: "fruits", image: "pics/fruits/5.png" },
        { name: "Pineapple", price: 70, category: "fruits", image: "pics/fruits/6.png" },
        { name: "Papaya", price: 60, category: "fruits", image: "pics/fruits/7.png" },
        { name: "Strawberry", price: 200, category: "fruits", image: "pics/fruits/8.png" },
        { name: "Watermelon", price: 50, category: "fruits", image: "pics/fruits/9.png" },

        // 🥦 VEGETABLES
        { name: "Tomato", price: 30, category: "vegetables", image: "pics/veg/1.png" },
        { name: "Potato", price: 25, category: "vegetables", image: "pics/veg/2.png" },
        { name: "Onion", price: 35, category: "vegetables", image: "pics/veg/3.png" },
        { name: "Carrot", price: 40, category: "vegetables", image: "pics/veg/4.png" },
        { name: "Cabbage", price: 30, category: "vegetables", image: "pics/veg/5.png" },
        { name: "Spinach", price: 20, category: "vegetables", image: "pics/veg/6.png" },
        { name: "Brinjal", price: 45, category: "vegetables", image: "pics/veg/7.png" },
        { name: "Peas", price: 60, category: "vegetables", image: "pics/veg/8.png" },
        { name: "Capsicum", price: 70, category: "vegetables", image: "pics/veg/9.png" },

        // 🏠 HOUSE
        { name: "Soap", price: 50, category: "house", image: "pics/house/1.png" },
        { name: "Detergent", price: 120, category: "house", image: "pics/house/2.png" },
        { name: "Bucket", price: 200, category: "house", image: "pics/house/3.png" },
        { name: "Mug", price: 80, category: "house", image: "pics/house/4.png" },
        { name: "Broom", price: 150, category: "house", image: "pics/house/5.png" },
        { name: "Cloth", price: 60, category: "house", image: "pics/house/6.png" },
        { name: "Brush", price: 40, category: "house", image: "pics/house/7.png" },
        { name: "Phenyl", price: 90, category: "house", image: "pics/house/8.png" },
        { name: "Sponge", price: 30, category: "house", image: "pics/house/9.png" },

        // 🛢 OIL
        { name: "Sunflower Oil", price: 180, category: "oil", image: "images/oil1.jpg" },
        { name: "Mustard Oil", price: 200, category: "oil", image: "images/oil2.jpg" },
        { name: "Coconut Oil", price: 220, category: "oil", image: "images/oil3.jpg" },
        { name: "Olive Oil", price: 500, category: "oil", image: "images/oil4.jpg" },
        { name: "Groundnut Oil", price: 190, category: "oil", image: "images/oil5.jpg" },
        { name: "Soybean Oil", price: 170, category: "oil", image: "images/oil6.jpg" },
        { name: "Palm Oil", price: 150, category: "oil", image: "images/oil7.jpg" },
        { name: "Rice Bran Oil", price: 210, category: "oil", image: "images/oil8.jpg" },
        { name: "Sesame Oil", price: 250, category: "oil", image: "images/oil9.jpg" },

        // 🛒 GROCERY
        { name: "Rice", price: 60, category: "grocery", image: "images/rice.jpg" },
        { name: "Wheat", price: 50, category: "grocery", image: "images/wheat.jpg" },
        { name: "Sugar", price: 45, category: "grocery", image: "images/sugar.jpg" },
        { name: "Salt", price: 20, category: "grocery", image: "images/salt.jpg" },
        { name: "Tea", price: 150, category: "grocery", image: "images/tea.jpg" },
        { name: "Coffee", price: 200, category: "grocery", image: "images/coffee.jpg" },
        { name: "Biscuits", price: 30, category: "grocery", image: "images/biscuits.jpg" },
        { name: "Maggi", price: 25, category: "grocery", image: "images/maggi.jpg" },
        { name: "Dal", price: 90, category: "grocery", image: "images/dal.jpg" },

        // 🍪 SNACKS & COOKIES
        { name: "Lays", price: 30, category: "snacks", image: "images/lays.jpg" },
        { name: "KurKure", price: 25, category: "snacks", image: "images/kurkure.jpg" },
        { name: "Parle G", price: 20, category: "snacks", image: "images/parleg.jpg" },
        { name: "Britannia Good Day", price: 35, category: "snacks", image: "images/goodday.jpg" },
        { name: "Hide & Seek Fab", price: 40, category: "snacks", image: "images/hideseek.jpg" },
        { name: "Unibic Cookies", price: 50, category: "snacks", image: "images/unibic.jpg" },
        { name: "Pringles", price: 80, category: "snacks", image: "images/pringles.jpg" },
        { name: "KitKat Biscuit", price: 30, category: "snacks", image: "images/kitkatbiscuit.jpg" },

        // 🌰 DRY FRUITS
        { name: "Almonds", price: 500, category: "dryfruits", image: "images/almonds.jpg" },
        { name: "Cashews", price: 600, category: "dryfruits", image: "images/cashews.jpg" },
        { name: "Walnuts", price: 700, category: "dryfruits", image: "images/walnuts.jpg" },
        { name: "Raisins", price: 200, category: "dryfruits", image: "images/raisins.jpg" },
        { name: "Dates", price: 250, category: "dryfruits", image: "images/dates.jpg" },
        { name: "Pistachios", price: 800, category: "dryfruits", image: "images/pistachios.jpg" },
        { name: "Apricots", price: 400, category: "dryfruits", image: "images/apricots.jpg" },
        { name: "Figs", price: 350, category: "dryfruits", image: "images/figs.jpg" },

        // 🍫 CHOCOLATES
        { name: "Dairy Milk", price: 50, category: "chocolates", image: "images/dairymilk.jpg" },
        { name: "5 Star", price: 10, category: "chocolates", image: "images/5star.jpg" },
        { name: "Munch", price: 15, category: "chocolates", image: "images/munch.jpg" },
        { name: "KitKat", price: 20, category: "chocolates", image: "images/kitkat.jpg" },
        { name: "Bounty", price: 25, category: "chocolates", image: "images/bounty.jpg" },
        { name: "Perk", price: 15, category: "chocolates", image: "images/perk.jpg" },
        { name: "Snickers", price: 40, category: "chocolates", image: "images/snickers.jpg" },
        { name: "Mars", price: 35, category: "chocolates", image: "images/mars.jpg" }

    ];
}
let input = document.getElementById("searchInput");
let suggestionBox = document.getElementById("suggestionsBox");

input.addEventListener("keyup", function () {
    let value = input.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (value === "") return;

    let products = getProducts();

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    filtered.forEach(product => {
        let div = document.createElement("div");
        div.classList.add("suggestion-item");

        div.innerHTML = `
            <img src="${product.image}" width="40">
            ${product.name} - ₹${product.price}
        `;

        div.onclick = function () {
            input.value = product.name;
            suggestionBox.innerHTML = "";
        };

        suggestionBox.appendChild(div);
    });
});
function showSearchedProduct(name) {
    let products = document.querySelectorAll(".product");

    products.forEach(p => {
        let text = p.innerText.toLowerCase();

        if (text.includes(name.toLowerCase())) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.getElementById("sideMenu");
menuIcon.onclick = function () {
    sideMenu.classList.toggle("active");
};

// Close menu when any item is clicked
const menuItems = sideMenu.querySelectorAll("a, button");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        sideMenu.classList.remove("active");
    });
});



// OPEN PRODUCT
function openProduct(name) {
    const product = getProducts().find(p => p.name === name);
    loadPage("product", product);
}

// QUANTITY SYSTEM
let quantity = 1;
function changeQty(val) {
    quantity += val;
    if (quantity < 1) quantity = 1;
    document.getElementById("qty").innerText = quantity;
}

// ADD TO CART WITH QUANTITY
function addToCartWithQty(name) {
    const product = getProducts().find(p => p.name === name);
    const existing = cart.find(item => item.name === name);

    if (existing) existing.qty += quantity;
    else cart.push({ ...product, qty: quantity });

    alert("Added to cart");
}
let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;
    title.innerText = isLogin ? 'Login' : 'Register';
    btn.innerText = isLogin ? 'Login' : 'Register';
}

async function handleAuth() {
    const url = isLogin
        ? 'http://localhost:3000/login'
        : 'http://localhost:3000/register';

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });

    const text = await res.text();
    msg.innerText = text;
}

// slide -----------------------------------------------------------------
function initCarousel() {

    const bgImages = [
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
        "https://file.oyephoto.com/uploads/thumbnail/romantic-couple-pic-download-free-dp-116272135910kzxeiuevb.jpg",
        "https://picsum.photos/id/1018/1920/1080",
        "https://picsum.photos/id/1025/1920/1080",
        "https://picsum.photos/id/1035/1920/1080",
        "https://picsum.photos/id/1040/1920/1080",
        "https://picsum.photos/id/1060/1920/1080"
    ];
    const bgPic = document.getElementById("bgPic");


    const images = [
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
        "https://file.oyephoto.com/uploads/thumbnail/romantic-couple-pic-download-free-dp-116272135910kzxeiuevb.jpg",
        "https://picsum.photos/id/1018/800/1200",
        "https://picsum.photos/id/1025/800/1200",
        "https://picsum.photos/id/1035/800/1200",
        "https://picsum.photos/id/1040/800/1200",
        "https://picsum.photos/id/1060/800/1200"
    ];

    let current = 2;

    const cards = [
        document.getElementById("c1"),
        document.getElementById("c2"),
        document.getElementById("c3"),
        document.getElementById("c4"),
        document.getElementById("c5")
    ];

    function loadImages() {

        cards[0].querySelector("img").src =
            images[(current - 2 + images.length) % images.length];

        cards[1].querySelector("img").src =
            images[(current - 1 + images.length) % images.length];

        cards[2].querySelector("img").src =
            images[current];

        cards[3].querySelector("img").src =
            images[(current + 1) % images.length];

        cards[4].querySelector("img").src =
            images[(current + 2) % images.length];

        // bg pic loading with effect time delay.
        bgPic.style.opacity = 0;
        setTimeout(() => {
            bgPic.src = bgImages[current];
            bgPic.onload = () => {
                bgPic.style.opacity = 1;
            };
        }, 350);
    }

    loadImages();

    function render() {

        cards[0].className = "card2 hidden-left";
        cards[1].className = "card2 left";
        cards[2].className = "card2 center";
        cards[3].className = "card2 right";
        cards[4].className = "card2 hidden-right";

    }

    const carousel = document.querySelector(".carousel");

    carousel.addEventListener("click", (e) => {

        const card = e.target.closest(".card2"); //hhhhh card

        if (!card) return;

        if (card.classList.contains("left")) {

            // PREV CODE HERE
            cards[4].className = "card2 hidden-right";
            cards[3].className = "card2 hidden-right";
            cards[2].className = "card2 right";
            cards[1].className = "card2 center";
            cards[0].className = "card2 left";
            cards.unshift(cards.pop());
            current = (current - 1 + images.length) % images.length;
            loadImages();
            render();
        }

        if (card.classList.contains("right")) {

            cards[0].className = "card2 hidden-left";
            cards[1].className = "card2 hidden-left";
            cards[2].className = "card2 left";
            cards[3].className = "card2 center";
            cards[4].className = "card2 right";
            cards.push(cards.shift());
            current = (current + 1) % images.length;
            loadImages();
            render();

        }

    });
}