/* ================= 1. MENU DATA ================= */
const menuData = {
  signatures: [
    { name: "Rooted Latte", ing: "Espresso · Pistachio · Vanilla · Creamy Milk", price: 6.50, tag: "House Favorite" },
    { name: "Forest Mocha", ing: "Dark Cocoa 70% · Double Espresso · Roasted Hazelnut", price: 6.75, tag: "Signature" },
    { name: "Golden Brew", ing: "Espresso · Raw Forest Honey · Cinnamon · Oat Milk", price: 6.50, tag: "Organic" },
    { name: "Rosemary Cold Brew", ing: "Slow-Drip Cold Brew · Fresh Rosemary Infusion · Vanilla", price: 6.25, tag: "Botanical" },
    { name: "Matcha Garden", ing: "Uji Ceremonial Matcha · Madagascar Vanilla · Oat Milk", price: 6.50, tag: "Pure Nature" }
  ],
  coffee: [
    { name: "Espresso", ing: "Rich, bold, and golden crema extraction", price: 3.50, tag: "Single Origin" },
    { name: "Americano", ing: "Espresso pulled over crisp hot spring water", price: 4.00, tag: "Classic" },
    { name: "Cappuccino", ing: "Equal balance of dense velvety micro-foam and espresso", price: 4.75, tag: "Smooth" },
    { name: "Caffè Latte", ing: "Silky steamed milk poured gently over rich espresso", price: 5.00, tag: "Creamy" },
    { name: "Flat White", ing: "Double ristretto with glossy, micro-textured whole milk", price: 5.25, tag: "Intense" },
    { name: "Mocha", ing: "Artisan melted chocolate, espresso shot, and textured milk", price: 5.75, tag: "Sweet Roast" }
  ],
  coldbrew: [
    { name: "Classic Cold Brew", ing: "Steeped for 20 hours in pure chilled water", price: 5.25, tag: "20H Steeped" },
    { name: "Vanilla Cold Brew", ing: "Signature cold brew with handcrafted bourbon vanilla cream", price: 5.75, tag: "Chilled" },
    { name: "Iced Spanish Latte", ing: "Double shot espresso, sweet condensed milk, ice cubes", price: 6.00, tag: "Best Seller" },
    { name: "Iced Americano", ing: "Crisp, bold espresso poured directly over iced water", price: 4.50, tag: "Refreshing" },
    { name: "Cold Brew Tonic", ing: "Citrus cold brew extraction served with botanical tonic water", price: 6.25, tag: "Sparkling" }
  ],
  tea: [
    { name: "Jasmine Green Tea", ing: "Delicate whole-leaf green tea scented with midnight jasmine", price: 4.50, tag: "Herbal" },
    { name: "Earl Grey", ing: "Noble black tea infused with cold-pressed Italian bergamot", price: 4.50, tag: "Aromatic" },
    { name: "Chamomile Bloom", ing: "Naturally caffeine-free Egyptian whole chamomile flowers", price: 4.50, tag: "Calming" },
    { name: "Matcha Latte", ing: "Ceremonial stone-ground matcha with lightly sweetened oat milk", price: 6.00, tag: "Antioxidant" },
    { name: "Chai Latte", ing: "Slow-brewed spices: cardamom, ginger, cloves & black tea", price: 5.50, tag: "Spiced" }
  ],
  oven: [
    { name: "Butter Croissant", ing: "Pure Normandy French butter, flaky golden pastry layers", price: 4.25, tag: "Baked Fresh" },
    { name: "Almond Croissant", ing: "Twice-baked butter croissant filled with almond frangipane", price: 5.25, tag: "Signature" },
    { name: "Cinnamon Roll", ing: "Soft brioche dough swirled with Ceylon cinnamon & vanilla glaze", price: 4.75, tag: "Warm Spiced" },
    { name: "Chocolate Tart", ing: "Crisp cocoa crust with rich 64% dark chocolate ganache", price: 5.50, tag: "Decadent" },
    { name: "Pistachio Cake", ing: "Moist sponge crumb loaded with Mediterranean green pistachios", price: 6.00, tag: "Nutty Crumb" }
  ]
};

/* ================= 2. MENU RENDERING ================= */
function renderMenu(category) {
  const container = document.getElementById('menuContainer');
  if (!container) return; // تحقق لعدم إيقاف السكربت في الصفحات الأخرى

  const items = menuData[category] || [];
  container.innerHTML = items.map(item => `
    <div class="menu-card">
      <div>
        <div class="menu-card-top">
          <h3 class="item-name">${item.name}</h3>
          <span class="item-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="item-ingredients">${item.ing}</p>
      </div>
      <div class="menu-card-bottom">
        <span class="tag-nature"><i class="fa-solid fa-seedling"></i> ${item.tag}</span>
        <button class="btn-add-order" onclick="openCustomModal('${item.name}', ${item.price}, '${category}')">
          Add to Order <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function filterMenu(category, element) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  renderMenu(category);
}

// استدعاء المنيو فقط عند التواجد بصفحة المنيو
if (document.getElementById('menuContainer')) {
  renderMenu('signatures');
}

/* ================= 3. PRODUCT CUSTOMIZE MODAL ================= */
let currentProduct = null;
let selectedSize = 'Regular';
let selectedMilk = 'Whole Milk';
let selectedPayment = 'Cash on Delivery';

function openCustomModal(name, price, category) {
  currentProduct = { name, basePrice: price, category };
  selectedSize = 'Regular';
  selectedMilk = 'Whole Milk';
  
  const modalName = document.getElementById('modalItemName');
  const milkGroup = document.getElementById('milkGroup');
  
  if (modalName) modalName.innerText = name;
  if (milkGroup) milkGroup.style.display = (category === 'oven') ? 'none' : 'block';
  
  resetPills();
  calculateModalPrice();
  
  const modal = document.getElementById('customModal');
  if (modal) modal.classList.add('open');
}

function closeCustomModal() {
  const modal = document.getElementById('customModal');
  if (modal) modal.classList.remove('open');
}

function selectPill(btn, group) {
  btn.parentElement.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  if (group === 'size') {
    selectedSize = btn.innerText.includes('Large') ? 'Large' : 'Regular';
  }
  if (group === 'milk') {
    selectedMilk = btn.innerText.split(' (')[0];
  }
  if (group === 'pay') {
    selectedPayment = btn.innerText;
  }
  calculateModalPrice();
}

function resetPills() {
  document.querySelectorAll('#sizeOptions .pill').forEach((p, i) => p.classList.toggle('active', i === 0));
  document.querySelectorAll('#milkOptions .pill').forEach((p, i) => p.classList.toggle('active', i === 0));
}

function calculateModalPrice() {
  if (!currentProduct) return;
  let price = currentProduct.basePrice;
  if (selectedSize === 'Large') price += 0.75;
  if (currentProduct.category !== 'oven' && (selectedMilk === 'Oat Milk' || selectedMilk === 'Almond Milk')) {
    price += 0.50;
  }
  const modalPrice = document.getElementById('modalItemPrice');
  if (modalPrice) modalPrice.innerText = `$${price.toFixed(2)}`;
}

function confirmAddToCart() {
  let price = currentProduct.basePrice;
  let label = currentProduct.name;
  
  if (selectedSize === 'Large') price += 0.75;
  if (currentProduct.category !== 'oven' && (selectedMilk === 'Oat Milk' || selectedMilk === 'Almond Milk')) {
    price += 0.50;
    label += ` (${selectedSize}, ${selectedMilk})`;
  } else {
    label += ` (${selectedSize})`;
  }

  addToCart(label, price);
  closeCustomModal();
}

/* ================= 4. CART DRAWER & STATE ================= */
let cart = [];

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open');
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  toggleCart();
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  updateCartUI();
}

function updateCartUI() {
  const list = document.getElementById('cartItemsList');
  const badge = document.getElementById('cartBadge');
  const total = document.getElementById('cartTotal');

  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const sumPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  if (badge) badge.innerText = count;
  if (total) total.innerText = `$${sumPrice.toFixed(2)}`;
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = `<p class="cart-empty-text">Your basket is currently empty.</p>`;
    return;
  }

  list.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty('${item.name}', -1)">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
      </div>
    </div>
  `).join('');
}

/* ================= 5. CHECKOUT & DIGITAL RECEIPT ================= */
let lastOrderData = null;

function checkoutOrder() {
  if (cart.length === 0) {
    alert("Your selection is empty!");
    return;
  }
  const checkoutTotal = document.getElementById('checkoutFinalTotal');
  const cartTotal = document.getElementById('cartTotal');
  if (checkoutTotal && cartTotal) checkoutTotal.innerText = cartTotal.innerText;

  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) checkoutModal.classList.add('open');
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) checkoutModal.classList.remove('open');
}

function submitCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;
  const total = document.getElementById('cartTotal').innerText;

  lastOrderData = {
    name,
    phone,
    address,
    payment: selectedPayment,
    items: [...cart],
    total
  };

  const receiptContent = document.getElementById('receiptContent');
  if (receiptContent) {
    receiptContent.innerHTML = `
      <div class="receipt-meta">
        <div>Customer: <strong>${name}</strong> (${phone})</div>
        <div>Destination: <strong>${address}</strong></div>
        <div>Payment: <strong>${selectedPayment}</strong></div>
      </div>

      <div class="receipt-items-list">
        ${cart.map(item => `
          <div class="receipt-item-line">
            <span class="name">• ${item.qty}x ${item.name}</span>             <strong>$${(item.price * item.qty).toFixed(2)}</strong>
          </div>
        `).join('')}
      </div>

      <div class="receipt-total-box">
        <span>Total Paid</span>
        <strong>${total}</strong>
      </div>
    `;
  }

  cart = [];
  updateCartUI();
  closeCheckoutModal();
  toggleCart();
  e.target.reset();

  const receiptModal = document.getElementById('receiptModal');
  if (receiptModal) receiptModal.classList.add('open');
}

function closeReceiptModal() {
  const receiptModal = document.getElementById('receiptModal');
  if (receiptModal) receiptModal.classList.remove('open');
}

function sendToWhatsApp() {
  if (!lastOrderData) return;

  let msg = `🌿 *NEW ORDER — ROAST & ROOT*\n`;
  msg += `---------------------------------\n`;
  msg += `👤 *Customer:* ${lastOrderData.name}\n`;
  msg += `📞 *Phone:* ${lastOrderData.phone}\n`;
  msg += `📍 *Destination:* ${lastOrderData.address}\n`;
  msg += `💳 *Payment:* ${lastOrderData.payment}\n`;
  msg += `---------------------------------\n`;
  msg += `☕ *Items:*\n`;
  lastOrderData.items.forEach(i => {
    msg += `• ${i.qty}x ${i.name} ($${(i.price * i.qty).toFixed(2)})\n`;
  });
  msg += `---------------------------------\n`;
  msg += `💰 *Total Amount:* ${lastOrderData.total}\n\n`;
  msg += `Crafted with intention.`;

  const phone = "962790000000";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* ================= 6. GALLERY FILTER & LIGHTBOX ================= */
function filterGallery(category, element) {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  const items = document.querySelectorAll('.masonry-item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-cat') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function openLightbox(item) {
  const img = item.querySelector('img');
  const caption = item.querySelector('.masonry-caption').innerText;
  
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxModal = document.getElementById('lightboxModal');

  if (lightboxImg) lightboxImg.src = img.src;
  if (lightboxCaption) lightboxCaption.innerText = caption;
  if (lightboxModal) lightboxModal.classList.add('open');
}

function closeLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) lightboxModal.classList.remove('open');
}

/* ================= 7. CONTACT FORM ================= */
function handleContact(e) {
  e.preventDefault();
  alert("Thank you for connecting with Roast & Root. We'll be in touch soon!");
  e.target.reset();
}