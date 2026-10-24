/* ===================================================================
   UKthhrift — script.js   (vanilla JS, no build step)
   EDIT ONLY THE "CONFIG" AND "PRODUCTS" SECTIONS TO CUSTOMISE THE SITE.
   =================================================================== */

/* ---------- CONFIG ---------- */
const WHATSAPP_NUMBER = "917668187737";          // country code + number, digits only
const ANNOUNCEMENT = "NEW FITS. FRESH ENERGY. EXPLORE THE DROP.";
const SHIPPING_CHARGE = null;                    // null = "to be confirmed". Set a number (e.g. 79) once decided.
const UPI_ID = "";                               // add your UPI ID here when ready; blank hides it
const INSTAGRAM_URL = "";                        // e.g. "https://instagram.com/yourhandle"; blank = not linked

/* Replace these paths with your own files placed in the assets folder.
   Until a file exists, a neutral placeholder is shown automatically. */
const SITE_ASSETS = {
  hero: "assets/images/hero.jpg",
  categoryTees: "assets/images/category-tees.jpg",
  categoryShirts: "assets/images/category-shirts.jpg",
  categoryJeans: "assets/images/category-jeans.jpg",
  categoryCombos: "assets/images/category-combos.jpg",
  gallery: ["assets/images/look-1.jpg","assets/images/look-2.jpg","assets/images/look-3.jpg","assets/images/look-4.jpg","assets/images/look-5.jpg"],
  paymentQR: "assets/payment/ukthhrift-payment-qr.png"
};

/* ---------- PRODUCTS ----------
   SAMPLE / DEMONSTRATION INVENTORY — replace before launch.
   Fields: id, name, category (tees|shirts|jeans|cargos|combos), fit (label), desc,
   mrp (original ₹), price (discounted ₹), image (local path), gallery[] (extra paths),
   sizeGroups [{label, options[]}], colours[], badge, styling, available (true/false), order (higher = newer).
   Combos: add  includes: ["UKT001","UKJ001"]  — price & mrp are then calculated from those products.
   Image note: no third-party photos are bundled. Put your own AI images at the paths below.
   Licence reminder: only use images you created or are licensed to use commercially. */
const TOP = ["S","M","L","XL"], BOTTOM = ["28","30","32","34"];
const PRODUCTS = [
  {id:"UKT001",name:"Boxy Tee — Black",category:"tees",fit:"Boxy fit",desc:"Sample listing. Cropped, square boxy silhouette with a dropped shoulder.",mrp:999,price:699,image:"assets/images/boxy-tee-black.jpg",gallery:["assets/images/boxy-tee-black-2.jpg"],sizeGroups:[{label:"Size",options:TOP}],colours:["Black","Off-white"],badge:"New",available:true,order:10},
  {id:"UKT002",name:"Oversized Graphic Tee",category:"tees",fit:"Oversized fit",desc:"Sample listing. Relaxed, longer-length oversized tee.",mrp:1099,price:799,image:"assets/images/oversized-tee.jpg",gallery:[],sizeGroups:[{label:"Size",options:TOP}],colours:["Sky","Sand"],badge:"",available:true,order:9},
  {id:"UKT003",name:"Boxy Tee — Sand",category:"tees",fit:"Boxy fit",desc:"Sample listing. Neutral boxy tee for easy layering.",mrp:999,price:699,image:"assets/images/boxy-tee-sand.jpg",gallery:[],sizeGroups:[{label:"Size",options:TOP}],colours:["Sand","Olive"],badge:"",available:true,order:6},
  {id:"UKS001",name:"Oversized Shirt — Stone",category:"shirts",fit:"Oversized fit",desc:"Sample listing. Drop-shoulder oversized shirt, wear open or buttoned.",mrp:1499,price:1099,image:"assets/images/oversized-shirt.jpg",gallery:["assets/images/oversized-shirt-2.jpg"],sizeGroups:[{label:"Size",options:TOP}],colours:["Stone","Navy"],badge:"New",available:true,order:8},
  {id:"UKS002",name:"Oversized Shirt — Check",category:"shirts",fit:"Oversized fit",desc:"Sample listing. Oversized check shirt for layered looks.",mrp:1599,price:1199,image:"assets/images/oversized-shirt-check.jpg",gallery:[],sizeGroups:[{label:"Size",options:TOP}],colours:["Blue check","Grey check"],badge:"",available:true,order:5},
  {id:"UKJ001",name:"Baggy Denim — Light Blue",category:"jeans",fit:"Baggy fit",desc:"Sample listing. Wide-leg baggy jeans with a low-slung drape.",mrp:1799,price:1299,image:"assets/images/baggy-denim.jpg",gallery:[],sizeGroups:[{label:"Waist",options:BOTTOM}],colours:["Light Blue","Washed Black"],badge:"Trending",available:true,order:7},
  {id:"UKJ002",name:"Relaxed Denim — Indigo",category:"jeans",fit:"Relaxed fit",desc:"Sample listing. Straight relaxed denim in a deep wash.",mrp:1699,price:1249,image:"assets/images/relaxed-denim.jpg",gallery:[],sizeGroups:[{label:"Waist",options:BOTTOM}],colours:["Indigo"],badge:"",available:true,order:4},
  {id:"UKC001",name:"Utility Cargos — Olive",category:"cargos",fit:"Relaxed fit",desc:"Sample listing. Relaxed cargo pants with side pockets.",mrp:1599,price:1199,image:"assets/images/cargo-olive.jpg",gallery:[],sizeGroups:[{label:"Waist",options:BOTTOM}],colours:["Olive","Black"],badge:"",available:true,order:3},
  {id:"UKX001",name:"Boxy Tee + Baggy Denim",category:"combos",fit:"Outfit combo",desc:"Styling combo built from two sample products.",image:"assets/images/combo-1.jpg",gallery:[],includes:["UKT001","UKJ001"],sizeGroups:[{label:"Top size",options:TOP},{label:"Waist",options:BOTTOM}],colours:[],badge:"Combo",styling:"Boxy tee tucked loosely over baggy denim.",available:true,order:2},
  {id:"UKX002",name:"Oversized Shirt + Relaxed Denim",category:"combos",fit:"Outfit combo",desc:"Styling combo built from two sample products.",image:"assets/images/combo-2.jpg",gallery:[],includes:["UKS001","UKJ002"],sizeGroups:[{label:"Top size",options:TOP},{label:"Waist",options:BOTTOM}],colours:[],badge:"Combo",styling:"Shirt worn open over a plain tee with straight denim.",available:true,order:1},
  {id:"UKX003",name:"Graphic Tee + Cargos",category:"combos",fit:"Outfit combo",desc:"Styling combo built from two sample products.",image:"assets/images/combo-3.jpg",gallery:[],includes:["UKT002","UKC001"],sizeGroups:[{label:"Top size",options:TOP},{label:"Waist",options:BOTTOM}],colours:[],badge:"Combo",styling:"Oversized graphic tee with utility cargos.",available:true,order:0}
];

/* ---------- HELPERS ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = n => "₹" + Number(n).toLocaleString("en-IN");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byId = id => PRODUCTS.find(p => p.id === id);
const comboParts = p => (p.includes || []).map(byId).filter(Boolean);
const priceOf = p => p.includes ? comboParts(p).reduce((a, x) => a + x.price, 0) : p.price;
const mrpOf = p => p.includes ? comboParts(p).reduce((a, x) => a + x.mrp, 0) : p.mrp;
const isAvail = p => p.available && (!p.includes || (comboParts(p).length === p.includes.length && comboParts(p).every(x => x.available)));
const pctOff = p => { const m = mrpOf(p), d = priceOf(p); return m > d && d > 0 ? Math.round((m - d) / m * 100) : 0; };
const LABELS = { tees: "Boxy & oversized tees", shirts: "Oversized shirts", jeans: "Baggy denim", cargos: "Cargos", combos: "Outfit combos" };
function ph(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#E9E3D8"/><path d="M130 150l50-30q20 25 40 0l50 30 40 60-40 20v170H130V230l-40-20z" fill="none" stroke="#9AA5AE" stroke-width="5" stroke-linejoin="round"/><text x="200" y="450" font-family="Arial" font-size="18" fill="#6B7280" text-anchor="middle">${esc(label || "Image placeholder")}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
function img(src, alt, cls = "", lazy = true) {
  return `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" ${lazy ? 'loading="lazy"' : ""} onerror="this.onerror=null;this.src=ph(this.alt)">`;
}
window.ph = ph;
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }

/* ---------- CART ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("ukt_cart") || "[]").filter(l => byId(l.id) && l.qty > 0); } catch (e) { cart = []; }
const saveCart = () => { try { localStorage.setItem("ukt_cart", JSON.stringify(cart)); } catch (e) {} renderCart(); };
const lineKey = l => [l.id, l.size, l.colour].join("|");
const cartSubtotal = () => cart.reduce((a, l) => a + priceOf(byId(l.id)) * l.qty, 0);
function addToCart(id, size, colour, qty) {
  const k = [id, size, colour].join("|"), ex = cart.find(l => lineKey(l) === k);
  qty = Math.max(1, Math.min(10, parseInt(qty) || 1));
  if (ex) ex.qty = Math.min(10, ex.qty + qty); else cart.push({ id, size, colour, qty });
  saveCart(); toast("Added to cart");
}
function renderCart() {
  $$(".cart-count").forEach(e => { const n = cart.reduce((a, l) => a + l.qty, 0); e.textContent = n; e.hidden = !n; });
  const box = $("#cart-items");
  if (!cart.length) { box.innerHTML = `<div class="empty"><p>Your cart is empty.</p><button class="btn" data-close-drawer data-goto="#shop">Browse the drop</button></div>`; $("#cart-foot").hidden = true; return; }
  $("#cart-foot").hidden = false;
  box.innerHTML = cart.map((l, i) => { const p = byId(l.id); return `<div class="line"><div class="line-img">${img(p.image, p.name)}</div><div><strong>${esc(p.name)}</strong><div class="meta">ID ${esc(p.id)} · ${esc(l.size)}${l.colour ? " · " + esc(l.colour) : ""}</div><div class="meta">${inr(priceOf(p))} each</div><div class="qty"><button aria-label="Decrease quantity of ${esc(p.name)}" data-q="${i}" data-d="-1">−</button><span>${l.qty}</span><button aria-label="Increase quantity of ${esc(p.name)}" data-q="${i}" data-d="1">+</button><button class="link rm" data-rm="${i}">Remove</button></div></div><div class="lt">${inr(priceOf(p) * l.qty)}</div></div>`; }).join("");
  $("#cart-sub").textContent = inr(cartSubtotal());
}
$("#cart-items").addEventListener("click", e => {
  const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]");
  if (q) { const l = cart[+q.dataset.q]; l.qty = Math.max(1, Math.min(10, l.qty + +q.dataset.d)); saveCart(); }
  if (r) { cart.splice(+r.dataset.rm, 1); saveCart(); }
});
$("#clear-cart").onclick = () => { if (cart.length && confirm("Remove all items from your cart?")) { cart = []; saveCart(); } };

/* ---------- OVERLAYS (modal / drawer) ---------- */
let lastFocus = null;
function openLayer(el) { lastFocus = document.activeElement; el.hidden = false; requestAnimationFrame(() => el.classList.add("open")); document.body.classList.add("lock"); const f = $("button,input,select,a[href]", el); f && setTimeout(() => f.focus(), 50); }
function closeLayer(el) { el.classList.remove("open"); setTimeout(() => { el.hidden = true; if (!$(".layer.open")) document.body.classList.remove("lock"); lastFocus && lastFocus.focus && lastFocus.focus(); }, 220); }
document.addEventListener("click", e => {
  const c = e.target.closest("[data-close]"); if (c) { const l = c.closest(".layer"); l && closeLayer(l); }
  if (e.target.classList && e.target.classList.contains("layer")) closeLayer(e.target);
  const cd = e.target.closest("[data-close-drawer]"); if (cd) { closeLayer($("#drawer")); }
  const go = e.target.closest("[data-goto]"); if (go) { const t = $(go.dataset.goto); t && t.scrollIntoView({ behavior: "smooth" }); }
  const o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); const l = $("#" + o.dataset.open); if (o.dataset.open === "drawer") renderCart(); $$(".layer.open").forEach(x => x !== l && closeLayer(x)); openLayer(l); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { const l = $$(".layer.open").pop(); if (l) closeLayer(l); else closeMenu(); } });

/* ---------- NAV ---------- */
const menuBtn = $("#menu-btn");
function closeMenu() { $("#nav").classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
menuBtn.onclick = () => { const o = $("#nav").classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); };
$("#announce").textContent = ANNOUNCEMENT;
$$("[data-filter-link]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); setFilter(a.dataset.filterLink); closeMenu(); $("#shop").scrollIntoView({ behavior: "smooth" }); }));
addEventListener("scroll", () => $("header").classList.toggle("compact", scrollY > 60), { passive: true });

/* ---------- SHOP: filter / sort / search ---------- */
const state = { filter: "all", sort: "featured", q: "" };
const FILTERS = [["all", "All"], ["tees", "Boxy tees"], ["shirts", "Oversized shirts"], ["jeans", "Jeans"], ["cargos", "Cargos"], ["combos", "Outfit combos"]];
$("#filters").innerHTML = FILTERS.map(([k, v]) => `<button data-f="${k}" aria-pressed="${k === "all"}">${v}</button>`).join("");
$("#filters").addEventListener("click", e => { const b = e.target.closest("[data-f]"); if (b) setFilter(b.dataset.f); });
function setFilter(f) { state.filter = f; state.q = ""; $("#search-input").value = ""; $("#sort").value = state.sort; renderShop(); }
$("#sort").onchange = e => { state.sort = e.target.value; renderShop(); };
function cardHTML(p) {
  const off = pctOff(p), ok = isAvail(p), second = p.gallery && p.gallery[0];
  return `<article class="card"><button class="card-img" data-view="${p.id}" aria-label="Quick view ${esc(p.name)}">${img(p.image, p.name)}${second ? img(second, p.name + " alternate view", "alt") : ""}${p.badge ? `<span class="tag">${esc(p.badge)}</span>` : ""}${off ? `<span class="tag off">${off}% off</span>` : ""}</button><div class="card-info"><div class="fit">${esc(p.fit)}</div><h3>${esc(p.name)}</h3><div class="price"><b>${inr(priceOf(p))}</b>${off ? `<s>${inr(mrpOf(p))}</s>` : ""}</div>${ok ? `<button class="btn sm" data-view="${p.id}">Choose size &amp; add</button>` : `<span class="soldout">Currently unavailable</span>`}</div></article>`;
}
function renderShop() {
  $$("#filters button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === state.filter && !state.q));
  let list = PRODUCTS.filter(p => state.filter === "all" || p.category === state.filter);
  if (state.q) { const q = state.q.toLowerCase(); list = PRODUCTS.filter(p => (p.name + " " + p.fit + " " + LABELS[p.category] + " " + p.id).toLowerCase().includes(q)); }
  const s = state.sort;
  if (s === "low") list.sort((a, b) => priceOf(a) - priceOf(b)); else if (s === "high") list.sort((a, b) => priceOf(b) - priceOf(a)); else if (s === "new") list.sort((a, b) => b.order - a.order);
  $("#shop-title").textContent = state.q ? `Results for “${state.q}”` : (state.filter === "all" ? "The full drop" : LABELS[state.filter]);
  $("#grid").innerHTML = list.length ? list.map(cardHTML).join("") : `<div class="empty wide"><p>No products match that. Try another filter or search.</p><button class="btn" id="reset-f">Show all products</button></div>`;
  const r = $("#reset-f"); if (r) r.onclick = () => setFilter("all");
}
document.addEventListener("click", e => { const v = e.target.closest("[data-view]"); if (v) openProduct(v.dataset.view); const c = e.target.closest("[data-cat]"); if (c) { setFilter(c.dataset.cat); $("#shop").scrollIntoView({ behavior: "smooth" }); } });
$("#search-form").addEventListener("submit", e => { e.preventDefault(); state.q = $("#search-input").value.trim(); state.filter = "all"; renderShop(); closeLayer($("#search")); setTimeout(() => $("#shop").scrollIntoView({ behavior: "smooth" }), 250); });

/* ---------- PRODUCT MODAL ---------- */
function openProduct(id) {
  const p = byId(id); if (!p) return; const off = pctOff(p), ok = isAvail(p);
  const imgs = [p.image, ...(p.gallery || [])];
  $("#product-body").innerHTML = `<div class="pm-gal">${img(imgs[0], p.name, "pm-main", false)}${imgs.length > 1 ? `<div class="thumbs">${imgs.map((s, i) => `<button data-th="${i}" aria-label="Show image ${i + 1}">${img(s, p.name)}</button>`).join("")}</div>` : ""}</div>
  <div class="pm-info"><div class="fit">${esc(p.fit)} · ID ${esc(p.id)}</div><h2 id="pm-title">${esc(p.name)}</h2><div class="price big"><b>${inr(priceOf(p))}</b>${off ? `<s>${inr(mrpOf(p))}</s><span class="tag off static">${off}% off</span>` : ""}</div><p>${esc(p.desc)}</p>
  ${p.includes ? `<ul class="inc">${comboParts(p).map(x => `<li>${esc(x.name)} (${esc(x.id)}) — ${inr(x.price)}${x.available ? "" : " <em>unavailable</em>"}</li>`).join("")}</ul>${p.styling ? `<p class="meta">Styling idea: ${esc(p.styling)}</p>` : ""}` : ""}
  ${ok ? `<form id="pf" novalidate>${p.sizeGroups.map((g, i) => `<fieldset><legend>${esc(g.label)}</legend><div class="opts">${g.options.map(o => `<label><input type="radio" name="sg${i}" value="${esc(o)}"><span>${esc(o)}</span></label>`).join("")}</div></fieldset>`).join("")}
  ${p.colours.length ? `<fieldset><legend>Colour</legend><div class="opts">${p.colours.map(o => `<label><input type="radio" name="col" value="${esc(o)}"><span>${esc(o)}</span></label>`).join("")}</div></fieldset>` : ""}
  <div class="err" id="pf-err" role="alert"></div>
  <div class="row"><div class="qty big"><button type="button" data-pq="-1" aria-label="Decrease quantity">−</button><span id="pq">1</span><button type="button" data-pq="1" aria-label="Increase quantity">+</button></div><button type="submit" class="btn grow">Add to cart</button></div>
  <button type="button" class="btn ghost full" id="pf-wa">Order this on WhatsApp</button>
  <button type="button" class="link" data-open="sizeguide">Size guide</button></form>` : `<p class="warn">This item (or an item in this combo) is currently unavailable.</p>`}</div>`;
  openLayer($("#product"));
  const f = $("#pf"); if (!f) return; let q = 1;
  $$("[data-th]").forEach(b => b.onclick = () => { $(".pm-main").src = imgs[+b.dataset.th]; });
  $$("[data-pq]").forEach(b => b.onclick = () => { q = Math.max(1, Math.min(10, q + +b.dataset.pq)); $("#pq").textContent = q; });
  const pick = () => {
    const parts = p.sizeGroups.map((g, i) => { const c = f.querySelector(`[name=sg${i}]:checked`); return c ? (p.sizeGroups.length > 1 ? g.label + " " + c.value : c.value) : null; });
    const col = f.querySelector("[name=col]:checked");
    if (parts.includes(null)) { $("#pf-err").textContent = "Please select " + p.sizeGroups.map(g => g.label.toLowerCase()).join(" and ") + " before continuing."; return null; }
    if (p.colours.length && !col) { $("#pf-err").textContent = "Please select a colour."; return null; }
    $("#pf-err").textContent = ""; return { size: parts.join(" / "), colour: col ? col.value : "" };
  };
  f.onsubmit = e => { e.preventDefault(); const s = pick(); if (!s) return; addToCart(p.id, s.size, s.colour, q); closeLayer($("#product")); setTimeout(() => { renderCart(); openLayer($("#drawer")); }, 260); };
  $("#pf-wa").onclick = () => { const s = pick(); if (!s) return; const t = `Hi UKthhrift! I'm interested in this item:\n\n${p.name}\nProduct ID: ${p.id}\nSize: ${s.size}\nColour: ${s.colour || "N/A"}\nQuantity: ${q}\nUnit Price: ${inr(priceOf(p))}\nLine Total: ${inr(priceOf(p) * q)}\n\nPlease confirm availability and how to order.`; openWA(t); };
}

/* ---------- CHECKOUT ---------- */
let orderRef = "", cust = {};
const FIELDS = ["name", "phone", "house", "street", "city", "state", "pin", "landmark", "notes"];
function view(v) { $$("#checkout .cv").forEach(e => e.hidden = e.dataset.v !== v); $("#checkout .modal").scrollTop = 0; }
$("#to-checkout").onclick = () => {
  if (!cart.length) return;
  closeLayer($("#drawer")); orderRef = "UKT-" + Date.now().toString(36).toUpperCase().slice(-6);
  setTimeout(() => { view("form"); openLayer($("#checkout")); }, 260);
};
const MSG = { name: "Enter your full name.", phone: "Enter a valid 10-digit Indian mobile number.", house: "Enter your house or flat number.", street: "Enter your street and locality.", city: "Enter your city.", state: "Enter your state.", pin: "Enter a 6-digit PIN code." };
function validate() {
  let ok = true, first = null; FIELDS.forEach(k => cust[k] = $("#f-" + k).value.trim());
  const phone = cust.phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  cust.phoneClean = phone;
  FIELDS.slice(0, 7).forEach(k => {
    let bad = !cust[k]; if (k === "phone") bad = !/^[6-9]\d{9}$/.test(phone); if (k === "pin") bad = !/^\d{6}$/.test(cust.pin);
    $("#e-" + k).textContent = bad ? MSG[k] : ""; $("#f-" + k).setAttribute("aria-invalid", bad);
    if (bad) { ok = false; first = first || $("#f-" + k); }
  });
  first && first.focus(); return ok;
}
$("#cform").addEventListener("submit", e => { e.preventDefault(); if (validate()) { renderReview(); view("review"); } });
function totals() { const sub = cartSubtotal(); return { sub, ship: SHIPPING_CHARGE, total: SHIPPING_CHARGE === null ? null : sub + SHIPPING_CHARGE }; }
function renderReview() {
  const t = totals();
  $("#review").innerHTML = `<h3>Delivery details</h3><p>${esc(cust.name)}<br>${esc(cust.phoneClean)}<br>${esc(cust.house)}, ${esc(cust.street)}${cust.landmark ? "<br>Landmark: " + esc(cust.landmark) : ""}<br>${esc(cust.city)}, ${esc(cust.state)} ${esc(cust.pin)}</p><h3>Order ${esc(orderRef)}</h3>
  ${cart.map(l => { const p = byId(l.id); return `<div class="rl"><span>${esc(p.name)} <small>(${esc(p.id)}) · ${esc(l.size)}${l.colour ? " · " + esc(l.colour) : ""} · ${l.qty} × ${inr(priceOf(p))}</small></span><b>${inr(priceOf(p) * l.qty)}</b></div>`; }).join("")}
  <div class="rl"><span>Subtotal</span><b>${inr(t.sub)}</b></div><div class="rl"><span>Shipping</span><b>${t.ship === null ? "To be confirmed" : inr(t.ship)}</b></div><div class="rl tot"><span>Final total</span><b>${t.total === null ? "To be confirmed" : inr(t.total)}</b></div>
  ${cust.notes ? `<p class="meta">Notes: ${esc(cust.notes)}</p>` : ""}<p class="meta">Shipping charges, if applicable, will be confirmed before order acceptance. Nothing is ordered until you send the WhatsApp message and we confirm.</p>`;
}
$("#edit-details").onclick = () => view("form");
$("#edit-cart").onclick = () => { closeLayer($("#checkout")); setTimeout(() => { renderCart(); openLayer($("#drawer")); }, 260); };
function buildMessage() {
  const t = totals();
  const items = cart.map(l => { const p = byId(l.id); return `${p.name}\nProduct ID: ${p.id}\nSize: ${l.size}\nColour: ${l.colour || "N/A"}\nQuantity: ${l.qty}\nUnit Price: ${inr(priceOf(p))}\nLine Total: ${inr(priceOf(p) * l.qty)}`; }).join("\n\n");
  return `Hi UKthhrift! I want to place an order.\n\nORDER REFERENCE: ${orderRef}\n\nCUSTOMER DETAILS\nName: ${cust.name}\nMobile: ${cust.phoneClean}\nAddress: ${cust.house}\nLocality: ${cust.street}\nCity: ${cust.city}\nState: ${cust.state}\nPIN Code: ${cust.pin}${cust.landmark ? "\nLandmark: " + cust.landmark : ""}\n\nORDER ITEMS\n\n${items}\n\nSubtotal: ${inr(t.sub)}\nShipping: ${t.ship === null ? "To be confirmed" : inr(t.ship)}\nFinal Total: ${t.total === null ? "To be confirmed" : inr(t.total)}\n\nOrder Notes: ${cust.notes || "None"}\n\nPlease confirm my order, product availability, shipping charges, payment method and delivery details.`;
}
function waURL(text) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`; }
function openWA(text) {
  const url = waURL(text), w = window.open(url, "_blank", "noopener");
  const note = $("#wa-note"); if (note) { note.hidden = false; note.innerHTML = `WhatsApp should open with your message filled in. <strong>You must press Send in WhatsApp</strong> — your order is not placed until then, and it is only confirmed once we reply. If nothing opened, <a href="${esc(url)}" target="_blank" rel="noopener">tap here to open WhatsApp</a>.`; }
  if (!w) toast("Pop-up blocked — use the link shown");
}
$("#wa-confirm").onclick = () => { try { openWA(buildMessage()); } catch (e) { toast("Something went wrong. Please try again."); } };
$("#wa-pay").onclick = () => { openWA(buildMessage()); };
$("#show-pay").onclick = () => view("pay");
$("#back-review").onclick = () => view("review");
FIELDS.forEach(k => $("#f-" + k).addEventListener("input", () => { $("#f-" + k).removeAttribute("aria-invalid"); const e = $("#e-" + k); if (e) e.textContent = ""; }));

/* ---------- STATIC SECTIONS ---------- */
function mountImages() {
  const A = SITE_ASSETS, set = (id, src, alt) => { const e = $(id); if (e) e.innerHTML = img(src, alt, "", id !== "#hero-img"); };
  set("#hero-img", A.hero, "Model in a boxy tee and baggy denim — sample campaign image"); set("#cat-tees", A.categoryTees, "Boxy tees"); set("#cat-shirts", A.categoryShirts, "Oversized shirts"); set("#cat-jeans", A.categoryJeans, "Baggy denim"); set("#cat-combos", A.categoryCombos, "Outfit combos");
  $$("#gallery .g").forEach((e, i) => e.innerHTML = img(A.gallery[i] || "", "Style gallery look " + (i + 1) + " — sample image"));
  $("#qr").innerHTML = img(A.paymentQR, "UPI payment QR — replace assets/payment/ukthhrift-payment-qr.png", "", false);
  $("#upi").innerHTML = UPI_ID ? `UPI ID: <strong>${esc(UPI_ID)}</strong>` : `<em>UPI ID not configured yet.</em>`;
  const wa = $$(".wa-link"); wa.forEach(a => a.href = `https://wa.me/${WHATSAPP_NUMBER}`);
  const ig = $("#ig"); INSTAGRAM_URL ? (ig.href = INSTAGRAM_URL) : ig.replaceWith(Object.assign(document.createElement("span"), { textContent: "Instagram (to be added)" }));
}
function renderCombos() {
  $("#combos").innerHTML = PRODUCTS.filter(p => p.category === "combos").map((p, i) => `<article class="combo c${i}"><div class="combo-img">${img(p.image, p.name)}</div><div class="combo-info"><h3>${esc(p.name)}</h3><ul>${comboParts(p).map(x => `<li>${esc(x.name)}</li>`).join("")}</ul><div class="price"><b>${inr(priceOf(p))}</b>${pctOff(p) ? `<s>${inr(mrpOf(p))}</s>` : ""}</div>${isAvail(p) ? "" : '<p class="warn">Contains an unavailable item</p>'}<button class="btn sm" data-view="${p.id}">Shop this look</button></div></article>`).join("");
}
$("#year").textContent = new Date().getFullYear();
const POLICY = { privacy: "Privacy Policy", terms: "Terms and Conditions", shipping: "Shipping Policy", returns: "Returns and Refund Policy" };
$$("[data-policy]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); $("#policy-title").textContent = POLICY[a.dataset.policy]; openLayer($("#policy")); }));
if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 }); $$(".reveal").forEach(e => io.observe(e)); } else $$(".reveal").forEach(e => e.classList.add("in"));

mountImages(); renderCombos(); renderShop(); renderCart();
